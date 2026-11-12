'use client';
import { FormEvent, useEffect, useState } from 'react';
import { blankEntry, Entry, Locale, Section } from '@/lib/content';
import { ManagedContent } from '@/components/ManagedContent';
import styles from '@/components/dreams/Dreams.module.scss';

export function ContentAdmin({ section }: { section: Section }) {
 const [auth, setAuth] = useState(false), [loading, setLoading] = useState(true), [busy, setBusy] = useState(false);
 const [password, setPassword] = useState(''), [message, setMessage] = useState('');
 const [entries, setEntries] = useState<Entry[]>([]), [entry, setEntry] = useState<Entry>(() => blankEntry(section));
 const [dirty, setDirty] = useState(false), [locale, setLocale] = useState<Locale>('ru');
 async function load() {
  const r = await fetch('/api/content', { cache: 'no-store' }); const data = await r.json();
  if (!r.ok) throw new Error(data.error); setEntries(data);
 }
 useEffect(() => { let active = true; (async () => {
  try { const r = await fetch('/api/dreams/session', { cache: 'no-store' }); const data = await r.json(); if (!active) return;
   setAuth(data.authenticated); if (data.authenticated) await load();
   if (!data.configured) setMessage('Подключите базу Upstash и пароль по инструкции DREAMS.md. Используются те же настройки, что и для мечты.');
  } catch { if (active) setMessage('Не удалось загрузить кабинет. Обновите страницу.'); }
  finally { if (active) setLoading(false); }
 })(); return () => { active = false; }; }, []);
 useEffect(() => { const warn = (e: BeforeUnloadEvent) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } }; window.addEventListener('beforeunload', warn); return () => window.removeEventListener('beforeunload', warn); }, [dirty]);
 async function login(e: FormEvent) {
  e.preventDefault(); setBusy(true); setMessage('');
  try { const r = await fetch('/api/dreams/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) }); const data = await r.json(); if (!r.ok) throw new Error(data.error); setPassword(''); setAuth(true); await load(); }
  catch(e) { setMessage(e instanceof Error ? e.message : 'Не удалось войти'); } finally { setBusy(false); }
 }
 function change<K extends keyof Entry>(key: K, value: Entry[K]) { setEntry(old => ({ ...old, [key]: value })); setDirty(true); }
 function translate(key: 'title' | 'summary' | 'content', value: string) { setEntry(old => ({ ...old, translations: { ...old.translations, [locale]: { ...old.translations[locale], [key]: value } } })); setDirty(true); }
 function select(value: Entry) {
  if (dirty && !window.confirm('В форме есть несохранённые изменения. Отменить их?')) return;
  setEntry(value); setDirty(false); setLocale('ru'); setMessage('');
 }
 async function upload(file?: File) {
  if (!file) return;
  if (!['image/png','image/jpeg','image/webp','image/gif'].includes(file.type) || file.size > 1000000) { setMessage('Выберите PNG, JPEG, WebP или GIF до 1 МБ.'); return; }
  setBusy(true);
  try { const image = await new Promise<string>((resolve,reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(file); }); change('image', image); }
  catch { setMessage('Не удалось прочитать изображение'); } finally { setBusy(false); }
 }
 async function save(e: FormEvent) {
  e.preventDefault(); setBusy(true); setMessage('');
  try { const r = await fetch('/api/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entry) }); const data = await r.json();
   if (r.status === 401) setAuth(false); if (!r.ok) throw new Error(data.error);
   setEntry(data); setDirty(false); setEntries(old => [data, ...old.filter(e => e.slug !== data.slug)]);
   setMessage(data.published ? 'Опубликовано. Материал доступен на сайте, новый деплой не нужен.' : 'Черновик сохранён. Посетители его не видят.');
  } catch(e) { setMessage(e instanceof Error ? e.message : 'Не удалось сохранить'); } finally { setBusy(false); }
 }
 const list = entries.filter(e => e.section === section).sort((a,b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt) || Date.parse(b.createdAt || b.publishedAt) - Date.parse(a.createdAt || a.publishedAt) || a.slug.localeCompare(b.slug));
 const t = entry.translations[locale];
 if (loading) return <div className={styles.admin}>Загрузка…</div>;
 return <div className={styles.admin} lang="ru">
  <span className={styles.eyebrow}>ЛИЧНЫЙ КАБИНЕТ</span>
  <nav className={styles.actions} aria-label="Разделы кабинета"><a href="/admin/blog" aria-current={section === 'blog' ? 'page' : undefined}>Блог</a><a href="/admin/work" aria-current={section === 'work' ? 'page' : undefined}>Проекты</a><a href="/admin/dreams">Мечта</a></nav>
  <h1>{section === 'blog' ? 'Управление блогом' : 'Управление проектами'}</h1>
  <p>Материалы идут по дате: новые сверху. На главной автоматически показываются две последние публикации блога.</p>
  {message && <div role="status" className={styles.message}>{message}</div>}
  {!auth ? <form onSubmit={login}><label>Пароль администратора<input type="password" required autoComplete="current-password" maxLength={512} value={password} onChange={e => setPassword(e.target.value)} /></label><button className={styles.button} disabled={busy}>{busy ? 'Вход…' : 'Войти'}</button></form> : <>
   <div className={styles.actions} style={{ marginBottom: 24 }}><button type="button" className={styles.button} disabled={busy} onClick={() => select(blankEntry(section))}>{section === 'blog' ? '+ Новая публикация' : '+ Новый проект'}</button><a href={`/${section}`} target="_blank" rel="noreferrer">Открыть раздел ↗</a><button disabled={busy} onClick={async () => { if (dirty && !window.confirm('Выйти без сохранения изменений?')) return; try { const r = await fetch('/api/dreams/session', { method: 'DELETE' }); if (!r.ok) throw 0; setDirty(false); setAuth(false); } catch { setMessage('Не удалось выйти'); } }}>Выйти</button></div>
   <details style={{ marginBottom: 24 }} open><summary>Материалы из админки ({list.length})</summary>
    {list.length === 0 && <p>Здесь появятся ваши новые материалы. Прежние статьи и проекты из файлов сайта сохраняются.</p>}
    <ul style={{ paddingLeft: 20 }}>{list.map(item => <li key={item.slug} style={{ margin: '16px 0' }}><button type="button" disabled={busy} onClick={() => select(item)} style={{ textAlign: 'left', cursor: 'pointer', color: 'inherit', background: 'transparent', border: 0, textDecoration: 'underline' }}>{item.translations.ru.title}</button> <small>{item.publishedAt} · {item.published ? 'Опубликовано' : 'Черновик'}</small></li>)}</ul>
   </details>
   <h2>{entry.slug ? 'Редактирование' : section === 'blog' ? 'Новая публикация' : 'Новый проект'}</h2>
   <form onSubmit={save}>
    <fieldset disabled={busy} style={{ display: 'grid', gap: 20 }}>
     <legend>Публикация</legend>
     <div className={styles.row}><label>Дата публикации<input type="date" required value={entry.publishedAt} onChange={e => change('publishedAt', e.target.value)} /><small>Определяет место в списке. Это не отложенная публикация.</small></label><label>Статус<select value={entry.published ? 'published' : 'draft'} onChange={e => change('published', e.target.value === 'published')}><option value="draft">Черновик — скрыт на сайте</option><option value="published">Опубликовано — видно всем</option></select></label></div>
     <label>Язык текста<select value={locale} onChange={e => setLocale(e.target.value as Locale)}><option value="ru">RU · Русский</option><option value="en">ENG · English</option><option value="ky">KG · Кыргызча</option></select><small>Русский обязателен. Если перевод не заполнен, посетитель увидит русский текст.</small></label>
     <label>Название · {locale.toUpperCase()}<input required={locale === 'ru'} maxLength={200} value={t.title} onChange={e => translate('title', e.target.value)} /></label>
     <label>Краткое описание · {locale.toUpperCase()}<textarea maxLength={1500} value={t.summary} onChange={e => translate('summary', e.target.value)} /></label>
     <label>Текст · {locale.toUpperCase()}<textarea required={locale === 'ru'} maxLength={100000} rows={12} value={t.content} onChange={e => translate('content', e.target.value)} /><small>Пишите обычным текстом. Пустая строка отделяет абзацы.</small></label>
     <div className={styles.row}><label>Тема / категория<input maxLength={80} value={entry.tag} onChange={e => change('tag', e.target.value)} /></label>{section === 'work' && <label>Ссылка на проект<input type="url" placeholder="https://…" maxLength={2000} value={entry.link} onChange={e => change('link', e.target.value)} /></label>}</div>
     <label>Обложка<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={e => upload(e.target.files?.[0])} /><small>До 1 МБ. Изображение сохраняется вместе с публикацией.</small></label>
     {entry.image && <><img src={entry.image} alt="Обложка публикации" style={{ maxWidth: '100%', maxHeight: 240, objectFit: 'contain', borderRadius: 12 }} /><button type="button" onClick={() => change('image', '')}>Убрать обложку</button></>}
    </fieldset>
    <div className={styles.actions}><button className={styles.button} disabled={busy}>{busy ? 'Сохраняю…' : entry.published ? 'Сохранить и опубликовать' : 'Сохранить черновик'}</button>{entry.slug && entry.published && <a href={`/${section}/${entry.slug}`} target="_blank" rel="noreferrer">Открыть материал ↗</a>}{dirty && <small>Есть несохранённые изменения</small>}</div>
   </form>
   <h2 style={{ marginTop: 40 }}>Предпросмотр текста</h2><h3>{t.title || entry.translations.ru.title}</h3><p>{t.summary || entry.translations.ru.summary}</p><ManagedContent content={t.content || entry.translations.ru.content} />
  </>}
 </div>;
}
