import { BlogCard } from '@/components/blog/BlogCard';
import { formatDate } from '@/locales/en/app/utils/formatDate';
import { Post as Publication } from '@/lib/content';
export default function Post({post}:{post:Publication;thumbnail:boolean}){return <BlogCard post={post} date={post.metadata.publishedAt?formatDate(post.metadata.publishedAt,false):''} locale="en"/>;}
