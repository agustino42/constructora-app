'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { searchProducts } from '@/app/actions';
import Image from 'next/image';
import Link from 'next/link';

interface ProductResult {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  category: { name: string };
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ProductResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cerrar si se da click afuera
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length > 1) {
        setIsLoading(true);
        const data = await searchProducts(query);
        setResults(data);
        setIsOpen(true);
        setIsLoading(false);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    };

    // Debounce simple para no saturar la BD
    const timeoutId = setTimeout(() => {
      fetchResults();
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div ref={wrapperRef} className="hidden sm:block relative z-50">
      <div className="relative">
        <div className="inset-y-0 left-0 pl-3 flex items-center absolute pointer-events-none h-full">
          <Search size={16} className="text-gray-400" />
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if(results.length > 0) setIsOpen(true); }}
          placeholder="Buscar productos..." 
          className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary w-48 lg:w-96 transition-all"
        />
        
        {/* Loading Spinner Falso */}
        {isLoading && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            <div className="w-3 h-3 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* DROPDOWN - Autocompletado */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
          {results.length > 0 ? (
            <ul className="max-h-96 overflow-y-auto">
              <li className="px-4 py-2 bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider">Productos Sugeridos</li>
              {results.map((product) => (
                <li key={product.id}>
                  {/* Para simplificar, mandamos al catálogo con el buscador, o a cotización */}
                  <Link href={`/catalogo`} onClick={() => setIsOpen(false)}>
                    <div className="px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 cursor-pointer transition-colors border-b border-gray-50 last:border-0">
                      <div 
                        className="w-10 h-10 rounded bg-gray-100 bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url(${product.imageUrl === '/images/tubo.png' ? 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop' : product.imageUrl})` }}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900 leading-tight line-clamp-1">{product.name}</p>
                        <p className="text-xs text-brand-secondary font-medium">{product.category.name}</p>
                      </div>
                      <div className="font-black text-brand-primary text-sm">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center text-sm text-gray-500 font-medium">
              No encontramos "{query}" en nuestro catálogo.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
