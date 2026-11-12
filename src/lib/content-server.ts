import { emptyDream, Dream } from './dream';
import 'server-only';
import { cache } from 'react';
import seeds from '@/generated/admin-seeds.json';
import { configured, redis, readDream } from './dream-server';
import { Entry, Locale, Post, Section, entryPost, sortPosts } from './content';
export const contentKey='portfolio:content:v1';
export const initialEntries=seeds as Entry[];
// HSETNX is atomic: migration never overwrites edits, hidden records or tombstones.
export function dreamEntry(d:Dream):Entry { return {slug:'dream-lixiang-l7',section:'dreams',kind:'dream',format:'text',published:true,publishedAt:'',image:d.image,link:'',tag:'',dream:{...d,image:''},translations:{ru:{title:d.title,summary:d.description,content:''},en:{title:d.titleEn||'',summary:d.descriptionEn||'',content:''},ky:{title:d.titleKy||'',summary:d.descriptionKy||'',content:''}},updatedAt:d.updatedAt||'seed-v3',createdAt:'2026-11-12T00:00:00.000Z'}; }
export async function ensureContentImported() {
 const script="for i = 1, #ARGV, 2 do redis.call('HSETNX', KEYS[1], ARGV[i], ARGV[i+1]) end; return 1";
 await redis(['EVAL',script,1,contentKey,...[...initialEntries,dreamEntry(await readDream())].flatMap(e=>[e.slug,JSON.stringify(e)])]);
}
export async function readEntries(): Promise<Entry[]> {
 const values=await redis(['HVALS',contentKey]);
 const merged=new Map(initialEntries.map(e=>[e.slug,e]));
 for(const raw of values ?? []) { const entry=JSON.parse(raw) as Entry; merged.set(entry.slug,entry); }
 if(!merged.has('dream-lixiang-l7')) merged.set('dream-lixiang-l7',dreamEntry(await readDream()));
 return [...merged.values()];
}
const publicEntries=cache(async()=>{
 if(!configured()) return [...initialEntries,dreamEntry(emptyDream)];
 try { return await readEntries(); }
 catch { console.error('Content storage unavailable'); return [] as Entry[]; }
});
export async function getContent(locale: Locale,section: Section): Promise<Post[]> {
 const entries=await publicEntries();
 return sortPosts(entries.filter(e=>e.section===section && e.published && !e.deleted).map(e=>entryPost(e,locale)));
}

export async function getCollection(section:Section) { return (await publicEntries()).filter(e=>e.section===section && e.published && !e.deleted).sort((a,b)=>Date.parse(b.publishedAt||b.createdAt||'1970-01-01')-Date.parse(a.publishedAt||a.createdAt||'1970-01-01') || Date.parse(b.createdAt||'1970-01-01')-Date.parse(a.createdAt||'1970-01-01')); }
