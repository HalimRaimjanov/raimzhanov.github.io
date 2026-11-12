import 'server-only';
import { cache } from 'react';
import seeds from '@/generated/admin-seeds.json';
import { configured, redis } from './dream-server';
import { Entry, Locale, Post, Section, entryPost, sortPosts } from './content';
export const contentKey='portfolio:content:v1';
export const initialEntries=seeds as Entry[];
// HSETNX is atomic: migration never overwrites edits, hidden records or tombstones.
export async function ensureContentImported() {
 const script="for i = 1, #ARGV, 2 do redis.call('HSETNX', KEYS[1], ARGV[i], ARGV[i+1]) end; return 1";
 await redis(['EVAL',script,1,contentKey,...initialEntries.flatMap(e=>[e.slug,JSON.stringify(e)])]);
}
export async function readEntries(): Promise<Entry[]> {
 const values=await redis(['HVALS',contentKey]);
 const merged=new Map(initialEntries.map(e=>[e.slug,e]));
 for(const raw of values ?? []) { const entry=JSON.parse(raw) as Entry; merged.set(entry.slug,entry); }
 return [...merged.values()];
}
const publicEntries=cache(async()=>{
 if(!configured()) return initialEntries;
 try { return await readEntries(); }
 catch { console.error('Content storage unavailable'); return [] as Entry[]; }
});
export async function getContent(locale: Locale,section: Section): Promise<Post[]> {
 const entries=await publicEntries();
 return sortPosts(entries.filter(e=>e.section===section && e.published && !e.deleted).map(e=>entryPost(e,locale)));
}
