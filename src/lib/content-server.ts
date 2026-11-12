import 'server-only';
import { cache } from 'react';
import catalog from '@/generated/content.json';
import { configured, redis } from './dream-server';
import { Entry, Locale, Post, Section, entryPost, sortPosts } from './content';
export const contentKey = 'portfolio:content:v1';
export async function readEntries(): Promise<Entry[]> {
 const values = await redis(['HVALS', contentKey]);
 return (values ?? []).map((raw: string) => JSON.parse(raw));
}
const publicEntries = cache(async () => {
 if (!configured()) return [] as Entry[];
 try { return (await readEntries()).filter(e => e.published); }
 catch { console.error('Content storage unavailable; serving bundled publications'); return [] as Entry[]; }
});
export async function getContent(locale: Locale, section: Section): Promise<Post[]> {
 const key = section === 'blog' ? 'blog/posts' : 'work/projects';
 const base = catalog[locale][key] as Post[];
 const entries = await publicEntries();
 return sortPosts([...base, ...entries.filter(e => e.section === section).map(e => entryPost(e, locale))]);
}
