/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        pine: {
          css: {
            "--tw-prose-body": theme("colors.text"),
            "--tw-prose-headings": theme("colors.text"),
            "--tw-prose-lead": theme("colors.text"),
            "--tw-prose-links": theme("colors.iris"),
            "--tw-prose-bold": theme("colors.text"),
            "--tw-prose-counters": theme("colors.text"),
            "--tw-prose-bullets": theme("colors.subtle"),
            "--tw-prose-hr": theme("colors.highlightMed"),
            "--tw-prose-quotes": theme("colors.text"),
            "--tw-prose-quote-borders": theme("colors.highlightMed"),
            "--tw-prose-captions": theme("colors.text"),
            "--tw-prose-code": theme("colors.text"),
            "--tw-prose-pre-code": theme("colors.text"),
            "--tw-prose-pre-bg": theme("colors.text"),
            "--tw-prose-th-borders": theme("colors.highlightMed"),
            "--tw-prose-td-borders": theme("colors.highlightMed"),
            "--tw-prose-invert-body": theme("colors.textDark"),
            "--tw-prose-invert-headings": theme("colors.textDark"),
            "--tw-prose-invert-lead": theme("colors.textDark"),
            "--tw-prose-invert-links": theme("colors.irisDark"),
            "--tw-prose-invert-bold": theme("colors.textDark"),
            "--tw-prose-invert-counters": theme("colors.textDark"),
            "--tw-prose-invert-bullets": theme("colors.subtle"),
            "--tw-prose-invert-hr": theme("colors.highlightHighDark"),
            "--tw-prose-invert-quotes": theme("colors.textDark"),
            "--tw-prose-invert-quote-borders": theme("colors.subtleDark"),
            "--tw-prose-invert-captions": theme("colors.textDark"),
            "--tw-prose-invert-code": theme("colors.textDark"),
            "--tw-prose-invert-pre-code": theme("colors.textDark"),
            "--tw-prose-invert-pre-bg": theme("colors.textDark"),
            "--tw-prose-invert-th-borders": theme("colors.highlightMedDark"),
            "--tw-prose-invert-td-borders": theme("colors.highlightMedDark"),
          },
        },
      }),
    },
  },
  safelist: [
    "text-baseDark",
    "text-surfaceDark",
    "text-overlayDark",
    "text-mutedDark",
    "text-subtleDark",
    "text-textDark",
    "text-loveDark",
    "text-goldDark",
    "text-roseDark",
    "text-pineDark",
    "text-foamDark",
    "text-irisDark",
    "text-highlightLowDark",
    "text-highlightMedDark",
    "text-highlightHighDark",
    "text-base",
    "text-surface",
    "text-overlay",
    "text-muted",
    "text-subtle",
    "text-text",
    "text-love",
    "text-gold",
    "text-rose",
    "text-pine",
    "text-foam",
    "text-iris",
    "text-highlightLow",
    "text-highlightMed",
    "text-highlightHigh",

    "dark:text-baseDark",
    "dark:text-surfaceDark",
    "dark:text-overlayDark",
    "dark:text-mutedDark",
    "dark:text-subtleDark",
    "dark:text-textDark",
    "dark:text-loveDark",
    "dark:text-goldDark",
    "dark:text-roseDark",
    "dark:text-pineDark",
    "dark:text-foamDark",
    "dark:text-irisDark",
    "dark:text-highlightLowDark",
    "dark:text-highlightMedDark",
    "dark:text-highlightHighDark",
    "dark:text-base",
    "dark:text-surface",
    "dark:text-overlay",
    "dark:text-muted",
    "dark:text-subtle",
    "dark:text-text",
    "dark:text-love",
    "dark:text-gold",
    "dark:text-rose",
    "dark:text-pine",
    "dark:text-foam",
    "dark:text-iris",
    "dark:text-highlightLow",
    "dark:text-highlightMed",
    "dark:text-highlightHigh",

    "hover:text-baseDark",
    "hover:text-surfaceDark",
    "hover:text-overlayDark",
    "hover:text-mutedDark",
    "hover:text-subtleDark",
    "hover:text-textDark",
    "hover:text-loveDark",
    "hover:text-goldDark",
    "hover:text-roseDark",
    "hover:text-pineDark",
    "hover:text-foamDark",
    "hover:text-irisDark",
    "hover:text-highlightLowDark",
    "hover:text-highlightMedDark",
    "hover:text-highlightHighDark",
    "hover:text-base",
    "hover:text-surface",
    "hover:text-overlay",
    "hover:text-muted",
    "hover:text-subtle",
    "hover:text-text",
    "hover:text-love",
    "hover:text-gold",
    "hover:text-rose",
    "hover:text-pine",
    "hover:text-foam",
    "hover:text-iris",
    "hover:text-highlightLow",
    "hover:text-highlightMed",
    "hover:text-highlightHigh",

    "dark:hover:text-baseDark",
    "dark:hover:text-surfaceDark",
    "dark:hover:text-overlayDark",
    "dark:hover:text-mutedDark",
    "dark:hover:text-subtleDark",
    "dark:hover:text-textDark",
    "dark:hover:text-loveDark",
    "dark:hover:text-goldDark",
    "dark:hover:text-roseDark",
    "dark:hover:text-pineDark",
    "dark:hover:text-foamDark",
    "dark:hover:text-irisDark",
    "dark:hover:text-highlightLowDark",
    "dark:hover:text-highlightMedDark",
    "dark:hover:text-highlightHighDark",
    "dark:hover:text-base",
    "dark:hover:text-surface",
    "dark:hover:text-overlay",
    "dark:hover:text-muted",
    "dark:hover:text-subtle",
    "dark:hover:text-text",
    "dark:hover:text-love",
    "dark:hover:text-gold",
    "dark:hover:text-rose",
    "dark:hover:text-pine",
    "dark:hover:text-foam",
    "dark:hover:text-iris",
    "dark:hover:text-highlightLow",
    "dark:hover:text-highlightMed",
    "dark:hover:text-highlightHigh",

    "bg-baseDark",
    "bg-surfaceDark",
    "bg-overlayDark",
    "bg-mutedDark",
    "bg-subtleDark",
    "bg-textDark",
    "bg-loveDark",
    "bg-goldDark",
    "bg-roseDark",
    "bg-pineDark",
    "bg-foamDark",
    "bg-irisDark",
    "bg-highlightLowDark",
    "bg-highlightMedDark",
    "bg-highlightHighDark",
    "bg-base",
    "bg-surface",
    "bg-overlay",
    "bg-muted",
    "bg-subtle",
    "bg-text",
    "bg-love",
    "bg-gold",
    "bg-rose",
    "bg-pine",
    "bg-foam",
    "bg-iris",
    "bg-highlightLow",
    "bg-highlightMed",
    "bg-highlightHigh",

    "dark:bg-baseDark",
    "dark:bg-surfaceDark",
    "dark:bg-overlayDark",
    "dark:bg-mutedDark",
    "dark:bg-subtleDark",
    "dark:bg-textDark",
    "dark:bg-loveDark",
    "dark:bg-goldDark",
    "dark:bg-roseDark",
    "dark:bg-pineDark",
    "dark:bg-foamDark",
    "dark:bg-irisDark",
    "dark:bg-highlightLowDark",
    "dark:bg-highlightMedDark",
    "dark:bg-highlightHighDark",
    "dark:bg-base",
    "dark:bg-surface",
    "dark:bg-overlay",
    "dark:bg-muted",
    "dark:bg-subtle",
    "dark:bg-text",
    "dark:bg-love",
    "dark:bg-gold",
    "dark:bg-rose",
    "dark:bg-pine",
    "dark:bg-foam",
    "dark:bg-iris",
    "dark:bg-highlightLow",
    "dark:bg-highlightMed",
    "dark:bg-highlightHigh",

    "hover:bg-baseDark",
    "hover:bg-surfaceDark",
    "hover:bg-overlayDark",
    "hover:bg-mutedDark",
    "hover:bg-subtleDark",
    "hover:bg-textDark",
    "hover:bg-loveDark",
    "hover:bg-goldDark",
    "hover:bg-roseDark",
    "hover:bg-pineDark",
    "hover:bg-foamDark",
    "hover:bg-irisDark",
    "hover:bg-highlightLowDark",
    "hover:bg-highlightMedDark",
    "hover:bg-highlightHighDark",
    "hover:bg-base",
    "hover:bg-surface",
    "hover:bg-overlay",
    "hover:bg-muted",
    "hover:bg-subtle",
    "hover:bg-text",
    "hover:bg-love",
    "hover:bg-gold",
    "hover:bg-rose",
    "hover:bg-pine",
    "hover:bg-foam",
    "hover:bg-iris",
    "hover:bg-highlightLow",
    "hover:bg-highlightMed",
    "hover:bg-highlightHigh",

    "dark:hover:bg-baseDark",
    "dark:hover:bg-surfaceDark",
    "dark:hover:bg-overlayDark",
    "dark:hover:bg-mutedDark",
    "dark:hover:bg-subtleDark",
    "dark:hover:bg-textDark",
    "dark:hover:bg-loveDark",
    "dark:hover:bg-goldDark",
    "dark:hover:bg-roseDark",
    "dark:hover:bg-pineDark",
    "dark:hover:bg-foamDark",
    "dark:hover:bg-irisDark",
    "dark:hover:bg-highlightLowDark",
    "dark:hover:bg-highlightMedDark",
    "dark:hover:bg-highlightHighDark",
    "dark:hover:bg-base",
    "dark:hover:bg-surface",
    "dark:hover:bg-overlay",
    "dark:hover:bg-muted",
    "dark:hover:bg-subtle",
    "dark:hover:bg-text",
    "dark:hover:bg-love",
    "dark:hover:bg-gold",
    "dark:hover:bg-rose",
    "dark:hover:bg-pine",
    "dark:hover:bg-foam",
    "dark:hover:bg-iris",
    "dark:hover:bg-highlightLow",
    "dark:hover:bg-highlightMed",
    "dark:hover:bg-highlightHigh",

    "border-baseDark",
    "border-surfaceDark",
    "border-overlayDark",
    "border-mutedDark",
    "border-subtleDark",
    "border-textDark",
    "border-loveDark",
    "border-goldDark",
    "border-roseDark",
    "border-pineDark",
    "border-foamDark",
    "border-irisDark",
    "border-highlightLowDark",
    "border-highlightMedDark",
    "border-highlightHighDark",
    "border-base",
    "border-surface",
    "border-overlay",
    "border-muted",
    "border-subtle",
    "border-text",
    "border-love",
    "border-gold",
    "border-rose",
    "border-pine",
    "border-foam",
    "border-iris",
    "border-highlightLow",
    "border-highlightMed",
    "border-highlightHigh",

    "dark:border-baseDark",
    "dark:border-surfaceDark",
    "dark:border-overlayDark",
    "dark:border-mutedDark",
    "dark:border-subtleDark",
    "dark:border-textDark",
    "dark:border-loveDark",
    "dark:border-goldDark",
    "dark:border-roseDark",
    "dark:border-pineDark",
    "dark:border-foamDark",
    "dark:border-irisDark",
    "dark:border-highlightLowDark",
    "dark:border-highlightMedDark",
    "dark:border-highlightHighDark",
    "dark:border-base",
    "dark:border-surface",
    "dark:border-overlay",
    "dark:border-muted",
    "dark:border-subtle",
    "dark:border-text",
    "dark:border-love",
    "dark:border-gold",
    "dark:border-rose",
    "dark:border-pine",
    "dark:border-foam",
    "dark:border-iris",
    "dark:border-highlightLow",
    "dark:border-highlightMed",
    "dark:border-highlightHigh",

    "hover:border-baseDark",
    "hover:border-surfaceDark",
    "hover:border-overlayDark",
    "hover:border-mutedDark",
    "hover:border-subtleDark",
    "hover:border-textDark",
    "hover:border-loveDark",
    "hover:border-goldDark",
    "hover:border-roseDark",
    "hover:border-pineDark",
    "hover:border-foamDark",
    "hover:border-irisDark",
    "hover:border-highlightLowDark",
    "hover:border-highlightMedDark",
    "hover:border-highlightHighDark",
    "hover:border-base",
    "hover:border-surface",
    "hover:border-overlay",
    "hover:border-muted",
    "hover:border-subtle",
    "hover:border-text",
    "hover:border-love",
    "hover:border-gold",
    "hover:border-rose",
    "hover:border-pine",
    "hover:border-foam",
    "hover:border-iris",
    "hover:border-highlightLow",
    "hover:border-highlightMed",
    "hover:border-highlightHigh",

    "dark:hover:border-baseDark",
    "dark:hover:border-surfaceDark",
    "dark:hover:border-overlayDark",
    "dark:hover:border-mutedDark",
    "dark:hover:border-subtleDark",
    "dark:hover:border-textDark",
    "dark:hover:border-loveDark",
    "dark:hover:border-goldDark",
    "dark:hover:border-roseDark",
    "dark:hover:border-pineDark",
    "dark:hover:border-foamDark",
    "dark:hover:border-irisDark",
    "dark:hover:border-highlightLowDark",
    "dark:hover:border-highlightMedDark",
    "dark:hover:border-highlightHighDark",
    "dark:hover:border-base",
    "dark:hover:border-surface",
    "dark:hover:border-overlay",
    "dark:hover:border-muted",
    "dark:hover:border-subtle",
    "dark:hover:border-text",
    "dark:hover:border-love",
    "dark:hover:border-gold",
    "dark:hover:border-rose",
    "dark:hover:border-pine",
    "dark:hover:border-foam",
    "dark:hover:border-iris",
    "dark:hover:border-highlightLow",
    "dark:hover:border-highlightMed",
    "dark:hover:border-highlightHigh",
  ],
};
