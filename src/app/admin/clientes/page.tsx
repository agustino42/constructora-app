import { PrismaClient } from '@prisma/client';
import AdminShell from '@/components/AdminShell';
import { Mail, Phone, Calendar, ArrowUpRight } from 'lucide-react';

const prisma = new PrismaClient();

export default async function ClientesPage() {
  // Extraer cotizaciones para agrupar clientes únicos (actuando como un CRM)
  const quotes = await prisma.quote.findMany({ orderBy: { createdAt: 'desc' } });
  const pendingCount = quotes.filter(q => q.status === 'PENDING').length;

  // Lógica de agrupación de clientes únicos basándonos en el email
  const clientesMap = new Map();
  quotes.forEach(quote => {
    if (!clientesMap.has(quote.customerEmail)) {
      clientesMap.set(quote.customerEmail, {
        nombre: quote.customerName,
        email: quote.customerEmail,
        telefono: quote.customerPhone,
        cotizacionesTotal: 1,
        montoTotal: quote.total,
        ultimaActividad: quote.createdAt,
      });
    } else {
      const c = clientesMap.get(quote.customerEmail);
      c.cotizacionesTotal += 1;
      c.montoTotal += quote.total;
    }
  });

  const clientesDirectorio = Array.from(clientesMap.values());

  return (
    <AdminShell pendingQuotes={pendingCount}>
      <div className="p-8 max-w-7xl mx-auto">
        
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Directorio CRM</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">Base de datos de todos los clientes que han contactado a COINBACA.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientesDirectorio.map((cliente, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
               <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-secondary text-white font-black text-lg flex items-center justify-center">
                    {cliente.nombre.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-brand-primary bg-orange-50 px-3 py-1 rounded-full flex items-center">
                    LTV: ${cliente.montoTotal.toFixed(0)} <ArrowUpRight size={12} className="ml-1" />
                  </span>
               </div>
               <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{cliente.nombre}</h3>
               
               <div className="mt-4 space-y-2">
                 <div className="flex items-center text-sm text-gray-500">
                   <Mail size={14} className="mr-2 text-gray-400" />
                   <span className="truncate">{cliente.email}</span>
                 </div>
                 <div className="flex items-center text-sm text-gray-500">
                   <Phone size={14} className="mr-2 text-gray-400" />
                   <span>{cliente.telefono || 'Sin teléfono'}</span>
                 </div>
                 <div className="flex items-center text-sm text-gray-500 pt-2 border-t border-gray-50 mt-2">
                   <Calendar size={14} className="mr-2 text-gray-400" />
                   <span>Última cont.: {new Intl.DateTimeFormat('es-VE').format(new Date(cliente.ultimaActividad))}</span>
                 </div>
               </div>
               
               <div className="mt-6 flex gap-2">
                 <button className="flex-1 bg-brand-primary/10 text-brand-primary font-bold text-xs py-2 rounded-lg hover:bg-brand-primary hover:text-white transition-colors">
                   Ver Historial ({cliente.cotizacionesTotal})
                 </button>
               </div>
            </div>
          ))}
          {clientesDirectorio.length === 0 && (
             <div className="col-span-full py-16 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
                Aún no hay clientes registrados en el sistema.
             </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
