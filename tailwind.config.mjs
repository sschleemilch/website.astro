/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  safelist: [
    "dark:text-sky-500",
    "dark:text-emerald-500",
    "dark:text-red-400",
    "dark:text-fuchsia-500",
    "dark:text-rose-400",
    "dark:text-amber-400",
  ],
};
