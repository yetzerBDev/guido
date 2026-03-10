import { CardLugar } from '../components/CardLugar'
import { PersonajeGuido } from '../components/PersonajeGuido'
import { usePlaces } from '../hooks/usePlaces'

export function Home() {
  const { places, loading, error } = usePlaces()

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-guidoBlue">PWA Lista para Instalar</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-guidoInk sm:text-5xl">
            Explora lugares con rendimiento de app nativa
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            GUIDO combina React + Supabase para mostrar recomendaciones en tiempo real con experiencia
            instalable en móvil.
          </p>
        </div>
        <PersonajeGuido />
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-black text-guidoInk">Lugares</h2>
          <span className="text-sm font-medium text-slate-500">Sincronizado con Supabase</span>
        </div>

        {loading ? <p className="text-sm text-slate-600">Cargando lugares...</p> : null}
        {error ? <p className="text-sm font-medium text-red-600">Error: {error}</p> : null}

        {!loading && !error ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((place) => (
              <CardLugar key={place.id} place={place} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  )
}
