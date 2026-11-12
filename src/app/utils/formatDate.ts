export function formatDate(date: string, includeRelative = false) {
  const target = new Date(date.includes('T') ? date : `${date}T00:00:00+06:00`);
  const full = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Bishkek' }).format(target);
  if (!includeRelative) return full;
  const days = Math.round((target.getTime() - Date.now()) / 86400000);
  return `${full} (${new Intl.RelativeTimeFormat('ru-RU', { numeric: 'auto' }).format(days, 'day')})`;
}
