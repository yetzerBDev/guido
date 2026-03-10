import { useCallback, useEffect, useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'

export function usePlaces() {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPlaces = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase no esta configurado. Agrega VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { data, error: queryError } = await supabase
        .from('places')
        .select('id, category_id, name, description, whatsapp_link, maps_link, lat, lng, is_active, created_at')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (queryError) {
        setError(queryError.message)
        setLoading(false)
        return
      }

      const normalizedPlaces = (data ?? []).map((place) => ({
        ...place,
        city: 'La Ceiba',
        whatsapp: place.whatsapp_link ?? '',
        image_url: place.image_url ?? '',
      }))

      setPlaces(normalizedPlaces)
      setLoading(false)
    } catch {
      setError('No se pudo cargar lugares. Verifica la conexion y configuracion de Supabase.')
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPlaces()

    if (!isSupabaseConfigured || !supabase) {
      return
    }

    const channel = supabase
      .channel('places-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'places' },
        () => {
          fetchPlaces()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchPlaces])

  return useMemo(
    () => ({
      places,
      loading,
      error,
      refetchPlaces: fetchPlaces,
    }),
    [places, loading, error, fetchPlaces],
  )
}
