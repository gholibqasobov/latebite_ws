import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ShoppingBag, Menu, X, User, Store, Globe } from 'lucide-react'
import Logo from './Logo.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useI18n } from '../lib/i18n.jsx'

export default function Navbar() {
  const { count } = useCart()
  const { t, lang, toggleLang } = useI18n()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/offers', label: t('nav.offers') },
    { to: '/about', label: t('nav.about') },
    { to: '/partner', label: t('nav.partner') },
    { to: '/contacts', label: t('nav.contacts') },
  ]

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
          <button
            onClick={toggleLang}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold text-primary-dark/70 hover:text-primary hover:bg-mint/30 transition-colors"
            aria-label={t('nav.lang.aria')}
            title={lang === 'ru' ? 'English' : 'Русский'}
          >
            <Globe size={16} /> {lang === 'ru' ? 'EN' : 'RU'}
          </button>
          <Link to="/account" className="hidden sm:inline-flex btn-ghost" aria-label={t('nav.account.aria')}>
            <User size={18} /> {t('nav.account')}
          </Link>
          <Link to="/cart" className="relative btn-ghost" aria-label={t('nav.cart.aria')}>
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
            aria-label={t('nav.menu.aria')}
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
              <span className="inline-flex items-center gap-2"><User size={16} /> {t('nav.account')}</span>
            </NavLink>
            <NavLink to="/partner" className={linkClass} onClick={() => setOpen(false)}>
              <span className="inline-flex items-center gap-2"><Store size={16} /> {t('nav.partner')}</span>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  )
}
