import { supabaseAdmin } from '@/lib/supabase';
import CatalogClient from '@/components/CatalogClient';
import Link from 'next/link';
import { getSettings } from '@/lib/settings';

export default async function Home() {
  // Obtener productos y categorías desde Supabase
  const [productsResponse, categoriesResponse, settings] = await Promise.all([
    supabaseAdmin
      .from('products')
      .select(`
        *,
        categories (
          id,
          name
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false }),
    supabaseAdmin
      .from('categories')
      .select('*')
      .order('name'),
    getSettings()
  ]);

  const products = productsResponse.data?.map(product => ({
    ...product,
    category: product.categories
  })) || [];
  
  const categories = categoriesResponse.data || [];

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative bg-brand-secondary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(#e67e22_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center md:text-left flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 pr-0 md:pr-10">
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-tight">
              {settings.heroSlogan}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
              {settings.heroDescription || 'Fabricación directa de tubos de concreto, productos agropecuarios y ornamentales. Expertos con años en Barinas.'}
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <Link href="/catalogo">
                <button className="bg-brand-primary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
                  Ver Catálogo Completo
                </button>
              </Link>
            </div>
          </div>

          <div className="hidden md:block w-1/2 mt-10 md:mt-0 relative px-4 lg:px-12">
            <div className="w-full aspect-square mx-auto rounded-full shadow-[0_0_80px_rgba(230,126,34,0.15)] overflow-hidden relative border-8 border-white/5 ring-4 ring-brand-primary/20 group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: `url(${settings.bannerUrl || 'https://images.unsplash.com/photo-1541888081622-49da41ec7c6b?q=80&w=800&auto=format&fit=crop'})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Aquí insertamos el CatalogClient directamente en la Home */}
      <section className="w-full bg-[#f4f7f6]">
        <div className="max-w-7xl mx-auto pt-10 px-4">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight text-center">Catálogo Destacado</h2>
        </div>
        {/* Quitamos los bordes o breadcrumbs en una versión prop pero aquí lo reusamos nativo */}
        <CatalogClient initialProducts={products} categories={categories} />
      </section>

    </div>
  );
}
