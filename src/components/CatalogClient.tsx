'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import { Search, X, Check, Filter, Plus } from 'lucide-react';
import Link from 'next/link';
import { useQuote } from './QuoteContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category?: { name: string, id: string };
  categoryId: string;
  stock: number;
}

interface Category {
  id: string;
  name: string;
}

export default function CatalogClient({ initialProducts, categories }: { initialProducts: Product[], categories: Category[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const { addItem } = useQuote();

  // Filtrado
  const filteredProducts = initialProducts.filter(p => {
    const matchesCategory = selectedCategory === 'ALL' || p.categoryId === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-screen-2xl mx-auto px-4 w-full py-8 text-gray-800">
      
      {/* Breadcrumb estilo amazon */}
      <div className="text-sm text-gray-500 font-medium mb-6">
        Inicio &rsaquo; <span className="text-brand-primary font-bold">Catálogo de Productos</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar de Filtros (Estilo Amazon) */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm sticky top-28">
            <div className="flex items-center space-x-2 mb-4 font-black text-lg">
              <Filter size={18} />
              <h2>Filtros</h2>
            </div>
            
            <div className="space-y-6">
              {/* Categorías */}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-3">Departamentos</h3>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => setSelectedCategory('ALL')}
                      className={`text-sm w-full text-left font-medium transition-colors ${selectedCategory === 'ALL' ? 'text-brand-primary font-bold' : 'text-gray-700 hover:text-brand-primary'}`}
                    >
                      Cualquier Departamento
                    </button>
                  </li>
                  {categories.map(c => (
                    <li key={c.id}>
                      <button 
                        onClick={() => setSelectedCategory(c.id)}
                        className={`text-sm w-full text-left font-medium transition-colors ${selectedCategory === c.id ? 'text-brand-primary font-bold' : 'text-gray-700 hover:text-brand-primary'}`}
                      >
                        {c.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </aside>

        {/* Contenu Principal */}
        <main className="flex-1">
          {/* Top Bar: Buscar y Resultados */}
          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-sm font-bold text-gray-500">
              <span className="text-gray-900">{filteredProducts.length}</span> resultados
            </span>
            
            <div className="relative w-full sm:w-96">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text" 
                placeholder="Buscar en el catálogo..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
              />
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500 font-bold">No se encontraron productos para tu búsqueda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map(p => (
                <div key={p.id} onClick={() => setSelectedProduct(p)} className="cursor-pointer">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* MODAL DEL PRODUCTO POPUP */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
          
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative z-10 flex flex-col md:flex-row animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors z-20"
            >
              <X size={20} />
            </button>

            {/* Modal Imagen */}
            <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-100">
               <div 
                  className="w-full aspect-square max-w-sm rounded-xl shadow-lg bg-cover bg-center mix-blend-multiply"
                  style={{ backgroundImage: `url(${selectedProduct.imageUrl === '/images/tubo.png' ? 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop' : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="%23f3f4f6"%3E%3Crect width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%239ca3af"%3EImagen no disponible%3C/text%3E%3C/svg%3E'})` }}>
               </div>
            </div>

            {/* Modal Detalles */}
            <div className="w-full md:w-1/2 p-8 flex flex-col">
              <span className="text-brand-secondary text-xs uppercase font-black tracking-widest mb-2 block">
                 {selectedProduct.category?.name || 'Producto General'}
              </span>
              <h2 className="text-3xl font-black text-gray-900 leading-tight mb-2">{selectedProduct.name}</h2>
              
              <div className="flex items-center space-x-2 text-sm mb-6">
                <span className="flex items-center text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
                  <Check size={14} className="mr-1" /> En Stock ({selectedProduct.stock})
                </span>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {selectedProduct.description}
              </p>

              <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="mb-6">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Precio Unitario</p>
                  <p className="text-5xl font-black text-brand-primary">${selectedProduct.price.toFixed(2)}</p>
                </div>
                
                <button 
                  onClick={() => {
                    addItem({ id: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price, imageUrl: selectedProduct.imageUrl });
                    setSelectedProduct(null); // Opcional: Cerrar y dejar la notificacion de que se agregó
                  }}
                  className="w-full bg-brand-secondary hover:bg-gray-800 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all elevate flex justify-center items-center text-lg space-x-2"
                >
                  <Plus size={20} />
                  <span>Añadir a mi Cotización</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
