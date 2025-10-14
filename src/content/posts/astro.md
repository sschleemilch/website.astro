---
title: Astro
pubDate: 2024-12-27
tags:
  - ASTRO
  - WEB
description: My experience building this website using Astro
---

# My experience building this website using Astro

[Astro](https://astro.build/) is a pretty fresh web framework.
Its focus is on creating content-driven websites, e.g. blogs.
That is why it caught my eye. I like building personal websites from time to time and
always struggle a bit finding the right balance of simplicity and modern framework features.

I always wanted that developing a website feels more like working with code, meaning having components that can be shaped and reused.
Additionally I like the approach of keeping the usage of JavaScript to a minimum.

That is why Astro felt like a perfect fit... And it is. You can find the full source code [here](https://github.com/sschleemilch/website.astro/tree/main).

Astro offers so called [Islands](https://docs.astro.build/en/concepts/islands/) that is a component based workflow as well as [Zero JavaScript](https://docs.astro.build/en/basics/astro-components/) by default.

[Content Collections](https://docs.astro.build/en/guides/content-collections/) are the cherries on top that make it really an awesome experience
for creating a blog. Due to coding, I am pretty used to writing Markdown. The idea of creating blog posts using Markdown was therefore
an amazing fit for me.

## The rest of the stack

Astro alone is pretty great. Its integrations with other frameworks is even better.

On top of Astro I chose to use:

- [TailwindCSS](https://tailwindcss.com/) because I was already familiar with it. Also, I feel like it is a match made in heaven. Since TailwindCSS is a utility first css framework, it benefits a lot when using a framework like Astro that offers components so that you do not need to repeat yourself for every element.
- [Fontsource](https://fontsource.org/). Open-source fonts that are packaged into individual NPM packages for self-hosting. Perfect for my blog.
- [Iconify](https://iconify.design/). Every website needs icons. Iconify is the home of open source icon sets with over 200,000 open source vector icons. The integration into Astro is super easy using [Astro Icon](https://github.com/natemoo-re/astro-icon).

## How to get started

Starting a new Astro project is as simple as calling:

```bash
pnpm create astro@latest
```

The wizard offers to use templates but getting to know it from scratch I chose the bare minimum.
The result will be a working website already that can be started locally with:

```bash
pnpm run dev
```

I will not repeat the official [project structure](https://docs.astro.build/en/basics/project-structure/) but the core directories are:

- `src/pages`. Every `*.astro` file in here will have its own route (except `index.astro` which is `/`)
- `src/components` does contain reusable Astro components that can be imported. `src/layouts` also contains components but more high level ones e.g. how a complete page should look like.

## How to use chosen technologies

### TailwindCSS

Adding support for tailwind is pretty simple:

```bash
pnpm astro add tailwind
```

It will add the following lines to the `astro.config.mjs`:

```javascript
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  // ...
  integrations: [tailwind()],
});
```

Additionally, an empty `tailwind.config.mjs` will be created.

### Fontsource

Nothing special needs to be done here.
Choose a font and install it via, e.g. I chose `Roboto`:

```bash
pnpm add @fontsource/roboto
```

Afterwards `Roboto` can be referenced from CSS or configured through tailwind:

```javascript
export default {
  darkMode: "selector",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Roboto"],
      },
    },
  },
};
```

### Icons

Pretty similar to tailwind, the Astro Icon integration can be added via:

```bash
pnpm astro add astro-icon
```

It will modify the `tailwind.config.mjs` with those changes:

```javascript
import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
  integrations: [icon()],
});
```

In order to be able to use icons, you will also need to install an icon set of your choice. I chose these:

```bash
# For static icons
pnpm add @iconify-json/mdi
# For animated line icons
pnpm add iconify-json/line-md
```

Now, icons can be used like this in `*.astro` files:

```astro
---
import { Icon } from "astro-icon/components";
---

<Icon name="mdi:account" />
```

Size and color can be controlled via tailwind using `text-*` classes.

## Using dynamic tailwind class names

One problem I had was generating tailwind class names based on Astro properties.

For instance, when having a definition like that (taken from my `Tag.astro`):

```astro
<a href={`/tags/${value}`} class=`text-${color} dark:text-${color}Dark hover:text-text dark:hover:text-textDark`>
  <p>
    #{value}
  </p>
</a>
```

The problem here is the order of execution regarding tailwind.
Tailwind scans the code for class names and only generates used class names in the final css.
It seems like `text-${color}` is not expanded at the time of Astro invoking the tailwind generation.

Workaround is to use `safelist` in `tailwind.config.mjs` with all class names this element can be expanded to.
To be on the safe side, I added all my theme colors. Here is a part of my config.

```javascript
export default {
  theme: {
    extend: {
      colors: {
        bgDark: "#232136",
        surfaceDark: "#2a273f",
        overlayDark: "#393552",
        mutedDark: "#6e6a86",
        subtleDark: "#908caa",
        textDark: "#e0def4",
        loveDark: "#eb6f92",
        goldDark: "#f6c177",
        roseDark: "#ea9a97",
        pineDark: "#3e8fb0",
        foamDark: "#9ccfd8",
        irisDark: "#c4a7e7",
        highlightLowDark: "#2a283e",
        highlightMedDark: "#44415a",
        highlightHighDark: "#56526e",
        bg: "#faf4ed",
        surface: "#fffaf3",
        overlay: "#f2e9e1",
        muted: "#9893a5",
        subtle: "#797593",
        text: "#575279",
        love: "#b4637a",
        gold: "#ea9d34",
        rose: "#d7827e",
        pine: "#286983",
        foam: "#56949f",
        iris: "#907aa9",
        highlightLow: "#f4ede8",
        highlightMed: "#dfdad9",
        highlightHigh: "#cecacd",
      },
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
  ],
};
```

## JSON config files

A cool feature that helps building a configurable site is the ability to import and use JSON very intuitively.

I wanted to have the colors I use for each page configurable so that each page as a different accent.
The different accent is reflected e.g. in the Logo.

For that, I created a `src/config/page_colors.json`:

```json
{
  "About": "foam",
  "Blog": "gold",
  "Tags": "rose"
}
```

The config file can be imported and used like this in `*.astro` files:

```javascript
import page_colors from "@config/page_colors.json";
const accent = page_colors["About"];
```

From there, it can be passed to components that in turn use it to build tailwind classes like `text-${accent}` and `dark:text-${accent}Dark`.
With that mechanism it is pretty simple to implement a certain color scheme for each page.

## Summary

My experience building this website using Astro has been really awesome.
It was very easy and fun to work with and is an excellent choice for static websites.
Finally, we can develop those websites using components without needing to use a full blown overkill JavaScript framework.
