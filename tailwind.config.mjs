/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontWeight: {
        semibold: '700', // font-semiboldを700にマッピング（Noto Sans JPには600がないため）
      },
    },
  },
};
