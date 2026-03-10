import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function LoginRegistro() {
  const { user, loading, signInWithGoogle, signOut } = useAuth()
  const [message, setMessage] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  const handleGoogleAuth = async () => {
    setAuthLoading(true)
    const error = await signInWithGoogle()
    setAuthLoading(false)

    if (error) {
      setMessage(`Error: ${error.message}`)
    }
  }

  const handleSignOut = async () => {
    setAuthLoading(true)
    const error = await signOut()
    setAuthLoading(false)
    setMessage(error ? `Error: ${error.message}` : 'Sesion cerrada correctamente.')
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#F6F8FC_0%,#EEF4FB_52%,#F8FAFE_100%)]">
      <section className="mx-auto flex w-full max-w-md flex-col items-center px-4 pb-7 pt-5 sm:px-6 sm:pb-10 sm:pt-10">
        <img
          src="/GUIDO_SALUDANDO.png"
          alt="Guido saludando"
          className="reveal-float pointer-events-none -mb-2 h-[min(42vh,300px)] w-auto object-contain drop-shadow-[0_18px_30px_rgba(6,19,56,0.18)] sm:-mb-4 sm:h-[390px]"
        />

        <h1 className="reveal-up text-center text-[clamp(2.9rem,10vw,4.4rem)] font-black leading-[1.05] tracking-tight text-[#061338] sm:text-6xl">
          Hola, soy Guido,
          <br />
          tu guia personal.
        </h1>

        <p className="reveal-up mt-4 text-center text-[clamp(1.45rem,4.8vw,1.7rem)] leading-snug text-[#455A78] sm:mt-6 sm:text-2xl sm:leading-relaxed">
          Conectate con Google y empecemos a disenar tu aventura perfecta en La Ceiba.
        </p>

        {loading ? <p className="mt-6 text-sm text-slate-500">Cargando sesion...</p> : null}

        {user ? (
          <div className="reveal-up mt-6 w-full rounded-2xl border border-[#bcdff1] bg-[#f4fbff] p-4 text-center">
            <p className="text-sm font-semibold text-[#0B173B]">Sesion iniciada como</p>
            <p className="mt-1 truncate text-sm text-slate-600">{user.email}</p>
            <button
              type="button"
              onClick={handleSignOut}
              disabled={authLoading}
              className="mt-4 w-full rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-70"
            >
              {authLoading ? 'Cerrando sesion...' : 'Cerrar sesion'}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={authLoading}
            className="reveal-up mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#1EA0E8] px-4 py-3.5 text-[clamp(1.2rem,4.2vw,1.35rem)] font-extrabold text-white shadow-[0_10px_24px_rgba(30,160,232,0.38)] transition hover:-translate-y-0.5 hover:bg-[#1692d8] disabled:cursor-not-allowed disabled:opacity-70 sm:mt-8 sm:px-6 sm:py-4 sm:text-xl"
          >
            <span className="grid h-9 w-9 place-content-center rounded-full bg-white sm:h-10 sm:w-10">
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

        <p className="reveal-up mt-5 text-center text-[clamp(0.95rem,3.3vw,1.05rem)] leading-snug text-[#8B9AB3] sm:mt-6 sm:text-sm sm:leading-relaxed">
          Al continuar, aceptas que GUIDO gestione tus planes de viaje y acceda a tu perfil
          publico.
        </p>

        <Link
          to="/terminos"
          className="reveal-up mt-6 text-[clamp(1.45rem,4.6vw,1.8rem)] font-semibold text-[#2AA7EA] hover:underline sm:mt-9 sm:text-xl"
        >
          Terminos y Condiciones
        </Link>

        <div className="mt-6 h-1 w-36 rounded-full bg-[#d9e0ec] sm:mt-10 sm:w-44" />
      </section>
    </main>
  )
}
