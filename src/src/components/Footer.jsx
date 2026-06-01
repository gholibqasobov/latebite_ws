import { Link } from 'react-router-dom'
import { Instagram, Send, Music2, Mail } from 'lucide-react'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="mt-20 bg-primary text-white/80">
      <div className="section py-12 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <Logo light />
          <p className="text-sm text-white/60 max-w-xs">
            Спасаем еду в кафе и ресторанах Алматы. Меньше отходов — больше пользы для планеты.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Платформа</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/offers" className="hover:text-mint">Предложения</Link></li>
            <li><Link to="/account" className="hover:text-mint">Личный кабинет</Link></li>
            <li><Link to="/partner" className="hover:text-mint">Для партнёров</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Компания</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-mint">О проекте</Link></li>
            <li><Link to="/contacts" className="hover:text-mint">Контакты</Link></li>
            <li><a href="#" className="hover:text-mint">Отчёты об устойчивости</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Мы в соцсетях</h4>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="grid place-items-center w-10 h-10 rounded-full bg-white/10 hover:bg-mint hover:text-primary transition-colors"><Instagram size={18} /></a>
            <a href="#" aria-label="Telegram" className="grid place-items-center w-10 h-10 rounded-full bg-white/10 hover:bg-mint hover:text-primary transition-colors"><Send size={18} /></a>
            <a href="#" aria-label="TikTok" className="grid place-items-center w-10 h-10 rounded-full bg-white/10 hover:bg-mint hover:text-primary transition-colors"><Music2 size={18} /></a>
          </div>
          <a href="mailto:hello@latebite.kz" className="mt-4 inline-flex items-center gap-2 text-sm hover:text-mint">
            <Mail size={16} /> hello@latebite.kz
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="section py-4 text-xs text-white/50 flex flex-col sm:flex-row gap-2 justify-between">
          <span>© 2026 LateBite. Демо-версия для презентации.</span>
          <span>SAVE FOOD · SAVE MONEY · SAVE THE PLANET</span>
        </div>
      </div>
    </footer>
  )
}
