import { Navigate, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { DetalleLugar } from './pages/DetalleLugar'
import { Home } from './pages/Home'
import { LoginRegistro } from './pages/LoginRegistro'

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,#EAF1FF_0%,#F8FAFF_35%,#FFFFFF_70%)]">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lugares/:id" element={<DetalleLugar />} />
        <Route path="/login" element={<LoginRegistro />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
