import { DreamView } from '@/components/dreams/DreamView';
import { readDream } from '@/lib/dream-server';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Мечты · Халим Раимжанов', description: 'Моя мечта, маленькие шаги к большой цели и возможность поддержать.' };
export default async function DreamsPage() {
  try { return <DreamView initial={await readDream()} live />; }
  catch { return <div lang="ru" role="status">Не удалось загрузить накопления. Пожалуйста, обновите страницу чуть позже.</div>; }
}
