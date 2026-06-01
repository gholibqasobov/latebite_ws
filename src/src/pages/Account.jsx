import { useState } from 'react'
import { Package, History, Leaf, User, Gift, Clock, MapPin, Copy, TreePine, Cloud, Utensils, Wallet, Bell } from 'lucide-react'
import QRTicket from '../components/QRTicket.jsx'
import { tenge } from '../lib/format.js'
import { useToast } from '../context/ToastContext.jsx'
import { activeOrders, orderHistory } from '../data/orders.js'
import { dishById } from '../data/dishes.js'
import { restaurantById } from '../data/restaurants.js'
import { userEco, referral } from '../data/reviews.js'
import { useI18n } from '../lib/i18n.jsx'

export default function Account() {
  const { t } = useI18n()
  const [tab, setTab] = useState('active')

  const tabs = [
    { id: 'active', label: t('acc.tab.active'), icon: Package },
    { id: 'history', label: t('acc.tab.history'), icon: History },
    { id: 'eco', label: t('acc.tab.eco'), icon: Leaf },
    { id: 'referral', label: t('acc.tab.referral'), icon: Gift },
    { id: 'profile', label: t('acc.tab.profile'), icon: User },
  ]

  return (
    <div className="section py-8">
      <div className="flex items-center gap-4">
        <div className="grid place-items-center w-14 h-14 rounded-full bg-primary text-mint text-xl font-extrabold">A</div>
        <div>
          <h1 className="text-2xl font-extrabold text-primary">{t('acc.userName')}</h1>
          <p className="text-primary-dark/60 text-sm">+7 777 123 45 67 · aigerim@example.kz</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar border-b border-black/[0.06] pb-px">
        {tabs.map((tb) => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${
              tab === tb.id ? 'border-primary text-primary' : 'border-transparent text-primary-dark/50 hover:text-primary'
            }`}
          >
            <tb.icon size={16} /> {tb.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'active' && <ActiveOrders />}
        {tab === 'history' && <OrderHistory />}
        {tab === 'eco' && <EcoTracker />}
        {tab === 'referral' && <Referral />}
        {tab === 'profile' && <Profile />}
      </div>
    </div>
  )
}

function ActiveOrders() {
  const { t, tx, td, tres, lang } = useI18n()
  if (!activeOrders.length) return <Empty text={t('acc.empty.active')} />
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {activeOrders.map((o) => {
        const r = restaurantById(o.restaurantId)
        const statusReady = o.status === 'Готов к выдаче'
        return (
          <div key={o.id} className="card p-5 flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">{r.name}</span>
                <span className={`chip text-xs font-semibold ${statusReady ? 'bg-mint/60 text-primary' : 'bg-accent/40 text-primary-dark'}`}>{tx(o.status)}</span>
              </div>
              <div className="mt-1 text-xs text-primary-dark/50 flex items-center gap-1"><MapPin size={12} /> {tres(r, 'address')}</div>
              <ul className="mt-3 space-y-1 text-sm">
                {o.items.map((it) => {
                  const d = dishById(it.dishId)
                  return <li key={it.dishId} className="flex justify-between"><span>{td(d, 'name')} × {it.qty}</span><span className="font-semibold">{tenge(it.price * it.qty, lang)}</span></li>
                })}
              </ul>
              <div className="mt-3 flex items-center gap-1 text-sm text-primary"><Clock size={14} /> {t('acc.pickup', { time: lang === 'en' ? o.pickup.replace('сегодня', 'today') : o.pickup })}</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <QRTicket value={o.code} size={120} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function OrderHistory() {
  const { td, trev, lang } = useI18n()
  return (
    <div className="card divide-y divide-black/[0.06]">
      {orderHistory.map((o) => {
        const r = restaurantById(o.restaurantId)
        const names = o.items.map((it) => `${td(dishById(it.dishId), 'name')} × ${it.qty}`).join(', ')
        return (
          <div key={o.id} className="p-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="font-semibold text-primary-dark">{r.name}</div>
              <div className="text-sm text-primary-dark/60 truncate">{names}</div>
              <div className="text-xs text-primary-dark/40 mt-0.5">{trev({ id: -1, date: o.date }, 'date')} · {o.id}</div>
            </div>
            <div className="font-extrabold text-primary whitespace-nowrap">{tenge(o.total, lang)}</div>
          </div>
        )
      })}
    </div>
  )
}

function EcoTracker() {
  const { t, plr, lang } = useI18n()
  const remain = 6 - (userEco.meals % 6)
  const pluralWord = plr(remain,
    t('acc.eco.portionOne'),
    t('acc.eco.portionFew'),
    t('acc.eco.portionMany'),
    t('acc.eco.portionOne'),
    t('acc.eco.portionFew'),
  )
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-4 gap-4">
        <Stat icon={Cloud} value={`${userEco.co2} ${lang === 'en' ? 'kg' : 'кг'}`} label={t('acc.eco.co2')} />
        <Stat icon={Utensils} value={userEco.meals} label={t('acc.eco.meals')} />
        <Stat icon={TreePine} value={userEco.trees} label={t('acc.eco.trees')} />
        <Stat icon={Wallet} value={tenge(userEco.money, lang)} label={t('acc.eco.money')} />
      </div>

      <div className="card p-6">
        <h3 className="font-bold text-primary">{t('acc.eco.forestTitle')}</h3>
        <p className="text-sm text-primary-dark/60">{t('acc.eco.forestSub')}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <TreePine key={i} size={40} className={i < userEco.trees ? 'text-primary' : 'text-primary/15'} />
          ))}
        </div>
        <div className="mt-4 h-3 rounded-full bg-mint/30 overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${(userEco.meals % 6) / 6 * 100}%` }} />
        </div>
        <p className="mt-2 text-sm text-primary-dark/60">
          {t('acc.eco.nextTree', { n: remain, plural: pluralWord })}
        </p>
      </div>
    </div>
  )
}

function Referral() {
  const { t, lang } = useI18n()
  const { toast } = useToast()
  const copy = () => {
    navigator.clipboard?.writeText(referral.code)
    toast(t('acc.ref.copied'))
  }
  return (
    <div className="space-y-6">
      <div className="card p-6 bg-primary text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-mint/10 rounded-full" />
        <h3 className="text-xl font-extrabold relative">{t('acc.ref.title')}</h3>
        <p className="text-white/70 mt-1 relative">{t('acc.ref.sub')}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3 relative">
          <span className="font-mono text-2xl font-extrabold text-accent tracking-wider">{referral.code}</span>
          <button onClick={copy} className="btn-accent !py-2"><Copy size={16} /> {t('acc.ref.copy')}</button>
        </div>
        <div className="mt-4 flex gap-6 text-sm relative">
          <div><b className="text-accent">{referral.invited}</b> {t('acc.ref.invited')}</div>
          <div><b className="text-accent">{tenge(referral.bonus, lang)}</b> {t('acc.ref.bonuses')}</div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-primary mb-3">{t('acc.ref.promosTitle')}</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {referral.promos.map((p) => (
            <div key={p.code} className="card p-4">
              <div className="font-mono font-bold text-primary">{p.code}</div>
              <div className="text-sm text-primary-dark/70 mt-1">{t(`acc.ref.promo.${p.code}.desc`)}</div>
              <div className="text-xs text-primary-dark/40 mt-2">{t(`acc.ref.promo.${p.code}.expires`)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Profile() {
  const { t } = useI18n()
  const { toast } = useToast()
  const [notif, setNotif] = useState({ push: true, email: false })
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="card p-6 space-y-4">
        <h3 className="font-bold text-primary">{t('acc.profile.title')}</h3>
        <Field label={t('acc.profile.name')} defaultValue={t('acc.userName')} />
        <Field label={t('acc.profile.phone')} defaultValue="+7 777 123 45 67" />
        <Field label={t('acc.profile.email')} defaultValue="aigerim@example.kz" />
        <button onClick={() => toast(t('acc.profile.saved'))} className="btn-primary">{t('acc.profile.save')}</button>
      </div>

      <div className="space-y-6">
        <div className="card p-6">
          <h3 className="font-bold text-primary flex items-center gap-2"><Wallet size={18} /> {t('acc.pay.title')}</h3>
          <div className="mt-3 flex items-center justify-between p-3 rounded-xl border border-[#F14635]/40 bg-[#F14635]/5">
            <span className="font-bold text-[#F14635]">Kaspi.kz</span>
            <span className="text-sm text-primary-dark/60">•••• 4567</span>
          </div>
          <button className="btn-ghost mt-3 text-sm">{t('acc.pay.add')}</button>
        </div>

        <div className="card p-6">
          <h3 className="font-bold text-primary flex items-center gap-2"><Bell size={18} /> {t('acc.notif.title')}</h3>
          <Toggle label={t('acc.notif.push')} on={notif.push} onClick={() => setNotif((n) => ({ ...n, push: !n.push }))} />
          <Toggle label={t('acc.notif.email')} on={notif.email} onClick={() => setNotif((n) => ({ ...n, email: !n.email }))} />
        </div>
      </div>
    </div>
  )
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="card p-5">
      <Icon size={22} className="text-primary" />
      <div className="mt-2 text-2xl font-extrabold text-primary">{value}</div>
      <div className="text-sm text-primary-dark/60">{label}</div>
    </div>
  )
}

function Field({ label, defaultValue }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-primary-dark/50 uppercase tracking-wide">{label}</span>
      <input defaultValue={defaultValue} className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30" />
    </label>
  )
}

function Toggle({ label, on, onClick }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm">{label}</span>
      <button onClick={onClick} className={`w-11 h-6 rounded-full transition-colors relative ${on ? 'bg-primary' : 'bg-black/15'}`}>
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${on ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
    </div>
  )
}

function Empty({ text }) {
  return <div className="card p-10 text-center text-primary-dark/60">{text}</div>
}
