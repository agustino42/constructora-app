import 'server-only'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { supabaseAdmin } from '@/lib/supabase'

export async function verifySession() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/admin/login')
  }

  return data.user
}

export async function verifyAdminSession() {
  const user = await verifySession()

  const { data: profile } = await supabaseAdmin
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/admin/login')
  }

  return user
}
