import { supabaseAdmin } from '@/lib/supabase';
import CatalogClient from '@/components/CatalogClient';

export default async function CatalogoPage() {
  const [productsResponse, categoriesResponse] = await Promise.all([
    supabaseAdmin
      .from('products')
      .select(`*, categories (*)`)
      .eq('is_active', true)
      .order('created_at', { ascending: false }),
    supabaseAdmin
      .from('categories')
      .select('*')
      .order('name')
  ]);

  const products = productsResponse.data?.map(p => ({ ...p, imageUrl: p.image_url, category: p.categories })) || [];
  const categories = categoriesResponse.data || [];

  return (
    <div className="min-h-screen bg-[#f4f7f6]">
      <CatalogClient initialProducts={products} categories={categories} />
    </div>
  );
}
