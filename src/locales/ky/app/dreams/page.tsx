import { DreamCollection } from '@/components/dreams/DreamCollection';
import { getCollection } from '@/lib/content-server';
export const dynamic='force-dynamic';
export default async function Page() { return <DreamCollection initial={await getCollection('dreams')} locale="ky"/>; }

export const metadata={title:'Кыялдар'};
