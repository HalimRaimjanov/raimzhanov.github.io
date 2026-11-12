import { getYouTubeId } from '@/app/utils/youtube';
export function PublicationVideo({youtubeUrl,title,sourceUrl}:{youtubeUrl?:string;title:string;sourceUrl?:string}) {
 const id=getYouTubeId(youtubeUrl ?? ''); if(!id) return null;
 return <div style={{width:'100%',marginBottom:24}}><iframe src={`https://www.youtube-nocookie.com/embed/${id}`} title={title} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" style={{width:'100%',aspectRatio:'16 / 9',border:0,borderRadius:16}} />{sourceUrl && <a href={sourceUrl} target="_blank" rel="noreferrer">Источник ↗</a>}</div>;
}
