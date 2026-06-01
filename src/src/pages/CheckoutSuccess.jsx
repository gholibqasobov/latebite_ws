import { Link, useLocation, Navigate } from 'react-router-dom'
import { CheckCircle2, Clock } from 'lucide-react'
import QRTicket from '../components/QRTicket.jsx'
import { tenge } from '../lib/format.js'

export default function CheckoutSuccess() {
  const { state } = useLocation()
  if (!state?.code) return <Navigate to="/offers" replace />

  return (
    <div className="section py-12 max-w-lg text-center">
      <div className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-mint/50 text-primary animate-fade-up">
        <CheckCircle2 size={36} />
      </div>
      <h1 className="mt-4 text-3xl font-extrabold text-primary">Заказ оплачен!</h1>
      <p className="mt-2 text-primary-dark/60">
        Покажите этот QR-код на кассе кафе, чтобы забрать заказ.
      </p>

      <div className="mt-8 card p-6 flex flex-col items-center gap-4">
        <QRTicket value={state.code} />
        <div className="flex items-center gap-2 text-sm text-primary-dark/70">
          <Clock size={16} /> Заберите заказ в указанное время выдачи
        </div>
        <div className="text-lg font-extrabold text-primary">Оплачено: {tenge(state.total)}</div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link to="/account" className="btn-primary">Мои заказы</Link>
        <Link to="/offers" className="btn-outline">Продолжить покупки</Link>
      </div>
    </div>
  )
}
