// ビルド成果物（dist/）の内部リンク・画像参照が実在するかを検査する
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';

// 再帰的に .html を集める
async function collectHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectHtml(path)));
    } else if (entry.name.endsWith('.html')) {
      files.push(path);
    }
  }
  return files;
}

// href / src のうち、ルート相対（/ で始まり // で始まらない）値を取り出す
function extractRefs(html) {
  const refs = [];
  const pattern = /\b(?:href|src)="([^"]*)"/g;
  for (const match of html.matchAll(pattern)) {
    const value = match[1];
    if (value.startsWith('/') && !value.startsWith('//')) {
      refs.push(value);
    }
  }
  return refs;
}

// クエリ・ハッシュを除き、デコードしたパスを dist 配下のファイルとして解決できるか調べる
async function exists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function resolves(ref) {
  const pathname = ref.split(/[?#]/)[0];
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return false;
  }
  const target = join(DIST, decoded);
  if (await exists(target)) return true;
  return exists(join(target, 'index.html'));
}

try {
  await stat(DIST);
} catch {
  console.error(`エラー: ${DIST}/ が見つかりません。先に pnpm build を実行してください`);
  process.exit(1);
}

const htmlFiles = await collectHtml(DIST);
const broken = [];
let total = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  for (const ref of extractRefs(html)) {
    total++;
    if (!(await resolves(ref))) {
      broken.push({ page: relative('.', file).split(sep).join('/'), ref });
    }
  }
}

if (broken.length > 0) {
  console.error(`壊れた内部リンク・参照が ${broken.length} 件あります:`);
  for (const { page, ref } of broken) {
    console.error(`  ${page}: ${ref}`);
  }
  process.exit(1);
}

console.log(`内部リンク検査 OK（HTML ${htmlFiles.length} ファイル / 参照 ${total} 件）`);
