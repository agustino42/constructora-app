-- ==========================================
-- Asignar imágenes reales a los productos
-- ==========================================
-- Ejecutar después de 03-auth-setup.sql
-- Usa ILIKE para matchear por nombre,
-- funciona con cualquier ID/estructura.

-- Tubos de Concreto
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80'
WHERE (name ILIKE '%tubo%' OR name ILIKE '%tuber%') AND is_active = true;

-- Tanquillas
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80'
WHERE (name ILIKE '%tanquilla%' OR name ILIKE '%pozo%' OR name ILIKE '%canal%') AND is_active = true;

-- Bloques y Ladrillos
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=600&q=80'
WHERE (name ILIKE '%bloque%' OR name ILIKE '%ladrill%') AND is_active = true;

-- Bebedero / Comedero (Agropecuarios)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80'
WHERE (name ILIKE '%bebedero%' OR name ILIKE '%comedero%' OR name ILIKE '%ganado%') AND is_active = true;

-- Postes
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1504307651254-5743cb3f522e?w=600&q=80'
WHERE name ILIKE '%poste%' AND is_active = true;

-- Macetas y ornamentales
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80'
WHERE (name ILIKE '%maceta%' OR name ILIKE '%fuente%' OR name ILIKE '%banco%' OR name ILIKE '%jard%') AND is_active = true;

-- Adoquines
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80'
WHERE name ILIKE '%adoqu%' AND is_active = true;

-- Cemento / Concreto premezclado
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1515003199390-89adf45ae3a6?w=600&q=80'
WHERE (name ILIKE '%cemento%' OR name ILIKE '%concreto%' OR name ILIKE '%mezcla%' OR name ILIKE '%arena%') AND is_active = true;

-- Accesorios (codos, tees, reducciones)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80'
WHERE (name ILIKE '%codo%' OR name ILIKE '%tee%' OR name ILIKE '%reducci%' OR name ILIKE '%conector%') AND is_active = true;

-- Losas / canales
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1541888081622-49da41ec7c6b?w=600&q=80'
WHERE (name ILIKE '%losa%' OR name ILIKE '%canal%' OR name ILIKE '%riego%') AND is_active = true;

-- Cualquier producto que aún tenga image_url nulo o apunte a /images/
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1504307651254-5743cb3f522e?w=600&q=80'
WHERE (image_url IS NULL OR image_url LIKE '%/images/%') AND is_active = true;
