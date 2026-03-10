import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useAuth() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const hydrateSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (mounted) {
        setSession(data.session)
        setLoading(false)
      }
    }

    hydrateSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error
  }

  const signUp = async ({ email, password }) => {
    const { error } = await supabase.auth.signUp({ email, password })
    return error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return error
  }

  return useMemo(
    () => ({
      user: session?.user ?? null,
      session,
      loading,
      signIn,
      signUp,
      signOut,
    }),
    [session, loading],
  )
}
