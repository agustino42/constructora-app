import { supabaseAdmin } from '@/lib/supabase';
import AdminShell from '@/components/AdminShell';
import ProductManager from '@/components/ProductManager';
import { verifyAdminSession } from '@/lib/dal';

export default async function AdminDashboard() {
  await verifyAdminSession();
  const [productsResponse, categoriesResponse, quotesResponse] = await Promise.all([
    supabaseAdmin
      .from('products')
      .select(`*, categories (*)`)
      .order('created_at', { ascending: false }),
    supabaseAdmin
      .from('categories')
      .select('*')
      .order('name'),
    supabaseAdmin
      .from('quotes')
      .select('status')
  ]);

  const products = productsResponse.data?.map(p => ({ ...p, imageUrl: p.image_url, category: p.categories })) || [];
  const categories = categoriesResponse.data || [];
  const pendingCount = quotesResponse.data?.filter(q => q.status === 'PENDING').length || 0;

  // Debug: verificar si hay error al cargar categorías
  console.log('Respuesta completa de categorías:', categoriesResponse);
  if (categoriesResponse.error) {
    console.error('Error cargando categorías:', categoriesResponse.error);
  }
  console.log('Categorías cargadas:', categories);
  console.log('Número de categorías:', categories.length);

  return (
    <AdminShell pendingQuotes={pendingCount}>
      <div className="p-8 max-w-7xl mx-auto">
        <ProductManager initialProducts={products} categories={categories} />
      </div>
    </AdminShell>
  );
}
