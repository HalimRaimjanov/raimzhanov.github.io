'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Post } from '@/lib/content';
import { getYouTubeId } from '@/app/utils/youtube';
import styles from './BlogCard.module.scss';
export function BlogCard({post,date,locale}:{post:Post;date:string;locale:'ru'|'en'|'ky'}) {
 const video=getYouTubeId(post.youtubeUrl || '');
 const cover=post.metadata.image || (video?`https://i.ytimg.com/vi/${video}/hqdefault.jpg`:'/images/halim.png');
 const [failed,setFailed]=useState(false);
 const label=video?(locale==='ru'?'Видео':locale==='ky'?'Видео':'Video'):(locale==='ru'?'Статья':locale==='ky'?'Макала':'Article');
 return <Link href={`/blog/${post.slug}`} className={styles.card}><div className={styles.visual}><img src={failed?'/images/halim.png':cover} alt={post.metadata.title} loading="lazy" onError={()=>setFailed(true)}/><span className={styles.kind}>{label}</span>{video && <span className={styles.play} aria-label="YouTube">▶</span>}</div><div className={styles.body}><div className={styles.meta}>{date && <time dateTime={post.metadata.publishedAt}>{date}</time>}{post.metadata.tag && <span>{post.metadata.tag}</span>}</div><h2>{post.metadata.title}</h2>{post.metadata.summary && <p>{post.metadata.summary}</p>}<span className={styles.more}>{locale==='ru'?(video?'Смотреть публикацию':'Читать статью'):locale==='ky'?'Кененирээк':'Read more'} <span aria-hidden="true">↗</span></span></div></Link>;
}
