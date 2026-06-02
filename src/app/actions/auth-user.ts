'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

export type UserAuthState = { error: string | null }

export async function signup(prevState: UserAuthState, formData: FormData): Promise<UserAuthState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!name || !email || !password) {
    return { error: 'Todos los campos son requeridos' }
  }

  if (password.length < 6) {
    return { error: 'La contraseña debe tener al menos 6 caracteres' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/mi-cuenta')
}

export async function loginUser(prevState: UserAuthState, formData: FormData): Promise<UserAuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Correo y contraseña requeridos' }
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !data.user) {
    return { error: 'Credenciales inválidas' }
  }

  redirect('/mi-cuenta')
}

export async function logoutUser() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
