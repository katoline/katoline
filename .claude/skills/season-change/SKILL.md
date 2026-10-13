---
name: season-change
description: アニメのシーズンが切り替わったときに、今期視聴アニメ（src/anime-list/watch-anime.astro）の一覧を前期視聴アニメ（src/anime-list/last-season-anime.astro）へ移し、今期側を新シーズン用に空にしたうえで、新シーズンに放送されるアニメを公式サイト付きで調べて src/anime-list/season-anime-list.md に一覧出力する。「シーズンが変わった」「今期アニメを前期に移して」「新しいクールのアニメを調べて」などの依頼や /season-change 実行時に使用。
---

# シーズン切り替え

## 対象ファイル

- 今期: `src/anime-list/watch-anime.astro`（`thisSeasonAnimes: Place[]` と、`PlacesSection` の `areas` の `id` / `title`）
- 前期: `src/anime-list/last-season-anime.astro`（`lastSeasonTitle` と `lastSeasonAnimes: Place[]`）
- 調査結果の出力先: `src/anime-list/season-anime-list.md`

シーズンの区切りは 冬=1〜3月、春=4〜6月、夏=7〜9月、秋=10〜12月。

## 手順

### 1. 現状の読み取り

1. `watch-anime.astro` から `thisSeasonAnimes` の要素と、`areas` の `title`（例: `2026年夏アニメ`）と `id`（例: `2026-summer-anime`）を読む。
2. 新シーズンを決める: 今期の `title` の次のシーズン（夏 → 秋、秋 → 翌年の冬 …）。
   - 今日の日付が属するシーズンと食い違う場合（切り替え済みのまま再実行した等）は、ファイルを変更せずユーザーに確認する。
3. `thisSeasonAnimes` が空なら、前期を空で上書きしてしまうため、ファイルを変更せずユーザーに確認する。

### 2. 今期 → 前期への移動

1. `last-season-anime.astro` の `lastSeasonAnimes` を、今期の `thisSeasonAnimes` の要素で**置き換える**（前期にあった一覧は消してよい。視聴履歴への追加はしない）。
   - 要素は `label` / `href` を含め1文字も変えずにそのまま移す。並び順も維持する
2. `lastSeasonTitle` を今期の `title`（例: `2026年夏アニメ`）にする。
3. `watch-anime.astro` を新シーズン用にする:
   - `thisSeasonAnimes` を空配列 `[]` にする（直前のコメント・例は残す）
   - `areas` の `title` を新シーズン名（例: `2026年秋アニメ`）、`id` を `YYYY-<winter|spring|summer|autumn>-anime`（例: `2026-autumn-anime`）にする
4. 上記以外の箇所（レイアウト・説明文・import など）は変更しない。

### 3. 新シーズンのアニメ調査

1. WebSearch / WebFetch で新シーズン（例: 2026年秋 = 10月〜）に**新しく放送開始する**テレビアニメを調べる。
   - 複数の情報源（アニメ情報サイトの新番組一覧など）を突き合わせ、タイトルの取りこぼしを減らす
   - 前シーズンからの継続放送（2クール目など）は「備考」に継続と書いて含める
   - 劇場版・配信限定作品は含めない（配信先行でもテレビ放送があるものは含める）
2. 各作品の**公式サイトの URL** を載せる。
   - 一覧サイトのリンクや検索結果から公式サイトを特定する。公式 X（旧 Twitter）しか無い場合はその URL を書き、備考に「公式X」と書く
   - 確認できなかったものは推測で URL を作らず `不明` と書く
3. `season-anime-list.md` を次の形式で**上書き**する。タイトルは五十音順に並べる。

```markdown
# 2026年秋アニメ一覧

調査日: 2026-10-13 / 出典: <参照した一覧ページの URL を列挙>

| タイトル | 公式サイト | 放送開始 | 備考 |
| --- | --- | --- | --- |
| 作品名 | https://example.com/ | 10月5日 | 続編 / 継続 / 公式X など |
```

- 放送開始日が分からなければ空欄にする
- 作品数・確認できなかった件数を表の後ろに1行で書く

### 4. 検証

`direnv exec . pnpm build` を実行し、成功することと `dist/watch-anime/index.html` / `dist/last-season-anime/index.html` が生成されることを確認する。失敗したら原因を直す。

### 5. 報告

- 前期へ移した作品数と前期のシーズン名、今期の新しいシーズン名
- 調査した作品数、公式サイトが `不明` の作品
- ビルド結果
- 今期のリストは空なので、`season-anime-list.md` から見る作品を選んで `thisSeasonAnimes` に追加するよう案内する（`href` に公式サイトを入れられる）

## 禁止事項

- git の commit / push はしない（変更はワーキングツリーに残す）
- 上記3ファイル以外は変更しない
