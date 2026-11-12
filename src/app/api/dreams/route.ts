import { NextResponse } from 'next/server';
import { getCollection, readEntries } from '@/lib/content-server';
import { configured } from '@/lib/dream-server';
import { entryTime } from '@/lib/content';
export const dynamic='force-dynamic';
export async function GET() {
 try { const items=configured()?(await readEntries()).filter(e=>e.section==='dreams' && e.published && !e.deleted).sort((a,b)=>entryTime(b)-entryTime(a)):await getCollection('dreams'); return NextResponse.json({items},{headers:{'Cache-Control':'no-store'}}); }
 catch { return NextResponse.json({error:'Не удалось обновить мечты'},{status:503}); }
}
export async function PUT() { return NextResponse.json({error:'Откройте обновлённую админку мечтаний.'},{status:410}); }
