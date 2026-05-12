import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Borrando datos anteriores...');
  await prisma.quoteItem.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log('Creando categorías...');
  const catInfraestructura = await prisma.category.create({
    data: { name: 'Infraestructura', description: 'Tubos y conexiones de concreto' }
  });
  
  const catAgropecuario = await prisma.category.create({
    data: { name: 'Productos Agropecuarios', description: 'Bebederos, comederos, bases' }
  });

  const catOrnamental = await prisma.category.create({
    data: { name: 'Ornamentales', description: 'Caminerías, adoquines, materos' }
  });

  console.log('Creando productos...');
  await prisma.product.createMany({
    data: [
      {
        name: 'Tubo 6"x1,00 C-2',
        description: 'Tubo de concreto, diámetro 15cm, longitud 1.00m, peso 35kg.',
        price: 11.04,
        stock: 50,
        categoryId: catInfraestructura.id,
        imageUrl: '/images/tubo.png'
      },
      {
        name: 'Tubo 8"x1,22 C-2',
        description: 'Tubo de concreto, diámetro 20cm, longitud 1.22m, peso 60kg.',
        price: 17.30,
        stock: 50,
        categoryId: catInfraestructura.id,
        imageUrl: '/images/tubo.png'
      },
      {
        name: 'Tanquilla 10"x6"',
        description: 'Tanquilla de concreto de 80kg.',
        price: 40.00,
        stock: 20,
        categoryId: catInfraestructura.id,
        imageUrl: '/images/tubo.png' // using placeholder
      },
      {
        name: 'Bebedero 100x060 (500 LT)',
        description: 'Bebedero para uso agropecuario, capacidad 500 litros, 600kg.',
        price: 220.00,
        stock: 10,
        categoryId: catAgropecuario.id,
        imageUrl: '/images/bebedero.png'
      },
      {
        name: 'Adoquines',
        description: 'Adoquines de concreto para usos ornamentales y pavimentación.',
        price: 1.00,
        stock: 1000,
        categoryId: catOrnamental.id,
        imageUrl: '/images/adoquin.png'
      }
    ]
  });

  console.log('Seed completado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
