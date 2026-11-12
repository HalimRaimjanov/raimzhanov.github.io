const http = require('node:http');
const assert = require('node:assert/strict');
const {spawn} = require('node:child_process');
const records = new Map(); let down = false;
const mock = http.createServer(async(req,res)=>{let body=''; for await(const part of req) body+=part; res.setHeader('Content-Type','application/json'); if(down){res.writeHead(503);res.end('{}');return;} const [op,...a]=JSON.parse(body); let result;
switch(op){case 'HVALS':result=[...records.values()];break;case 'HSET':records.set(a[1],a[2]);result=1;break;case 'EVAL':{const old=JSON.parse(records.get(a[3])||'null');result=old&&old.updatedAt===a[4]&&old.section===a[5]?1:0;if(result)records.set(a[3],a[6]);break;}case 'INCR':result=1;break;case 'EXPIRE':result=1;break;case 'GET':result=null;break;default:throw Error(op);}res.end(JSON.stringify({result}));});
const base='http://127.0.0.1:3011';let server;let cookie='';
async function request(path,options={}){return fetch(base+path,{...options,headers:{Origin:base,Cookie:cookie,...options.headers}});}
async function save(value){const r=await request('/api/content',{method:'PUT',body:JSON.stringify(value)});return {status:r.status,value:await r.json()};}
function entry(title,date,section='blog',published=true){return {slug:'',section,published,publishedAt:date,image:'',link:'',tag:'Test',updatedAt:'',translations:{ru:{title,summary:'Описание',content:'Первый абзац\n\nВторой абзац {1+1} <script>alert(1)</script>'},en:{title:'EN '+title,summary:'',content:''},ky:{title:'KG '+title,summary:'',content:''}}};}
(async()=>{await new Promise(r=>mock.listen(3012,'127.0.0.1',r));server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3011'],{env:{...process.env,UPSTASH_REDIS_REST_URL:'http://127.0.0.1:3012',UPSTASH_REDIS_REST_TOKEN:'local-test-only',DREAM_ADMIN_PASSWORD:'local-test-password-123'},stdio:['ignore','pipe','pipe']});server.stdout.on('data',()=>{});server.stderr.on('data',()=>{});
for(let i=0;i<100;i++){try{await fetch(base);break;}catch{await new Promise(r=>setTimeout(r,100));}}
assert.equal((await save(entry('No auth','2026-11-10'))).status,401);
const login=await request('/api/dreams/session',{method:'POST',body:JSON.stringify({password:'local-test-password-123'})});assert.equal(login.status,200);cookie=login.headers.get('set-cookie').split(';')[0];
assert.equal((await request('/api/content',{method:'PUT',headers:{Origin:'https://evil.example'},body:JSON.stringify(entry('bad','2026-11-10'))})).status,401);
assert.equal((await save(entry('bad date','2026-02-30'))).status,400);
assert.equal((await save({...entry('bad URL','2026-11-10'),link:'javascript:alert(1)'})).status,400);
const oldest=(await save(entry('CMS Oldest','2026-11-08'))).value;
const middle=(await save(entry('CMS Middle','2026-11-09'))).value;
const latestResult=await save(entry('CMS Latest','2026-11-10'));assert.equal(latestResult.status,200);const latest=latestResult.value;
const draft=(await save(entry('CMS Draft','2026-11-11','blog',false))).value;
const project=(await save(entry('CMS Project','2026-11-10','work'))).value;
for(const locale of ['ru','en','ky']){
 const headers={Cookie:`site_language=${locale}`};
 const home=await (await request('/',{headers})).text();assert(home.includes('CMS Latest'));assert(home.includes('CMS Middle'));assert(!home.includes('CMS Oldest'));assert(!home.includes('CMS Draft'));assert(home.indexOf('CMS Latest')<home.indexOf('CMS Middle'));
 const blog=await(await request('/blog',{headers})).text();assert(blog.indexOf('CMS Latest')<blog.indexOf('CMS Middle'));assert(blog.includes('CMS Oldest'));assert(!blog.includes('CMS Draft'));
 const work=await(await request('/work',{headers})).text();assert(work.includes('CMS Project'));assert(work.includes('SelfVisa'));
 const detail=await request('/blog/'+latest.slug,{headers});assert.equal(detail.status,200);const html=await detail.text();assert(html.includes('Первый абзац'));assert(!html.includes('<script>alert(1)</script>'));assert(html.includes(locale==='ru'?'CMS Latest':locale==='en'?'EN CMS Latest':'KG CMS Latest'));
 assert.equal((await request('/work/'+project.slug,{headers})).status,200);
 assert.equal((await request('/blog/'+draft.slug,{headers})).status,404);
 for(const page of ['/admin/blog','/admin/work']) assert.equal((await request(page,{headers})).status,200);
}
const revised={...latest,translations:{...latest.translations,ru:{...latest.translations.ru,title:'CMS Updated'}}};
const updated=await save(revised);assert.equal(updated.status,200);assert.equal((await save(revised)).status,409);
assert((await(await request('/blog/'+latest.slug,{headers:{Cookie:'site_language=ru'}})).text()).includes('CMS Updated'));
assert.equal((await save({...updated.value,published:false})).status,200);assert.equal((await request('/blog/'+latest.slug)).status,404);
assert((await(await request('/',{headers:{Cookie:'site_language=ru'}})).text()).includes('CMS Oldest'));
assert((await(await request('/sitemap.xml')).text()).includes(project.slug));
const firstDay=(await save(entry('Same day first','2026-11-12'))).value;
await new Promise(r=>setTimeout(r,5));
const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aEqkAAAAASUVORK5CYII=';
const secondDay=(await save({...entry('Same day second','2026-11-12'),image:png})).value;
const sameDayHome=await(await request('/',{headers:{Cookie:'site_language=ru'}})).text();assert(sameDayHome.indexOf('Same day second')<sameDayHome.indexOf('Same day first'));
const imagePage=await(await request('/blog/'+secondDay.slug)).text();assert(imagePage.includes(png));
down=true;assert.equal((await request('/')).status,200);assert.equal((await save(entry('Down','2026-11-12'))).status,503);
console.log('PASS: authentication, CSRF, validation, create/edit, conflict handling, drafts, latest two, date ordering, RU/ENG/KG, all detail/admin routes, safe text, sitemap, storage failure.');
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>{server?.kill('SIGTERM');mock.close();});
