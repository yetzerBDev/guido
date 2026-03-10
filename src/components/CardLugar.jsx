import { Link } from 'react-router-dom'
import { BotonWhatsApp } from './BotonWhatsApp'

export function CardLugar({ place }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <img
        src={place.image_url || 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'}
        alt={place.name}
        className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
      />
      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-lg font-bold text-guidoInk">{place.name}</h3>
          <p className="text-sm font-medium text-guidoBlue">{place.city}</p>
        </div>
        <p className="line-clamp-3 text-sm text-slate-600">{place.description}</p>
        <div className="flex items-center justify-between gap-3">
          <Link
            to={`/lugares/${place.id}`}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-guidoBlue hover:text-guidoBlue"
          >
            Ver detalle
          </Link>
          <BotonWhatsApp phone={place.whatsapp} text="WhatsApp" />
        </div>
      </div>
    </article>
  )
}
