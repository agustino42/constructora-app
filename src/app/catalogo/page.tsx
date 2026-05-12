import { PrismaClient } from '@prisma/client';
import CatalogClient from '@/components/CatalogClient';

const prisma = new PrismaClient();

export default async function CatalogoPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ include: { category: true } }),
    prisma.category.findMany()
  ]);

  return (
    <div className="min-h-screen bg-[#f4f7f6]">
      <CatalogClient initialProducts={products} categories={categories} />
    </div>
  );
}
