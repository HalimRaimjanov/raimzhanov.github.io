import { getContent } from '@/lib/content-server';
export async function getPosts(customPath = ['', '', '', '']) {
 const section = customPath.slice(-2).join('/');
 if (section !== 'blog/posts' && section !== 'work/projects') throw new Error('Unknown content section');
 return getContent('ky', section === 'blog/posts' ? 'blog' : 'work');
}
