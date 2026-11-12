import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { authenticated, redis, sameOrigin } from '@/lib/dream-server';
import { contentKey, readEntries } from '@/lib/content-server';
import { validateEntry } from '@/lib/content';
export const dynamic = 'force-dynamic';
export async function GET() {
 if (!authenticated()) return NextResponse.json({ error: 'Войдите в админку' }, { status: 401 });
 try { return NextResponse.json(await readEntries(), { headers: { 'Cache-Control': 'no-store' } }); }
 catch { return NextResponse.json({ error: 'База недоступна. Попробуйте ещё раз.' }, { status: 503 }); }
}
export async function PUT(request: Request) {
 if (!sameOrigin(request) || !authenticated()) return NextResponse.json({ error: 'Войдите в админку' }, { status: 401 });
 let entry, previousVersion;
 try {
  const body = await request.text();
  if (body.length > 1900000) return NextResponse.json({ error: 'Публикация слишком большая' }, { status: 413 });
  const value = JSON.parse(body); previousVersion = value.updatedAt; entry = validateEntry(value);
 } catch (e) { return NextResponse.json({ error: e instanceof Error ? e.message : 'Проверьте поля' }, { status: 400 }); }
 try {
  if (!entry.slug) {
   entry.slug = `${entry.section}-${randomUUID()}`;
   entry.createdAt = entry.updatedAt;
   await redis(['HSET', contentKey, entry.slug, JSON.stringify(entry)]);
  } else {
   // Compare-and-set prevents overwriting changes from another open editor.
   const script = "local raw = redis.call('HGET', KEYS[1], ARGV[1]); if not raw then return 0 end; local old = cjson.decode(raw); if old.updatedAt ~= ARGV[2] or old.section ~= ARGV[3] then return 0 end; redis.call('HSET', KEYS[1], ARGV[1], ARGV[4]); return 1";
   const saved = await redis(['EVAL', script, 1, contentKey, entry.slug, typeof previousVersion === 'string' ? previousVersion : '', entry.section, JSON.stringify(entry)]);
   if (!saved) return NextResponse.json({ error: 'Запись изменена в другой вкладке. Откройте её заново из списка.' }, { status: 409 });
  }
  return NextResponse.json(entry, { headers: { 'Cache-Control': 'no-store' } });
 } catch { return NextResponse.json({ error: 'Не удалось сохранить в базу. Ваш текст остался в форме.' }, { status: 503 }); }
}
