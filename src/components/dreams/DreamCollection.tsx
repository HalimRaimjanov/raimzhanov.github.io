'use client';
import { useEffect,useState } from 'react';
import { Entry,Locale } from '@/lib/content';
import { DreamView as Ru } from './DreamView';
import { DreamView as En } from '@/locales/en/components/dreams/DreamView';
import { DreamView as Ky } from '@/locales/ky/components/dreams/DreamView';
export function DreamCollection({initial,locale}:{initial:Entry[];locale:Locale}) {
 const [items,setItems]=useState(initial); useEffect(()=>setItems(initial),[initial]);
 useEffect(()=>{const controller=new AbortController();const update=async()=>{try{const r=await fetch('/api/dreams',{cache:'no-store',signal:controller.signal});if(r.ok){const data=await r.json();if(Array.isArray(data.items))setItems(data.items);}}catch{}};const timer=setInterval(update,60000);window.addEventListener('focus',update);return()=>{controller.abort();clearInterval(timer);window.removeEventListener('focus',update);};},[]);
 const View=locale==='en'?En:locale==='ky'?Ky:Ru;
 if(!items.length)return <p>{locale==='ru'?'Пока нет опубликованных мечтаний.':locale==='en'?'No dreams published yet.':'Азырынча жарыяланган кыялдар жок.'}</p>;
 return <div style={{display:'grid',gap:48,width:'100%',maxWidth:960}}>{items.map((e,i)=>e.dream && <View key={e.slug} initial={{...e.dream,image:e.image,title:e.translations.ru.title,description:e.translations.ru.summary,titleEn:e.translations.en.title,descriptionEn:e.translations.en.summary,titleKy:e.translations.ky.title,descriptionKy:e.translations.ky.summary}} showIntro={i===0}/>)}</div>;
}
