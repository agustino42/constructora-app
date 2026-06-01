import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Verificando admin por defecto...');

  const existing = await prisma.user.findUnique({
    where: { email: 'admin@coinbaca.com' }
  });

  if (!existing) {
    await prisma.user.create({
      data: {
        email: 'admin@coinbaca.com',
        name: 'Admin Principal',
        password: 'admin123',
      }
    });
    console.log('Admin creado exitosamente.');
  } else {
    console.log('El admin ya existe.');
  }

  console.log('Seed completado.');
  console.log('NOTA: Los productos y categorías ahora se gestionan en Supabase.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
