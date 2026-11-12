'use client';
import { useEffect, useState } from 'react';
import { Dream, emptyDream, convertDreamAmount } from '@/lib/dream';
import { Column, Heading, Text } from '@/once-ui/components';
import { formatDate } from '@/locales/ky/app/utils/formatDate';
import styles from './Dreams.module.scss';
export function DreamView({ initial, live = false }: { initial: Dream; live?: boolean }) {
  const [dream, setDream] = useState(initial);
  useEffect(() => setDream(initial), [initial]);
  useEffect(() => {
    if (!live) return;
    const controller = new AbortController();
    const update = async () => { try { const r = await fetch('/api/dreams', { cache: 'no-store', signal: controller.signal }); if (r.ok) setDream(await r.json()); } catch {} };
    const id = setInterval(update, 60000);
    const visible = () => { if (document.visibilityState === 'visible') update(); };
    window.addEventListener('focus', visible);
    return () => { clearInterval(id); controller.abort(); window.removeEventListener('focus', visible); };
  }, [live]);
  const title = dream.titleKy || dream.title;
  const description = dream.descriptionKy || (dream.description === emptyDream.description ? emptyDream.descriptionKy : dream.description);
  const format = (n: number, currency: string) => `${new Intl.NumberFormat('ky-KG', { maximumFractionDigits: 2 }).format(n)} ${currency === 'KGS' ? 'сом' : currency === 'USD' ? '$' : currency}`;
  const money = (n: number) => format(n, dream.currency);
  const otherCurrency = dream.currency === 'USD' ? 'KGS' : 'USD';
  const equivalent = (n: number) => { const amount = convertDreamAmount(n, dream.currency, otherCurrency, dream.exchangeRate); return amount === null ? null : `≈ ${format(amount, otherCurrency)}`; };
  const remaining = Math.max(0, dream.target - dream.saved);
  const percent = dream.target ? Math.min(100, dream.saved / dream.target * 100) : 0;
  return <Column maxWidth="m" fillWidth className={styles.page} lang="ky">
    <Column fillWidth gap="m" marginBottom="l">
      <Heading as="h1" variant="display-strong-s">Кыялдар</Heading>
      <Text variant="body-default-m" onBackground="neutral-weak">Ар бир чоң кыял биринчи кадамдан башталат. Бул жерде максатым жана ага жетүү жолум менен бөлүшөм.</Text>
    </Column>
    <article className={styles.card}>
      <div className={styles.visual}><span className={styles.tag}>↗ МЕНИН КИЙИНКИ МАКСАТЫМ</span>
        {dream.image ? <img src={dream.image} alt={title} className={styles.heroImage} /> : <div className={styles.orbit} aria-hidden="true"><div /><span>✦</span></div>}
        <div className={styles.visualCaption}><span>01 / КЫЯЛГА КАРАЙ</span><span>Чакан кадамдар менен чоң максатка</span></div>
      </div>
      <div className={styles.details}><span className={styles.eyebrow}>ЖӨН ГАНА БУЮМ ЭМЕС. ЖЕКЕ МАКСАТ.</span><h2>{title}</h2><p>{description}</p>
        <div className={styles.numbers}><div><span>Топтолгон каражат</span><strong>{money(dream.saved)}</strong><small className={styles.equivalent}>{equivalent(dream.saved) ?? 'Курс көрсөтүлгөндөн кийин эсептелет'}</small></div><div><span>Менин максатым</span><b>{dream.target ? money(dream.target) : 'Баасын тактап жатам'}</b>{dream.target > 0 && <small className={styles.equivalent}>{equivalent(dream.target)}</small>}</div></div>
        <div className={styles.progress} role="progressbar" aria-label="Каражат топтоонун жүрүшү" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${percent}%` }} /></div>
        <div className={styles.progressNote}><span>{dream.target ? `${new Intl.NumberFormat('ky-KG', { maximumFractionDigits: 1 }).format(percent)}% жол басылды` : 'Биринчи кадам жасалды'}</span><span>{dream.target ? percent === 100 ? 'Кыял орундалды ✦' : `Калды  ${money(remaining)}${equivalent(remaining) ? ` · ${equivalent(remaining)}` : ''}` : 'Баары кыялдан башталат'}</span></div>
        {dream.exchangeRate && <small className={styles.rate}>1 $ = {format(dream.exchangeRate, 'KGS')} · Курсту сайттын ээси койгон</small>}
        {dream.updatedAt && <small className={styles.updated}>Жаңыртылды {formatDate(dream.updatedAt)} · Сумманы өзүм жаңыртам</small>}
      </div>
    </article>
    <section className={styles.support}><div><span className={styles.eyebrow}>БИР АЗ ЖАКШЫЛЫК — ЧОҢ КАДАМ</span><h2>Кыялга салым кошуу<span>↗</span></h2><p>Менин ишим сизге жакса, максатымды колдосоңуз болот. Ар бир сумма — алдыга дагы бир кадам.</p><span className={styles.thanks}>♡ Колдооңуз үчүн рахмат.</span></div>
      <div className={styles.qr}>{dream.qr ? <><a href={dream.qr} download="donation-qr.png" aria-label="Колдоо үчүн QR-кодду жүктөп алуу"><img src={dream.qr} alt="Которуу үчүн QR-код" /></a><span>Банктын тиркемеси менен сканерлеңиз</span><a href={dream.qr} download="donation-qr.png">QR-кодду жүктөп алуу ↓</a></> : <><div className={styles.qrEmpty} aria-hidden="true">♡</div><span>QR-код жакында кошулат</span></>}{dream.donationUrl && <a className={styles.button} href={dream.donationUrl} target="_blank" rel="noopener noreferrer">Кыялды колдоо ↗</a>}</div>
    </section><p className={styles.footnote}>Колдоо ыктыярдуу. Бул — эч кандай жооп милдеттенмеси жок жеке кыялга белек.</p>
  </Column>;
}
