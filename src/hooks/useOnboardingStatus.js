import { useCallback, useEffect, useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'

export function useOnboardingStatus(user) {
  const userId = user?.id ?? null
  const usernameFallback =
    user?.user_metadata?.username ?? user?.user_metadata?.full_name ?? user?.email ?? 'usuario'
  const [loading, setLoading] = useState(Boolean(userId))
  const [needsOnboarding, setNeedsOnboarding] = useState(false)
  const [step, setStep] = useState(0)
  const [error, setError] = useState(null)

  const fetchProfile = useCallback(async () => {
    if (!userId) {
      setNeedsOnboarding(false)
      setStep(0)
      setError(null)
      setLoading(false)
      return
    }

    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase no esta configurado.')
      setNeedsOnboarding(false)
      setStep(0)
      setLoading(false)
      return
    }

    setError(null)

    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('onboarding_completed, onboarding_step')
      .eq('id', userId)
      .maybeSingle()

    if (profileError) {
      setError(profileError.message)
      setNeedsOnboarding(false)
      setStep(0)
      setLoading(false)
      return
    }

    if (!data) {
      const { error: upsertError } = await supabase.from('profiles').upsert(
        {
          id: userId,
          username: usernameFallback,
          onboarding_completed: false,
          onboarding_step: 0,
        },
        { onConflict: 'id' },
      )

      if (upsertError) {
        setError(upsertError.message)
        setNeedsOnboarding(false)
        setStep(0)
        setLoading(false)
        return
      }

      setNeedsOnboarding(true)
      setStep(0)
      setLoading(false)
      return
    }

    const completed = Boolean(data.onboarding_completed)
    setNeedsOnboarding(!completed)
    setStep(data.onboarding_step ?? 0)
    setLoading(false)
  }, [userId, usernameFallback])

  useEffect(() => {
    setLoading(Boolean(userId))
    fetchProfile()
  }, [fetchProfile, userId])

  const completeOnboarding = useCallback(
    async ({ motive, interests }) => {
      if (!userId) {
        return 'No hay sesion activa.'
      }

      if (!isSupabaseConfigured || !supabase) {
        return 'Supabase no esta configurado.'
      }

      setError(null)

      const { error: rpcError } = await supabase.rpc('complete_onboarding', {
        p_motive: motive,
        p_interests: interests,
      })

      if (rpcError) {
        setError(rpcError.message)
        return rpcError.message
      }

      setNeedsOnboarding(false)
      setStep(3)
      return null
    },
    [userId],
  )

  return useMemo(
    () => ({
      loading,
      needsOnboarding,
      step,
      error,
      refreshOnboardingStatus: fetchProfile,
      completeOnboarding,
    }),
    [loading, needsOnboarding, step, error, fetchProfile, completeOnboarding],
  )
}
