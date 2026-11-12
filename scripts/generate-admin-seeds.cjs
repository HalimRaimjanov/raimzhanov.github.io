const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const catalog = require(path.join(root,'src/generated/content.json'));
const locales = ['ru','en','ky'];
const records = [];
for (const [section,key] of [['blog','blog/posts'],['work','work/projects']]) {
 for (const original of catalog.ru[key]) {
  const m = original.metadata;
  const translations = Object.fromEntries(locales.map(locale => {
   const post = catalog[locale][key].find(p => p.slug === original.slug) || original;
   return [locale, {title:post.metadata.title,summary:post.metadata.summary,content:post.content.trim()}];
  }));
  records.push({slug:original.slug, section, kind:section === 'work' ? 'project':'article', format:'markdown', publishedAt:m.publishedAt, published:true, image:m.image || '', images:m.images || [], team:m.team || [], link:m.link || '', tag:m.tag || '', youtubeUrl:'', sourceUrl:'', translations, updatedAt:'seed-v2', createdAt:new Date(m.publishedAt).toISOString()});
 }
}
const videos = Object.fromEntries(locales.map(locale => {
 const base = locale === 'ru' ? 'src' : `src/locales/${locale}`;
 const source = fs.readFileSync(path.join(root,base,'app/resources/videos.ts'),'utf8');
 return [locale, JSON.parse(source.slice(source.indexOf('= [')+2).trim().replace(/;$/, ''))];
}));
videos.ru.forEach((video,i) => {
 const id = video.youtubeUrl.split('/').pop();
 records.push({slug:`video-${id.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}`,section:'blog',kind:'video',format:'text',publishedAt:'',published:true,image:'',images:[],team:[],link:'',tag:'',youtubeUrl:video.youtubeUrl,sourceUrl:video.sourceUrl || '',translations:Object.fromEntries(locales.map(locale=>{const v=videos[locale][i];return [locale,{title:v.title,summary:v.description,content:v.description}];})),updatedAt:'seed-v2',createdAt:new Date(Date.UTC(2026,10,12)-i*1000).toISOString()});
});
fs.writeFileSync(path.join(root,'src/generated/admin-seeds.json'),JSON.stringify(records,null,2)+'\n');
console.log(`Prepared ${records.length} existing publications for the admin.`);
