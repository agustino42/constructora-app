# Migración a Supabase - Guía de Implementación

## 📋 Resumen de Cambios

Se ha creado toda la infraestructura necesaria para migrar la aplicación de SQLite (local) a Supabase (PostgreSQL en la nube).

## 🗂️ Archivos Creados

### 1. Archivos SQL (supabase-migrations/)
- `01-create-tables.sql` - Estructura de tablas para Supabase
- `02-seed-data.sql` - Datos de ejemplo para probar

### 2. Cliente Supabase
- `src/lib/supabase.ts` - Cliente configurado con TypeScript

### 3. Server Actions Migrados
- `src/app/actions-supabase.ts` - Acciones públicas (cotizaciones, búsqueda)
- `src/app/adminActions-supabase.ts` - Acciones de administración

### 4. Schema Prisma para Supabase
- `prisma/schema-supabase.prisma` - Schema alternativo para PostgreSQL

## 🚀 Pasos para Completar la Migración

### Paso 1: Configurar Variables de Entorno

Agrega estas variables a tu archivo `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

Obtén estas credenciales desde:
1. Entra a [supabase.com](https://supabase.com)
2. Ve a tu proyecto → Settings → API
3. Copia: Project URL, anon public key, service_role key

### Paso 2: Crear Tablas en Supabase

1. Entra a tu proyecto en Supabase
2. Ve a **SQL Editor**
3. Copia y ejecuta el contenido de `supabase-migrations/01-create-tables.sql`
4. (Opcional) Ejecuta `supabase-migrations/02-seed-data.sql` para datos de prueba

### Paso 3: Reemplazar las Actions en tu Código

**Opción A: Usar directamente Supabase (Recomendado)**

En tus componentes, reemplaza:
```typescript
import { submitQuote } from '@/app/actions';
```

Por:
```typescript
import { submitQuote } from '@/app/actions-supabase';
```

Haz lo mismo para `adminActions` → `adminActions-supabase`.

**Opción B: Usar Prisma con Supabase PostgreSQL**

1. Respalda tu `prisma/schema.prisma` actual
2. Renombra `prisma/schema-supabase.prisma` a `schema.prisma`
3. Actualiza `DATABASE_URL` en `.env` con tu connection string de Supabase:
   ```
   DATABASE_URL=postgresql://postgres:[tu-password]@db.[tu-project].supabase.co:5432/postgres
   ```
4. Ejecuta:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

### Paso 4: Probar la Aplicación

1. Reinicia el servidor: `npm run dev`
2. Prueba crear una cotización
3. Verifica que los datos aparezcan en Supabase (Table Editor)

## 📊 Comparación de Enfoques

| Característica | Supabase Directo | Prisma + Supabase |
|----------------|------------------|-------------------|
| Simplicidad | ✅ Más simple | ⚠️ Requiere configuración extra |
| TypeScript | ✅ Tipos incluidos | ✅ Tipos generados |
| Migraciones | ✅ SQL manual | ✅ Prisma Migrate |
| Performance | ✅ Directo | ⚠️ Capa extra |
| Flexibilidad | ⚠️ SQL manual | ✅ ORM completo |

## 🔧 Consideraciones Adicionales

### Autenticación

Actualmente usas NextAuth. Puedes:
1. **Mantener NextAuth** con Supabase como proveedor
2. **Migrar a Supabase Auth** (requiere más cambios)

### Storage de Imágenes

Actualmente las imágenes se guardan localmente en `public/uploads`. Para usar Supabase Storage:

1. Crea un bucket en Supabase Storage
2. Actualiza la función `uploadImage` para usar Supabase Storage
3. Mueve las imágenes existentes al bucket

### Realtime

Supabase ofrece capacidades realtime para:
- Actualizaciones en vivo de cotizaciones
- Notificaciones instantáneas
- Sincronización entre múltiples usuarios

## 🐛 Solución de Problemas

### Error: "relation does not exist"
- Asegúrate de haber ejecutado el SQL `01-create-tables.sql`

### Error: "Invalid API key"
- Verifica que las variables de entorno estén correctas
- Asegúrate de usar la anon key para el cliente público

### Error de conexión
- Verifica que tu proyecto de Supabase esté activo
- Confirma que la URL sea correcta

## 📝 Próximos Pasos Sugeridos

1. ✅ Configurar variables de entorno
2. ✅ Ejecutar scripts SQL en Supabase
3. ✅ Reemplazar imports de actions
4. ✅ Probar funcionalidad básica
5. ⏳ Configurar Supabase Storage para imágenes
6. ⏳ Implementar Supabase Auth (opcional)
7. ⏳ Agregar capacidades Realtime (opcional)

## 💡 Nota Importante

Los archivos originales (`actions.ts`, `adminActions.ts`, `schema.prisma`) se mantienen como respaldo. No los borres hasta que hayas verificado que todo funciona correctamente con Supabase.
