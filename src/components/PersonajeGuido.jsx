export function PersonajeGuido() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-blue-200/70 bg-gradient-to-br from-guidoBlue to-cyan-500 p-6 text-white shadow-lg">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/20" />
      <div className="absolute -bottom-10 left-8 h-24 w-24 rounded-full bg-sky-300/30" />
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Asistente GUIDO</p>
      <h2 className="mt-2 text-2xl font-black leading-tight">Te guio a los mejores lugares</h2>
      <p className="mt-3 max-w-sm text-sm text-blue-50">
        Descubre sitios recomendados y datos actualizados en tiempo real desde Supabase.
      </p>
    </div>
  )
}
