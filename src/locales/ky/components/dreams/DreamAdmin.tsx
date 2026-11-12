'use client';
import messages from '@/locales/ky/messages.json';
const translateError = (message: string) => (messages as Record<string, string>)[message] ?? message;
import { FormEvent, useEffect, useState } from 'react';
import { Dream, emptyDream, convertDreamAmount } from '@/lib/dream';
import { DreamView } from './DreamView';
import styles from './Dreams.module.scss';
export function DreamAdmin() {
  const [auth, setAuth] = useState(false), [loading, setLoading] = useState(true), [busy, setBusy] = useState(false);
  const [password, setPassword] = useState(''), [message, setMessage] = useState(''), [dream, setDream] = useState<Dream>(emptyDream);
  async function load() { const r = await fetch('/api/dreams', { cache: 'no-store' }); const data = await r.json(); if (!r.ok) throw new Error(translateError(data.error)); setDream(data); }
  useEffect(() => { (async () => { try { const r = await fetch('/api/dreams/session'); const state = await r.json(); setAuth(state.authenticated); if (state.authenticated) await load(); if (!state.configured) setMessage('Башкаруу панели даяр. Аны иштетүү үчүн сактагычты туташтырып, сырсөз коюңуз: нускама DREAMS.md файлында.'); } catch { setMessage('Маалыматтар жүктөлгөн жок. Баракты жаңыртыңыз.'); } finally { setLoading(false); } })(); }, []);
  async function login(e: FormEvent) { e.preventDefault(); setBusy(true); setMessage(''); try { const r = await fetch('/api/dreams/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) }); const data = await r.json(); if (!r.ok) throw new Error(translateError(data.error)); setPassword(''); setAuth(true); await load(); } catch (e) { setMessage(e instanceof Error ? e.message : 'Кирүүдө ката кетти'); } finally { setBusy(false); } }
  async function save(e: FormEvent) { e.preventDefault(); setBusy(true); setMessage(''); try { const r = await fetch('/api/dreams', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dream) }); const data = await r.json(); if (r.status === 401) setAuth(false); if (!r.ok) throw new Error(translateError(data.error)); setDream(data); setMessage('Сакталды. Өзгөртүүлөр «Кыялдар» барагында жеткиликтүү.'); } catch (e) { setMessage(e instanceof Error ? e.message : 'Сактоо мүмкүн болгон жок'); } finally { setBusy(false); } }
  async function upload(file: File | undefined, key: 'image' | 'qr') {
    if (!file) return; setMessage('');
    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type) || file.size > 1000000) { setMessage('Көлөмү 1 МБ чейин PNG, JPEG, WebP же GIF тандаңыз.'); return; }
    try { const value = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(file); }); setDream(d => ({ ...d, [key]: value })); } catch { setMessage('Сүрөттү окуу мүмкүн болгон жок'); }
  }
  function changeCurrency(currency: string) {
    if (currency === dream.currency) return;
    const saved = convertDreamAmount(dream.saved, dream.currency, currency, dream.exchangeRate);
    const target = convertDreamAmount(dream.target, dream.currency, currency, dream.exchangeRate);
    if (saved === null || target === null) { setMessage('Сакталган суммаларды туура эсептөө үчүн адегенде курсту көрсөтүңүз.'); return; }
    setDream(d => ({ ...d, currency, saved, target }));
  }
  const field = (key: keyof Dream, value: string | number) => setDream(d => ({ ...d, [key]: value }));
  if (loading) return <div className={styles.admin}>Жүктөлүүдө…</div>;
  return <div className={styles.admin} lang="ky"><span className={styles.eyebrow}>ЖЕКЕ КАБИНЕТ</span><h1>Кыялды башкаруу</h1><p>Сумманы жана жасалгалоону өзгөртүңүз. Сактагандан кийин өзгөртүүлөр бардык конокторго көрүнөт.</p>
    {message && <div className={styles.message} role="status">{message}</div>}
    {!auth ? <form onSubmit={login}><label>Администратордун сырсөзү<input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} maxLength={512} /></label><button disabled={busy} className={styles.button}>{busy ? 'Кирүүдө…' : 'Кирүү'}</button></form> : <><form onSubmit={save}>
      <label>Кыялдын аталышы<input required maxLength={100} value={dream.title} onChange={e => field('title', e.target.value)} /></label>
      <label>Эмне үчүн бул менин кыялым<textarea maxLength={1000} value={dream.description} onChange={e => field('description', e.target.value)} /></label>
      <fieldset><legend>Аталыштын жана сүрөттөмөнүн котормолору</legend><div className={styles.row}><label>Аталышы · ENG<input maxLength={100} value={dream.titleEn ?? ""} onChange={e => field("titleEn", e.target.value)} /></label><label>Сүрөттөмөсү · ENG<textarea maxLength={1000} value={dream.descriptionEn ?? ""} onChange={e => field("descriptionEn", e.target.value)} /></label><label>Аталышы · KG<input maxLength={100} value={dream.titleKy ?? ""} onChange={e => field("titleKy", e.target.value)} /></label><label>Сүрөттөмөсү · KG<textarea maxLength={1000} value={dream.descriptionKy ?? ""} onChange={e => field("descriptionKy", e.target.value)} /></label></div></fieldset>
      <div className={styles.row}><label>Топтолгон каражат ({dream.currency === 'KGS' ? 'сом' : dream.currency})<input type="number" min="0" max="1000000000000" step="any" required value={dream.saved} onChange={e => field('saved', e.target.valueAsNumber)} /></label><label>Кыялдын баасы ({dream.currency === 'KGS' ? 'сом' : dream.currency})<input type="number" min="0" max="1000000000000" step="any" required value={dream.target} onChange={e => field('target', e.target.valueAsNumber)} /><small>0 — баасы азырынча аныктала элек.</small></label></div>
      <div className={styles.row}>
        <label>Курс: 1 доллар канча сом<input type="number" min="0.0001" max="1000000" step="0.0001" required value={dream.exchangeRate ?? ''} onChange={e => setDream(d => ({ ...d, exchangeRate: e.target.value === '' ? null : e.target.valueAsNumber }))} placeholder="Өз курсуңузду көрсөтүңүз" /><small>Сайттагы эки сумма ушул курс менен эсептелет. Курсту өзүңүз жаңыртасыз.</small></label>
        <label>Суммалар киргизилүүчү валюта<select value={dream.currency} onChange={e => changeCurrency(e.target.value)}><option value="KGS">Кыргыз сому</option><option value="USD">АКШ доллары</option>{!['KGS', 'USD'].includes(dream.currency) && <option value={dream.currency}>{dream.currency} — мурда сакталган валюта</option>}</select><small>Валюта алмашканда суммалар автоматтык түрдө эсептелет. Курс өзгөргөндө тандалган валютадагы суммалар сакталат.</small></label>
      </div>
      <div className={styles.row}><label>Кыялдын сүрөтү же GIF<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={e => upload(e.target.files?.[0], 'image')} /><small>1 МБ чейин. GIF анимацияны сактайт.</small><button type="button" onClick={() => field('image', '')}>Сүрөттү алып салуу</button></label><label>Банк тиркемесиндеги QR-код<input type="file" accept="image/png,image/jpeg,image/webp" onChange={e => upload(e.target.files?.[0], 'qr')} /><small>Которууларды алуу үчүн чыныгы QR-кодду жүктөңүз.</small><button type="button" onClick={() => field('qr', '')}>QR-кодду алып салуу</button></label></div>
      <label>Которуу шилтемеси (милдеттүү эмес)<input type="url" placeholder="https://…" maxLength={2000} value={dream.donationUrl} onChange={e => field('donationUrl', e.target.value)} /></label>
      <div className={styles.actions}><button className={styles.button} disabled={busy}>{busy ? 'Сакталууда…' : 'Өзгөртүүлөрдү сактоо'}</button><a href="/dreams" target="_blank" rel="noreferrer">Баракты ачуу ↗</a><button type="button" disabled={busy} onClick={async () => { try { const r = await fetch('/api/dreams/session', { method: 'DELETE' }); if (!r.ok) throw 0; setAuth(false); setMessage('Башкаруу панелинен чыктыңыз'); } catch { setMessage('Чыгуу мүмкүн болгон жок. Кайра аракет кылыңыз.'); } }}>Чыгуу</button></div>
    </form><h2 style={{ marginTop: 40 }}>Алдын ала көрүү</h2><small>Өзгөртүүлөр сакталганга чейин көрсөтүлөт.</small><DreamView initial={dream} /></>}
  </div>;
}
