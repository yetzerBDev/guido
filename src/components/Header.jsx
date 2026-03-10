import { Link, NavLink } from 'react-router-dom'

function navClassName({ isActive }) {
  return isActive
    ? 'rounded-full bg-guidoBlue px-4 py-2 text-sm font-semibold text-white'
    : 'rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100'
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-black tracking-tight text-guidoInk">
          GUIDO
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={navClassName}>
            Inicio
          </NavLink>
          <NavLink to="/login" className={navClassName}>
            Acceso
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
