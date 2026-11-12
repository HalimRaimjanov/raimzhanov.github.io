'use client';
import { DreamFields } from './DreamFields';
import { FormEvent, useEffect, useState } from 'react';
import { blankEntry, Entry, Locale, Section, entryTime } from '@/lib/content';
import { ManagedContent } from '@/components/ManagedContent';
import styles from './Admin.module.scss';

export function ContentAdmin({ section }: { section: Section }) {
 const title = section==='blog'?'Блог':section==='work'?'Проекты':section==='dreams'?'Мечты':'Галерея';
 const newLabel=section==='blog'?'Новая публикация':section==='work'?'Новый проект':section==='dreams'?'Новая мечта':'Новая фотография';
 const publicHref=(item:Entry)=>item.section==='dreams'?'/dreams':item.section==='gallery'?'/gallery':`/${item.section}/${item.slug}`;
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
  setEntry(value); setDirty(false); setLocale('ru'); setMessage(''); document.getElementById('publication-editor')?.scrollIntoView({behavior:'smooth',block:'start'});
 }
 async function upload(file?: File) {
  if (!file) return;
  if (!['image/png','image/jpeg','image/webp','image/gif'].includes(file.type) || file.size > 1000000) { setMessage('Выберите PNG, JPEG, WebP или GIF до 1 МБ.'); return; }
  setBusy(true);
  try { const image = await new Promise<string>((resolve,reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(file); }); setEntry(old=>({...old,image,images:section==='work'?[image,...(old.images || []).filter(src=>src!==old.image)]:old.images})); setDirty(true); }
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
 const list = entries.filter(e => e.section === section && !e.deleted).sort((a,b) => entryTime(b)-entryTime(a) || Date.parse(b.createdAt || '1970-01-01')-Date.parse(a.createdAt || '1970-01-01'));
 async function action(item:Entry, action:'hide'|'show'|'delete') {
  if(dirty && !window.confirm('В форме есть несохранённые изменения. Отменить их и выполнить действие?')) return;
  if(action==='delete' && !window.confirm(`Удалить «${item.translations.ru.title}» из сайта и списка публикаций?`)) return;
  setBusy(true); setMessage('');
  try { const r=await fetch('/api/content',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({slug:item.slug,updatedAt:item.updatedAt,action})}); const data=await r.json(); if(r.status===401) setAuth(false); if(!r.ok) throw new Error(data.error);
   setEntries(old=>[data,...old.filter(e=>e.slug!==data.slug)]); setDirty(false); if(entry.slug===item.slug) setEntry(data.deleted?blankEntry(section):data); else if(dirty) setEntry(entries.find(e=>e.slug===entry.slug) || blankEntry(section));
   setMessage(action==='delete'?'Публикация удалена.':action==='hide'?'Публикация скрыта на сайте.':'Публикация снова видна на сайте.');
  } catch(e) { setMessage(e instanceof Error?e.message:'Не удалось сохранить действие'); } finally { setBusy(false); }
 }
 const t = entry.translations[locale];
 if (loading) return <div className={styles.admin}>Загрузка…</div>;
 return <div className={styles.admin} lang="ru">
  <span className={styles.eyebrow}>ЛИЧНЫЙ КАБИНЕТ</span>
  <nav className={styles.nav} aria-label="Разделы кабинета"><a href="/admin/blog" aria-current={section === 'blog' ? 'page' : undefined}>Блог</a><a href="/admin/work" aria-current={section === 'work' ? 'page' : undefined}>Проекты</a><a href="/admin/dreams" aria-current={section==='dreams'?'page':undefined}>Мечты</a><a href="/admin/gallery" aria-current={section==='gallery'?'page':undefined}>Галерея</a></nav>
  <h1>{title}</h1>
  <p>Добавляйте записи, редактируйте их и управляйте видимостью. Изменения появляются на сайте после сохранения.</p>
  {message && <div role="status" className={styles.message}>{message}</div>}
  {!auth ? <form className={styles.panel} onSubmit={login}><label>Пароль администратора<input type="password" required autoComplete="current-password" maxLength={512} value={password} onChange={e => setPassword(e.target.value)} /></label><button className={styles.primary} disabled={busy}>{busy ? 'Вход…' : 'Войти'}</button></form> : <>
   <div className={styles.toolbar}><button type="button" className={styles.primary} disabled={busy} onClick={() => select(blankEntry(section))}>{"+ " + newLabel}</button><a href={`/${section}`} target="_blank" rel="noreferrer">Открыть раздел ↗</a><button disabled={busy} onClick={async () => { if (dirty && !window.confirm('Выйти без сохранения изменений?')) return; try { const r = await fetch('/api/dreams/session', { method: 'DELETE' }); if (!r.ok) throw 0; setDirty(false); setAuth(false); } catch { setMessage('Не удалось выйти'); } }}>Выйти</button></div>
   <section id="publication-editor" className={styles.panel} style={{scrollMarginTop:90}}><h2>{entry.slug ? 'Редактирование' : newLabel}</h2>
   <form className={styles.form} onSubmit={save}>
    <fieldset disabled={busy}>
     <legend>Публикация</legend>
     <div className={styles.row}><label>Дата публикации<input type="date" required={!entry.slug} value={entry.publishedAt} onChange={e => change('publishedAt', e.target.value)} /><small>Новые даты — выше в списке. У перенесённых видео без даты сохранён прежний порядок.</small></label><label>Статус<select value={entry.published ? 'published' : 'draft'} onChange={e => change('published', e.target.value === 'published')}><option value="draft">Черновик — скрыт на сайте</option><option value="published">Опубликовано — видно всем</option></select></label></div>
     {section === 'work' && <label>Тип записи<select value={entry.kind || 'project'} onChange={e=>change('kind',e.target.value as Entry['kind'])}><option value="project">Проект</option><option value="channel">YouTube-канал</option></select></label>}
     {section === 'blog' && <div className={styles.row}><label>Тип публикации<select value={entry.kind || 'article'} onChange={e=>change('kind',e.target.value as Entry['kind'])}><option value="article">Статья</option><option value="video">Видео</option></select></label>{entry.kind === 'video' && <label>Ссылка YouTube<input type="url" required value={entry.youtubeUrl || ''} placeholder="https://youtu.be/…" onChange={e=>change('youtubeUrl',e.target.value)} /></label>}</div>}
     {entry.kind === 'video' && <label>Ссылка на исходную публикацию (необязательно)<input type="url" value={entry.sourceUrl || ''} onChange={e=>change('sourceUrl',e.target.value)} /></label>}
     <label>Язык текста<select value={locale} onChange={e => setLocale(e.target.value as Locale)}><option value="ru">RU · Русский</option><option value="en">ENG · English</option><option value="ky">KG · Кыргызча</option></select><small>Русский обязателен. Если перевод не заполнен, посетитель увидит русский текст.</small></label>
     <label>Название · {locale.toUpperCase()}<input required={locale === 'ru'} maxLength={200} value={t.title} onChange={e => translate('title', e.target.value)} /></label>
     <label>Краткое описание · {locale.toUpperCase()}<textarea maxLength={1500} value={t.summary} onChange={e => translate('summary', e.target.value)} /></label>
     {!['dreams','gallery'].includes(section) && <><label>Формат текста<select value={entry.format || 'text'} onChange={e=>change('format',e.target.value as Entry['format'])}><option value="markdown">Markdown — заголовки, списки и ссылки</option><option value="text">Обычный текст</option></select></label>
     <label>Текст · {locale.toUpperCase()}<textarea required={locale === 'ru' && !['video','channel'].includes(entry.kind || '')} maxLength={100000} rows={12} value={t.content} onChange={e => translate('content', e.target.value)} /><small>Абзацы отделяйте пустой строкой. В Markdown: ## Заголовок, **жирный текст**, - пункт списка.</small></label></>}
     {!['dreams','gallery'].includes(section) && <div className={styles.row}><label>Тема / категория<input maxLength={80} value={entry.tag} onChange={e => change('tag', e.target.value)} /></label>{section === 'work' && <label>Ссылка на проект<input type="url" placeholder="https://…" maxLength={2000} value={entry.link} onChange={e => change('link', e.target.value)} /></label>}</div>}
     {section==='dreams' && entry.dream && <DreamFields value={entry.dream} onChange={d=>change('dream',d)} onError={setMessage}/>}
     <label>{section==='gallery'?'Фотография':section==='dreams'?'Фото мечты':'Обложка'}<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={e => upload(e.target.files?.[0])} /><small>До 1 МБ. Изображение сохраняется вместе с публикацией.</small></label>
     {entry.image && <><img src={entry.image} alt="Обложка публикации" className={styles.cover} /><button type="button" onClick={() => {change('image', ''); if(section==='work') change('images',entry.images?.filter(src=>src!==entry.image));}}>Убрать обложку</button></>}
     {section === 'work' && (entry.images?.length ?? 0) > 0 && <div><h3>Галерея проекта</h3><div className={styles.gallery}>{entry.images?.map((src,i)=><div key={i}>{src.endsWith('.mp4')?<video src={src} controls aria-label={`Видео ${i+1}`} />:<img src={src} alt={`Изображение ${i+1}`} />}<button type="button" onClick={()=>{change('images',entry.images?.filter((_,index)=>index!==i));if(src===entry.image)change('image','');}}>Убрать {i+1}</button></div>)}</div><small>Существующие изображения сохраняются при редактировании текста.</small></div>}
    </fieldset>
    <div className={styles.actions}><button className={styles.primary} disabled={busy}>{busy ? 'Сохраняю…' : entry.published ? 'Сохранить и опубликовать' : 'Сохранить черновик'}</button>{entry.slug && entry.published && <a href={publicHref(entry)} target="_blank" rel="noreferrer">Открыть материал ↗</a>}{dirty && <small>Есть несохранённые изменения</small>}</div>
   </form>
   <details style={{marginTop:24}}><summary>Предпросмотр текста</summary><h3>{t.title || entry.translations.ru.title}</h3><p>{t.summary || entry.translations.ru.summary}</p><ManagedContent content={t.content || entry.translations.ru.content} format={entry.format} /></details></section>
   <section className={styles.panel} aria-label="Все публикации"><div className={styles.toolbar}><h2 style={{margin:0}}>Все публикации · {list.length}</h2><button disabled={busy} type="button" onClick={async()=>{setBusy(true);try{await load();setMessage('Список обновлён.');}catch(e){setMessage(e instanceof Error?e.message:'Не удалось обновить');}finally{setBusy(false);}}}>Обновить список</button></div>
   <small>Все записи этого раздела доступны для редактирования. На телефоне таблицу можно прокрутить по горизонтали.</small>
   <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Таблица публикаций"><table className={styles.table}><thead><tr><th scope="col">Публикация</th><th scope="col">Дата</th><th scope="col">Статус</th><th scope="col">Действия</th></tr></thead><tbody>{list.map(item=><tr key={item.slug}>
    <td>{item.image && <img src={item.image} alt="" className={styles.thumb}/>}<strong>{item.translations.ru.title}</strong><small>{item.kind==='video'?'Видео':item.kind==='channel'?'Канал':item.section==='dreams'?'Мечта':item.section==='gallery'?'Фото':item.section==='work'?'Проект':'Статья'} · {item.translations.ru.summary.slice(0,100)}</small></td>
    <td>{item.publishedAt || 'Не указана'}{!item.publishedAt && <small>Прежний порядок</small>}</td><td><span className={styles.badge}>{item.published?'Опубликовано':'Скрыто'}</span></td>
    <td><div className={styles.actions}><button type="button" disabled={busy} onClick={()=>select(item)}>Редактировать</button><button type="button" disabled={busy} onClick={()=>action(item,item.published?'hide':'show')}>{item.published?'Скрыть':'Показать'}</button><button type="button" className={styles.danger} disabled={busy} onClick={()=>action(item,'delete')}>Удалить</button>{item.published && <a href={publicHref(item)} target="_blank" rel="noreferrer">Открыть ↗</a>}</div></td>
   </tr>)}</tbody></table></div>{list.length===0 && <p>Публикаций пока нет.</p>}</section>
  </>}
 </div>;
}
