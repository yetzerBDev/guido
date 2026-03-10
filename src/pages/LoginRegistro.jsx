import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export function LoginRegistro() {
  const { user, loading, signIn, signUp, signOut } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSignIn = async (event) => {
    event.preventDefault()
    const error = await signIn({ email, password })
    setMessage(error ? `Error: ${error.message}` : 'Sesion iniciada correctamente.')
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    const error = await signUp({ email, password })
    setMessage(error ? `Error: ${error.message}` : 'Cuenta creada. Revisa tu correo para confirmar.')
  }

  const handleSignOut = async () => {
    const error = await signOut()
    setMessage(error ? `Error: ${error.message}` : 'Sesion cerrada.')
  }

  return (
    <main className="mx-auto w-full max-w-md px-4 pb-16 pt-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black text-guidoInk">Login / Registro</h1>
        <p className="mt-1 text-sm text-slate-600">Autenticacion con Supabase Auth.</p>

        {loading ? <p className="mt-4 text-sm text-slate-500">Cargando sesion...</p> : null}
        {user ? (
          <div className="mt-4 space-y-3 rounded-xl bg-guidoSky p-4">
            <p className="text-sm text-slate-700">Conectado como {user.email}</p>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Cerrar sesion
            </button>
          </div>
        ) : (
          <form className="mt-4 space-y-3" onSubmit={handleSignIn}>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-guidoBlue px-4 py-2 text-sm font-semibold text-white"
              >
                Ingresar
              </button>
              <button
                type="button"
                onClick={handleSignUp}
                className="flex-1 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Registrarse
              </button>
            </div>
          </form>
        )}

        {message ? <p className="mt-3 text-sm text-slate-700">{message}</p> : null}
      </div>
    </main>
  )
}
