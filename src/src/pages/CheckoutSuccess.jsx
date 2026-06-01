import { Link, useLocation, Navigate } from 'react-router-dom'
import { CheckCircle2, Clock } from 'lucide-react'
import QRTicket from '../components/QRTicket.jsx'
import { tenge } from '../lib/format.js'
import { useI18n } from '../lib/i18n.jsx'

export default function CheckoutSuccess() {
  const { state } = useLocation()
  const { t, lang } = useI18n()
  if (!state?.code) return <Navigate to="/offers" replace />

  return (
    <div className="section py-12 max-w-lg text-center">
      <div className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-mint/50 text-primary animate-fade-up">
        <CheckCircle2 size={36} />
      </div>
      <h1 className="mt-4 text-3xl font-extrabold text-primary">{t('success.title')}</h1>
      <p className="mt-2 text-primary-dark/60">{t('success.sub')}</p>

      <div className="mt-8 card p-6 flex flex-col items-center gap-4">
        <QRTicket value={state.code} />
        <div className="flex items-center gap-2 text-sm text-primary-dark/70">
          <Clock size={16} /> {t('success.pickup')}
        </div>
        <div className="text-lg font-extrabold text-primary">{t('success.paid', { total: tenge(state.total, lang) })}</div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link to="/account" className="btn-primary">{t('success.myOrders')}</Link>
        <Link to="/offers" className="btn-outline">{t('success.continue')}</Link>
      </div>
    </div>
  )
}
