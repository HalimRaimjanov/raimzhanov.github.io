import { getContent } from '@/lib/content-server';
import styles from './YouTubeChannel.module.scss';
export async function YouTubeChannel() {
 const channels=(await getContent('ky','work')).filter(p=>p.kind==='channel');
 return <>{channels.map(post=><section key={post.slug} className={styles.section}><a className={styles.card} href={post.metadata.link} target="_blank" rel="noreferrer"><div className={styles.cover}>{post.metadata.image && <img src={post.metadata.image} alt={post.metadata.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/>}<span className={styles.badge}>YouTube</span><span className={styles.play} aria-hidden="true">▶</span></div><div className={styles.details}><h2>{post.metadata.title}</h2><p>{post.metadata.summary}</p><span className={styles.action}>YouTube ↗</span></div></a></section>)}</>;
}
