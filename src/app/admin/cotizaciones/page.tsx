import { supabaseAdmin } from '@/lib/supabase';
import AdminShell from '@/components/AdminShell';
import { Clock, CheckCircle, FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default async function AdminCotizaciones() {
  const { data: quotes } = await supabaseAdmin
    .from('quotes')
    .select(`
      *,
      quote_items (
        id,
        quantity,
        price
      )
    `)
    .order('created_at', { ascending: false });

  const pendingCount = quotes?.filter(q => q.status === 'PENDING').length || 0;

  return (
    <AdminShell pendingQuotes={pendingCount}>
      <div className="p-8 max-w-7xl mx-auto">
        
        <div className="mb-8">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Centro de Solicitudes y Cotizaciones</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">Gestiona las órdenes entrantes desde la web pública.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4 border-b border-gray-100">Info Solicitante</th>
                <th className="px-6 py-4 border-b border-gray-100">Fecha</th>
                <th className="px-6 py-4 border-b border-gray-100">Estado P/A</th>
                <th className="px-6 py-4 border-b border-gray-100">Monto Base</th>
                <th className="px-6 py-4 border-b border-gray-100 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {quotes?.map(quote => (
                <tr key={quote.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                     <p className="font-black text-gray-900 text-sm flex items-center">
                        {quote.customer_name}
                        {quote.status === 'PENDING' && <span className="ml-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                     </p>
                     <p className="text-xs text-gray-500 font-medium">{quote.customer_email} / {quote.customer_phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700 font-bold">
                      {new Intl.DateTimeFormat('es-VE', {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(quote.created_at))}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                      {quote.quote_items?.length || 0} artículos
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {quote.status === 'PENDING' ? (
                      <span className="inline-flex items-center px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold ring-1 ring-red-100">
                        <Clock size={12} className="mr-1.5" /> FÁBRICA / NUEVA
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold ring-1 ring-green-100">
                        <CheckCircle size={12} className="mr-1.5" /> CONTACTADO
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                     <p className="font-black text-brand-primary text-sm">${quote.total.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {/* Botón hacia la vista detallada que crearemos más adelante, o abriremos modal */}
                    <button className="text-gray-400 group-hover:text-brand-primary transition-colors flex items-center justify-end w-full font-bold text-sm">
                      Revisar <ChevronRight size={16} className="ml-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AdminShell>
  );
}
