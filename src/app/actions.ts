'use server';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

interface QuotePayload {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  empresa: string;
  rif: string;
  metodoEntrega: string;
  comentarios: string;
  items: { productId: string; quantity: number; price: number }[];
  total: number;
}

export async function submitQuote(payload: QuotePayload) {
  // 1. Guardar en Base de Datos (SQLite)
  await prisma.quote.create({
    data: {
      customerName: payload.customerName,
      customerEmail: payload.customerEmail,
      customerPhone: payload.customerPhone,
      status: 'PENDING',
      total: payload.total,
      // Suponiendo que agregamos campos empresa, rif en la BD futuro, los guardaremos en comentarios por ahora
      items: {
        create: payload.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      }
    }
  });

  // 2. SIMULACIÓN DE ENVÍO DE CORREO (AQUÍ IRÍA RESEND O NODEMAILER)
  console.log('=================================');
  console.log(`✉️ ENVIANDO CORREO AL ADMIN...`);
  console.log(`Nueva Cotización de: ${payload.empresa} (${payload.customerName})`);
  console.log(`Total Estimado: $${payload.total}`);
  console.log(`Entregando vía: ${payload.metodoEntrega}`);
  console.log('=================================');

  console.log(`✉️ ENVIANDO CORREO AL CLIENTE (${payload.customerEmail})...`);
  console.log(`Hola ${payload.customerName}, tu solicitud en COINBACA fue recibida.`);
  console.log('=================================');

  revalidatePath('/admin/cotizaciones');
  
  // Retornamos true para que el cliente redireccione, ya que el redirect() en Server Actions 
  // con payloads JSON a veces interfiere con la UI flotante
  return { success: true };
}

export async function searchProducts(query: string) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { description: { contains: query } }
      ]
    },
    include: { category: true },
    take: 5
  });
  return products;
}
