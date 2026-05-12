import { PrismaClient } from '@prisma/client';
import AdminShell from '@/components/AdminShell';
import ProductManager from '@/components/ProductManager';

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } }),
    prisma.category.findMany()
  ]);

  const pendingCount = await prisma.quote.count({ where: { status: 'PENDING' } });

  return (
    <AdminShell pendingQuotes={pendingCount}>
      <div className="p-8 max-w-7xl mx-auto">
        <ProductManager initialProducts={products} categories={categories} />
      </div>
    </AdminShell>
  );
}
