'use client';

import { useState } from 'react';
import { Plus, Edit3, Trash2, X, Save, AlertCircle, UploadCloud } from 'lucide-react';
import { createProduct, updateProduct, deleteProduct, uploadImage } from '@/app/adminActions';

type CategoryInfo = { id: string, name: string };
type ProductInfo = { id: string, name: string, description: string, price: number, stock: number, imageUrl: string | null, categoryId: string, category?: CategoryInfo };

export default function ProductManager({ initialProducts, categories }: { initialProducts: ProductInfo[], categories: CategoryInfo[] }) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ProductInfo | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: '0', stock: '0', categoryId: categories[0]?.id || '', imageUrl: '' });
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openAdd = () => {
    setEditTarget(null);
    setFileToUpload(null);
    setFormData({ name: '', description: '', price: '', stock: '0', categoryId: categories[0]?.id || '', imageUrl: '' });
    setIsModalOpen(true);
  };

  const openEdit = (p: ProductInfo) => {
    setEditTarget(p);
    setFileToUpload(null);
    setFormData({ name: p.name, description: p.description, price: p.price.toString(), stock: p.stock.toString(), categoryId: p.categoryId, imageUrl: p.imageUrl || '' });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let finalImageUrl = formData.imageUrl;

    // Procesamos la subida de foto local a la carpeta public/uploads si el usuario eligió una
    if (fileToUpload) {
      const uploadData = new FormData();
      uploadData.append('file', fileToUpload);
      
      const res = await uploadImage(uploadData);
      if (res.success && res.url) {
        finalImageUrl = res.url;
      } else {
        alert("Error subiendo la foto: " + res.error);
        setIsSubmitting(false);
        return;
      }
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      categoryId: formData.categoryId,
      imageUrl: finalImageUrl || undefined
    };

    if (editTarget) {
      await updateProduct(editTarget.id, payload);
    } else {
      await createProduct(payload);
    }
    
    setIsSubmitting(false);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`¿Estás seguro que deseas eliminar el producto: "${name}"? ESTA ACCIÓN NO SE PUEDE DESHACER.`)) {
      const res = await deleteProduct(id);
      if(!res.success) alert(res.error);
    }
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Inventario de Productos</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">Gestiona el catálogo central de COINBACA.</p>
          </div>
          
          <button onClick={openAdd} className="bg-brand-secondary hover:bg-gray-800 text-white font-bold py-2.5 px-6 rounded-xl flex items-center space-x-2 shadow-md transition-all elevate text-sm">
            <Plus size={18} />
            <span>Nuevo Producto</span>
          </button>
      </div>

       {/* Widget Estadístico Mínimo */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-brand-primary">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Productos Registrados</p>
              <h3 className="text-3xl font-black text-gray-900">{initialProducts.length}</h3>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-brand-secondary">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Valor Inventario Sugerido</p>
              <h3 className="text-3xl font-black text-gray-900">
                ${initialProducts.reduce((acc, p) => acc + (p.price * p.stock), 0).toFixed(0)}
              </h3>
           </div>
        </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider font-bold">
              <th className="px-6 py-4 border-b border-gray-100">Producto</th>
              <th className="px-6 py-4 border-b border-gray-100">Categoría</th>
              <th className="px-6 py-4 border-b border-gray-100 hidden md:table-cell">Precio</th>
              <th className="px-6 py-4 border-b border-gray-100 hidden sm:table-cell">Stock</th>
              <th className="px-6 py-4 border-b border-gray-100 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {initialProducts.map(product => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 bg-gray-100 rounded-lg bg-cover bg-center mix-blend-multiply flex-shrink-0"
                        style={{ backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none' }}>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500 truncate w-32 md:w-48">ID: {product.id.slice(-8)}</p>
                      </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-brand-secondary/10 text-brand-secondary text-[11px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
                    {product.category?.name || 'Gral'}
                  </span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-sm font-black text-brand-primary">${product.price.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <span className="text-sm font-medium text-gray-600">{product.stock} und.</span>
                </td>
                <td className="px-6 py-4 flex justify-end items-center space-x-3 h-full pt-6">
                  <button onClick={() => openEdit(product)} className="text-gray-400 hover:text-brand-primary p-2 transition-colors rounded-lg hover:bg-orange-50">
                    <Edit3 size={18} />
                  </button>
                  <button onClick={() => handleDelete(product.id, product.name)} className="text-gray-400 hover:text-red-500 p-2 transition-colors rounded-lg hover:bg-red-50">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {initialProducts.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-500 font-bold">No hay productos en inventario.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL CREAR / EDITAR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-brand-secondary text-white p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold">{editTarget ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nombre Comercial *</label>
                  <input required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} type="text" className="w-full bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-brand-primary/50 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Descripción Breve *</label>
                  <textarea required value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} rows={2} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-brand-primary/50 outline-none resize-none" />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Precio Unitario ($) *</label>
                    <input required min="0" step="0.01" value={formData.price} onChange={e=>setFormData({...formData, price: e.target.value})} type="number" className="w-full bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-brand-primary/50 outline-none text-brand-primary font-bold" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Categoría *</label>
                    <select required value={formData.categoryId} onChange={e=>setFormData({...formData, categoryId: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-primary/50 outline-none font-medium">
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Stock Actual *</label>
                    <input required min="0" value={formData.stock} onChange={e=>setFormData({...formData, stock: e.target.value})} type="number" className="w-full bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-brand-primary/50 outline-none" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Foto del Producto (PC)</label>
                    <div className="relative w-full bg-gray-50 border border-gray-200 rounded-xl overflow-hidden px-4 py-2 flex items-center hover:bg-gray-100 transition-colors">
                      <div className="absolute inset-0 bg-transparent">
                         <input 
                           type="file" 
                           accept="image/*"
                           onChange={e => {
                             if(e.target.files && e.target.files[0]) {
                               setFileToUpload(e.target.files[0]);
                             }
                           }}
                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                         />
                      </div>
                      <UploadCloud size={16} className="text-brand-primary mr-2" />
                      <span className="text-xs font-bold text-gray-600 truncate pointer-events-none">
                        {fileToUpload ? fileToUpload.name : (formData.imageUrl ? 'Reemplazar actual...' : 'Seleccionar del disco C:')}
                      </span>
                    </div>
                 </div>
               </div>

               {editTarget && (
                 <div className="bg-orange-50 p-3 rounded-xl flex items-start space-x-2 text-brand-primary mt-2">
                   <AlertCircle size={16} className="mt-0.5 shrink-0" />
                   <p className="text-xs font-bold leading-tight">Al modificar datos se reflejarán instantáneamente en la tienda pública.</p>
                 </div>
               )}

               <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">Cancelar</button>
                  <button type="submit" disabled={isSubmitting} className="px-6 py-2 rounded-xl bg-brand-primary hover:bg-orange-600 text-white font-bold shadow-md items-center flex space-x-2 transition-all">
                    <Save size={16} /> <span>{isSubmitting ? 'Guardando...' : 'Guardar Cambios'}</span>
                  </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
