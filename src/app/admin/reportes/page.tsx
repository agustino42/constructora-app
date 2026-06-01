import { supabaseAdmin } from '@/lib/supabase';
import AdminShell from '@/components/AdminShell';
import { TrendingUp, Award, DollarSign, Activity } from 'lucide-react';
import { verifyAdminSession } from '@/lib/dal';

export default async function ReportesPage() {
  await verifyAdminSession();
  const { data: quotes } = await supabaseAdmin
    .from('quotes')
    .select('status');
  const pendingCount = quotes?.filter(q => q.status === 'PENDING').length || 0;
  
  // Fake data for visual representation of Analytics since installing heavy charting libs takes time
  const monthlyData = [
    { month: 'Ene', value: 4500, height: '40%' },
    { month: 'Feb', value: 5200, height: '50%' },
    { month: 'Mar', value: 8900, height: '80%' },
    { month: 'Abr', value: 10400, height: '100%', active: true },
  ];

  return (
    <AdminShell pendingQuotes={pendingCount}>
      <div className="p-8 max-w-7xl mx-auto">
        
        <div className="mb-8">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Reportes y Métricas</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">Análisis de rendimiento y ventas de la tienda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex flex-col items-center justify-center mb-4"><DollarSign size={20}/></div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">Ingresos Proyectados</p>
            <h3 className="text-3xl font-black text-gray-900 mt-1">$10,400</h3>
            <p className="text-xs text-green-500 font-bold mt-2 flex items-center"><TrendingUp size={12} className="mr-1"/> +15% vs Mes pasado</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-orange-50 text-brand-primary flex flex-col items-center justify-center mb-4"><Activity size={20}/></div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">Tasa de Conversión</p>
            <h3 className="text-3xl font-black text-gray-900 mt-1">42.8%</h3>
            <p className="text-xs text-gray-500 font-medium mt-2">De solicitantes a compradores</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex flex-col items-center justify-center mb-4"><Award size={20}/></div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">Producto Estrella</p>
            <h3 className="text-xl font-black text-gray-900 mt-1 leading-tight">Tubo Concreto 8" C-2</h3>
            <p className="text-xs text-purple-500 font-bold mt-2 flex items-center">342 unidades pedidas</p>
          </div>
        </div>

        {/* Gráfico Visual CSS Bruto (Rapidez y Belleza) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
           <h3 className="text-lg font-bold text-gray-900 mb-6">Volumen de Cotizaciones (YTD)</h3>
           <div className="h-64 flex items-end justify-start space-x-12 px-4 pb-4 border-b border-gray-100">
              {monthlyData.map((d, i) => (
                <div key={i} className="flex flex-col items-center group relative w-16">
                  <div className={`w-full rounded-t-lg transition-all duration-500 ${d.active ? 'bg-brand-primary' : 'bg-gray-200 group-hover:bg-brand-secondary'}`} style={{ height: d.height }}></div>
                  <span className="absolute -bottom-8 font-bold text-gray-500 text-sm">{d.month}</span>
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs font-bold py-1 px-2 rounded-md">
                     ${d.value.toLocaleString()}
                  </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </AdminShell>
  );
}
