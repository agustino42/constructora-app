import { Lock, Mail } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#f4f7f6] p-4 relative overflow-hidden">
      
      {/* Background Decorativo */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-secondary/20 rounded-full blur-[100px]"></div>

      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-brand-secondary/10 w-full max-w-md relative z-10 border border-gray-100">
        
        {/* Logo / Título */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 text-brand-secondary mb-4 drop-shadow-sm">
             <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Panel Admin</h1>
          <p className="text-gray-500 mt-2 font-medium">Gestión avanzada de COINBACA</p>
        </div>

        {/* Formulartio (Simulado por ahora hasta meter NextAuth) */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 tracking-wide mb-2">Correo Electrónico</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input 
                type="email" 
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary focus:bg-white outline-none transition-all font-medium text-gray-900"
                placeholder="admin@coinbaca.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 tracking-wide mb-2">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input 
                type="password" 
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary focus:bg-white outline-none transition-all font-medium text-gray-900"
                placeholder="••••••••"
              />
            </div>
            <div className="flex justify-end mt-2">
              <a href="#" className="text-xs text-brand-primary font-bold hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
          </div>

          <Link href="/admin">
            <button type="button" className="w-full bg-brand-secondary hover:bg-gray-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all elevate mt-8 group flex items-center justify-center">
              Ingresar al Sistema
            </button>
          </Link>
        </form>

        {/* Botón hacia la tienda */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-brand-primary transition-colors">
            &larr; Volver a la Tienda Pública
          </Link>
        </div>
      </div>
    </div>
  );
}
