import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function usePlaces() {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPlaces = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { data, error: queryError } = await supabase
      .from('places')
      .select('id, name, city, description, whatsapp, image_url')
      .order('id', { ascending: true })

    if (queryError) {
      setError(queryError.message)
      setLoading(false)
      return
    }

    setPlaces(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchPlaces()

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
