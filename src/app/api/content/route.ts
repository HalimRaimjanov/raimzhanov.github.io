import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { authenticated, redis, sameOrigin } from '@/lib/dream-server';
import { contentKey, ensureContentImported, readEntries } from '@/lib/content-server';
import { Entry, validateEntry } from '@/lib/content';
export const dynamic='force-dynamic';
const json=(value:unknown,status=200)=>NextResponse.json(value,{status,headers:{'Cache-Control':'no-store'}});
export async function GET() {
 if(!authenticated()) return json({error:'Войдите в админку'},401);
 try { await ensureContentImported(); return json((await readEntries()).filter(e=>!e.deleted)); }
 catch { return json({error:'База недоступна. Обновите список позже.'},503); }
}
// Preserve trusted import metadata and compare versions atomically in Redis.
const updateScript="local raw=redis.call('HGET',KEYS[1],ARGV[1]); if not raw then return '' end; local old=cjson.decode(raw); if old.updatedAt~=ARGV[2] or old.section~=ARGV[3] or old.deleted then return '' end; redis.call('HSET',KEYS[1],ARGV[1],ARGV[4]); return ARGV[4]";
async function update(entry:Entry,version:string) {
 const raw=await redis(['HGET',contentKey,entry.slug]); if(!raw) return null;
 const old=JSON.parse(raw) as Entry; entry.createdAt=old.createdAt; entry.team=old.team;
 const result=await redis(['EVAL',updateScript,1,contentKey,entry.slug,version,entry.section,JSON.stringify(entry)]);
 return result?JSON.parse(result) as Entry:null;
}
export async function PUT(request:Request) {
 if(!sameOrigin(request)||!authenticated()) return json({error:'Войдите в админку'},401);
 let entry:Entry,version:string;
 try {
  const text=await request.text(); if(text.length>1900000) return json({error:'Публикация слишком большая. Уменьшите изображения.'},413);
  const value=JSON.parse(text); entry=validateEntry(value); version=typeof value.updatedAt==='string'?value.updatedAt:'';
  entry.updatedAt=`${new Date().toISOString()}:${randomUUID()}`;
 } catch(e) { return json({error:e instanceof Error?e.message:'Проверьте поля'},400); }
 try {
  await ensureContentImported();
  if(!entry.slug) {
   entry.slug=`${entry.section}-${randomUUID()}`; entry.createdAt=new Date().toISOString();
   await redis(['HSET',contentKey,entry.slug,JSON.stringify(entry)]);
  } else {
   const saved=await update(entry,version);
   if(!saved) return json({error:'Запись изменилась или удалена. Обновите список и откройте её заново.'},409);
   entry=saved;
  }
  return json(entry);
 } catch { return json({error:'Не удалось сохранить. Ваш текст остался в форме.'},503); }
}
export async function PATCH(request:Request) {
 if(!sameOrigin(request)||!authenticated()) return json({error:'Войдите в админку'},401);
 let value:{slug:string;updatedAt:string;action:string};
 try { const text=await request.text(); if(text.length>1024) return json({error:'Слишком большой запрос'},413); value=JSON.parse(text); if(!['hide','show','delete'].includes(value.action)||typeof value.slug!=='string'||typeof value.updatedAt!=='string') throw 0; }
 catch { return json({error:'Некорректное действие'},400); }
 try {
  await ensureContentImported(); const entries=await readEntries(); const old=entries.find(e=>e.slug===value.slug && !e.deleted);
  if(!old || old.updatedAt!==value.updatedAt) return json({error:'Запись изменилась. Обновите список.'},409);
  const next={...old,published:value.action==='show',deleted:value.action==='delete',updatedAt:`${new Date().toISOString()}:${randomUUID()}`};
  const saved=await update(next,value.updatedAt); if(!saved) return json({error:'Запись изменилась. Обновите список.'},409);
  return json(saved);
 } catch { return json({error:'Действие не сохранено. Попробуйте позже.'},503); }
}
