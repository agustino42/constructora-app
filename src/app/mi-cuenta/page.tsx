import { supabaseAdmin } from '@/lib/supabase'
import { verifyUserSession } from '@/lib/dal'
import { User, Package, Calendar } from 'lucide-react'
import Link from 'next/link'
import LogoutButton from './logout-button'

export const dynamic = 'force-dynamic'

export default async function MiCuentaPage() {
  const user = await verifyUserSession()

  const { data: quotes } = await supabaseAdmin
    .from('quotes')
    .select('id, customer_name, status, total, created_at')
    .eq('customer_email', user.email)
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <div className="flex-1 bg-[#f4f7f6]">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Mi Cuenta</h1>
            <p className="text-gray-500 font-medium mt-1">Bienvenido a tu panel de cliente</p>
          </div>
          <LogoutButton />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <User size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.email}</h2>
              <p className="text-sm text-gray-500 font-medium">Cliente registrado</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Package size={22} className="text-brand-primary" />
              <h2 className="text-xl font-bold text-gray-900">Mis Cotizaciones</h2>
            </div>
          </div>

          {!quotes || quotes.length === 0 ? (
            <div className="p-12 text-center">
              <Package size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 font-bold text-lg mb-2">No tienes cotizaciones aún</p>
              <p className="text-gray-400 text-sm mb-6">Visita nuestro catálogo y solicita tu primera cotización</p>
              <Link
                href="/catalogo"
                className="inline-block bg-brand-primary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all"
              >
                Ir al Catálogo
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {quotes.map((quote) => (
                <div key={quote.id} className="p-6 md:p-8 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-bold text-gray-900">Cotización #{quote.id.slice(0, 8)}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Intl.DateTimeFormat('es-VE', { dateStyle: 'medium' }).format(new Date(quote.created_at))}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        quote.status === 'PENDING'
                          ? 'bg-red-50 text-red-600'
                          : quote.status === 'CONTACTED'
                          ? 'bg-yellow-50 text-yellow-600'
                          : 'bg-green-50 text-green-600'
                      }`}>
                        {quote.status === 'PENDING' ? 'Pendiente' : quote.status === 'CONTACTED' ? 'Contactado' : 'Resuelto'}
                      </span>
                    </div>
                  </div>
                  <p className="text-xl font-black text-brand-primary">${quote.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
