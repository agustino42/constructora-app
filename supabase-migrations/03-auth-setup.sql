-- ==========================================
-- Migración: Autenticación con Supabase Auth
-- ==========================================
-- Incluye sincronización de usuarios existentes.
-- Ya NO necesitas copiar UUIDs manualmente.
--
-- Para marcar más admins, edita el IN ('admin@coinbaca.com')
-- en el paso 4 antes de ejecutar.
-- ==========================================

-- ==========================================
-- 1. Agregar columna role a users
-- ==========================================
ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- ==========================================
-- 2. Función y trigger para auto-sync
--    Cuando alguien se registra via Supabase Auth
--    se crea automáticamente su perfil en public.users
-- ==========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role, password)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
    ''
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- 3. SINCRONIZAR usuarios EXISTENTES
--    Esto arregla el error: usuarios creados
--    en Auth antes de ejecutar esta migración
--    no tenían perfil en public.users.
-- ==========================================
INSERT INTO public.users (id, email, name, role, password)
SELECT
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'name', split_part(au.email, '@', 1)),
  COALESCE(au.raw_user_meta_data->>'role', 'user'),
  ''
FROM auth.users au
LEFT JOIN public.users pu ON pu.id = au.id
WHERE pu.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- 4. MARCAR ADMINISTRADORES
--    Edita esta lista para agregar más admins.
--    Los correos aquí se marcan con role='admin'
--    y pueden acceder al panel administrativo.
-- ==========================================
UPDATE public.users
SET role = 'admin'
WHERE email IN ('admin@coinbaca.com');
