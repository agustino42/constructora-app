import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ExitoCotizacion() {
  return (
    <div className="flex-1 bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={80} className="text-green-500" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">¡Solicitud Enviada!</h2>
        <p className="text-gray-600 font-medium mb-8">
          Hemos recibido tu solicitud de cotización correctamente. Nuestro equipo de ventas revisará los artículos y se pondrá en contacto contigo muy pronto.
        </p>
        <Link href="/">
          <button className="bg-brand-primary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all text-sm uppercase tracking-wide">
            Volver a la Tienda
          </button>
        </Link>
      </div>
    </div>
  );
}
