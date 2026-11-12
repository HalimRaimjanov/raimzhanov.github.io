'use client';
import { useEffect, useState } from 'react';
import { Dream, convertDreamAmount } from '@/lib/dream';
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
  const format = (n: number, currency: string) => `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(n)} ${currency === 'KGS' ? 'сом' : currency === 'USD' ? '$' : currency}`;
  const money = (n: number) => format(n, dream.currency);
  const otherCurrency = dream.currency === 'USD' ? 'KGS' : 'USD';
  const equivalent = (n: number) => { const amount = convertDreamAmount(n, dream.currency, otherCurrency, dream.exchangeRate); return amount === null ? null : `≈ ${format(amount, otherCurrency)}`; };
  const remaining = Math.max(0, dream.target - dream.saved);
  const percent = dream.target ? Math.min(100, dream.saved / dream.target * 100) : 0;
  return <Column maxWidth="m" fillWidth className={styles.page} lang="ru">
    <Column fillWidth gap="m" marginBottom="l">
      <Heading as="h1" variant="display-strong-s">Мечты</Heading>
      <Text variant="body-default-m" onBackground="neutral-weak">У каждой большой мечты есть первый шаг. Здесь я делюсь своей целью и дорогой к ней.</Text>
    </Column>
    <article className={styles.card}>
      <div className={styles.visual}><span className={styles.tag}>↗ МОЯ СЛЕДУЮЩАЯ ЦЕЛЬ</span>
        {dream.image ? <img src={dream.image} alt={dream.title} className={styles.heroImage} /> : <div className={styles.orbit} aria-hidden="true"><div /><span>✦</span></div>}
        <div className={styles.visualCaption}><span>01 / НА ПУТИ К МЕЧТЕ</span><span>Маленькими шагами к большому</span></div>
      </div>
      <div className={styles.details}><span className={styles.eyebrow}>НЕ ПРОСТО ВЕЩЬ. ЛИЧНАЯ ЦЕЛЬ.</span><h2>{dream.title}</h2><p>{dream.description}</p>
        <div className={styles.numbers}><div><span>Уже накоплено</span><strong>{money(dream.saved)}</strong><small className={styles.equivalent}>{equivalent(dream.saved) ?? 'Пересчёт появится после указания курса'}</small></div><div><span>Моя цель</span><b>{dream.target ? money(dream.target) : 'Уточняю стоимость'}</b>{dream.target > 0 && <small className={styles.equivalent}>{equivalent(dream.target)}</small>}</div></div>
        <div className={styles.progress} role="progressbar" aria-label="Прогресс накоплений" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${percent}%` }} /></div>
        <div className={styles.progressNote}><span>{dream.target ? `${new Intl.NumberFormat('ru', { maximumFractionDigits: 1 }).format(percent)}% пути пройдено` : 'Первый шаг уже сделан'}</span><span>{dream.target ? percent === 100 ? 'Мечта стала реальностью ✦' : `Осталось ${money(remaining)}${equivalent(remaining) ? ` · ${equivalent(remaining)}` : ''}` : 'Всё начинается с мечты'}</span></div>
        {dream.exchangeRate && <small className={styles.rate}>1 $ = {format(dream.exchangeRate, 'KGS')} · Курс задан владельцем</small>}
        {dream.updatedAt && <small className={styles.updated}>Обновлено {new Date(dream.updatedAt).toLocaleDateString('ru-RU', { timeZone: 'Asia/Bishkek' })} · Сумму обновляю вручную</small>}
      </div>
    </article>
    <section className={styles.support}><div><span className={styles.eyebrow}>НЕМНОГО ДОБРОТЫ — БОЛЬШОЙ ШАГ</span><h2>Стать частью мечты<span>↗</span></h2><p>Если вам близко то, что я делаю, можно поддержать мою цель. Любая сумма — это ещё один шаг вперёд.</p><span className={styles.thanks}>♡ Спасибо, что вы рядом.</span></div>
      <div className={styles.qr}>{dream.qr ? <><a href={dream.qr} download="donation-qr.png" aria-label="Скачать QR-код для поддержки"><img src={dream.qr} alt="QR-код для перевода" /></a><span>Отсканируйте в приложении банка</span><a href={dream.qr} download="donation-qr.png">Скачать QR-код ↓</a></> : <><div className={styles.qrEmpty} aria-hidden="true">♡</div><span>QR-код скоро появится</span></>}{dream.donationUrl && <a className={styles.button} href={dream.donationUrl} target="_blank" rel="noopener noreferrer">Поддержать мечту ↗</a>}</div>
    </section><p className={styles.footnote}>Поддержка добровольная. Это подарок на личную мечту, без встречных обязательств.</p>
  </Column>;
}
