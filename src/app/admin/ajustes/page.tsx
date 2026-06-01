import AdminShell from '@/components/AdminShell';
import { supabaseAdmin } from '@/lib/supabase';
import SettingsForm from '@/components/SettingsForm';
import { getSettings } from '@/lib/settings';

export default async function AjustesPage() {
  const { data: quotes } = await supabaseAdmin
    .from('quotes')
    .select('status');
  const pendingCount = quotes?.filter(q => q.status === 'PENDING').length || 0;
  const settings = await getSettings();

  return (
    <AdminShell pendingQuotes={pendingCount}>
      <div className="p-8 max-w-4xl mx-auto">
        <SettingsForm initialSettings={settings} />
      </div>
    </AdminShell>
  );
}
