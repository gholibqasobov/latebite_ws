import { useState } from 'react'
import { Package, History, Leaf, User, Gift, Clock, MapPin, Copy, TreePine, Cloud, Utensils, Wallet, Bell } from 'lucide-react'
import QRTicket from '../components/QRTicket.jsx'
import { tenge, plural } from '../lib/format.js'
import { useToast } from '../context/ToastContext.jsx'
import { activeOrders, orderHistory } from '../data/orders.js'
import { dishById } from '../data/dishes.js'
import { restaurantById } from '../data/restaurants.js'
import { userEco, referral } from '../data/reviews.js'

const tabs = [
  { id: 'active', label: 'Активные заказы', icon: Package },
  { id: 'history', label: 'История', icon: History },
  { id: 'eco', label: 'Эко-трекер', icon: Leaf },
  { id: 'referral', label: 'Рефералы', icon: Gift },
  { id: 'profile', label: 'Профиль', icon: User },
]

export default function Account() {
  const [tab, setTab] = useState('active')

  return (
    <div className="section py-8">
      <div className="flex items-center gap-4">
        <div className="grid place-items-center w-14 h-14 rounded-full bg-primary text-mint text-xl font-extrabold">А</div>
        <div>
          <h1 className="text-2xl font-extrabold text-primary">Айгерим Нурланова</h1>
          <p className="text-primary-dark/60 text-sm">+7 777 123 45 67 · aigerim@example.kz</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar border-b border-black/[0.06] pb-px">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${
              tab === t.id ? 'border-primary text-primary' : 'border-transparent text-primary-dark/50 hover:text-primary'
            }`}
          >
            <t.icon size={16} /> {t.label}
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
  if (!activeOrders.length) return <Empty text="Нет активных заказов" />
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {activeOrders.map((o) => {
        const r = restaurantById(o.restaurantId)
        return (
          <div key={o.id} className="card p-5 flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">{r.name}</span>
                <span className={`chip text-xs font-semibold ${o.status === 'Готов к выдаче' ? 'bg-mint/60 text-primary' : 'bg-accent/40 text-primary-dark'}`}>{o.status}</span>
              </div>
              <div className="mt-1 text-xs text-primary-dark/50 flex items-center gap-1"><MapPin size={12} /> {r.address}</div>
              <ul className="mt-3 space-y-1 text-sm">
                {o.items.map((it) => {
                  const d = dishById(it.dishId)
                  return <li key={it.dishId} className="flex justify-between"><span>{d.name} × {it.qty}</span><span className="font-semibold">{tenge(it.price * it.qty)}</span></li>
                })}
              </ul>
              <div className="mt-3 flex items-center gap-1 text-sm text-primary"><Clock size={14} /> Выдача: {o.pickup}</div>
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
  return (
    <div className="card divide-y divide-black/[0.06]">
      {orderHistory.map((o) => {
        const r = restaurantById(o.restaurantId)
        const names = o.items.map((it) => `${dishById(it.dishId).name} × ${it.qty}`).join(', ')
        return (
          <div key={o.id} className="p-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="font-semibold text-primary-dark">{r.name}</div>
              <div className="text-sm text-primary-dark/60 truncate">{names}</div>
              <div className="text-xs text-primary-dark/40 mt-0.5">{o.date} · {o.id}</div>
            </div>
            <div className="font-extrabold text-primary whitespace-nowrap">{tenge(o.total)}</div>
          </div>
        )
      })}
    </div>
  )
}

function EcoTracker() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-4 gap-4">
        <Stat icon={Cloud} value={`${userEco.co2} кг`} label="CO₂ сэкономлено" />
        <Stat icon={Utensils} value={userEco.meals} label="порций спасено" />
        <Stat icon={TreePine} value={userEco.trees} label="деревьев сохранено" />
        <Stat icon={Wallet} value={tenge(userEco.money)} label="сэкономлено" />
      </div>

      <div className="card p-6">
        <h3 className="font-bold text-primary">Ваш лес</h3>
        <p className="text-sm text-primary-dark/60">Каждые ~6 спасённых порций = 1 условное дерево</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <TreePine key={i} size={40} className={i < userEco.trees ? 'text-primary' : 'text-primary/15'} />
          ))}
        </div>
        <div className="mt-4 h-3 rounded-full bg-mint/30 overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${(userEco.meals % 6) / 6 * 100}%` }} />
        </div>
        <p className="mt-2 text-sm text-primary-dark/60">
          До следующего дерева: {6 - (userEco.meals % 6)} {plural(6 - (userEco.meals % 6), 'порция', 'порции', 'порций')}
        </p>
      </div>
    </div>
  )
}

function Referral() {
  const { toast } = useToast()
  const copy = () => {
    navigator.clipboard?.writeText(referral.code)
    toast('Промокод скопирован')
  }
  return (
    <div className="space-y-6">
      <div className="card p-6 bg-primary text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-mint/10 rounded-full" />
        <h3 className="text-xl font-extrabold relative">Пригласите друга — получите скидку</h3>
        <p className="text-white/70 mt-1 relative">Друг получает −15% на первый заказ, вы — 500 ₸ бонусов.</p>
        <div className="mt-4 flex flex-wrap items-center gap-3 relative">
          <span className="font-mono text-2xl font-extrabold text-accent tracking-wider">{referral.code}</span>
          <button onClick={copy} className="btn-accent !py-2"><Copy size={16} /> Скопировать</button>
        </div>
        <div className="mt-4 flex gap-6 text-sm relative">
          <div><b className="text-accent">{referral.invited}</b> приглашено</div>
          <div><b className="text-accent">{tenge(referral.bonus)}</b> бонусов</div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-primary mb-3">Промокоды и бонусы</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {referral.promos.map((p) => (
            <div key={p.code} className="card p-4">
              <div className="font-mono font-bold text-primary">{p.code}</div>
              <div className="text-sm text-primary-dark/70 mt-1">{p.desc}</div>
              <div className="text-xs text-primary-dark/40 mt-2">{p.expires}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Profile() {
  const { toast } = useToast()
  const [notif, setNotif] = useState({ push: true, email: false })
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="card p-6 space-y-4">
        <h3 className="font-bold text-primary">Личные данные</h3>
        <Field label="Имя" defaultValue="Айгерим Нурланова" />
        <Field label="Телефон" defaultValue="+7 777 123 45 67" />
        <Field label="Email" defaultValue="aigerim@example.kz" />
        <button onClick={() => toast('Изменения сохранены')} className="btn-primary">Сохранить</button>
      </div>

      <div className="space-y-6">
        <div className="card p-6">
          <h3 className="font-bold text-primary flex items-center gap-2"><Wallet size={18} /> Способы оплаты</h3>
          <div className="mt-3 flex items-center justify-between p-3 rounded-xl border border-[#F14635]/40 bg-[#F14635]/5">
            <span className="font-bold text-[#F14635]">Kaspi.kz</span>
            <span className="text-sm text-primary-dark/60">•••• 4567</span>
          </div>
          <button className="btn-ghost mt-3 text-sm">+ Добавить способ оплаты</button>
        </div>

        <div className="card p-6">
          <h3 className="font-bold text-primary flex items-center gap-2"><Bell size={18} /> Уведомления</h3>
          <Toggle label="Push-уведомления" on={notif.push} onClick={() => setNotif((n) => ({ ...n, push: !n.push }))} />
          <Toggle label="Email-рассылка" on={notif.email} onClick={() => setNotif((n) => ({ ...n, email: !n.email }))} />
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
