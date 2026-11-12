'use client';
import styles from './LanguagePicker.module.scss';
export function LanguagePicker({ locale }: { locale: 'ru' | 'en' | 'ky' }) {
  return <label className={styles.picker}>
    <span aria-hidden="true">◎</span>
    <select aria-label={locale === 'ky' ? 'Тилди тандоо' : locale === 'en' ? 'Choose language' : 'Выбрать язык'} value={locale} onChange={event => {
      document.cookie = `site_language=${event.target.value}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
      const path = location.pathname.replace(/^\/(en|ky)(?=\/|$)/, '') || '/';
      location.assign(`${path}${location.search}${location.hash}`);
    }}>
      <option value="ru">RU</option><option value="en">ENG</option><option value="ky">KG</option>
    </select>
  </label>;
}
