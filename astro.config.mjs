// @ts-check

import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { remarkCodeFilename } from './src/lib/remark-code-filename.mjs';
import { transformerCodeFilename } from './src/lib/shiki-filename-transformer.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://katoline.com',
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'none'",
        "object-src 'none'",
        "frame-src 'none'",
        "form-action 'self'",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data:",
      ],
      scriptDirective: {
        resources: [
          { resource: "'self'", kind: 'element' },
          { resource: "'none'", kind: 'attribute' },
        ],
      },
      styleDirective: {
        resources: [
          { resource: "'self'", kind: 'element' },
          { resource: 'https://fonts.googleapis.com', kind: 'element' },
          // Shiki と装飾用の style 属性。script のインライン許可とは分ける。
          { resource: "'unsafe-inline'", kind: 'attribute' },
        ],
      },
    },
  },
  // v7 の既定は Sätteri。remark プラグインを使うため従来の unified パイプラインを維持する
  markdown: {
    processor: unified({ remarkPlugins: [remarkCodeFilename] }),
    shikiConfig: {
      transformers: [transformerCodeFilename()],
    },
  },
  integrations: [mdx()],
  // v7 の既定 'jsx'（JSX 規則で空白を詰める）から従来の HTML 規則に戻し、見た目を変えない
  compressHTML: true,
  build: {
    // CSSを常にインライン化してクリティカルパスから除外
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        // nix-direnv が nixpkgs 全体を .direnv/flake-inputs に置くため、監視すると inotify 上限を超える
        ignored: ['**/.direnv/**'],
      },
    },
  },
});
