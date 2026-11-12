'use client';
import { useEffect, useState } from 'react';
import styles from './LanguagePicker.module.scss';
export function LanguagePicker({ locale, timeZone = 'Asia/Bishkek', showTime = true }: { locale: 'ru' | 'en' | 'ky'; timeZone?: string; showTime?: boolean }) {
  const [time, setTime] = useState('--:--:--');
  useEffect(() => {
    if (!showTime) return;
    const format = new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });
    const update = () => setTime(format.format(new Date()));
    update(); const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [timeZone, showTime]);
  return <div className={styles.utility}>
    {showTime && <time className={styles.clock} dateTime={time === '--:--:--' ? undefined : time} title={timeZone}>{time}</time>}
    {showTime && <span className={styles.separator} aria-hidden="true" />}
    <label className={styles.picker}>
      <svg className={styles.globe} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg>
      <select aria-label={locale === 'ky' ? 'Тилди тандоо' : locale === 'en' ? 'Choose language' : 'Выбрать язык'} value={locale} onChange={event => {
        document.cookie = `site_language=${event.target.value}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
        const path = location.pathname.replace(/^\/(en|ky)(?=\/|$)/, '') || '/';
        location.assign(`${path}${location.search}${location.hash}`);
      }}><option value="ru">RU</option><option value="en">ENG</option><option value="ky">KG</option></select>
      <svg className={styles.chevron} aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m4 6 4 4 4-4"/></svg>
    </label>
  </div>;
}
