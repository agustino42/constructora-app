'use client'

import { LogOut } from 'lucide-react'
import { logoutUser } from '@/app/actions/auth-user'

export default function LogoutButton() {
  return (
    <form action={logoutUser}>
      <button
        type="submit"
        className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors cursor-pointer"
      >
        <LogOut size={18} />
        Cerrar Sesión
      </button>
    </form>
  )
}
