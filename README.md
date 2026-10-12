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

## 📁 プロジェクト構造

```
/
├── public/                    # 静的ファイル（画像、アイコンなど）
│   └── icon-dev.webp
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
│   ├── lib/
│   │   ├── anime-list.ts     # 過去視聴アニメ・漫画
│   │   ├── remark-code-filename.mjs
│   │   └── shiki-filename-transformer.mjs
│   ├── pages/                # ページファイル
│   │   ├── blog/             # ブログ関連ページ
│   │   │   └── [slug].astro # ブログ記事詳細ページ
│   │   ├── blog.astro        # ブログ一覧ページ
│   │   ├── habitats.astro    # よく行く場所ページ
│   │   ├── index.astro       # ホームページ
│   │   ├── old-watch-anime.astro
│   │   └── watch-anime.astro # 今期視聴アニメページ
│   └── styles/               # グローバルスタイル
│       └── global.css
├── astro.config.mjs          # Astro設定ファイル
├── flake.nix                 # Nix devShell（Node 22 + pnpm）
├── flake.lock
├── pnpm-workspace.yaml       # pnpm 11 のビルド許可（esbuild / sharp）
├── .envrc                    # direnv: use flake
├── tailwind.config.mjs       # TailwindCSS設定ファイル
├── tsconfig.json             # TypeScript設定ファイル
└── package.json
```

## 🛠️ 使用技術

- [Astro](https://astro.build/) - 静的サイトジェネレーター
- [TailwindCSS](https://tailwindcss.com/) - ユーティリティファーストの CSS フレームワーク
- [Content Collections](https://docs.astro.build/en/guides/content-collections/) - 型安全なコンテンツ管理
- [MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/) - ブログ本文（コンポーネント埋め込み可）
- [TypeScript](https://www.typescriptlang.org/) - 型安全性
