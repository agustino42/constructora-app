'use client';

import Link from 'next/link';
import { ShoppingCart, UserCircle, Menu, X, Trash2 } from 'lucide-react';
import SearchBar from './SearchBar';
import { useQuote } from './QuoteContext';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { items, removeItem, total } = useQuote();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();

  // Si estamos en cualquier página del panel de administración, apagamos esta barra 
  // porque el panel de administrador ya tiene su propio diseño.
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        {/* Top bar (Dark) */}
        <div className="bg-brand-secondary text-white text-xs py-2 px-6 flex justify-end space-x-4 items-center">
          <Link href="/admin/login" className="flex items-center hover:text-brand-primary transition">
            <UserCircle size={14} className="mr-1" />
            Acceso Admin
          </Link>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <div className="font-black text-2xl tracking-tighter">
                  <span className="text-brand-secondary">COIN</span>
                  <span className="text-brand-primary">BACA</span>
                </div>
              </Link>
            </div>

            {/* Nav Links (Desktop) */}
            <div className="hidden md:flex flex-1 justify-center space-x-8">
              <Link href="/" className="text-gray-800 font-medium hover:text-brand-primary transition">Inicio</Link>
              <Link href="/catalogo" className="text-gray-800 font-medium hover:text-brand-primary transition">Catálogo</Link>
              <Link href="/nosotros" className="text-gray-800 font-medium hover:text-brand-primary transition">Nuestra Empresa</Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              
              <SearchBar />

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-brand-primary transition-colors flex items-center"
              >
                <ShoppingCart size={22} />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                    {items.reduce((acc, i) => acc + i.quantity, 0)}
                  </span>
                )}
              </button>

              <button className="md:hidden p-2 text-gray-600">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* DRAWER / CARRITO DE COTIZACIONES */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          
          <div className="w-full max-w-md bg-white h-full shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-200">
            
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                 <h2 className="text-xl font-black text-gray-900">Lista para Cotizar</h2>
                 <p className="text-sm text-gray-500 font-medium mt-1">{items.length} artículos añadidos</p>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:text-gray-800 transition-colors bg-white rounded-full shadow-sm">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                   <ShoppingCart size={64} className="mb-4 text-gray-300" />
                   <p className="text-lg font-bold text-gray-500">Tu lista está vacía</p>
                   <p className="text-sm">Agrega productos desde el catálogo.</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 bg-white border border-gray-100 p-3 rounded-2xl shadow-sm">
                    <div 
                      className="w-16 h-16 rounded-xl bg-gray-100 bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url(${item.imageUrl === '/images/tubo.png' ? 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop' : item.imageUrl})` }}>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-brand-primary font-bold mt-1">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 pb-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 font-bold uppercase tracking-wider text-sm">Total Estimado</span>
                <span className="text-3xl font-black text-brand-primary">${total.toFixed(2)}</span>
              </div>
              
              {items.length > 0 ? (
                <Link href="/cotizacion" onClick={() => setIsCartOpen(false)}>
                  <button className="w-full bg-brand-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 elevate text-lg">
                    Proceder a Solicitar Cotización
                  </button>
                </Link>
              ) : (
                <button disabled className="w-full bg-gray-200 text-gray-400 font-bold py-4 rounded-xl text-lg cursor-not-allowed">
                  Añade algún producto primero
                </button>
              )}
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}
