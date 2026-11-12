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
const galleries=Object.fromEntries(locales.map(locale=>{
 const base=locale==='ru'?'src':`src/locales/${locale}`;
 const source=fs.readFileSync(path.join(root,base,'app/resources/content.js'),'utf8').split('const gallery =')[1];
 return [locale,[...source.matchAll(/src:\s*"([^"]+)",\s*alt:\s*"([^"]+)"/g)].map(m=>({src:m[1],alt:m[2]}))];
}));
galleries.ru.forEach((photo,i)=>records.push({slug:`gallery-${i+1}`,section:'gallery',kind:'photo',format:'text',publishedAt:'',published:true,image:photo.src,images:[],team:[],link:'',tag:'',translations:Object.fromEntries(locales.map(locale=>[locale,{title:galleries[locale][i]?.alt||photo.alt,summary:'',content:''}])),updatedAt:'seed-v3',createdAt:new Date(Date.UTC(2026,10,12)-i*1000).toISOString()}));
const channelText={ru:['О технологиях простыми словами','Я веду YouTube-канал, где рассказываю о технологиях, цифровой приватности и безопасности в интернете.'],en:['Technology in plain language','My YouTube channel about technology, digital privacy and online safety.'],ky:['Технологиялар тууралуу жөнөкөй тил менен','YouTube каналымда технологиялар, санариптик купуялык жана интернеттеги коопсуздук тууралуу айтып берем.']};
records.push({slug:'youtube-channel',section:'work',kind:'channel',format:'text',publishedAt:'',published:true,image:'/images/youtube/channel-cover.webp',images:['/images/youtube/channel-cover.webp'],team:[],link:'https://www.youtube.com/@HalimRaimzhan',tag:'YouTube',translations:Object.fromEntries(locales.map(l=>[l,{title:channelText[l][0],summary:channelText[l][1],content:channelText[l][1]}])),updatedAt:'seed-v3',createdAt:'2026-11-12T00:00:00.000Z'});
fs.writeFileSync(path.join(root,'src/generated/admin-seeds.json'),JSON.stringify(records,null,2)+'\n');
console.log(`Prepared ${records.length} existing publications for the admin.`);
