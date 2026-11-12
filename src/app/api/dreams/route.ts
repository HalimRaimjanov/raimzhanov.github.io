import { NextResponse } from 'next/server';
import { authenticated, readDream, redis, sameOrigin } from '@/lib/dream-server';
import { validateDream } from '@/lib/dream';
export const dynamic = 'force-dynamic';
export async function GET() {
  try { return NextResponse.json(await readDream(), { headers: { 'Cache-Control': 'no-store' } }); }
  catch { return NextResponse.json({ error: 'Не удалось обновить данные. Попробуйте позже.' }, { status: 503 }); }
}
export async function PUT(request: Request) {
  if (!sameOrigin(request) || !authenticated()) return NextResponse.json({ error: 'Войдите в админку' }, { status: 401 });
  try {
    const text = await request.text();
    if (text.length > 3200000) return NextResponse.json({ error: 'Изображения слишком большие' }, { status: 413 });
    const dream = validateDream(JSON.parse(text));
    await redis(['SET', 'portfolio:dream', JSON.stringify(dream)]);
    return NextResponse.json(dream);
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Не удалось сохранить' }, { status: 400 }); }
}
