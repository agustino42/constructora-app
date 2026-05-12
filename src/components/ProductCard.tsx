import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category?: { name: string };
}

export default function ProductCard({ product }: { product: Product }) {
  // Para los tubos y piezas genéricas si no hay imagen
  const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23f3f4f6'%3E%3Crect width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%239ca3af'%3EImagen no disponible%3C/text%3E%3C/svg%3E";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover flex flex-col group relative">
      {/* Etiqueta Categoría Flotante */}
      {product.category && (
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-brand-secondary z-10 uppercase tracking-widest shadow-sm">
          {product.category.name}
        </div>
      )}

      {/* Imagen del Producto */}
      <div className="relative w-full h-56 bg-gray-50 flex items-center justify-center p-6 border-b border-gray-100 overflow-hidden">
        {/* Un pequeño div que hace de imagen para test si falla fallback, o usamos el placeholder string */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${product.imageUrl && product.imageUrl !== '/images/tubo.png' && product.imageUrl !== '/images/bebedero.png' && product.imageUrl !== '/images/adoquin.png' ? product.imageUrl : placeholder})` }}
        />
        
        {/* Esto simula la imagen de un tubo como el de la foto */}
        {(!product.imageUrl || product.imageUrl.includes('tubo')) && (
           <div className="w-full h-full rounded-lg bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-multiply relative z-0 transition-transform duration-500 group-hover:scale-110"></div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        {/* Precio y Acción */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-brand-secondary font-semibold uppercase tracking-wider block">Precio</span>
            <span className="text-2xl font-black text-brand-primary leading-none">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <button className="bg-gray-100 hover:bg-brand-primary hover:text-white text-gray-700 p-3 rounded-full transition-all shadow-sm hover:shadow-md h-12 w-12 flex items-center justify-center">
             <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
