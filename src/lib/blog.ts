import { type CollectionEntry, getCollection } from 'astro:content';

export type BlogEntry = CollectionEntry<'blog'>;

// 下書きを除き、日付の新しい順に並べた記事一覧
export async function getPublishedPosts(): Promise<BlogEntry[]> {
  const posts = await getCollection('blog', (entry: BlogEntry) => !entry.data.draft);

  return posts.sort((a: BlogEntry, b: BlogEntry) => {
    const ad = a.data.date?.getTime() ?? 0;
    const bd = b.data.date?.getTime() ?? 0;
    return bd - ad;
  });
}
