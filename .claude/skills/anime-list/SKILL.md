---
name: anime-list
description: src/anime-list/anime-list.md に書かれたアニメのタイトルを src/anime-list/anime-list.ts の OldWatchAnimes 配列へ転記し、転記後に anime-list.md を空にする。「アニメリストを転記して」「anime-list.md を反映して」などの依頼や /anime-list 実行時に使用。
---

# anime-list.md → anime-list.ts 転記

## 対象ファイル

- 入力: `src/anime-list/anime-list.md`（`.gitignore` 対象のメモ用ファイル）
- 出力: `src/anime-list/anime-list.ts` の `export const OldWatchAnimes = [ ... ];`

## 手順

1. `src/anime-list/anime-list.md` を読み、1行を1タイトルとして取り出す。
   - 前後の空白を除く。行頭の `- ` / `* ` / `1. ` などのリスト記号も除く
   - 空行・`#` で始まる見出し・`<!-- -->` のコメント行は無視する
   - ファイルが無い、またはタイトルが1件も無ければ「転記するタイトルはありません」と報告して終了する（どのファイルも変更しない）
2. `src/anime-list/anime-list.ts` を読み、`OldWatchAnimes` に既にあるタイトルを確認する。
   - 既にある（完全一致）タイトルと、md 内で重複しているタイトルは追加しない。スキップしたものは報告に含める
   - 表記ゆれ（全角/半角、記号の有無など）は勝手に統一・判断しない。md に書かれた文字列をそのまま使う
3. 追加するタイトルを、md に書かれた順で配列の末尾（閉じ `];` の直前）に追記する。
   - 既存行と同じ形式にする: 2スペースインデント、シングルクォート、末尾カンマ（例: `  'タイトル',`。Biome の整形に合わせる）
   - タイトル内の `'` は `\'`、`\` は `\\` にエスケープする
   - 既存の要素の並び・内容・コメントは変更しない
4. ビルドが通ることを確認する: `direnv exec . pnpm build`
   - 失敗したら原因を直す。直せなければ anime-list.md は空にせず、失敗内容を報告して終了する
5. ビルドが通ったら `src/anime-list/anime-list.md` を空にする（ファイル自体は削除しない）。
6. 報告する: 追加したタイトル一覧、スキップしたタイトルと理由、ビルド結果。

## 禁止事項

- git の commit / push はしない（変更はワーキングツリーに残す）
- `src/anime-list/anime-list.ts` と `src/anime-list/anime-list.md` 以外のファイルは変更しない
