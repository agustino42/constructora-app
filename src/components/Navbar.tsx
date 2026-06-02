'use client';

import Link from 'next/link';
import { ShoppingCart, UserCircle, Menu, X, Trash2, Home, Package, Building2, LogIn, UserPlus, User } from 'lucide-react';
import SearchBar from './SearchBar';
import { useQuote } from './QuoteContext';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { createClient } from '@/lib/supabase-client';

export default function Navbar() {
  const { items, removeItem, total } = useQuote();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUserEmail(data.session.user.email || null)
      }
    })
  }, [])

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { href: '/', label: 'Inicio', icon: Home },
    { href: '/catalogo', label: 'Catálogo', icon: Package },
    { href: '/nosotros', label: 'Nuestra Empresa', icon: Building2 },
  ];

  return (
    <>
      <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        {/* Top bar */}
        <div className="bg-brand-secondary text-white text-xs py-2 px-6 flex justify-end space-x-4 items-center">
          {userEmail ? (
            <Link href="/mi-cuenta" className="flex items-center hover:text-brand-primary transition">
              <User size={14} className="mr-1" />
              {userEmail}
            </Link>
          ) : (
            <Link href="/iniciar-sesion" className="flex items-center hover:text-brand-primary transition">
              <UserCircle size={14} className="mr-1" />
              Iniciar Sesión
            </Link>
          )}
          <span className="text-white/20">|</span>
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
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition font-medium ${
                    pathname === link.href
                      ? 'text-brand-primary'
                      : 'text-gray-800 hover:text-brand-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">

              <SearchBar />

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-brand-primary transition-colors flex items-center cursor-pointer"
              >
                <ShoppingCart size={22} />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                    {items.reduce((acc, i) => acc + i.quantity, 0)}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-gray-600 hover:text-brand-primary transition-colors cursor-pointer"
                aria-label="Abrir menú"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="font-black text-xl tracking-tighter">
                  <span className="text-brand-secondary">COIN</span>
                  <span className="text-brand-primary">BACA</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
                  aria-label="Cerrar menú"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 py-4">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-6 py-4 transition-colors ${
                      pathname === link.href
                        ? 'text-brand-primary bg-orange-50 font-bold border-r-4 border-brand-primary'
                        : 'text-gray-700 hover:bg-gray-50 font-medium'
                    }`}
                  >
                    <link.icon size={20} />
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="p-6 border-t border-gray-100 space-y-3">
                {userEmail ? (
                  <Link
                    href="/mi-cuenta"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors"
                  >
                    <User size={18} />
                    Mi Cuenta
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/iniciar-sesion"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                    >
                      <LogIn size={18} />
                      Iniciar Sesión
                    </Link>
                    <Link
                      href="/registro"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-primary text-white font-bold hover:bg-orange-600 transition-colors"
                    >
                      <UserPlus size={18} />
                      Crear Cuenta
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>

          <div className="w-full max-w-md bg-white h-full shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-200">

            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                 <h2 className="text-xl font-black text-gray-900">Lista para Cotizar</h2>
                 <p className="text-sm text-gray-500 font-medium mt-1">{items.length} artículos añadidos</p>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:text-gray-800 transition-colors bg-white rounded-full shadow-sm cursor-pointer">
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
                      style={{ backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : 'none' }}
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-brand-primary font-bold mt-1">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
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
                  <button className="w-full bg-brand-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 elevate text-lg cursor-pointer">
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
