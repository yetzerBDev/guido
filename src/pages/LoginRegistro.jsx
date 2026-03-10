import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function LoginRegistro() {
  const { user, loading, signInWithGoogle, signOut } = useAuth()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true })
    }
  }, [user, navigate])

  const handleGoogleAuth = async () => {
    setAuthLoading(true)
    const error = await signInWithGoogle()
    setAuthLoading(false)

    if (error) {
      setMessage(`Error: ${error.message}`)
    }
  }

  const handleSignOut = async () => {
    const error = await signOut()
    setMessage(error ? `Error: ${error.message}` : 'Sesion cerrada.')
  }

  return (
    <main className="min-h-screen bg-[#f2f4f7]">
      <section className="mx-auto flex w-full max-w-md flex-col items-center px-6 pb-10 pt-12 sm:pt-16">
        <p className="text-[56px] font-black tracking-tight text-[#1EA0E8] sm:text-[64px]">GUIDO</p>

        <div className="mt-7 w-full rounded-[34px] bg-white p-8 shadow-[0_18px_44px_rgba(30,160,232,0.18)] sm:p-10">
          <img
            src="/GUIDO_SALUDANDO.png"
            alt="Guido saludando"
            className="mx-auto h-64 w-auto object-contain sm:h-72"
          />
        </div>

        <h1 className="mt-10 text-center text-5xl font-black leading-[1.08] tracking-tight text-[#061338] sm:text-6xl">
          Hola, soy Guido,
          <br />
          tu guia personal.
        </h1>

        <p className="mt-6 text-center text-xl leading-relaxed text-[#455A78] sm:text-2xl">
          Conectate con Google y empecemos a disenar tu aventura perfecta en La Ceiba.
        </p>

        {loading ? <p className="mt-6 text-sm text-slate-500">Cargando sesion...</p> : null}

        {user ? (
          <div className="mt-8 w-full space-y-3">
            <p className="text-center text-sm text-slate-600">Conectado como {user.email}</p>
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white"
            >
              Cerrar sesion
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={authLoading}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#1EA0E8] px-6 py-4 text-xl font-extrabold text-white shadow-[0_10px_24px_rgba(30,160,232,0.38)] transition hover:bg-[#1692d8] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span className="grid h-10 w-10 place-content-center rounded-full bg-white">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                <path
                  fill="#EA4335"
                  d="M12 10.2v3.9h5.4c-.24 1.24-.96 2.3-2.04 3.02l3.3 2.56c1.92-1.77 3.03-4.37 3.03-7.46 0-.72-.06-1.4-.2-2.06H12z"
                />
                <path
                  fill="#34A853"
                  d="M12 22c2.76 0 5.08-.92 6.78-2.5l-3.3-2.56c-.92.62-2.1 1-3.48 1-2.68 0-4.95-1.8-5.76-4.22l-3.4 2.62C4.55 19.7 8 22 12 22z"
                />
                <path
                  fill="#4A90E2"
                  d="M6.24 13.72A6.56 6.56 0 0 1 5.9 12c0-.6.1-1.17.28-1.72L2.78 7.66A10 10 0 0 0 2 12c0 1.56.37 3.03 1.02 4.34l3.22-2.62z"
                />
                <path
                  fill="#FBBC05"
                  d="M12 5.98c1.5 0 2.84.52 3.9 1.54l2.92-2.92C17.06 2.95 14.74 2 12 2 8 2 4.55 4.3 2.78 7.66l3.4 2.62C7.03 7.76 9.3 5.98 12 5.98z"
                />
              </svg>
            </span>
            {authLoading ? 'Conectando...' : 'Continuar con Google'}
          </button>
        )}

        {message ? <p className="mt-4 text-center text-sm text-red-600">{message}</p> : null}

        <p className="mt-6 text-center text-sm leading-relaxed text-[#8B9AB3]">
          Al continuar, aceptas que GUIDO gestione tus planes de viaje y acceda a tu perfil
          publico.
        </p>

        <Link to="/terminos" className="mt-9 text-xl font-semibold text-[#2AA7EA] hover:underline">
          Terminos y Condiciones
        </Link>

        <div className="mt-10 h-1 w-44 rounded-full bg-[#d9e0ec]" />
      </section>
    </main>
  )
}
