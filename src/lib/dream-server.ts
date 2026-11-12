import 'server-only';
import { createHmac, timingSafeEqual, createHash } from 'crypto';
import { cookies } from 'next/headers';
import { Dream, emptyDream, validateDream } from './dream';
export const configured = () => Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN && (process.env.DREAM_ADMIN_PASSWORD?.length ?? 0) >= 16);
export async function redis(command: (string | number)[]) {
  const response = await fetch(process.env.UPSTASH_REDIS_REST_URL!, { method: 'POST', headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify(command), cache: 'no-store', signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error('Хранилище временно недоступно');
  const data = await response.json();
  if (data.error) throw new Error('Хранилище временно недоступно');
  return data.result;
}
export async function readDream(): Promise<Dream> {
  if (!configured()) return emptyDream;
  const raw = await redis(['GET', 'portfolio:dream']);
  if (!raw) return emptyDream;
  const data = JSON.parse(raw);
  return { ...validateDream(data), updatedAt: data.updatedAt };
}
const signature = (value: string) => createHmac('sha256', process.env.DREAM_ADMIN_PASSWORD!).update(value).digest('hex');
export function equal(a: string, b: string) { return timingSafeEqual(createHash('sha256').update(a).digest(), createHash('sha256').update(b).digest()); }
export function sessionToken() { const expires = String(Date.now() + 8 * 3600000); return `${expires}.${signature(expires)}`; }
export function authenticated() {
  if (!configured()) return false;
  const [expires, mac] = (cookies().get('dream_session')?.value ?? '').split('.');
  return Boolean(expires && mac && Number(expires) > Date.now() && equal(mac, signature(expires)));
}
export function sameOrigin(request: Request) {
  try { const origin = new URL(request.headers.get('origin') ?? ''); return origin.host === request.headers.get('host') && origin.protocol === new URL(request.url).protocol; } catch { return false; }
}
