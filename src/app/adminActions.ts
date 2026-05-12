'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function createProduct(data: { name: string, description: string, price: number, stock: number, categoryId: string, imageUrl?: string }) {
  try {
    await prisma.product.create({ data });
    revalidatePath('/admin');
    revalidatePath('/catalogo');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al crear producto' };
  }
}

export async function updateProduct(id: string, data: { name: string, description: string, price: number, stock: number, categoryId: string, imageUrl?: string }) {
  try {
    await prisma.product.update({ where: { id }, data });
    revalidatePath('/admin');
    revalidatePath('/catalogo');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al actualizar producto' };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath('/admin');
    revalidatePath('/catalogo');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al borrar. Verifique que no esté en una cotización.' };
  }
}

import fs from 'fs/promises';
import path from 'path';

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) return { success: false, error: 'No se encontró archivo' };

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Limpiamos el nombre original quitando espacios
    const safeName = file.name.replace(/\s+/g, '_');
    const filename = `${Date.now()}-${safeName}`;
    
    // Ruta absoluta hasta `public/uploads`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Aseguramos que el directorio exista
    await fs.mkdir(uploadDir, { recursive: true });
    
    // Escribimos el archivo físicamente en el disco
    await fs.writeFile(path.join(uploadDir, filename), buffer);
    
    // Devolvemos la ruta relativa que el navegador usará (sin /public al inicio)
    return { success: true, url: `/uploads/${filename}` };
  } catch (error) {
    return { success: false, error: 'Error al procesar la imagen' };
  }
}

import { saveSettingsFile } from '@/lib/settings';

export async function saveGeneralSettings(formData: any) {
  try {
     await saveSettingsFile(formData);
     revalidatePath('/'); // Forzamos refresh del home público
     revalidatePath('/admin/ajustes');
     return { success: true };
  } catch(e) {
     return { success: false };
  }
}
