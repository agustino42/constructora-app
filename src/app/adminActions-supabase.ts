'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createProduct(data: { name: string, description: string, price: number, stock: number, categoryId: string, imageUrl?: string }) {
  try {
    const { error } = await supabaseAdmin
      .from('products')
      .insert({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category_id: data.categoryId,
        image_url: data.imageUrl,
        is_active: true
      });

    if (error) throw error;

    revalidatePath('/admin');
    revalidatePath('/catalogo');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error al crear producto:', error);
    return { success: false, error: 'Error al crear producto' };
  }
}

export async function updateProduct(id: string, data: { name: string, description: string, price: number, stock: number, categoryId: string, imageUrl?: string }) {
  try {
    const { error } = await supabaseAdmin
      .from('products')
      .update({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category_id: data.categoryId,
        image_url: data.imageUrl
      })
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin');
    revalidatePath('/catalogo');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return { success: false, error: 'Error al actualizar producto' };
  }
}

export async function deleteProduct(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin');
    revalidatePath('/catalogo');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error al borrar producto:', error);
    return { success: false, error: 'Error al borrar. Verifique que no esté en una cotización.' };
  }
}

export async function getProducts() {
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
      .order('created_at', { ascending: false });

    if (error) throw error;

    return products?.map(product => ({
      ...product,
      category: product.categories
    })) || [];
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
}

export async function getCategories() {
  try {
    const { data: categories, error } = await supabaseAdmin
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;

    return categories || [];
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return [];
  }
}

export async function createCategory(data: { name: string, description?: string }) {
  try {
    const { error } = await supabaseAdmin
      .from('categories')
      .insert({
        name: data.name,
        description: data.description
      });

    if (error) throw error;

    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error al crear categoría:', error);
    return { success: false, error: 'Error al crear categoría' };
  }
}

export async function getQuotes() {
  try {
    const { data: quotes, error } = await supabaseAdmin
      .from('quotes')
      .select(`
        *,
        quote_items (
          *,
          products (
            id,
            name
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return quotes || [];
  } catch (error) {
    console.error('Error al obtener cotizaciones:', error);
    return [];
  }
}

export async function updateQuoteStatus(id: string, status: string) {
  try {
    const { error } = await supabaseAdmin
      .from('quotes')
      .update({ status })
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin/cotizaciones');
    return { success: true };
  } catch (error) {
    console.error('Error al actualizar estado de cotización:', error);
    return { success: false, error: 'Error al actualizar estado' };
  }
}

// Función para upload de imagen (mantenemos la misma lógica local por ahora)
import fs from 'fs/promises';
import path from 'path';

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) return { success: false, error: 'No se encontró archivo' };

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const safeName = file.name.replace(/\s+/g, '_');
    const filename = `${Date.now()}-${safeName}`;
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);
    
    return { success: true, url: `/uploads/${filename}` };
  } catch (error) {
    return { success: false, error: 'Error al procesar la imagen' };
  }
}

import { saveSettingsFile } from '@/lib/settings';

export async function saveGeneralSettings(formData: any) {
  try {
     await saveSettingsFile(formData);
     revalidatePath('/');
     revalidatePath('/admin/ajustes');
     return { success: true };
  } catch(e) {
     return { success: false };
  }
}
