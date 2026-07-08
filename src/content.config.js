import { defineCollection } from "astro:content";
import { z } from 'astro/zod';
import { glob } from "astro/loaders";

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  posts: postsCollection,
};
