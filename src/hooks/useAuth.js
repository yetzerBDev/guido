import { useEffect, useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'

export function useAuth() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false)
      return
    }

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
    if (!isSupabaseConfigured || !supabase) {
      return new Error('Supabase no esta configurado.')
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error
  }

  const signUp = async ({ email, password }) => {
    if (!isSupabaseConfigured || !supabase) {
      return new Error('Supabase no esta configurado.')
    }

    const { error } = await supabase.auth.signUp({ email, password })
    return error
  }

  const signOut = async () => {
    if (!isSupabaseConfigured || !supabase) {
      return new Error('Supabase no esta configurado.')
    }

    const { error } = await supabase.auth.signOut()
    return error
  }

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured || !supabase) {
      return new Error('Supabase no esta configurado.')
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/login`,
      },
    })

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
      signInWithGoogle,
    }),
    [session, loading],
  )
}
