import { useState } from 'react'
import {
  UtensilsCrossed, ClipboardList, QrCode, BarChart3, Star, Settings,
  Plus, Pencil, Trash2, X, Check, ScanLine, TrendingUp, Package, Leaf,
} from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import Img from '../components/Img.jsx'
import { tenge } from '../lib/format.js'
import { useToast } from '../context/ToastContext.jsx'
import { dishesByRestaurant, dishById, discountPct } from '../data/dishes.js'
import { incomingOrders } from '../data/orders.js'
import { partnerAnalytics } from '../data/ecoStats.js'
import { reviews } from '../data/reviews.js'
import { restaurantById } from '../data/restaurants.js'
import { useI18n } from '../lib/i18n.jsx'

const RID = 'navat' // demo restaurant: Navat

export default function Partner() {
  const { t, tres, lang } = useI18n()
  const [tab, setTab] = useState('menu')
  const restaurant = restaurantById(RID)

  const tabs = [
    { id: 'menu', label: t('partner.tab.menu'), icon: UtensilsCrossed },
    { id: 'orders', label: t('partner.tab.orders'), icon: ClipboardList },
    { id: 'scanner', label: t('partner.tab.scanner'), icon: QrCode },
    { id: 'analytics', label: t('partner.tab.analytics'), icon: BarChart3 },
    { id: 'reviews', label: t('partner.tab.reviews'), icon: Star },
    { id: 'profile', label: t('partner.tab.profile'), icon: Settings },
  ]

  return (
    <div className="section py-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <span className="chip bg-accent/40 text-primary-dark font-semibold">{t('partner.badge')}</span>
          <h1 className="mt-2 text-2xl font-extrabold text-primary">{restaurant.name}</h1>
          <p className="text-primary-dark/60 text-sm">{tres(restaurant, 'address')}</p>
        </div>
        <div className="flex gap-3">
          <MiniStatInline label={t('partner.weekRev')} value={tenge(partnerAnalytics.totals.revenue, lang)} />
          <MiniStatInline label={t('partner.sold')} value={partnerAnalytics.totals.meals} />
        </div>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar border-b border-black/[0.06] pb-px">
        {tabs.map((tb) => (
          <button key={tb.id} onClick={() => setTab(tb.id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${
              tab === tb.id ? 'border-primary text-primary' : 'border-transparent text-primary-dark/50 hover:text-primary'
            }`}>
            <tb.icon size={16} /> {tb.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'menu' && <MenuManager />}
        {tab === 'orders' && <Orders />}
        {tab === 'scanner' && <Scanner />}
        {tab === 'analytics' && <Analytics />}
        {tab === 'reviews' && <Reviews />}
        {tab === 'profile' && <Profile restaurant={restaurant} />}
      </div>
    </div>
  )
}

function MenuManager() {
  const { t, td, lang } = useI18n()
  const { toast } = useToast()
  const [meals, setMeals] = useState(() =>
    dishesByRestaurant(RID).map((d) => ({ id: d.id, name: td(d, 'name'), price: d.price, oldPrice: d.oldPrice, qty: Math.ceil(Math.random() * 6) + 2, portion: td(d, 'portion'), pickup: td(d, 'pickup'), description: td(d, 'description'), photo: d.photo })),
  )
  const [editing, setEditing] = useState(null)

  const remove = (id) => { setMeals((m) => m.filter((x) => x.id !== id)); toast(t('partner.menu.removed')) }
  const save = (meal) => {
    setMeals((m) => {
      const exists = m.some((x) => x.id === meal.id)
      return exists ? m.map((x) => (x.id === meal.id ? meal : x)) : [{ ...meal, id: `new-${Date.now()}` }, ...m]
    })
    setEditing(null)
    toast(t('partner.menu.saved'))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-primary">{t('partner.menu.title', { n: meals.length })}</h2>
        <button onClick={() => setEditing('new')} className="btn-primary !py-2 text-sm"><Plus size={16} /> {t('partner.menu.add')}</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {meals.map((m) => (
          <div key={m.id} className="card overflow-hidden">
            <Img src={m.photo} seed={m.id} alt={m.name} className="w-full h-32 object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-primary-dark leading-tight">{m.name}</h3>
                <span className="chip bg-accent text-primary-dark text-xs font-bold shrink-0">−{discountPct(m)}%</span>
              </div>
              <div className="mt-1 text-sm"><b className="text-primary">{tenge(m.price, lang)}</b> <span className="line-through text-primary-dark/40 text-xs">{tenge(m.oldPrice, lang)}</span></div>
              <div className="mt-1 text-xs text-primary-dark/50">{m.portion} · {t('partner.menu.left', { n: m.qty })} · {m.pickup}</div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => setEditing(m)} className="btn-ghost !px-3 !py-1.5 text-sm flex-1"><Pencil size={14} /> {t('partner.menu.edit')}</button>
                <button onClick={() => remove(m.id)} className="btn-ghost !px-3 !py-1.5 text-sm text-red-500 hover:bg-red-50"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && <MealForm meal={editing === 'new' ? null : editing} onClose={() => setEditing(null)} onSave={save} />}
    </div>
  )
}

function MealForm({ meal, onClose, onSave }) {
  const { t, lang } = useI18n()
  const defaultPickup = lang === 'en' ? 'today 21:00–23:00' : 'сегодня 21:00–23:00'
  const [form, setForm] = useState(
    meal || { name: '', price: 0, oldPrice: 0, qty: 1, portion: '', pickup: defaultPickup, description: '', photo: '' },
  )
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <div className="card w-full max-w-lg p-6 max-h-[90vh] overflow-auto animate-fade-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-primary">{meal ? t('partner.form.editTitle') : t('partner.form.newTitle')}</h3>
          <button onClick={onClose} className="text-primary-dark/40 hover:text-primary"><X size={20} /></button>
        </div>
        <div className="mt-4 grid gap-3">
          <In label={t('partner.form.name')} value={form.name} onChange={(v) => set('name', v)} />
          <div className="grid grid-cols-2 gap-3">
            <In label={t('partner.form.price')} type="number" value={form.price} onChange={(v) => set('price', +v)} />
            <In label={t('partner.form.oldPrice')} type="number" value={form.oldPrice} onChange={(v) => set('oldPrice', +v)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <In label={t('partner.form.qty')} type="number" value={form.qty} onChange={(v) => set('qty', +v)} />
            <In label={t('partner.form.portion')} value={form.portion} onChange={(v) => set('portion', v)} />
          </div>
          <In label={t('partner.form.pickup')} value={form.pickup} onChange={(v) => set('pickup', v)} />
          <label className="block">
            <span className="text-xs font-semibold text-primary-dark/50 uppercase">{t('partner.form.description')}</span>
            <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={2}
              className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </label>
          <div className="text-xs text-primary-dark/40">{t('partner.form.photoNote')}</div>
        </div>
        <div className="mt-5 flex gap-3 justify-end">
          <button onClick={onClose} className="btn-ghost">{t('partner.form.cancel')}</button>
          <button onClick={() => onSave({ ...form, photo: form.photo || dishById('kz-plov').photo })} className="btn-primary"><Check size={16} /> {t('partner.form.save')}</button>
        </div>
      </div>
    </div>
  )
}

function Orders() {
  const { t, tx, td, lang } = useI18n()
  const [orders, setOrders] = useState(incomingOrders)
  const advance = (id) =>
    setOrders((o) => o.map((x) => (x.id === id ? { ...x, status: x.status === 'Новый' ? 'Готов к выдаче' : 'Выдан' } : x)))

  const color = (s) => s === 'Новый' ? 'bg-accent/40 text-primary-dark' : s === 'Готов к выдаче' ? 'bg-mint/60 text-primary' : 'bg-black/5 text-primary-dark/50'

  const pickupTr = (p) => lang === 'en' ? p.replace('сегодня', 'today') : p

  return (
    <div className="card divide-y divide-black/[0.06]">
      {orders.map((o) => {
        const names = o.items.map((it) => `${td(dishById(it.dishId), 'name') || t('partner.orders.dish')} × ${it.qty}`).join(', ')
        return (
          <div key={o.id} className="p-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <div className="font-semibold text-primary-dark">{o.id} · {o.customer}</div>
              <div className="text-sm text-primary-dark/60 truncate">{names}</div>
              <div className="text-xs text-primary-dark/40">{t('partner.orders.pickup', { time: pickupTr(o.pickup) })}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`chip text-xs font-semibold ${color(o.status)}`}>{tx(o.status)}</span>
              {o.status !== 'Выдан' && (
                <button onClick={() => advance(o.id)} className="btn-primary !py-1.5 text-sm">
                  {o.status === 'Новый' ? t('partner.orders.accept') : t('partner.orders.give')}
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Scanner() {
  const { t, td } = useI18n()
  const { toast } = useToast()
  const [orders, setOrders] = useState(incomingOrders.filter((o) => o.status !== 'Выдан'))
  const [scanned, setScanned] = useState(null)
  const [scanning, setScanning] = useState(false)

  const scan = () => {
    if (!orders.length) { toast(t('partner.scan.allDone')); return }
    setScanning(true)
    setTimeout(() => {
      const next = orders[0]
      setScanned(next)
      setOrders((o) => o.slice(1))
      setScanning(false)
      toast(t('partner.scan.toast', { id: next.id }))
    }, 1400)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card p-6 flex flex-col items-center justify-center text-center">
        <div className={`relative w-56 h-56 rounded-2xl border-4 ${scanning ? 'border-primary' : 'border-dashed border-primary/30'} grid place-items-center overflow-hidden bg-primary/5`}>
          <ScanLine size={64} className={`text-primary/40 ${scanning ? 'animate-pulse' : ''}`} />
          {scanning && <div className="absolute left-0 right-0 h-0.5 bg-primary animate-[fade-up_1.4s_ease-in-out_infinite]" style={{ top: '50%' }} />}
        </div>
        <button onClick={scan} disabled={scanning} className="btn-primary mt-6">
          <QrCode size={18} /> {scanning ? t('partner.scan.scanning') : t('partner.scan.btn')}
        </button>
        <p className="mt-2 text-xs text-primary-dark/50">{t('partner.scan.hint')}</p>
      </div>

      <div className="card p-6">
        <h3 className="font-bold text-primary">{t('partner.scan.result')}</h3>
        {scanned ? (
          <div className="mt-4 rounded-xl bg-mint/30 p-4 animate-fade-up">
            <div className="flex items-center gap-2 text-primary font-bold"><Check size={18} /> {t('partner.scan.confirmed')}</div>
            <div className="mt-2 text-sm">№ {scanned.id} · {scanned.customer}</div>
            <ul className="mt-2 text-sm text-primary-dark/70">
              {scanned.items.map((it) => <li key={it.dishId}>{td(dishById(it.dishId), 'name')} × {it.qty}</li>)}
            </ul>
          </div>
        ) : (
          <p className="mt-4 text-sm text-primary-dark/50">{t('partner.scan.empty')}</p>
        )}
        <div className="mt-4 text-sm text-primary-dark/60">{t('partner.scan.queue')} <b className="text-primary">{orders.length}</b></div>
      </div>
    </div>
  )
}

function Analytics() {
  const { t, lang, tday } = useI18n()
  const tot = partnerAnalytics.totals
  const data = partnerAnalytics.revenueByDay.map((d) => ({ ...d, day: tday(d.day) }))
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-4 gap-4">
        <MiniStatBlock label={t('partner.an.revenue')} value={tenge(tot.revenue, lang)} icon={TrendingUp} />
        <MiniStatBlock label={t('partner.an.meals')} value={tot.meals} icon={Package} />
        <MiniStatBlock label={t('partner.an.waste')} value={`${tot.wasteSaved} ${lang === 'en' ? 'kg' : 'кг'}`} icon={Leaf} />
        <MiniStatBlock label={t('partner.an.rating')} value={`★ ${tot.rating}`} icon={Star} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-bold text-primary mb-4">{t('partner.an.revByDay')}</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} width={48} />
              <Tooltip formatter={(v) => tenge(v, lang)} />
              <Bar dataKey="revenue" fill="#1A4D3E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-primary mb-4">{t('partner.an.mealsByDay')}</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} width={32} />
              <Tooltip />
              <Line type="monotone" dataKey="meals" stroke="#F4D03F" strokeWidth={3} dot={{ r: 4, fill: '#1A4D3E' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function Reviews() {
  const { t, trev } = useI18n()
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
  return (
    <div className="space-y-4">
      <div className="card p-5 flex items-center gap-4">
        <div className="text-4xl font-extrabold text-primary">{avg}</div>
        <div>
          <div className="flex text-accent">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill={i < Math.round(avg) ? '#F4D03F' : 'none'} />)}</div>
          <div className="text-sm text-primary-dark/60">{t('partner.rev.count', { n: reviews.length })}</div>
        </div>
      </div>
      {reviews.map((r) => (
        <div key={r.id} className="card p-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-primary-dark">{trev(r, 'author')}</span>
            <span className="text-xs text-primary-dark/40">{trev(r, 'date')}</span>
          </div>
          <div className="flex text-accent my-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill={i < r.rating ? '#F4D03F' : 'none'} />)}</div>
          <p className="text-sm text-primary-dark/70">{trev(r, 'text')}</p>
        </div>
      ))}
    </div>
  )
}

function Profile({ restaurant }) {
  const { t, tres } = useI18n()
  const { toast } = useToast()
  return (
    <div className="card p-6 max-w-xl grid gap-3">
      <h3 className="font-bold text-primary">{t('partner.prof.title')}</h3>
      <In label={t('partner.prof.name')} value={restaurant.name} onChange={() => {}} />
      <In label={t('partner.prof.address')} value={tres(restaurant, 'address')} onChange={() => {}} />
      <div className="grid grid-cols-2 gap-3">
        <In label={t('partner.prof.hours')} value={restaurant.hours} onChange={() => {}} />
        <In label={t('partner.prof.phone')} value={restaurant.phone} onChange={() => {}} />
      </div>
      <button onClick={() => toast(t('partner.prof.saved'))} className="btn-primary justify-self-start">{t('partner.prof.save')}</button>
    </div>
  )
}

function In({ label, value, onChange, type = 'text' }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-primary-dark/50 uppercase tracking-wide">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30" />
    </label>
  )
}

function MiniStatInline({ label, value }) {
  return (
    <div className="text-right">
      <div className="text-xs text-primary-dark/50">{label}</div>
      <div className="font-extrabold text-primary">{value}</div>
    </div>
  )
}

function MiniStatBlock({ label, value, icon: Icon }) {
  return (
    <div className="card p-4">
      {Icon && <Icon size={20} className="text-primary" />}
      <div className="mt-2 text-xl font-extrabold text-primary">{value}</div>
      <div className="text-sm text-primary-dark/60">{label}</div>
    </div>
  )
}
