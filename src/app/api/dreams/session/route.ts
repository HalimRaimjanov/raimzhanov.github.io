import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { authenticated, configured, equal, redis, sameOrigin, sessionToken } from '@/lib/dream-server';
export const dynamic = 'force-dynamic';
export async function GET() { return NextResponse.json({ authenticated: authenticated(), configured: configured() }, { headers: { 'Cache-Control': 'no-store' } }); }
export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Недопустимый запрос' }, { status: 403 });
  if (!configured()) return NextResponse.json({ error: 'Для запуска админки подключите хранилище и пароль по инструкции DREAMS.md.' }, { status: 503 });
  try {
    const text = await request.text();
    if (text.length > 1024) return NextResponse.json({ error: 'Слишком длинный пароль' }, { status: 400 });
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const key = `portfolio:dream:login:${createHash('sha256').update(ip).digest('hex')}:${Math.floor(Date.now() / 900000)}`;
    const attempts = await redis(['INCR', key]);
    await redis(['EXPIRE', key, 900]);
    if (attempts > 10) return NextResponse.json({ error: 'Слишком много попыток. Повторите через 15 минут.' }, { status: 429 });
    const { password } = JSON.parse(text);
    if (typeof password !== 'string' || !equal(password, process.env.DREAM_ADMIN_PASSWORD!)) return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 });
    const response = NextResponse.json({ ok: true });
    response.cookies.set('dream_session', sessionToken(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 8 * 3600 });
    return response;
  } catch { return NextResponse.json({ error: 'Не удалось войти. Проверьте подключение хранилища.' }, { status: 503 }); }
}
export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({}, { status: 403 });
  const response = NextResponse.json({ ok: true }); response.cookies.delete('dream_session'); return response;
}
