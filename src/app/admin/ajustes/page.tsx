import AdminShell from '@/components/AdminShell';
import { PrismaClient } from '@prisma/client';
import SettingsForm from '@/components/SettingsForm';
import { getSettings } from '@/lib/settings';

const prisma = new PrismaClient();

export default async function AjustesPage() {
  const pendingCount = await prisma.quote.count({ where: { status: 'PENDING' } });
  const settings = await getSettings();

  return (
    <AdminShell pendingQuotes={pendingCount}>
      <div className="p-8 max-w-4xl mx-auto">
        <SettingsForm initialSettings={settings} />
      </div>
    </AdminShell>
  );
}
