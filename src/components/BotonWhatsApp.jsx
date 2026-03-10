export function BotonWhatsApp({ phone, text = 'Reservar por WhatsApp' }) {
  const cleanPhone = phone?.replace(/\D/g, '')
  const href = cleanPhone ? `https://wa.me/${cleanPhone}` : '#'

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
    >
      {text}
    </a>
  )
}
