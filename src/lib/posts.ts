import type { CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

export function sortPosts(posts: Post[]) {
  return posts.toSorted((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function postYear(post: Post) {
  return post.data.pubDate.getFullYear();
}

export function getYears(posts: Post[]) {
  return [...new Set(posts.map(postYear))].sort((a, b) => b - a);
}

export function getTags(posts: Post[]) {
  return [...new Set(posts.flatMap((post) => post.data.tags))].sort();
}

export function filterPosts(posts: Post[], year?: number, tag?: string) {
  return sortPosts(
    posts.filter(
      (post) => (year === undefined || postYear(post) === year) && (tag === undefined || post.data.tags.includes(tag)),
    ),
  );
}
