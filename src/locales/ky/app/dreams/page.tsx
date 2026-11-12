import { DreamView } from '@/locales/ky/components/dreams/DreamView';
import { readDream } from '@/lib/dream-server';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Кыялдар · Халим Раимжанов', description: 'Менин кыялым, чоң максатка карай чакан кадамдар жана колдоо мүмкүнчүлүгү.' };
export default async function DreamsPage() {
  try { return <DreamView initial={await readDream()} live />; }
  catch { return <div lang="ky" role="status">Топтолгон каражат жүктөлгөн жок. Баракты бир аздан кийин жаңыртыңыз.</div>; }
}
