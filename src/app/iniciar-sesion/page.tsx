'use client'

import { useActionState } from 'react'
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { loginUser } from '@/app/actions/auth-user'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginUser, { error: null })

  return (
    <div className="flex-1 flex items-center justify-center bg-[#f4f7f6] p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px]"></div>

      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-green-600/10 w-full max-w-md relative z-10 border border-gray-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-600 mb-4 drop-shadow-sm">
            <LogIn size={32} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Iniciar Sesión</h1>
          <p className="text-gray-500 mt-2 font-medium">Accede a tu cuenta COINBACA</p>
        </div>

        {state?.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
            <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm font-bold text-red-700">{state.error}</p>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 tracking-wide mb-2">Correo Electrónico</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 focus:bg-white outline-none transition-all font-medium text-gray-900"
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 tracking-wide mb-2">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 focus:bg-white outline-none transition-all font-medium text-gray-900"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all mt-4 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {pending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Ingresando...
              </span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 font-medium">
            ¿No tienes cuenta?{' '}
            <Link href="/registro" className="text-green-600 font-bold hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
        <div className="mt-4 text-center">
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-brand-primary transition-colors">
            &larr; Volver a la Tienda
          </Link>
        </div>
      </div>
    </div>
  )
}
