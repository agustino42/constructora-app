'use client';

import { useState } from 'react';
import { Save, Globe, Phone, ImageIcon, UploadCloud } from 'lucide-react';
import { saveGeneralSettings, uploadImage } from '@/app/adminActions';

export default function SettingsForm({ initialSettings }: { initialSettings: any }) {
  const [formData, setFormData] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [bannerFileToUpload, setBannerFileToUpload] = useState<File | null>(null);

  const handleSubmit = async () => {
    setIsSaving(true);
    let finalLogoUrl = formData.logoUrl;
    let finalBannerUrl = formData.bannerUrl;

    if (fileToUpload) {
      const uploadData = new FormData();
      uploadData.append('file', fileToUpload);
      const res = await uploadImage(uploadData);
      if(res.success && res.url) {
         finalLogoUrl = res.url;
      }
    }

    if (bannerFileToUpload) {
      const uploadData = new FormData();
      uploadData.append('file', bannerFileToUpload);
      const res = await uploadImage(uploadData);
      if(res.success && res.url) {
         finalBannerUrl = res.url;
      }
    }

    const payload = {
       ...formData,
       logoUrl: finalLogoUrl,
       bannerUrl: finalBannerUrl
    };

    const res = await saveGeneralSettings(payload);
    if(res.success) {
       alert("¡Ajustes guardados! Los cambios ya se reflejan en la tienda.");
    }
    setIsSaving(false);
  };

  return (
    <>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Ajustes Generales</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Controla la información y apariencia frontal de tu tienda.</p>
        </div>
        <button onClick={handleSubmit} disabled={isSaving} className="bg-brand-primary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all elevate text-sm flex items-center">
           <Save size={18} className="mr-2" /> {isSaving ? 'Guardando...' : 'Guardar Cambios Generales'}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
         
         <div className="p-8 grid md:grid-cols-[1fr_2fr] gap-8 bg-gray-50/50">
              <div>
                 <h3 className="font-bold text-gray-900 flex items-center"><ImageIcon size={18} className="mr-2 text-brand-secondary"/> Identidad Visual</h3>
                 <p className="text-xs text-gray-500 mt-2">Sube el logotipo vectorizado y el banner principal de tu tienda.</p>
              </div>
              <div className="space-y-4">
                 
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Foto Principal (Banner de Frente)</label>
                    <div className="relative w-full bg-white border border-gray-200 rounded-xl overflow-hidden px-4 py-3 flex items-center hover:bg-gray-50 transition-colors">
                      <div className="absolute inset-0 bg-transparent">
                         <input 
                           type="file" 
                           accept="image/*"
                           onChange={e => {
                             if(e.target.files && e.target.files[0]) {
                               setBannerFileToUpload(e.target.files[0]);
                             }
                           }}
                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                         />
                      </div>
                      <UploadCloud size={18} className="text-brand-primary mr-2" />
                      <span className="text-sm font-bold text-gray-600 truncate pointer-events-none">
                        {bannerFileToUpload ? bannerFileToUpload.name : (formData.bannerUrl ? 'Reemplazar banner actual...' : 'Seleccionar del disco C:')}
                      </span>
                    </div>
                    {formData.bannerUrl && !bannerFileToUpload && <p className="text-xs text-green-600 mt-1 font-bold">✓ Tienes un banner personalizado configurado.</p>}
                 </div>

              </div>
           </div>

         <div className="p-8 grid md:grid-cols-[1fr_2fr] gap-8">
            <div>
               <h3 className="font-bold text-gray-900 flex items-center"><Globe size={18} className="mr-2 text-brand-secondary"/> Perfil de Negocio</h3>
               <p className="text-xs text-gray-500 mt-2">La información esencial que aparece en la portada.</p>
            </div>
            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nombre Comercial</label>
                  <input value={formData.businessName || ''} onChange={e=>setFormData({...formData, businessName: e.target.value})} type="text" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-brand-primary/50 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Frase Principal (Hero Slogan)</label>
                  <input value={formData.heroSlogan || ''} onChange={e=>setFormData({...formData, heroSlogan: e.target.value})} type="text" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-brand-primary/50 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Descripción Breve (Bajo el Slogan)</label>
                  <textarea value={formData.heroDescription || ''} onChange={e=>setFormData({...formData, heroDescription: e.target.value})} rows={3} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-brand-primary/50 outline-none resize-none" />
               </div>
            </div>
         </div>

         <div className="p-8 grid md:grid-cols-[1fr_2fr] gap-8">
            <div>
               <h3 className="font-bold text-gray-900 flex items-center"><Phone size={18} className="mr-2 text-brand-secondary"/> Contacto Público</h3>
               <p className="text-xs text-gray-500 mt-2">Medios de comunicación en tu tienda.</p>
            </div>
            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">WhatsApp de Ventas</label>
                  <input value={formData.whatsapp} onChange={e=>setFormData({...formData, whatsapp: e.target.value})} type="text" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-brand-primary/50 outline-none font-medium" />
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico de Soporte</label>
                  <input value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} type="email" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-brand-primary/50 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Dirección Física Base</label>
                  <textarea value={formData.address} onChange={e=>setFormData({...formData, address: e.target.value})} rows={3} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-brand-primary/50 outline-none resize-none" />
               </div>
            </div>
         </div>

      </div>
    </>
  );
}
