'use client';
import { useEffect, useState } from 'react';
import { Dream, emptyDream, convertDreamAmount } from '@/lib/dream';
import { Column, Heading, Text } from '@/once-ui/components';
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
  const title = dream.titleEn || dream.title;
  const description = dream.descriptionEn || (dream.description === emptyDream.description ? emptyDream.descriptionEn : dream.description);
  const format = (n: number, currency: string) => `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(n)} ${currency === 'KGS' ? 'KGS' : currency === 'USD' ? '$' : currency}`;
  const money = (n: number) => format(n, dream.currency);
  const otherCurrency = dream.currency === 'USD' ? 'KGS' : 'USD';
  const equivalent = (n: number) => { const amount = convertDreamAmount(n, dream.currency, otherCurrency, dream.exchangeRate); return amount === null ? null : `≈ ${format(amount, otherCurrency)}`; };
  const remaining = Math.max(0, dream.target - dream.saved);
  const percent = dream.target ? Math.min(100, dream.saved / dream.target * 100) : 0;
  return <Column maxWidth="m" fillWidth className={styles.page} lang="en">
    <Column fillWidth gap="m" marginBottom="l">
      <Heading as="h1" variant="display-strong-s">Dreams</Heading>
      <Text variant="body-default-m" onBackground="neutral-weak">Every big dream starts with a small step. Here I share my goal and the journey towards it.</Text>
    </Column>
    <article className={styles.card}>
      <div className={styles.visual}><span className={styles.tag}>↗ MY NEXT GOAL</span>
        {dream.image ? <img src={dream.image} alt={title} className={styles.heroImage} /> : <div className={styles.orbit} aria-hidden="true"><div /><span>✦</span></div>}
        <div className={styles.visualCaption}><span>01 / DREAM IN PROGRESS</span><span>Small steps towards something big</span></div>
      </div>
      <div className={styles.details}><span className={styles.eyebrow}>MORE THAN AN OBJECT. A PERSONAL GOAL.</span><h2>{title}</h2><p>{description}</p>
        <div className={styles.numbers}><div><span>Saved so far</span><strong>{money(dream.saved)}</strong><small className={styles.equivalent}>{equivalent(dream.saved) ?? 'Conversion will appear once a rate is set'}</small></div><div><span>My goal</span><b>{dream.target ? money(dream.target) : 'Price to be confirmed'}</b>{dream.target > 0 && <small className={styles.equivalent}>{equivalent(dream.target)}</small>}</div></div>
        <div className={styles.progress} role="progressbar" aria-label="Savings progress" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${percent}%` }} /></div>
        <div className={styles.progressNote}><span>{dream.target ? `${new Intl.NumberFormat('en', { maximumFractionDigits: 1 }).format(percent)}% of the way there` : 'The first step is taken'}</span><span>{dream.target ? percent === 100 ? 'The dream came true ✦' : `Remaining ${money(remaining)}${equivalent(remaining) ? ` · ${equivalent(remaining)}` : ''}` : 'It starts with a dream'}</span></div>
        {dream.exchangeRate && <small className={styles.rate}>1 $ = {format(dream.exchangeRate, 'KGS')} · Rate set by the owner</small>}
        {dream.updatedAt && <small className={styles.updated}>Updated {new Date(dream.updatedAt).toLocaleDateString('en-US', { timeZone: 'Asia/Bishkek' })} · Savings updated manually</small>}
      </div>
    </article>
    <section className={styles.support}><div><span className={styles.eyebrow}>A LITTLE KINDNESS GOES A LONG WAY</span><h2>Be part of the dream<span>↗</span></h2><p>If you enjoy what I do, you can support my goal. Any amount brings it one step closer.</p><span className={styles.thanks}>♡ Thank you for being here.</span></div>
      <div className={styles.qr}>{dream.qr ? <><a href={dream.qr} download="donation-qr.png" aria-label="Download the support QR code"><img src={dream.qr} alt="Payment QR code" /></a><span>Scan with your banking app</span><a href={dream.qr} download="donation-qr.png">Download QR code ↓</a></> : <><div className={styles.qrEmpty} aria-hidden="true">♡</div><span>QR code coming soon</span></>}{dream.donationUrl && <a className={styles.button} href={dream.donationUrl} target="_blank" rel="noopener noreferrer">Support my dream ↗</a>}</div>
    </section><p className={styles.footnote}>Support is voluntary: a gift towards a personal dream, with nothing owed in return.</p>
  </Column>;
}
