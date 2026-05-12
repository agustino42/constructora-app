import fs from 'fs/promises';
import path from 'path';

const settingsPath = path.join(process.cwd(), 'data', 'settings.json');

export const defaultSettings = {
    businessName: "COINBACA",
    heroSlogan: "Calidad que construye tu futuro.",
    heroDescription: "Fabricación directa de tubos de concreto, productos agropecuarios y ornamentales. Expertos con años en Barinas.",
    whatsapp: "+58 414 1234567",
    email: "ventas@coinbaca.com",
    address: "Planta Principal, Zona Industrial de Barinas, Barinas, Venezuela.",
    logoUrl: "",
    bannerUrl: ""
};

export async function getSettings() {
    try {
        const data = await fs.readFile(settingsPath, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return defaultSettings;
    }
}

export async function saveSettingsFile(newSettings: Partial<typeof defaultSettings>) {
    const dir = path.dirname(settingsPath);
    await fs.mkdir(dir, { recursive: true });
    
    const current = await getSettings();
    const finalSettings = { ...current, ...newSettings };
    
    await fs.writeFile(settingsPath, JSON.stringify(finalSettings, null, 2));
}
