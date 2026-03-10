import { Link, useParams } from 'react-router-dom'
import { BotonWhatsApp } from '../components/BotonWhatsApp'
import { usePlaces } from '../hooks/usePlaces'

export function DetalleLugar() {
  const { id } = useParams()
  const { places, loading, error } = usePlaces()

  const place = places.find((item) => String(item.id) === id)

  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <Link to="/" className="text-sm font-semibold text-guidoBlue hover:underline">
        Volver al listado
      </Link>

      {loading ? <p className="mt-4 text-sm text-slate-600">Cargando detalle...</p> : null}
      {error ? <p className="mt-4 text-sm text-red-600">Error: {error}</p> : null}

      {!loading && !error && !place ? (
        <p className="mt-4 text-sm text-slate-700">No encontramos este lugar.</p>
      ) : null}

      {place ? (
        <article className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <img
            src={place.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=80'}
            alt={place.name}
            className="h-72 w-full object-cover"
          />
          <div className="space-y-4 p-6">
            <div>
              <h1 className="text-3xl font-black text-guidoInk">{place.name}</h1>
              <p className="text-sm font-semibold text-guidoBlue">{place.city}</p>
            </div>
            <p className="leading-relaxed text-slate-700">{place.description}</p>
            <BotonWhatsApp phone={place.whatsapp} />
          </div>
        </article>
      ) : null}
    </main>
  )
}
