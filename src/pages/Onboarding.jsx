import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'

function IconBubble({ children, selected = false, compact = false }) {
  return (
    <span
      className={`grid place-content-center rounded-full ${
        compact ? 'h-6 w-6' : 'h-11 w-11'
      } ${selected ? 'bg-[#1EA0E8] text-white' : 'bg-[#E8F4FB] text-[#1EA0E8]'}`}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M14.7 9.3l-2 5-5 2 2-5 5-2z" />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M3 12h18" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M12 2l1.8 4.8L19 8.6l-4 2.8 1.5 4.6-4.5-2.8-4.5 2.8L9 11.4l-4-2.8 5.2-1.8L12 2z" />
    </svg>
  )
}

function MountainIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 20l6.5-9 3 4 2.5-3 6 8H3z" />
      <path d="M10 11l1.5-2 1.5 2" />
    </svg>
  )
}

function ForkKnifeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 3v7" />
      <path d="M9 3v7" />
      <path d="M6 7h3" />
      <path d="M7.5 10v11" />
      <path d="M15 3v7" />
      <path d="M18 3v18" />
      <path d="M15 10h3" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 3a8 8 0 1 0 7 11.5A9 9 0 0 1 14 3z" />
      <path d="M4 4l1 1" />
      <path d="M8 2v2" />
    </svg>
  )
}

function PalmIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 10c1.5-3 4-4 7-4-1 2-3 3-5 3" />
      <path d="M12 10c-1.5-3-4-4-7-4 1 2 3 3 5 3" />
      <path d="M12 10c0-3 2-5 4-6" />
      <path d="M12 10v10" />
      <path d="M10 20h4" />
    </svg>
  )
}

function CultureIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 20h18" />
      <path d="M4 20V9l8-5 8 5v11" />
      <path d="M8 20v-6h8v6" />
    </svg>
  )
}

const motiveIcons = {
  paseo: <CompassIcon />,
  negocios: <BriefcaseIcon />,
  local: <PinIcon />,
}

const motives = [
  {
    key: 'paseo',
    title: 'Vengo de paseo',
    text: 'Explora playas, montanas y la mejor gastronomia local.',
  },
  {
    key: 'negocios',
    title: 'Vine por negocios',
    text: 'Coworking, reuniones y servicios profesionales.',
  },
  {
    key: 'local',
    title: 'Vivo aca / Vida local',
    text: 'Servicios esenciales, tramites y eventos de la comunidad.',
  },
]

const interestOptions = ['Adrenalina/Aventura', 'Comida Local', 'Vida Nocturna', 'Relax/Playa', 'Cultura']

const interestIcons = {
  'Adrenalina/Aventura': <MountainIcon />,
  'Comida Local': <ForkKnifeIcon />,
  'Vida Nocturna': <MoonIcon />,
  'Relax/Playa': <PalmIcon />,
  Cultura: <CultureIcon />,
}

export function Onboarding() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [step, setStep] = useState(1)
  const [motive, setMotive] = useState('')
  const [interests, setInterests] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const progress = useMemo(() => (step === 1 ? 34 : step === 2 ? 67 : 100), [step])

  const toggleInterest = (value) => {
    setInterests((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleContinue = async () => {
    setError('')

    if (step === 1) {
      if (!motive) {
        setError('Selecciona una opcion para continuar.')
        return
      }
      setStep(2)
      return
    }

    if (step === 2) {
      setSaving(true)
      setStep(3)

      if (!user) {
        setSaving(false)
        setStep(2)
        setError('No hay sesion activa.')
        return
      }

      if (!isSupabaseConfigured || !supabase) {
        setSaving(false)
        setStep(2)
        setError('Supabase no esta configurado.')
        return
      }

      const { error: rpcError } = await supabase.rpc('complete_onboarding', {
        p_motive: motive,
        p_interests: interests,
      })

      const submitError = rpcError?.message ?? null

      if (submitError) {
        setSaving(false)
        setStep(2)
        setError(`No se pudo completar onboarding: ${submitError}`)
        return
      }

      setTimeout(() => {
        navigate('/explorar', { replace: true })
      }, 1000)
      return
    }
  }

  return (
    <main className="min-h-screen bg-[#F3F5F8] px-4 pb-10 pt-6 sm:pt-10">
      <section className="mx-auto w-full max-w-4xl rounded-3xl bg-white/70 p-4 sm:p-8">
        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
          <p className="flex items-center gap-2 text-lg font-extrabold text-[#0B173B]">
            <IconBubble compact>
              <SparkIcon />
            </IconBubble>
            Onboarding
          </p>
          <button
            type="button"
            onClick={() => navigate('/explorar')}
            className="text-xl leading-none text-slate-500"
            aria-label="Cerrar"
          >
            x
          </button>
        </div>

        {step === 1 ? (
          <>
            <h1 className="text-3xl font-black text-[#0B173B] sm:text-5xl">Que te trae por La Ceiba hoy?</h1>
            <p className="mt-2 text-slate-600">Guido esta tomando nota para personalizar tu experiencia.</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {motives.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setMotive(item.key)}
                  className={`rounded-2xl border p-5 text-left transition ${
                    motive === item.key
                      ? 'border-[#1EA0E8] bg-[#EAF6FE] shadow-sm'
                      : 'border-slate-200 bg-white hover:border-[#B8DFF4]'
                  }`}
                >
                  <IconBubble selected={motive === item.key}>{motiveIcons[item.key]}</IconBubble>
                  <p className="text-lg font-extrabold text-[#0B173B]">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{item.text}</p>
                </button>
              ))}
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <h1 className="text-3xl font-black text-[#0B173B] sm:text-5xl">Que se te antoja hoy?</h1>
            <p className="mt-2 text-slate-600">Selecciona tus intereses para personalizar tu aventura.</p>

            <img
              src="/GUIDO_RECOMENDADOR.png"
              alt="Guido recomendador"
              className="reveal-float mt-4 h-[min(42vh,360px)] w-full object-contain drop-shadow-[0_16px_26px_rgba(6,19,56,0.2)] sm:h-[430px]"
            />

            <div className="mt-6 flex flex-wrap gap-2">
              {interestOptions.map((item) => {
                const selected = interests.includes(item)
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleInterest(item)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      selected
                        ? 'border-[#1EA0E8] bg-[#1EA0E8] text-white'
                        : 'border-slate-300 bg-white text-[#0B173B] hover:border-[#94d0f1]'
                    }`}
                  >
                    <IconBubble selected={selected} compact>{interestIcons[item]}</IconBubble>
                    {item}
                  </button>
                )
              })}
            </div>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <div className="mx-auto mt-4 flex h-56 w-56 items-center justify-center rounded-3xl bg-slate-100">
              <img src="/GUIDO_SALUDANDO.png" alt="Guido listo" className="h-48 w-auto object-contain" />
            </div>
            <h1 className="mt-6 text-center text-4xl font-black text-[#0B173B]">Listo!</h1>
            <p className="mx-auto mt-3 max-w-lg text-center text-slate-600">
              Estamos analizando tus preferencias para crear la aventura perfecta.
            </p>
            <div className="mx-auto mt-8 h-3 w-full max-w-xl rounded-full bg-slate-200">
              <div className="h-full w-[85%] rounded-full bg-[#1EA0E8]" />
            </div>
            <p className="mt-3 text-center text-slate-600">Casi terminamos...</p>
            <p className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-[#B8DFF4] bg-[#F0FAFF] px-4 py-2 text-sm font-semibold text-[#0B173B]">
              <IconBubble compact>
                <SparkIcon />
              </IconBubble>
              Guido esta optimizando rutas para ti
            </p>
          </>
        ) : null}

        {error ? <p className="mt-4 text-sm font-semibold text-red-600">{error}</p> : null}

        {step < 3 ? (
          <button
            type="button"
            onClick={handleContinue}
            className="mt-8 w-full rounded-full bg-[#1EA0E8] px-6 py-4 text-lg font-extrabold text-white shadow-[0_8px_20px_rgba(30,160,232,0.35)] transition hover:bg-[#1692d8]"
            disabled={saving}
          >
            {saving ? 'Guardando...' : 'Continuar'}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate('/explorar', { replace: true })}
            className="mt-8 w-full rounded-full bg-[#1EA0E8] px-6 py-4 text-lg font-extrabold text-white"
          >
            {saving ? 'Preparando tu experiencia...' : 'Entrar'}
          </button>
        )}

        <div className="mt-4 h-1 w-full rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-[#1EA0E8] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>
    </main>
  )
}
