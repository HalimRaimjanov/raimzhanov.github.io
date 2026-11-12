const http=require('node:http');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const records=new Map();let down=false,server,cookie='';
const base='http://127.0.0.1:3011';
const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aEqkAAAAASUVORK5CYII=';
const legacyDream={title:'Lixiang L7 · 2026',description:'Сохранённая мечта',target:5000000,saved:4321,currency:'KGS',exchangeRate:89,image:'/images/dreams/lixiang-l7.webp',qr:png,donationUrl:'https://example.com/donate',updatedAt:'2026-11-12T00:00:00.000Z'};
const mock=http.createServer(async(req,res)=>{try{let body='';for await(const part of req)body+=part;res.setHeader('Content-Type','application/json');if(down){res.writeHead(503);res.end('{}');return;}const[op,...a]=JSON.parse(body);let result;
switch(op){case'HVALS':result=[...records.values()];break;case'HGET':result=records.get(a[1])||null;break;case'HSET':records.set(a[1],a[2]);result=1;break;
case'EVAL':if(a[0].includes('HSETNX')){for(let i=3;i<a.length;i+=2)if(!records.has(a[i]))records.set(a[i],a[i+1]);result=1;}else{const old=JSON.parse(records.get(a[3])||'null');result=old&&!old.deleted&&old.updatedAt===a[4]&&old.section===a[5]?a[6]:'';if(result)records.set(a[3],result);}break;
case'INCR':case'EXPIRE':result=1;break;case'GET':result=a[0]==='portfolio:dream'?JSON.stringify(legacyDream):null;break;default:throw Error(op);}res.end(JSON.stringify({result}));}catch(e){res.writeHead(500);res.end(JSON.stringify({error:e.message}));}});
async function request(path,options={}){return fetch(base+path,{...options,headers:{Origin:base,Cookie:cookie,...options.headers}});}
async function save(value){const r=await request('/api/content',{method:'PUT',body:JSON.stringify(value)});return {status:r.status,value:await r.json()};}
async function action(entry,action){const r=await request('/api/content',{method:'PATCH',body:JSON.stringify({slug:entry.slug,updatedAt:entry.updatedAt,action})});return {status:r.status,value:await r.json()};}
async function all(){const r=await request('/api/content');assert.equal(r.status,200);return r.json();}
function entry(title,date,section='blog',published=true){return{slug:'',section,published,publishedAt:date,image:'',link:'',tag:'Test',updatedAt:'',format:'markdown',translations:{ru:{title,summary:'Описание',content:'## Заголовок\n\nПервый абзац **важно**\n\n<script>alert(1)</script> {1+1}'},en:{title:'EN '+title,summary:'',content:''},ky:{title:'KG '+title,summary:'',content:''}}};}
(async()=>{
await new Promise(r=>mock.listen(3012,'127.0.0.1',r));
server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3011'],{env:{...process.env,UPSTASH_REDIS_REST_URL:'http://127.0.0.1:3012',UPSTASH_REDIS_REST_TOKEN:'local-test-only',DREAM_ADMIN_PASSWORD:'local-test-password-123'},stdio:['ignore','pipe','pipe']});server.stdout.on('data',()=>{});server.stderr.on('data',()=>{});
for(let i=0;i<100;i++){try{await fetch(base);break;}catch{await new Promise(r=>setTimeout(r,100));}}
assert.equal((await save(entry('No auth','2030-01-01'))).status,401);
assert.equal((await request('/api/content',{method:'PATCH',body:'{}'})).status,401);
const login=await request('/api/dreams/session',{method:'POST',body:JSON.stringify({password:'local-test-password-123'})});assert.equal(login.status,200);cookie=login.headers.get('set-cookie').split(';')[0];
const initial=await all();assert.equal(initial.length,37);assert.equal(initial.filter(e=>e.section==='blog').length,14);assert.equal(initial.filter(e=>e.section==='work').length,4);assert.equal(records.size,37);await all();assert.equal(records.size,37);
const importedDream=initial.find(e=>e.section==='dreams');assert.equal(importedDream.dream.saved,4321);assert.equal(importedDream.dream.exchangeRate,89);assert.equal(importedDream.dream.qr,png);assert.equal(initial.filter(e=>e.section==='gallery').length,18);assert(initial.some(e=>e.kind==='channel'));
const homeBefore=await(await request('/',{headers:{Cookie:'site_language=ru'}})).text();assert(homeBefore.includes('Как работает VPN'));assert(homeBefore.includes('Где остаются удалённые фотографии'));assert(!homeBefore.includes('Короткие видео о технологиях в Instagram'));
// Every imported record is editable, including the video with a leading dash in its YouTube ID.
for(const old of initial){const saved=await save(old);assert.equal(saved.status,200,old.slug);assert.equal(saved.value.slug,old.slug);assert.deepEqual(saved.value.translations,old.translations);assert.deepEqual(saved.value.images,old.images ?? []);assert.deepEqual(saved.value.team,old.team);}
let existing=(await all()).find(e=>e.slug==='selfvisa');const updatedProject=await save({...existing,translations:{...existing.translations,ru:{...existing.translations.ru,title:'SelfVisa updated'}}});assert.equal(updatedProject.status,200);assert.equal(updatedProject.value.images.length,2);assert.equal((await save(existing)).status,409);
const legacyArticle=(await all()).find(e=>e.slug==='it-reels');const hidden=await action(legacyArticle,'hide');assert.equal(hidden.status,200);await all();assert.equal((await request('/blog/it-reels')).status,404);const shown=await action(hidden.value,'show');assert.equal(shown.status,200);assert.equal((await request('/blog/it-reels')).status,200);
const video=(await all()).find(e=>e.kind==='video');const removed=await action(video,'delete');assert.equal(removed.status,200);assert(!(await all()).some(e=>e.slug===video.slug));assert.equal((await request('/blog/'+video.slug)).status,404);assert.equal(JSON.parse(records.get(video.slug)).deleted,true);
const homeAfter=await(await request('/',{headers:{Cookie:'site_language=ru'}})).text();assert(!homeAfter.includes(video.translations.ru.title));
assert.equal((await request('/api/content',{method:'PUT',headers:{Origin:'https://evil.example'},body:JSON.stringify(entry('bad','2030-01-01'))})).status,401);
assert.equal((await save(entry('bad date','2026-02-30'))).status,400);assert.equal((await save({...entry('bad','2030-01-01'),link:'javascript:alert(1)'})).status,400);
const oldest=(await save(entry('CMS Oldest','2030-01-01'))).value;
const middle=(await save(entry('CMS Middle','2030-01-02'))).value;
const latest=(await save(entry('CMS Latest','2030-01-03'))).value;
const draft=(await save(entry('CMS Draft','2030-01-04','blog',false))).value;
const project=(await save(entry('CMS Project','2030-01-04','work'))).value;
for(const locale of ['ru','en','ky']){const headers={Cookie:`site_language=${locale}`};
const home=await(await request('/',{headers})).text();assert(home.includes('CMS Latest'));assert(home.includes('CMS Middle'));assert(!home.includes('CMS Oldest'));assert(!home.includes('CMS Draft'));assert(home.indexOf('CMS Latest')<home.indexOf('CMS Middle'));
const blog=await(await request('/blog',{headers})).text();assert(blog.includes('CMS Oldest'));assert(!blog.includes('CMS Draft'));assert(blog.indexOf('CMS Latest')<blog.indexOf('CMS Middle'));
const detail=await request('/blog/'+latest.slug,{headers});assert.equal(detail.status,200);const html=await detail.text();assert(html.includes('<strong>важно</strong>'));assert(!html.includes('<script>alert(1)</script>'));assert(html.includes('Заголовок'));
for(const path of ['/work','/work/'+project.slug,'/admin/blog','/admin/work'])assert.equal((await request(path,{headers})).status,200);
assert.equal((await request('/blog/'+draft.slug,{headers})).status,404);
}
const h=await action(latest,'hide');assert.equal(h.status,200);assert((await(await request('/',{headers:{Cookie:'site_language=ru'}})).text()).includes('CMS Oldest'));assert.equal((await request('/blog/'+latest.slug)).status,404);
const sitemap=await(await request('/sitemap.xml')).text();assert(sitemap.includes(project.slug));assert(!sitemap.includes(latest.slug));assert(!sitemap.includes(video.slug));
// Multi-dream management preserves the old singleton and isolates savings/QR between records.
const d1=(await all()).find(e=>e.section==='dreams');
const d2=(await save({...entry('Second dream','2030-01-01','dreams'),dream:{...legacyDream,saved:12,qr:''},image:png}));assert.equal(d2.status,200);
let dreams=(await(await request('/api/dreams')).json()).items;assert.equal(dreams.length,2);assert.equal(dreams.find(e=>e.slug===d1.slug).dream.saved,4321);assert.equal(dreams.find(e=>e.slug===d2.value.slug).dream.saved,12);
const dh=await action(d2.value,'hide');assert.equal(dh.status,200);assert.equal((await(await request('/api/dreams')).json()).items.length,1);
const ds=await action(dh.value,'show');assert.equal(ds.status,200);assert.equal((await action(ds.value,'delete')).status,200);await all();assert.equal((await(await request('/api/dreams')).json()).items.length,1);
const savedDream=await save({...d1,dream:{...d1.dream,saved:999}});assert.equal(savedDream.status,200);assert.equal((await(await request('/api/dreams')).json()).items[0].dream.saved,999);
const photo=(await save({...entry('Uploaded photo','2030-01-01','gallery'),image:png}));assert.equal(photo.status,200);
const gallery=await(await request('/gallery',{headers:{Cookie:'site_language=ru'}})).text();assert(gallery.includes('Uploaded photo'));assert(gallery.includes(png));
const ph=await action(photo.value,'hide');assert.equal(ph.status,200);assert(!(await(await request('/gallery')).text()).includes('Uploaded photo'));
assert.equal((await action(ph.value,'delete')).status,200);await all();assert(!(await all()).some(e=>e.slug===photo.value.slug));
const channel=(await all()).find(e=>e.kind==='channel');assert((await(await request('/work')).text()).includes('https://www.youtube.com/@HalimRaimzhan'));
const ch=await action(channel,'hide');assert.equal(ch.status,200);assert(!(await(await request('/work')).text()).includes('https://www.youtube.com/@HalimRaimzhan'));
assert.equal((await action(ch.value,'show')).status,200);
for(const locale of ['ru','en','ky'])for(const path of ['/dreams','/gallery','/admin/dreams','/admin/gallery'])assert.equal((await request(path,{headers:{Cookie:`site_language=${locale}`}})).status,200);
const blogCovers=await(await request('/blog')).text();assert(blogCovers.includes('i.ytimg.com/vi/'));assert(blogCovers.includes('/images/conferense.jpeg'));assert(blogCovers.includes('/images/halim.png'));
const first=(await save(entry('Same day first','2031-01-01'))).value;await new Promise(r=>setTimeout(r,5));const second=(await save(entry('Same day second','2031-01-01'))).value;const tied=await(await request('/',{headers:{Cookie:'site_language=ru'}})).text();assert(tied.indexOf('Same day second')<tied.indexOf('Same day first'));
down=true;const outage=await(await request('/',{headers:{Cookie:'site_language=ru'}})).text();assert(!outage.includes(video.translations.ru.title));assert.equal((await save(entry('Down','2030-01-01'))).status,503);down=false;
console.log('PASS: all 37 records imported and editable; legacy savings/QR preserved; multiple dreams; gallery uploads; channel visibility; blog covers; repeat migration; retained galleries, translations and links; unified latest videos/articles; hide/show/delete without resurrection; drafts; sorting; RU/ENG/KG; Markdown safety; access control; storage outage.');
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>{if(process.env.CONTENT_TEST_PREVIEW==='1'){records.clear();console.log('Preview http://127.0.0.1:3011/admin/blog');}else{server?.kill('SIGTERM');mock.close();}});
