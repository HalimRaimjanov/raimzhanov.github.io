'use client';
import messages from '@/locales/en/messages.json';
const translateError = (message: string) => (messages as Record<string, string>)[message] ?? message;
import { FormEvent, useEffect, useState } from 'react';
import { Dream, emptyDream, convertDreamAmount } from '@/lib/dream';
import { DreamView } from './DreamView';
import styles from './Dreams.module.scss';
export function DreamAdmin() {
  const [auth, setAuth] = useState(false), [loading, setLoading] = useState(true), [busy, setBusy] = useState(false);
  const [password, setPassword] = useState(''), [message, setMessage] = useState(''), [dream, setDream] = useState<Dream>(emptyDream);
  async function load() { const r = await fetch('/api/dreams', { cache: 'no-store' }); const data = await r.json(); if (!r.ok) throw new Error(translateError(data.error)); setDream(data); }
  useEffect(() => { (async () => { try { const r = await fetch('/api/dreams/session'); const state = await r.json(); setAuth(state.authenticated); if (state.authenticated) await load(); if (!state.configured) setMessage('The admin panel is ready. Connect storage and set a password using DREAMS.md to activate it.'); } catch { setMessage('Unable to load data. Refresh the page.'); } finally { setLoading(false); } })(); }, []);
  async function login(e: FormEvent) { e.preventDefault(); setBusy(true); setMessage(''); try { const r = await fetch('/api/dreams/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) }); const data = await r.json(); if (!r.ok) throw new Error(translateError(data.error)); setPassword(''); setAuth(true); await load(); } catch (e) { setMessage(e instanceof Error ? e.message : 'Sign-in error'); } finally { setBusy(false); } }
  async function save(e: FormEvent) { e.preventDefault(); setBusy(true); setMessage(''); try { const r = await fetch('/api/dreams', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dream) }); const data = await r.json(); if (r.status === 401) setAuth(false); if (!r.ok) throw new Error(translateError(data.error)); setDream(data); setMessage('Saved. Your changes are now visible on the Dreams page.'); } catch (e) { setMessage(e instanceof Error ? e.message : 'Unable to save'); } finally { setBusy(false); } }
  async function upload(file: File | undefined, key: 'image' | 'qr') {
    if (!file) return; setMessage('');
    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type) || file.size > 1000000) { setMessage('Choose a PNG, JPEG, WebP or GIF up to 1 MB.'); return; }
    try { const value = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(file); }); setDream(d => ({ ...d, [key]: value })); } catch { setMessage('Unable to read the image'); }
  }
  function changeCurrency(currency: string) {
    if (currency === dream.currency) return;
    const saved = convertDreamAmount(dream.saved, dream.currency, currency, dream.exchangeRate);
    const target = convertDreamAmount(dream.target, dream.currency, currency, dream.exchangeRate);
    if (saved === null || target === null) { setMessage('Enter the exchange rate first to convert your saved amounts correctly.'); return; }
    setDream(d => ({ ...d, currency, saved, target }));
  }
  const field = (key: keyof Dream, value: string | number) => setDream(d => ({ ...d, [key]: value }));
  if (loading) return <div className={styles.admin}>Loading…</div>;
  return <div className={styles.admin} lang="en"><span className={styles.eyebrow}>OWNER DASHBOARD</span><nav className={styles.actions}><a href="/admin/blog">Blog</a><a href="/admin/work">Projects</a><a href="/admin/dreams" aria-current="page">Dream</a></nav><h1>Manage my dream</h1><p>Update your savings and presentation. Saved changes will be visible to everyone.</p>
    {message && <div className={styles.message} role="status">{message}</div>}
    {!auth ? <form onSubmit={login}><label>Admin password<input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} maxLength={512} /></label><button disabled={busy} className={styles.button}>{busy ? 'Signing in…' : 'Sign in'}</button></form> : <><form onSubmit={save}>
      <label>Dream title<input required maxLength={100} value={dream.title} onChange={e => field('title', e.target.value)} /></label>
      <label>Why this is my dream<textarea maxLength={1000} value={dream.description} onChange={e => field('description', e.target.value)} /></label>
      <fieldset><legend>Title and description translations</legend><div className={styles.row}><label>Title · ENG<input maxLength={100} value={dream.titleEn ?? ""} onChange={e => field("titleEn", e.target.value)} /></label><label>Description · ENG<textarea maxLength={1000} value={dream.descriptionEn ?? ""} onChange={e => field("descriptionEn", e.target.value)} /></label><label>Title · KG<input maxLength={100} value={dream.titleKy ?? ""} onChange={e => field("titleKy", e.target.value)} /></label><label>Description · KG<textarea maxLength={1000} value={dream.descriptionKy ?? ""} onChange={e => field("descriptionKy", e.target.value)} /></label></div></fieldset>
      <div className={styles.row}><label>Saved so far ({dream.currency === 'KGS' ? 'KGS' : dream.currency})<input type="number" min="0" max="1000000000000" step="any" required value={dream.saved} onChange={e => field('saved', e.target.valueAsNumber)} /></label><label>Dream price ({dream.currency === 'KGS' ? 'KGS' : dream.currency})<input type="number" min="0" max="1000000000000" step="any" required value={dream.target} onChange={e => field('target', e.target.valueAsNumber)} /><small>0 means the price is not yet decided.</small></label></div>
      <div className={styles.row}>
        <label>Exchange rate: KGS per 1 USD<input type="number" min="0.0001" max="1000000" step="0.0001" required value={dream.exchangeRate ?? ''} onChange={e => setDream(d => ({ ...d, exchangeRate: e.target.value === '' ? null : e.target.valueAsNumber }))} placeholder="Enter your exchange rate" /><small>Both amounts use this exchange rate. You update the rate manually.</small></label>
        <label>Currency for entering amounts<select value={dream.currency} onChange={e => changeCurrency(e.target.value)}><option value="KGS">Kyrgyz som</option><option value="USD">US dollar</option>{!['KGS', 'USD'].includes(dream.currency) && <option value={dream.currency}>{dream.currency} — previously saved currency</option>}</select><small>Switching currencies converts the entered amounts automatically. Changing the rate keeps amounts in the selected currency unchanged.</small></label>
      </div>
      <div className={styles.row}><label>Dream photo or GIF<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={e => upload(e.target.files?.[0], 'image')} /><small>Up to 1 MB. GIF keeps its animation.</small><button type="button" onClick={() => field('image', '')}>Remove photo</button></label><label>QR code from your banking app<input type="file" accept="image/png,image/jpeg,image/webp" onChange={e => upload(e.target.files?.[0], 'qr')} /><small>Upload your real QR code for receiving transfers.</small><button type="button" onClick={() => field('qr', '')}>Remove QR code</button></label></div>
      <label>Payment link (optional)<input type="url" placeholder="https://…" maxLength={2000} value={dream.donationUrl} onChange={e => field('donationUrl', e.target.value)} /></label>
      <div className={styles.actions}><button className={styles.button} disabled={busy}>{busy ? 'Saving…' : 'Save changes'}</button><a href="/dreams" target="_blank" rel="noreferrer">View page ↗</a><button type="button" disabled={busy} onClick={async () => { try { const r = await fetch('/api/dreams/session', { method: 'DELETE' }); if (!r.ok) throw 0; setAuth(false); setMessage('You have signed out'); } catch { setMessage('Unable to sign out. Please try again.'); } }}>Sign out</button></div>
    </form><h2 style={{ marginTop: 40 }}>Preview</h2><small>Shows your changes before saving.</small><DreamView initial={dream} /></>}
  </div>;
}
