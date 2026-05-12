'use client';

import { Package, FileText, Users, LogOut, Search, Bell, ExternalLink, User, BarChart, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminShell({ children, pendingQuotes = 0 }: { children: React.ReactNode, pendingQuotes?: number }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden text-gray-800">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-brand-secondary text-white flex flex-col shadow-2xl z-20 shrink-0">
        <div className="p-6 border-b border-white/10">
          <div className="font-black text-2xl tracking-tighter">
            <span className="text-white">Admin</span><span className="text-brand-primary">COIN</span>
          </div>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Dashboard</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 font-medium overflow-y-auto">
          <Link href="/admin" className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${pathname === '/admin' ? 'bg-white/10 text-brand-primary font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <Package size={20} />
            <span>Productos</span>
          </Link>
          <Link href="/admin/cotizaciones" className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${pathname?.includes('/admin/cotizaciones') ? 'bg-white/10 text-brand-primary font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <FileText size={20} />
            <span>Cotizaciones</span>
            {pendingQuotes > 0 && <span className="ml-auto bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{pendingQuotes}</span>}
          </Link>
          <Link href="/admin/clientes" className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${pathname === '/admin/clientes' ? 'bg-white/10 text-brand-primary font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <Users size={20} />
            <span>Directorio Clientes</span>
          </Link>
          <Link href="/admin/reportes" className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${pathname === '/admin/reportes' ? 'bg-white/10 text-brand-primary font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <BarChart size={20} />
            <span>Reportes y Métricas</span>
          </Link>
          <Link href="/admin/ajustes" className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${pathname === '/admin/ajustes' ? 'bg-white/10 text-brand-primary font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <Settings size={20} />
            <span>Ajustes de Tienda</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/admin/login" className="flex items-center space-x-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-3 rounded-xl w-full transition-colors">
            <LogOut size={20} />
            <span className="font-bold">Cerrar Sesión</span>
          </Link>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOPBAR MEJORADO */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 z-10 shrink-0 shadow-sm">
          
          <div className="flex items-center">
             {/* Search rápido admin */}
             <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar por ID, nombre, cliente..." 
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm w-72 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4 md:space-x-6">
            
            {/* Botón Ver Tienda */}
            <Link href="/" target="_blank" className="hidden sm:flex items-center space-x-2 text-sm font-bold text-gray-500 hover:text-brand-primary transition-colors bg-gray-50 hover:bg-orange-50 px-4 py-2 rounded-lg border border-gray-100">
               <ExternalLink size={16} />
               <span>Ver Tienda Pública</span>
            </Link>

            {/* Notificaciones */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
               <Bell size={22} />
               {pendingQuotes > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
            </button>
            
            {/* Perfil Usuario Desplegable Simulacion */}
            <div className="flex items-center space-x-3 border-l border-gray-200 pl-4 md:pl-6 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-secondary to-gray-600 text-white flex items-center justify-center font-bold shadow-sm">
                <User size={20} />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-gray-800 leading-none">Admin Principal</p>
                <p className="text-xs text-brand-primary font-bold mt-1">Dueño / Gerencia</p>
              </div>
            </div>
          </div>
        </header>

        {/* WORKSPACE DINÁMICO */}
        <main className="flex-1 overflow-auto bg-[#f4f7f6]">
          {children}
        </main>

      </div>
    </div>
  );
}
