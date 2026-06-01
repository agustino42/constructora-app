'use server';
import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

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
  try {
    // 1. Crear la cotización en Supabase
    const { data: quote, error: quoteError } = await supabaseAdmin
      .from('quotes')
      .insert({
        customer_name: payload.customerName,
        customer_email: payload.customerEmail,
        customer_phone: payload.customerPhone,
        status: 'PENDING',
        total: payload.total
      })
      .select()
      .single();

    if (quoteError) throw quoteError;

    // 2. Crear los items de la cotización
    const quoteItems = payload.items.map(item => ({
      quote_id: quote.id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabaseAdmin
      .from('quote_items')
      .insert(quoteItems);

    if (itemsError) throw itemsError;

    // 3. SIMULACIÓN DE ENVÍO DE CORREO (AQUÍ IRÍA RESEND O NODEMAILER)
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
    
    return { success: true };
  } catch (error) {
    console.error('Error al crear cotización:', error);
    return { success: false, error: 'Error al crear la cotización' };
  }
}

export async function searchProducts(query: string) {
  try {
    const { data: products, error } = await supabaseAdmin
      .from('products')
      .select(`
        *,
        categories (
          id,
          name
        )
      `)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .eq('is_active', true)
      .limit(5);

    if (error) throw error;

    // Transformar los datos para que coincidan con el formato esperado
    return products?.map(product => ({
      ...product,
      category: product.categories
    })) || [];
  } catch (error) {
    console.error('Error al buscar productos:', error);
    return [];
  }
}
