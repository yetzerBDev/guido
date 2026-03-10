import { useEffect, useState } from 'react'

function detectStandalone() {
  if (typeof window === 'undefined') {
    return false
  }

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    window.navigator.standalone === true
  )
}

export function useStandaloneMode() {
  const [isStandalone, setIsStandalone] = useState(detectStandalone)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    const update = () => setIsStandalone(detectStandalone())

    update()
    mediaQuery.addEventListener('change', update)
    window.addEventListener('focus', update)

    return () => {
      mediaQuery.removeEventListener('change', update)
      window.removeEventListener('focus', update)
    }
  }, [])

  return isStandalone
}
