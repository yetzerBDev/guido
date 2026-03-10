import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { useAuth } from './hooks/useAuth'
import { useOnboardingStatus } from './hooks/useOnboardingStatus'
import { useStandaloneMode } from './hooks/useStandaloneMode'
import { DetalleLugar } from './pages/DetalleLugar'
import { Home } from './pages/Home'
import { LoginRegistro } from './pages/LoginRegistro'
import { Onboarding } from './pages/Onboarding'

function TerminosPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-10 text-slate-700">
      <h1 className="text-3xl font-black text-guidoInk">Terminos y Condiciones</h1>
      <p className="mt-3 leading-relaxed">
        Esta vista es temporal. Aqui puedes integrar el contenido legal definitivo de GUIDO.
      </p>
    </main>
  )
}

function FullscreenLoader() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#F3F5F8] px-4">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#b8dff4] border-t-[#1EA0E8]" />
        <p className="mt-3 text-sm font-semibold text-slate-600">Cargando experiencia GUIDO...</p>
      </div>
    </main>
  )
}

function App() {
  const location = useLocation()
  const isStandalone = useStandaloneMode()
  const { user, loading: authLoading } = useAuth()
  const { needsOnboarding, loading: onboardingLoading } = useOnboardingStatus(user)
  const appLoading = authLoading || onboardingLoading
  const hideHeader = location.pathname === '/login' || location.pathname === '/onboarding'

  const renderRoot = () => {
    if (appLoading) {
      return <FullscreenLoader />
    }

    if (isStandalone && !user) {
      return <Navigate to="/login" replace />
    }

    if (user && needsOnboarding) {
      return <Navigate to="/onboarding" replace />
    }

    return <Home />
  }

  const renderExplore = () => {
    if (appLoading) {
      return <FullscreenLoader />
    }

    if (user && needsOnboarding) {
      return <Navigate to="/onboarding" replace />
    }

    return <Home />
  }

  const renderLogin = () => {
    if (appLoading) {
      return <FullscreenLoader />
    }

    if (user && needsOnboarding) {
      return <Navigate to="/onboarding" replace />
    }

    return <LoginRegistro />
  }

  const renderOnboarding = () => {
    if (appLoading) {
      return <FullscreenLoader />
    }

    if (!user) {
      return <Navigate to="/login" replace />
    }

    if (!needsOnboarding) {
      return <Navigate to="/explorar" replace />
    }

    return <Onboarding />
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,#EAF1FF_0%,#F8FAFF_35%,#FFFFFF_70%)]">
      {hideHeader ? null : <Header />}
      <Routes>
        <Route path="/" element={renderRoot()} />
        <Route path="/explorar" element={renderExplore()} />
        <Route path="/lugares/:id" element={<DetalleLugar />} />
        <Route path="/login" element={renderLogin()} />
        <Route path="/onboarding" element={renderOnboarding()} />
        <Route path="/terminos" element={<TerminosPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
