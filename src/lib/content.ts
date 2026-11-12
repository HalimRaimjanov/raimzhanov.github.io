export type Locale = 'ru' | 'en' | 'ky';
export type Section = 'blog' | 'work';
export type Translation = { title: string; summary: string; content: string };
export type Entry = { slug: string; section: Section; publishedAt: string; published: boolean; image: string; link: string; tag: string; translations: Record<Locale, Translation>; updatedAt: string; createdAt?: string };
export type Post = { slug: string; content: string; managed?: boolean; metadata: { title: string; summary: string; publishedAt: string; image?: string; images: string[]; tag?: string; createdAt?: string; link?: string; team: { name: string; role: string; avatar: string; linkedIn: string }[] } };
export const blankEntry = (section: Section): Entry => ({ slug: '', section, publishedAt: new Date().toISOString().slice(0, 10), published: false, image: '', link: '', tag: '', translations: { ru: { title: '', summary: '', content: '' }, en: { title: '', summary: '', content: '' }, ky: { title: '', summary: '', content: '' } }, updatedAt: '' });
function text(value: unknown, max: number) { if (typeof value !== 'string' || value.length > max) throw new Error('Проверьте длину и формат полей'); return value.trim(); }
function url(value: unknown, image = false) {
 const s = text(value, image ? 1400000 : 2000);
 if (!s) return s;
 if (image && /^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(s)) return s;
 if (image && /^\/(?!\/)[^\\\s]*$/.test(s)) return s;
 try { if (new URL(s).protocol === 'https:') return s; } catch {}
 throw new Error('Используйте ссылку https:// или загрузите изображение');
}
export function validateEntry(value: unknown): Entry {
 if (!value || typeof value !== 'object') throw new Error('Некорректная публикация');
 const v = value as Entry;
 if (!['blog', 'work'].includes(v.section)) throw new Error('Неизвестный раздел');
 const slug = text(v.slug, 100);
 if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Некорректный адрес');
 const date = text(v.publishedAt, 10);
 if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0,10) !== date) throw new Error('Укажите правильную дату');
 const translations = {} as Record<Locale, Translation>;
 for (const lang of ['ru', 'en', 'ky'] as const) {
  const t = v.translations?.[lang];
  translations[lang] = { title: text(t?.title, 200), summary: text(t?.summary, 1500), content: text(t?.content, 100000) };
 }
 if (!translations.ru.title || !translations.ru.content) throw new Error('Заполните название и текст на русском');
 if (typeof v.published !== 'boolean') throw new Error('Укажите статус');
 return { slug, section: v.section, publishedAt: date, published: v.published, image: url(v.image, true), link: url(v.link), tag: text(v.tag, 80), translations, updatedAt: new Date().toISOString(), createdAt: typeof v.createdAt === 'string' && Number.isFinite(Date.parse(v.createdAt)) ? new Date(v.createdAt).toISOString() : undefined };
}
export function entryPost(entry: Entry, locale: Locale): Post {
 const ru = entry.translations.ru, t = entry.translations[locale];
 return { slug: entry.slug, managed: true, content: t.content || ru.content, metadata: { title: t.title || ru.title, summary: t.summary || ru.summary, publishedAt: entry.publishedAt, createdAt: entry.createdAt, image: entry.image, images: entry.image ? [entry.image] : [], link: entry.link, tag: entry.tag, team: [] } };
}
export function sortPosts(posts: Post[]) { return [...posts].sort((a,b) => Date.parse(b.metadata.publishedAt) - Date.parse(a.metadata.publishedAt) || Date.parse(b.metadata.createdAt || b.metadata.publishedAt) - Date.parse(a.metadata.createdAt || a.metadata.publishedAt) || a.slug.localeCompare(b.slug)); }
