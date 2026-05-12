'use client';

import { useState } from 'react';
import { useQuote } from '@/components/QuoteContext';
import { submitQuote } from '@/app/actions';
import { CheckCircle, Truck, Store, ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CotizacionWizard() {
  const { items, total } = useQuote();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    empresa: '',
    rif: '',
    metodoEntrega: 'retiro',
    comentarios: ''
  });

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        customerName: formData.nombre,
        customerEmail: formData.email,
        customerPhone: formData.telefono,
        empresa: formData.empresa,
        rif: formData.rif,
        metodoEntrega: formData.metodoEntrega,
        comentarios: formData.comentarios,
        items: items.map(i => ({ productId: i.id, quantity: i.quantity, price: i.price })),
        total: total
      };
      
      const res = await submitQuote(payload);
      if (res.success) {
        // Podríamos limpiar el localstorage aquí, pero lo dejamos por seguridad.
        router.push('/cotizacion/exito');
      }
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  if (items.length === 0) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-gray-100 max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu lista está vacía</h2>
          <p className="text-gray-500 mb-6">Añade productos desde el catálogo para solicitar una cotización.</p>
          <button onClick={() => router.push('/catalogo')} className="bg-brand-primary text-white font-bold py-3 px-8 rounded-full">
            Ir al Catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Barra de progreso de Pasos */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-8 text-center">Solicitud de Cotización</h1>
          <div className="flex justify-between relative max-w-2xl mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
            <div className="absolute top-1/2 left-0 h-1 bg-brand-primary -translate-y-1/2 z-0 transition-all duration-300" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
            
            {[1, 2, 3, 4].map(num => (
              <div key={num} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= num ? 'bg-brand-primary text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}>
                {num}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs font-bold text-gray-500 max-w-2xl mx-auto mt-2 uppercase tracking-wide">
             <span className={step >= 1 ? 'text-brand-primary' : ''}>Revisión</span>
             <span className={step >= 2 ? 'text-brand-primary' : ''}>Datos</span>
             <span className={step >= 3 ? 'text-brand-primary' : ''}>Envío</span>
             <span className={step >= 4 ? 'text-brand-primary' : ''}>Confirma</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">
           {/* HEADER DE LA TARJETA */}
           <div className="bg-brand-secondary p-6 text-white">
              {step === 1 && <h2 className="text-2xl font-bold">Paso 1: Revisa tus Productos</h2>}
              {step === 2 && <h2 className="text-2xl font-bold">Paso 2: Datos del Solicitante</h2>}
              {step === 3 && <h2 className="text-2xl font-bold">Paso 3: Logística y Envío</h2>}
              {step === 4 && <h2 className="text-2xl font-bold">Paso 4: Confirmación Final</h2>}
           </div>

           {/* CONTENIDO VARIABLE */}
           <div className="flex-1 p-8">
              
              {/* PASO 1 - CARRITO */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                    <table className="w-full text-left">
                      <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
                        <tr>
                          <th className="p-4">Producto</th>
                          <th className="p-4">Cantidad</th>
                          <th className="p-4 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {items.map(item => (
                          <tr key={item.id} className="bg-white">
                            <td className="p-4 font-bold text-gray-900">{item.name}</td>
                            <td className="p-4 font-medium text-gray-600">{item.quantity} und.</td>
                            <td className="p-4 text-right font-black text-brand-primary">${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end pt-4">
                     <p className="text-2xl font-black text-gray-900">Monto Base Estimado: <span className="text-brand-primary">${total.toFixed(2)}</span></p>
                  </div>
                </div>
              )}

              {/* PASO 2 - FORMULARIO CONTACTO EMPRESA */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 tracking-wide mb-2">Empresa / Razón Social *</label>
                      <input name="empresa" value={formData.empresa} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="Construcciones Barinas, C.A." />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 tracking-wide mb-2">R.I.F. *</label>
                      <input name="rif" value={formData.rif} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="J-30323830-0" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 tracking-wide mb-2">Nombre del Solicitante *</label>
                      <input name="nombre" value={formData.nombre} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="Ing. Juan Pérez" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 tracking-wide mb-2">Teléfono de Contacto *</label>
                      <input name="telefono" value={formData.telefono} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="0414-XXXXXXX" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 tracking-wide mb-2">Correo Electrónico *</label>
                      <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="compras@empresa.com" />
                    </div>
                  </div>
                </div>
              )}

              {/* PASO 3 - ENVÍO */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                     <div 
                        onClick={() => setFormData(prev => ({...prev, metodoEntrega: 'retiro'}))}
                        className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-3 ${formData.metodoEntrega === 'retiro' ? 'border-brand-primary bg-orange-50 text-brand-primary' : 'border-gray-200 bg-white text-gray-500 hover:border-brand-primary/50'}`}>
                        <Store size={40} />
                        <span className="font-bold">Retiro en Planta (Barinas)</span>
                     </div>
                     <div 
                        onClick={() => setFormData(prev => ({...prev, metodoEntrega: 'flete'}))}
                        className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-3 ${formData.metodoEntrega === 'flete' ? 'border-brand-primary bg-orange-50 text-brand-primary' : 'border-gray-200 bg-white text-gray-500 hover:border-brand-primary/50'}`}>
                        <Truck size={40} />
                        <span className="font-bold">Solicitar Flete (Traslado)</span>
                     </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 tracking-wide mb-2">Comentarios / Dirección *</label>
                    <textarea 
                      name="comentarios" 
                      value={formData.comentarios} 
                      onChange={handleChange} 
                      rows={4} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none resize-none" 
                      placeholder={formData.metodoEntrega === 'flete' ? "Indica la dirección exacta de la obra para cotizarte el flete de los tubos..." : "Indica fecha aproximada en la que pasarías retirando el material..."}></textarea>
                  </div>
                </div>
              )}

              {/* PASO 4 - CONFIRMACIÓN FINAL */}
              {step === 4 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 text-center py-6">
                   <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-500 rounded-full mb-4">
                      <Send size={40} />
                   </div>
                   <h3 className="text-3xl font-black text-gray-900 mb-2">Todo casi listo, {formData.nombre.split(' ')[0]}</h3>
                   <p className="text-gray-600 font-medium max-w-lg mx-auto">
                     Al hacer clic en Enviar, nuestro sistema registrará la cotización para tu empresa <b>{formData.empresa}</b> y te enviaremos una copia por correo a <b>{formData.email}</b>.
                   </p>
                </div>
              )}
           </div>

           {/* FOOTER NAVEGACIÓN */}
           <div className="bg-gray-50 border-t border-gray-100 p-6 flex justify-between items-center rounded-b-3xl">
             {step > 1 ? (
               <button onClick={handlePrev} className="flex items-center text-gray-600 font-bold hover:text-brand-primary px-4 py-2 transition-colors">
                 <ArrowLeft size={18} className="mr-2" /> Volver atrás
               </button>
             ) : <div></div>}

             {step < 4 ? (
               <button 
                 onClick={handleNext} 
                 disabled={step === 2 && (!formData.nombre || !formData.empresa || !formData.email)}
                 className="flex items-center bg-brand-primary hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all"
               >
                 Continuar al Paso {step + 1} <ArrowRight size={18} className="ml-2" />
               </button>
             ) : (
               <button 
                 onClick={handleSubmit} 
                 disabled={isSubmitting}
                 className="flex items-center bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
               >
                 {isSubmitting ? 'Enviando Sistema...' : 'Enviar Solicitud Definitiva'}
               </button>
             )}
           </div>

        </div>
      </div>
    </div>
  );
}
