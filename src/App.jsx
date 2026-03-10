import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { useStandaloneMode } from './hooks/useStandaloneMode'
import { DetalleLugar } from './pages/DetalleLugar'
import { Home } from './pages/Home'
import { LoginRegistro } from './pages/LoginRegistro'

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

function App() {
  const location = useLocation()
  const isStandalone = useStandaloneMode()
  const hideHeader = location.pathname === '/login'

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,#EAF1FF_0%,#F8FAFF_35%,#FFFFFF_70%)]">
      {hideHeader ? null : <Header />}
      <Routes>
        <Route path="/" element={isStandalone ? <Navigate to="/login" replace /> : <Home />} />
        <Route path="/explorar" element={<Home />} />
        <Route path="/lugares/:id" element={<DetalleLugar />} />
        <Route path="/login" element={<LoginRegistro />} />
        <Route path="/terminos" element={<TerminosPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
