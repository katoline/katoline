// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";
import { remarkCodeFilename } from "./src/lib/remark-code-filename.mjs";
import { transformerCodeFilename } from "./src/lib/shiki-filename-transformer.mjs";

// https://astro.build/config
export default defineConfig({
  // v7 の既定は Sätteri。remark プラグインを使うため従来の unified パイプラインを維持する
  markdown: {
    processor: unified({ remarkPlugins: [remarkCodeFilename] }),
    shikiConfig: {
      transformers: [transformerCodeFilename()],
    },
  },
  integrations: [mdx(), react()],
  // v7 の既定 'jsx'（JSX 規則で空白を詰める）から従来の HTML 規則に戻し、見た目を変えない
  compressHTML: true,
  build: {
    // CSSを常にインライン化してクリティカルパスから除外
    inlineStylesheets: "always",
  },
  vite: {
    // @ts-ignore - Vite plugin type mismatch between Astro's Vite version and @tailwindcss/vite
    plugins: [tailwindcss()],
    server: {
      watch: {
        // nix-direnv が nixpkgs 全体を .direnv/flake-inputs に置くため、監視すると inotify 上限を超える
        ignored: ["**/.direnv/**"],
      },
    },
  },
});
