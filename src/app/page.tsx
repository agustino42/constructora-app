import { supabaseAdmin } from '@/lib/supabase';
import HomeClient from '@/components/HomeClient';
import { getSettings } from '@/lib/settings';

export default async function Home() {
  const [productsResponse, categoriesResponse, settings] = await Promise.all([
    supabaseAdmin
      .from('products')
      .select(`*, categories (id, name)`)
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
    imageUrl: product.image_url,
    category: product.categories
  })) || [];
  
  const categories = categoriesResponse.data || [];

  return <HomeClient products={products} categories={categories} settings={settings} />;
}
