-- ==========================================
-- Datos de Ejemplo para COINBACA
-- ==========================================

-- Insertar Usuario Admin (contraseña: admin123 - encriptada con bcrypt)
-- Nota: En producción, usa bcrypt para generar el hash real
INSERT INTO users (id, email, name, password) VALUES 
('admin-001', 'admin@coinbaca.com', 'Administrador', '$2b$10$XZwXZwXZwXZwXZwXZwXZwXZwXZwXZwXZwXZwXZwXZwXZwXZwXZwXZwX')
ON CONFLICT (email) DO NOTHING;

-- Insertar Categorías de Productos
INSERT INTO categories (id, name, description) VALUES 
('cat-001', 'Tubos de Concreto', 'Tubos prefabricados para drenaje y alcantarillado'),
('cat-002', 'Productos Agropecuarios', 'Implementos y materiales para el sector agrícola'),
('cat-003', 'Productos Ornamentales', 'Elementos decorativos para jardines y espacios públicos'),
('cat-004', 'Bloques y Ladrillos', 'Materiales de construcción básicos'),
('cat-005', 'Accesorios', 'Conectores y complementos para instalación')
ON CONFLICT (name) DO NOTHING;

-- Insertar Productos
INSERT INTO products (id, name, description, price, stock, category_id, is_active) VALUES 
-- Tubos de Concreto
('prod-001', 'Tubo Concreto 6" x 1m', 'Tubo de concreto de 6 pulgadas diámetro, 1 metro de longitud', 45.00, 150, 'cat-001', true),
('prod-002', 'Tubo Concreto 8" x 1m', 'Tubo de concreto de 8 pulgadas diámetro, 1 metro de longitud', 65.00, 120, 'cat-001', true),
('prod-003', 'Tubo Concreto 10" x 1m', 'Tubo de concreto de 10 pulgadas diámetro, 1 metro de longitud', 85.00, 100, 'cat-001', true),
('prod-004', 'Tubo Concreto 12" x 1m', 'Tubo de concreto de 12 pulgadas diámetro, 1 metro de longitud', 110.00, 80, 'cat-001', true),
('prod-005', 'Tubo Concreto 24" x 1m', 'Tubo de concreto de 24 pulgadas diámetro, 1 metro de longitud', 250.00, 50, 'cat-001', true),

-- Productos Agropecuarios
('prod-006', 'Bebedero para Ganado', 'Bebedero de concreto para ganado bovino, capacidad 500L', 180.00, 40, 'cat-002', true),
('prod-007', 'Comedero para Ganado', 'Comedero de concreto reforzado para ganado', 150.00, 35, 'cat-002', true),
('prod-008', 'Postes de Concreto', 'Postes de concreto para cercas, 2.5m de altura', 45.00, 200, 'cat-002', true),
('prod-009', 'Canal de Riego', 'Canales prefabricadas para sistemas de riego', 35.00, 150, 'cat-002', true),

-- Productos Ornamentales
('prod-010', 'Maceta Grande', 'Maceta ornamental de concreto, 50cm diámetro', 55.00, 60, 'cat-003', true),
('prod-011', 'Maceta Mediana', 'Maceta ornamental de concreto, 35cm diámetro', 35.00, 80, 'cat-003', true),
('prod-012', 'Banco de Jardín', 'Banco de concreto para parques y jardines', 120.00, 25, 'cat-003', true),
('prod-013', 'Fuente Decorativa', 'Fuente de concreto para jardines, 1.5m altura', 280.00, 15, 'cat-003', true),

-- Bloques y Ladrillos
('prod-014', 'Bloque 15x20x40', 'Bloque estándar de concreto 15x20x40 cm', 1.50, 2000, 'cat-004', true),
('prod-015', 'Bloque 10x20x40', 'Bloque de concreto 10x20x40 cm para paredes interiores', 1.20, 2500, 'cat-004', true),
('prod-016', 'Ladrillo Rojo', 'Ladrillo de arcilla cocida, estándar', 0.80, 5000, 'cat-004', true),

-- Accesorios
('prod-017', 'Codo 90° 6"', 'Codo de concreto para tubos de 6 pulgadas', 15.00, 100, 'cat-005', true),
('prod-018', 'Codo 90° 8"', 'Codo de concreto para tubos de 8 pulgadas', 20.00, 80, 'cat-005', true),
('prod-019', 'Tee 6"', 'Conector tipo T para tubos de 6 pulgadas', 18.00, 90, 'cat-005', true),
('prod-020', 'Reducción 8" a 6"', 'Reducción de concreto de 8 a 6 pulgadas', 12.00, 120, 'cat-005', true)
ON CONFLICT DO NOTHING;

-- Insertar Cotizaciones de Ejemplo
INSERT INTO quotes (id, customer_name, customer_email, customer_phone, status, total) VALUES 
('quote-001', 'Juan Pérez', 'juan.perez@email.com', '+58 414 1234567', 'PENDING', 150.00),
('quote-002', 'María González', 'maria.gonzalez@email.com', '+58 414 7654321', 'CONTACTED', 280.00),
('quote-003', 'Construyendo C.A.', 'ventas@construyendo.com', '+58 414 9876543', 'RESOLVED', 1250.00)
ON CONFLICT DO NOTHING;

-- Insertar Items de Cotizaciones
INSERT INTO quote_items (id, quote_id, product_id, quantity, price) VALUES 
-- Items para cotización 001
('qi-001', 'quote-001', 'prod-001', 2, 45.00),
('qi-002', 'quote-001', 'prod-014', 40, 1.50),

-- Items para cotización 002
('qi-003', 'quote-002', 'prod-003', 2, 85.00),
('qi-004', 'quote-002', 'prod-010', 2, 55.00),

-- Items para cotización 003
('qi-005', 'quote-003', 'prod-002', 10, 65.00),
('qi-006', 'quote-003', 'prod-004', 5, 110.00),
('qi-007', 'quote-003', 'prod-014', 200, 1.50),
('qi-008', 'quote-003', 'prod-015', 150, 1.20)
ON CONFLICT DO NOTHING;

-- ==========================================
-- Verificación de Datos Insertados
-- ==========================================
-- Descomentar para verificar después de ejecutar
-- SELECT 'Usuarios:' as tipo, COUNT(*) as cantidad FROM users
-- UNION ALL
-- SELECT 'Categorías:', COUNT(*) FROM categories
-- UNION ALL
-- SELECT 'Productos:', COUNT(*) FROM products
-- UNION ALL
-- SELECT 'Cotizaciones:', COUNT(*) FROM quotes
-- UNION ALL
-- SELECT 'Items de Cotización:', COUNT(*) FROM quote_items;
