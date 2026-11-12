'use client';
import { FormEvent, useEffect, useState } from 'react';
import { Dream, emptyDream, convertDreamAmount } from '@/lib/dream';
import { DreamView } from './DreamView';
import styles from './Dreams.module.scss';
export function DreamAdmin() {
  const [auth, setAuth] = useState(false), [loading, setLoading] = useState(true), [busy, setBusy] = useState(false);
  const [password, setPassword] = useState(''), [message, setMessage] = useState(''), [dream, setDream] = useState<Dream>(emptyDream);
  async function load() { const r = await fetch('/api/dreams', { cache: 'no-store' }); const data = await r.json(); if (!r.ok) throw new Error(data.error); setDream(data); }
  useEffect(() => { (async () => { try { const r = await fetch('/api/dreams/session'); const state = await r.json(); setAuth(state.authenticated); if (state.authenticated) await load(); if (!state.configured) setMessage('Админка готова. Для её запуска нужно подключить хранилище и задать пароль: инструкция в DREAMS.md.'); } catch { setMessage('Не удалось загрузить данные. Обновите страницу.'); } finally { setLoading(false); } })(); }, []);
  async function login(e: FormEvent) { e.preventDefault(); setBusy(true); setMessage(''); try { const r = await fetch('/api/dreams/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) }); const data = await r.json(); if (!r.ok) throw new Error(data.error); setPassword(''); setAuth(true); await load(); } catch (e) { setMessage(e instanceof Error ? e.message : 'Ошибка входа'); } finally { setBusy(false); } }
  async function save(e: FormEvent) { e.preventDefault(); setBusy(true); setMessage(''); try { const r = await fetch('/api/dreams', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dream) }); const data = await r.json(); if (r.status === 401) setAuth(false); if (!r.ok) throw new Error(data.error); setDream(data); setMessage('Сохранено. Изменения уже доступны на странице «Мечты».'); } catch (e) { setMessage(e instanceof Error ? e.message : 'Не удалось сохранить'); } finally { setBusy(false); } }
  async function upload(file: File | undefined, key: 'image' | 'qr') {
    if (!file) return; setMessage('');
    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type) || file.size > 1000000) { setMessage('Выберите PNG, JPEG, WebP или GIF размером до 1 МБ.'); return; }
    try { const value = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(file); }); setDream(d => ({ ...d, [key]: value })); } catch { setMessage('Не удалось прочитать изображение'); }
  }
  function changeCurrency(currency: string) {
    if (currency === dream.currency) return;
    const saved = convertDreamAmount(dream.saved, dream.currency, currency, dream.exchangeRate);
    const target = convertDreamAmount(dream.target, dream.currency, currency, dream.exchangeRate);
    if (saved === null || target === null) { setMessage('Сначала укажите курс, чтобы пересчитать сохранённые суммы без потерь.'); return; }
    setDream(d => ({ ...d, currency, saved, target }));
  }
  const field = (key: keyof Dream, value: string | number) => setDream(d => ({ ...d, [key]: value }));
  if (loading) return <div className={styles.admin}>Загрузка…</div>;
  return <div className={styles.admin} lang="ru"><span className={styles.eyebrow}>ЛИЧНЫЙ КАБИНЕТ</span><h1>Управление мечтой</h1><p>Меняйте сумму и оформление. После сохранения изменения увидят все посетители.</p>
    {message && <div className={styles.message} role="status">{message}</div>}
    {!auth ? <form onSubmit={login}><label>Пароль администратора<input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} maxLength={512} /></label><button disabled={busy} className={styles.button}>{busy ? 'Вход…' : 'Войти'}</button></form> : <><form onSubmit={save}>
      <label>Название мечты<input required maxLength={100} value={dream.title} onChange={e => field('title', e.target.value)} /></label>
      <label>Почему это моя мечта<textarea maxLength={1000} value={dream.description} onChange={e => field('description', e.target.value)} /></label>
      <fieldset><legend>Переводы названия и описания</legend><div className={styles.row}><label>Название · ENG<input maxLength={100} value={dream.titleEn ?? ""} onChange={e => field("titleEn", e.target.value)} /></label><label>Описание · ENG<textarea maxLength={1000} value={dream.descriptionEn ?? ""} onChange={e => field("descriptionEn", e.target.value)} /></label><label>Название · KG<input maxLength={100} value={dream.titleKy ?? ""} onChange={e => field("titleKy", e.target.value)} /></label><label>Описание · KG<textarea maxLength={1000} value={dream.descriptionKy ?? ""} onChange={e => field("descriptionKy", e.target.value)} /></label></div></fieldset>
      <div className={styles.row}><label>Уже накоплено ({dream.currency === 'KGS' ? 'сом' : dream.currency})<input type="number" min="0" max="1000000000000" step="any" required value={dream.saved} onChange={e => field('saved', e.target.valueAsNumber)} /></label><label>Стоимость мечты ({dream.currency === 'KGS' ? 'сом' : dream.currency})<input type="number" min="0" max="1000000000000" step="any" required value={dream.target} onChange={e => field('target', e.target.valueAsNumber)} /><small>0 — пока не определились с ценой.</small></label></div>
      <div className={styles.row}>
        <label>Курс: сколько сомов за 1 доллар<input type="number" min="0.0001" max="1000000" step="0.0001" required value={dream.exchangeRate ?? ''} onChange={e => setDream(d => ({ ...d, exchangeRate: e.target.value === '' ? null : e.target.valueAsNumber }))} placeholder="Укажите свой курс" /><small>Обе суммы на сайте пересчитываются по этому курсу. Курс обновляете вы.</small></label>
        <label>Валюта ввода сумм<select value={dream.currency} onChange={e => changeCurrency(e.target.value)}><option value="KGS">Кыргызский сом</option><option value="USD">Доллар США</option>{!['KGS', 'USD'].includes(dream.currency) && <option value={dream.currency}>{dream.currency} — ранее сохранённая валюта</option>}</select><small>При смене валюты введённые суммы автоматически пересчитаются. Изменение курса сохраняет суммы в выбранной валюте.</small></label>
      </div>
      <div className={styles.row}><label>Фото или GIF мечты<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={e => upload(e.target.files?.[0], 'image')} /><small>До 1 МБ. GIF сохраняет анимацию.</small><button type="button" onClick={() => field('image', '')}>Убрать фото</button></label><label>QR-код из банковского приложения<input type="file" accept="image/png,image/jpeg,image/webp" onChange={e => upload(e.target.files?.[0], 'qr')} /><small>Загрузите настоящий QR-код для получения переводов.</small><button type="button" onClick={() => field('qr', '')}>Убрать QR-код</button></label></div>
      <label>Ссылка на перевод (необязательно)<input type="url" placeholder="https://…" maxLength={2000} value={dream.donationUrl} onChange={e => field('donationUrl', e.target.value)} /></label>
      <div className={styles.actions}><button className={styles.button} disabled={busy}>{busy ? 'Сохраняю…' : 'Сохранить изменения'}</button><a href="/dreams" target="_blank" rel="noreferrer">Открыть страницу ↗</a><button type="button" disabled={busy} onClick={async () => { try { const r = await fetch('/api/dreams/session', { method: 'DELETE' }); if (!r.ok) throw 0; setAuth(false); setMessage('Вы вышли из админки'); } catch { setMessage('Не удалось выйти. Попробуйте снова.'); } }}>Выйти</button></div>
    </form><h2 style={{ marginTop: 40 }}>Предпросмотр</h2><small>Показывает ваши изменения до сохранения.</small><DreamView initial={dream} /></>}
  </div>;
}
