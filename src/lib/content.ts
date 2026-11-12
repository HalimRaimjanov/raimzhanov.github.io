import { getYouTubeId } from '@/app/utils/youtube';
export type Locale = 'ru' | 'en' | 'ky';
export type Section = 'blog' | 'work';
export type Translation = { title: string; summary: string; content: string };
export type Team = { name: string; role: string; avatar: string; linkedIn: string };
export type Entry = { slug: string; section: Section; kind?: 'article'|'video'|'project'; format?: 'text'|'markdown'; publishedAt: string; published: boolean; deleted?: boolean; image: string; images?: string[]; team?: Team[]; link: string; tag: string; youtubeUrl?: string; sourceUrl?: string; translations: Record<Locale, Translation>; updatedAt: string; createdAt?: string };
export type Post = { slug: string; content: string; managed?: boolean; format?: 'text'|'markdown'; kind?: string; youtubeUrl?: string; sourceUrl?: string; metadata: { title: string; summary: string; publishedAt: string; image?: string; images: string[]; tag?: string; createdAt?: string; link?: string; team: Team[] } };
export const blankEntry = (section: Section): Entry => ({ slug:'',section,kind:section==='work'?'project':'article',format:'markdown',publishedAt:new Date().toISOString().slice(0,10),published:false,image:'',images:[],link:'',tag:'',youtubeUrl:'',sourceUrl:'',translations:{ru:{title:'',summary:'',content:''},en:{title:'',summary:'',content:''},ky:{title:'',summary:'',content:''}},updatedAt:'' });
function text(value: unknown, max: number) { if (typeof value !== 'string' || value.length > max) throw new Error('Проверьте длину и формат полей'); return value.trim(); }
function url(value: unknown, image=false) {
 const s=text(value,image?1400000:2000); if(!s) return s;
 if(image && /^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(s)) return s;
 if(image && /^\/(?!\/)[^\\\s]*$/.test(s)) return s;
 try { if(new URL(s).protocol==='https:') return s; } catch {}
 throw new Error('Используйте ссылку https:// или загрузите изображение');
}
export function validateEntry(value: unknown): Entry {
 if(!value || typeof value!=='object') throw new Error('Некорректная публикация');
 const v=value as Entry;
 if(!['blog','work'].includes(v.section)) throw new Error('Неизвестный раздел');
 const slug=text(v.slug,100); if(slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Некорректный адрес');
 const date=text(v.publishedAt,10);
 if(date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0,10)!==date)) throw new Error('Укажите правильную дату');
 if(!date && !slug) throw new Error('Укажите дату новой публикации');
 const translations={} as Record<Locale,Translation>;
 for(const lang of ['ru','en','ky'] as const) { const t=v.translations?.[lang]; translations[lang]={title:text(t?.title,200),summary:text(t?.summary,1500),content:text(t?.content,100000)}; }
 const kind=v.section==='work'?'project':v.kind==='video'?'video':'article';
 if(!translations.ru.title || (kind!=='video' && !translations.ru.content)) throw new Error('Заполните название и текст на русском');
 if(typeof v.published!=='boolean') throw new Error('Укажите статус');
 const youtubeUrl=url(v.youtubeUrl ?? ''); if(kind==='video' && !getYouTubeId(youtubeUrl)) throw new Error('Укажите ссылку на видео YouTube');
 if(v.images && (!Array.isArray(v.images) || v.images.length>12)) throw new Error('Не больше 12 изображений');
 return {slug,section:v.section,kind,format:v.format==='text'?'text':'markdown',publishedAt:date,published:v.published,image:url(v.image,true),images:(v.images ?? []).map(s=>url(s,true)),link:url(v.link),tag:text(v.tag,80),youtubeUrl,sourceUrl:url(v.sourceUrl ?? ''),translations,updatedAt:new Date().toISOString()};
}
export function entryPost(entry: Entry,locale: Locale): Post {
 const ru=entry.translations.ru,t=entry.translations[locale];
 return {slug:entry.slug,managed:true,format:entry.format ?? 'text',kind:entry.kind,youtubeUrl:entry.youtubeUrl,sourceUrl:entry.sourceUrl,content:t.content || ru.content,metadata:{title:t.title || ru.title,summary:t.summary || ru.summary,publishedAt:entry.publishedAt,createdAt:entry.createdAt,image:entry.image,images:entry.images?.length?entry.images:entry.image?[entry.image]:[],link:entry.link,tag:entry.tag,team:entry.team ?? []}};
}
export function entryTime(e: Entry) { return Date.parse(e.publishedAt || e.createdAt || '1970-01-01'); }
export function sortPosts(posts: Post[]) { return [...posts].sort((a,b)=>Date.parse(b.metadata.publishedAt || b.metadata.createdAt || '1970-01-01')-Date.parse(a.metadata.publishedAt || a.metadata.createdAt || '1970-01-01') || Date.parse(b.metadata.createdAt || '1970-01-01')-Date.parse(a.metadata.createdAt || '1970-01-01') || a.slug.localeCompare(b.slug)); }
