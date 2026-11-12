const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
export function formatDate(date: string, includeRelative = false) {
  const target = new Date(date.includes('T') ? date : `${date}T00:00:00+06:00`);
  const parts = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'Asia/Bishkek' }).formatToParts(target);
  const part = (type: string) => Number(parts.find(p => p.type === type)?.value);
  const full = `${part('day')}-${months[part('month') - 1]} ${part('year')}-ж.`;
  if (!includeRelative) return full;
  const days = Math.round((target.getTime() - Date.now()) / 86400000);
  return `${full} (${days === 0 ? 'бүгүн' : days < 0 ? `${-days} күн мурун` : `${days} күндөн кийин`})`;
}
