'use client';
import { useEffect, useState } from 'react';
import { Dream } from '@/lib/dream';
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
  const money = (n: number) => `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(n)} ${dream.currency === 'KGS' ? 'сом' : dream.currency}`;
  const percent = dream.target ? Math.min(100, dream.saved / dream.target * 100) : 0;
  return <div className={styles.page} lang="ru">
    <header className={styles.intro}><span className={styles.eyebrow}>ЛИЧНОЕ / ТО, ЧТО ВДОХНОВЛЯЕТ</span><h1>Мечты становятся<br /><em>ближе.</em></h1><p>У каждой большой мечты есть первый шаг.<br />Здесь я делюсь своей целью и дорогой к ней.</p></header>
    <article className={styles.card}>
      <div className={styles.visual}><span className={styles.tag}>↗ МОЯ СЛЕДУЮЩАЯ ЦЕЛЬ</span>
        {dream.image ? <img src={dream.image} alt={dream.title} className={styles.heroImage} /> : <div className={styles.orbit} aria-hidden="true"><div /><span>✦</span></div>}
        <div className={styles.visualCaption}><span>01 / DREAM IN PROGRESS</span><span>Маленькими шагами к большому</span></div>
      </div>
      <div className={styles.details}><span className={styles.eyebrow}>НЕ ПРОСТО ВЕЩЬ. ЛИЧНАЯ ЦЕЛЬ.</span><h2>{dream.title}</h2><p>{dream.description}</p>
        <div className={styles.numbers}><div><span>Уже накоплено</span><strong>{money(dream.saved)}</strong></div><div><span>Моя цель</span><b>{dream.target ? money(dream.target) : 'Уточняю стоимость'}</b></div></div>
        <div className={styles.progress} role="progressbar" aria-label="Прогресс накоплений" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${percent}%` }} /></div>
        <div className={styles.progressNote}><span>{dream.target ? `${new Intl.NumberFormat('ru', { maximumFractionDigits: 1 }).format(percent)}% пути пройдено` : 'Первый шаг уже сделан'}</span><span>{dream.target ? percent === 100 ? 'Мечта стала реальностью ✦' : `Осталось ${money(Math.max(0, dream.target - dream.saved))}` : 'Всё начинается с мечты'}</span></div>
        {dream.updatedAt && <small className={styles.updated}>Обновлено {new Date(dream.updatedAt).toLocaleDateString('ru-RU', { timeZone: 'Asia/Bishkek' })} · Сумму обновляю вручную</small>}
      </div>
    </article>
    <section className={styles.support}><div><span className={styles.eyebrow}>НЕМНОГО ДОБРОТЫ — БОЛЬШОЙ ШАГ</span><h2>Стать частью мечты<span>↗</span></h2><p>Если вам близко то, что я делаю, можно поддержать мою цель. Любая сумма — это ещё один шаг вперёд.</p><span className={styles.thanks}>♡ Спасибо, что вы рядом.</span></div>
      <div className={styles.qr}>{dream.qr ? <><a href={dream.qr} download="donation-qr.png" aria-label="Скачать QR-код для поддержки"><img src={dream.qr} alt="QR-код для перевода" /></a><span>Отсканируйте в приложении банка</span><a href={dream.qr} download="donation-qr.png">Скачать QR-код ↓</a></> : <><div className={styles.qrEmpty} aria-hidden="true">♡</div><span>QR-код скоро появится</span></>}{dream.donationUrl && <a className={styles.button} href={dream.donationUrl} target="_blank" rel="noopener noreferrer">Поддержать мечту ↗</a>}</div>
    </section><p className={styles.footnote}>Поддержка добровольная. Это подарок на личную мечту, без встречных обязательств.</p>
  </div>;
}
