/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        pine: {
          css: {
            "--tw-prose-invert-body": theme("colors.text"),
            "--tw-prose-invert-headings": theme("colors.text"),
            "--tw-prose-invert-lead": theme("colors.text"),
            "--tw-prose-invert-links": theme("colors.iris"),
            "--tw-prose-invert-bold": theme("colors.text"),
            "--tw-prose-invert-counters": theme("colors.text"),
            "--tw-prose-invert-bullets": theme("colors.subtle"),
            "--tw-prose-invert-hr": theme("colors.hlh"),
            "--tw-prose-invert-quotes": theme("colors.text"),
            "--tw-prose-invert-quote-borders": theme("colors.subtle"),
            "--tw-prose-invert-captions": theme("colors.text"),
            "--tw-prose-invert-code": theme("colors.text"),
            "--tw-prose-invert-pre-code": theme("colors.text"),
            "--tw-prose-invert-pre-bg": theme("colors.text"),
            "--tw-prose-invert-th-borders": theme("colors.hlm"),
            "--tw-prose-invert-td-borders": theme("colors.hlm"),
          },
        },
      }),
      colors: {
        base: "#191724",
        surface: "#1f1d2e",
        overlay: "#26233a",
        muted: "#6e6a86",
        subtle: "#908caa",
        text: "#e0def4",
        love: "#eb6f92",
        gold: "#f6c177",
        rose: "#ebbcba",
        pine: "#32748f",
        foam: "#9ccfd8",
        iris: "#c4a7e7",
        hlm: "#403d52",
        hlh: "#524f67",
      },
    },
  },
  safelist: [
    "dark:text-sky-500",
    "dark:text-emerald-500",
    "dark:text-red-400",
    "dark:text-fuchsia-500",
    "dark:text-rose-400",
    "dark:text-amber-400",
  ],
};
