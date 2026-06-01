import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ShoppingBag, Menu, X, User, Store } from 'lucide-react'
import Logo from './Logo.jsx'
import { useCart } from '../context/CartContext.jsx'

const links = [
  { to: '/offers', label: 'Предложения' },
  { to: '/about', label: 'О проекте' },
  { to: '/partner', label: 'Партнёрам' },
  { to: '/contacts', label: 'Контакты' },
]

export default function Navbar() {
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-full text-sm font-semibold transition-colors ${
      isActive ? 'text-primary bg-mint/40' : 'text-primary-dark/70 hover:text-primary'
    }`

  return (
    <header className="sticky top-0 z-50 bg-canvas/85 backdrop-blur border-b border-black/[0.05]">
      <nav className="section flex items-center justify-between h-16">
        <Logo />

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link to="/account" className="hidden sm:inline-flex btn-ghost" aria-label="Аккаунт">
            <User size={18} /> Кабинет
          </Link>
          <Link to="/cart" className="relative btn-ghost" aria-label="Корзина">
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 grid place-items-center min-w-5 h-5 px-1 rounded-full bg-accent text-primary-dark text-xs font-bold">
                {count}
              </span>
            )}
          </Link>
          <button
            className="md:hidden btn-ghost"
            onClick={() => setOpen((o) => !o)}
            aria-label="Меню"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-black/[0.05] bg-canvas">
          <div className="section py-3 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/account" className={linkClass} onClick={() => setOpen(false)}>
              <span className="inline-flex items-center gap-2"><User size={16} /> Кабинет</span>
            </NavLink>
            <NavLink to="/partner" className={linkClass} onClick={() => setOpen(false)}>
              <span className="inline-flex items-center gap-2"><Store size={16} /> Партнёрам</span>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  )
}
