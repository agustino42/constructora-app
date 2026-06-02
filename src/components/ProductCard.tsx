'use client'

import { motion } from 'framer-motion'

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category?: { name: string };
}

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group relative"
    >
      {product.category && (
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-brand-secondary z-10 uppercase tracking-widest shadow-sm">
          {product.category.name}
        </div>
      )}

      <motion.div
        className="relative w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {product.imageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${product.imageUrl})` }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-white/80 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xs text-gray-400 font-medium">Imagen no disponible</p>
            </div>
          </div>
        )}
      </motion.div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-brand-secondary font-semibold uppercase tracking-wider block">Precio</span>
            <span className="text-2xl font-black text-brand-primary leading-none">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-100 hover:bg-brand-primary hover:text-white text-gray-700 p-3 rounded-full transition-colors shadow-sm h-12 w-12 flex items-center justify-center cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
