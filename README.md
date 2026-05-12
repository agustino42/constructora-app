# Constructora App

[![Estrellas en GitHub](https://img.shields.io/github/stars/agustino42/constructora-app?style=flat-square)](https://github.com/agustino42/constructora-app/stargazers)
[![Licencia](https://img.shields.io/github/license/agustino42/constructora-app?style=flat-square)](https://github.com/agustino42/constructora-app/blob/master/LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-13.5-blue?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-black?style=flat-square&logo=prisma)](https://www.prisma.io/)

---

## 📖 Descripción General

**Constructora App** es una aplicación web full‑stack moderna construida con **Next.js** (router de `app`) y **Prisma** para el acceso tipado a la base de datos. Proporciona una UI limpia y responsiva para navegar catálogos de productos, gestionar inventario y manejar cotizaciones y reportes administrativos.

El proyecto muestra:
- Renderizado del lado del servidor con Next.js 13 (directorio `app`).
- Acceso a datos seguro y tipado mediante Prisma y una base SQLite de desarrollo.
- UI basada en componentes React y estilos con Tailwind CSS.
- Sistema de configuración ligera usando JSON.

> *El diseño busca una apariencia premium: hero con degradado, tarjetas con glass‑morphism y animaciones suaves.*

---

## 🛠️ Tecnologías

| Categoría | Tecnología |
|----------|------------|
| **Framework** | **Next.js 13** (router de `app`) |
| **Lenguaje** | **TypeScript** |
| **Estilos** | **Tailwind CSS** (utility‑first) |
| **Base de datos** | **Prisma ORM** – SQLite (desarrollo) |
| **Componentes UI** | Componentes React personalizados (`CatalogClient`, `ProductCard`, `AdminShell`, etc.) |
| **Control de versiones** | Git + GitHub |
| **Gestor de paquetes** | npm |

---

## 🚀 Empezar

### Requisitos Previos
- **Node.js** ≥ 18 (LTS)
- **npm** (instalado con Node)
- **Git**

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/agustino42/constructora-app.git
cd constructora-app

# Instalar dependencias
npm install

# Generar la base SQLite de desarrollo y aplicar migraciones
npx prisma migrate dev --name init

# (Opcional) Poblar datos de ejemplo
node prisma/seed.ts
```

### Desarrollo
```bash
npm run dev   # Inicia el servidor en http://localhost:3000
```

### Compilación para Producción
```bash
npm run build   # Genera los bundles optimizados
npm start       # Ejecuta el servidor en modo producción
```

---

## 📂 Estructura del Proyecto (resumen)
```
/src
 ├─ /app               # Rutas de Next.js (pages)
 │   ├─ page.tsx        # Home – catálogo de productos
 │   ├─ layout.tsx      # Layout global (CSS, fuentes)
 │   └─ admin/          # UI administrativa (ajustes, reportes, etc.)
 ├─ /components        # Componentes reutilizables
 ├─ /lib               # Utilidades (carga de settings, cliente Prisma)
 ├─ /prisma            # Esquema y scripts de seed
 └─ /public            # Assets estáticos (imágenes, uploads)
```

---

## 🌱 Mejoras Futuras

1. **Autenticación y autorización** – Integrar `next-auth` con JWT o proveedores OAuth para proteger la zona admin.
2. **Pruebas unitarias e integradas** – Añadir Jest + React Testing Library y tests de Prisma.
3. **CI/CD** – Workflow de GitHub Actions con lint, tests y despliegue automático a Vercel.
4. **Migración a PostgreSQL** – Cambiar a una base de datos de producción más robusta.
5. **Internacionalización (i18n)** – Soporte multilingüe con `next-intl`.
6. **Dashboard de análisis** – Gráficos con Recharts para métricas de ventas y reportes.
7. **Optimización de imágenes** – Uso del componente `next/image` y almacenamiento en la nube (Cloudinary, S3).
8. **Modo oscuro y temas** – Toggle de UI con variables CSS.
9. **Accesibilidad** – Auditoría WCAG y atributos ARIA.

---

## 🤝 Contribuciones

1. Haz fork del repositorio.
2. Crea una rama para tu funcionalidad: `git checkout -b feature/tu-funcionalidad`.
3. Realiza commits claros y descriptivos.
4. Abre un Pull Request explicando los cambios.

Antes de enviar, ejecuta los scripts de lint y formateo:
```bash
npm run lint
npm run format
```

---

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT** – revisa el archivo [LICENSE](https://github.com/agustino42/constructora-app/blob/master/LICENSE) para más detalles.

---

*¡Feliz codificación! 🎉*
