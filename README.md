# katoline-web

Astro + TailwindCSS で構築されたシンプルでモダンなプロフィールサイトです。

## ✨ 特徴

- 🎨 **ライト/ダークモード対応** - テーマ切り替え機能付き
- 📱 **レスポンシブデザイン** - モバイル・タブレット・デスクトップに対応
- ⚡ **高速なパフォーマンス** - Astro の静的サイト生成による最適化
- 📝 **ブログ機能** - Content Collections + MDX によるブログ投稿機能
- 🎯 **シンプルな構成** - 必要最小限の機能で軽量

## 🚀 セットアップ

前提: Nix + direnv。このディレクトリに `cd` すると `flake.nix` の devShell が有効になり、Node 22 と pnpm が入る（グローバルには入れない）。初回のみ `direnv allow` が必要。

Node パッケージは従来どおり `pnpm-lock.yaml` で管理する。

### インストール

```bash
# 依存関係のインストール
pnpm install
```

### 開発サーバーの起動

```bash
# 開発サーバーを起動（デフォルト: http://localhost:4321）
pnpm dev
```

### ビルド

```bash
# 本番用ビルド
pnpm build

# ビルド結果のプレビュー
pnpm preview
```

### 検証

```bash
# 型チェック → ビルド → 内部リンク検査
pnpm verify
```

## 📁 プロジェクト構造

```
/
├── .claude/
│   └── skills/               # Claude Code 用スキル（anime-list / season-change）
├── .github/
│   ├── workflows/            # CI（ci.yml）・マージ済みブランチ削除
│   └── dependabot.yml        # 依存更新
├── .vscode/                  # エディタ設定
├── public/                   # 静的ファイル（画像、アイコンなど）
│   ├── icon-dev.webp
│   └── og.png                # OGP 画像（1200×630、英数字のみ）
├── src/
│   ├── components/            # Astroコンポーネント
│   │   ├── mdx/              # ブログ MDX から使うコンポーネント
│   │   │   └── Details.astro
│   │   ├── ListPageLayout.astro
│   │   ├── ListSectionTitle.astro
│   │   ├── pages-link.astro
│   │   ├── PlacesSection.astro
│   │   ├── SiteHeader.astro
│   │   ├── sns-link.astro
│   │   └── ThemeToggle.astro
│   ├── content/              # Content Collections
│   │   └── blog/             # ブログ記事（MDX）
│   ├── content.config.ts     # コレクション設定
│   ├── layouts/              # レイアウトコンポーネント
│   │   └── Layout.astro
│   ├── anime-list/           # アニメリスト（よく編集する）
│   │   ├── anime-list.md     # 新規視聴タイトルのメモ（gitignore 対象）
│   │   ├── anime-list.ts     # 過去視聴アニメ・漫画（OldWatchAnimes）
│   │   ├── last-season-anime.astro # 前期視聴アニメ（データ・描画）
│   │   └── watch-anime.astro # 今期視聴アニメ（データ・描画）
│   ├── lib/
│   │   ├── blog.ts           # ブログ記事の共通ヘルパー（下書き除外・並び順）
│   │   ├── remark-code-filename.mjs
│   │   └── shiki-filename-transformer.mjs
│   ├── pages/                # ページファイル
│   │   ├── blog/             # ブログ関連ページ
│   │   │   └── [slug].astro # ブログ記事詳細ページ
│   │   ├── blog.astro        # ブログ一覧ページ（現在トップからの導線なし）
│   │   ├── habitats.astro    # よく行く場所ページ
│   │   ├── index.astro       # ホームページ
│   │   ├── last-season-anime.astro # 前期視聴アニメのラッパー（本体は src/anime-list/）
│   │   ├── old-watch-anime.astro
│   │   └── watch-anime.astro # 今期視聴アニメのラッパー（本体は src/anime-list/）
│   └── styles/               # グローバルスタイル
│       └── global.css
├── scripts/
│   └── check-links.mjs       # ビルド成果物の内部リンク切れ検査
├── astro.config.mjs          # Astro設定ファイル
├── flake.nix                 # Nix devShell（Node 22 + pnpm）
├── flake.lock
├── pnpm-workspace.yaml       # pnpm 11 のビルド許可（esbuild / sharp）
├── .envrc                    # direnv: use flake
├── tailwind.config.mjs       # TailwindCSS設定ファイル
├── tsconfig.json             # TypeScript設定ファイル
├── vercel.json               # Vercel のキャッシュ・セキュリティヘッダー設定
└── package.json
```

## 🛠️ 使用技術

- [Astro](https://astro.build/) - 静的サイトジェネレーター
- [TailwindCSS](https://tailwindcss.com/) - ユーティリティファーストの CSS フレームワーク
- [Content Collections](https://docs.astro.build/en/guides/content-collections/) - 型安全なコンテンツ管理
- [MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/) - ブログ本文（コンポーネント埋め込み可）
- [TypeScript](https://www.typescriptlang.org/) - 型安全性
