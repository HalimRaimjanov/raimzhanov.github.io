import { DreamView } from '@/locales/en/components/dreams/DreamView';
import { readDream } from '@/lib/dream-server';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Dreams · Khalim Raimzhanov', description: 'My dream, small steps towards a big goal, and a way to support it.' };
export default async function DreamsPage() {
  try { return <DreamView initial={await readDream()} live />; }
  catch { return <div lang="en" role="status">Unable to load savings. Please refresh the page later.</div>; }
}
