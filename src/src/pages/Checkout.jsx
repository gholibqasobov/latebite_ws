import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldCheck, Loader2, Phone } from 'lucide-react'
import { tenge } from '../lib/format.js'
import { useCart } from '../context/CartContext.jsx'
import { dishById } from '../data/dishes.js'
import { useI18n } from '../lib/i18n.jsx'

export default function Checkout() {
  const { items, count, clear } = useCart()
  const { t, td, lang } = useI18n()
  const navigate = useNavigate()
  const [paying, setPaying] = useState(false)

  const lines = Object.entries(items).map(([id, qty]) => ({ dish: dishById(id), qty })).filter((l) => l.dish)
  const total = lines.reduce((s, l) => s + l.dish.price * l.qty, 0)

  if (count === 0) {
    return (
      <div className="section py-20 text-center">
        <p className="text-primary-dark/60">{t('checkout.empty')}</p>
        <Link to="/offers" className="btn-primary mt-4">{t('checkout.toOffers')}</Link>
      </div>
    )
  }

  const pay = () => {
    // DEMO: имитация оплаты Kaspi. Реальная интеграция Kaspi.kz API — на этапе запуска.
    setPaying(true)
    const code = `LB-2026-${Math.floor(1000 + Math.random() * 8999)}`
    setTimeout(() => {
      clear()
      navigate('/checkout/success', { state: { code, total } })
    }, 2200)
  }

  return (
    <div className="section py-8 max-w-2xl">
      <h1 className="text-3xl font-extrabold text-primary">{t('checkout.title')}</h1>

      <div className="mt-6 card p-5 space-y-3">
        <h2 className="font-bold text-primary">{t('checkout.order')}</h2>
        {lines.map(({ dish, qty }) => (
          <div key={dish.id} className="flex justify-between text-sm">
            <span>{td(dish, 'name')} × {qty}</span>
            <span className="font-semibold">{tenge(dish.price * qty, lang)}</span>
          </div>
        ))}
        <div className="border-t border-black/[0.06] pt-3 flex justify-between font-extrabold text-primary text-lg">
          <span>{t('checkout.toPay')}</span><span>{tenge(total, lang)}</span>
        </div>
      </div>

      <div className="mt-5 card p-5">
        <h2 className="font-bold text-primary">{t('checkout.method')}</h2>
        <label className="mt-3 flex items-center gap-3 p-3 rounded-xl border-2 border-[#F14635] bg-[#F14635]/5">
          <input type="radio" defaultChecked className="accent-[#F14635]" />
          <span className="font-bold text-[#F14635] text-lg">Kaspi.kz</span>
          <span className="text-sm text-primary-dark/60">{t('checkout.kaspiSub')}</span>
        </label>
        <div className="mt-3 flex items-center gap-2 text-sm text-primary-dark/60">
          <Phone size={15} /> {t('checkout.phone')}
        </div>
      </div>

      <button
        onClick={pay}
        disabled={paying}
        className="btn w-full mt-6 text-base !py-4 bg-[#F14635] text-white hover:brightness-105 active:scale-[0.99] shadow-soft"
      >
        {paying ? (
          <><Loader2 size={20} className="animate-spin" /> {t('checkout.paying')}</>
        ) : (
          <>{t('checkout.payBtn', { total: tenge(total, lang) })}</>
        )}
      </button>

      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-primary-dark/50">
        <ShieldCheck size={14} /> {t('checkout.disclaimer')}
      </div>
    </div>
  )
}
