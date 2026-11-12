export type Dream = {
  title: string; description: string; target: number; saved: number;
  currency: string; exchangeRate: number | null; image: string; qr: string; donationUrl: string; updatedAt: string;
};
export const emptyDream: Dream = {
  title: 'Lixiang L7 · 2026',
  description: 'Моя мечта — Lixiang L7. Для новых дорог, долгих путешествий и моментов с близкими. Коплю на неё шаг за шагом.',
  target: 0, saved: 1, currency: 'KGS', exchangeRate: null, image: '/images/dreams/lixiang-l7.webp', qr: '', donationUrl: '', updatedAt: '',
};
export function validateDream(value: unknown): Dream {
  if (!value || typeof value !== 'object') throw new Error('Некорректные данные');
  const d = value as Record<string, unknown>;
  for (const [key, max] of [['title', 100], ['description', 1000], ['currency', 3], ['image', 1500000], ['qr', 1500000], ['donationUrl', 2000]] as const) {
    if (typeof d[key] !== 'string' || (d[key] as string).length > max) throw new Error('Проверьте текст и размер изображений');
  }
  if (!(d.title as string).trim() || !/^[A-Z]{3}$/.test(d.currency as string)) throw new Error('Укажите название и валюту');
  try { new Intl.NumberFormat('ru', { style: 'currency', currency: d.currency as string }); } catch { throw new Error('Некорректная валюта'); }
  const exchangeRate = d.exchangeRate ?? null;
  if (exchangeRate !== null && (typeof exchangeRate !== 'number' || !Number.isFinite(exchangeRate) || exchangeRate < 0.0001 || exchangeRate > 1000000)) throw new Error('Курс должен быть от 0,0001 до 1 000 000 сомов за доллар');
  for (const key of ['saved', 'target']) if (typeof d[key] !== 'number' || !Number.isFinite(d[key]) || (d[key] as number) < 0 || (d[key] as number) > 1e12) throw new Error('Суммы должны быть от 0 до 1 триллиона');
  for (const key of ['image', 'qr']) if (d[key] && !(key === 'image' && d[key] === '/images/dreams/lixiang-l7.webp') && !/^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(d[key] as string)) throw new Error('Загрузите PNG, JPEG, WebP или GIF');
  if (d.donationUrl) { try { if (new URL(d.donationUrl as string).protocol !== 'https:') throw 0; } catch { throw new Error('Ссылка на оплату должна начинаться с https://'); } }
  return { title: (d.title as string).trim(), description: d.description as string, target: d.target as number, saved: d.saved as number, currency: d.currency as string, exchangeRate, image: d.image as string, qr: d.qr as string, donationUrl: d.donationUrl as string, updatedAt: new Date().toISOString() };
}

// Rate always means KGS per 1 USD; null keeps legacy records readable without inventing a rate.
export function convertDreamAmount(amount: number, from: string, to: string, rate: number | null): number | null {
  if (from === to) return amount;
  if (!rate || !Number.isFinite(rate) || rate <= 0) return null;
  if (from === 'USD' && to === 'KGS') return amount * rate;
  if (from === 'KGS' && to === 'USD') return amount / rate;
  return null;
}
