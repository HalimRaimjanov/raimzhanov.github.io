import { ContentAdmin } from '@/components/admin/ContentAdmin';
export const metadata = { title: 'Управление публикациями', robots: { index: false, follow: false } };
export default function Page() { return <ContentAdmin section="blog" />; }
