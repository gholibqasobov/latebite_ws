import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Leaf } from 'lucide-react'
import Img from '../components/Img.jsx'
import { tenge } from '../lib/format.js'
import { useCart } from '../context/CartContext.jsx'
import { dishById, CO2_PER_MEAL } from '../data/dishes.js'
import { restaurantById } from '../data/restaurants.js'

export default function Cart() {
  const { items, setQty, remove, count } = useCart()
  const navigate = useNavigate()

  const lines = Object.entries(items)
    .map(([id, qty]) => ({ dish: dishById(id), qty }))
    .filter((l) => l.dish)

  const total = lines.reduce((s, l) => s + l.dish.price * l.qty, 0)
  const oldTotal = lines.reduce((s, l) => s + l.dish.oldPrice * l.qty, 0)
  const saved = oldTotal - total
  const co2 = (count * CO2_PER_MEAL).toFixed(1)

  // group by restaurant
  const byRestaurant = lines.reduce((acc, l) => {
    const rid = l.dish.restaurantId
    ;(acc[rid] ||= []).push(l)
    return acc
  }, {})

  if (count === 0) {
    return (
      <div className="section py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-primary/30" />
        <h1 className="mt-4 text-2xl font-extrabold text-primary">Корзина пуста</h1>
        <p className="mt-2 text-primary-dark/60">Загляните в предложения — там вкусно и со скидкой.</p>
        <Link to="/offers" className="btn-primary mt-6">Смотреть предложения</Link>
      </div>
    )
  }

  return (
    <div className="section py-8">
      <h1 className="text-3xl font-extrabold text-primary">Корзина</h1>
      <p className="text-primary-dark/60 mt-1">Можно собрать заказ из нескольких заведений и оплатить разом.</p>

      <div className="mt-6 grid lg:grid-cols-[1fr_340px] gap-6 items-start">
        <div className="space-y-6">
          {Object.entries(byRestaurant).map(([rid, rlines]) => {
            const r = restaurantById(rid)
            return (
              <div key={rid} className="card overflow-hidden">
                <div className="px-4 py-3 bg-mint/30 font-bold text-primary">{r.name}</div>
                <div className="divide-y divide-black/[0.06]">
                  {rlines.map(({ dish, qty }) => (
                    <div key={dish.id} className="p-4 flex gap-4">
                      <Img src={dish.photo} seed={dish.id} alt={dish.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-primary-dark">{dish.name}</div>
                        <div className="text-xs text-primary-dark/50">{dish.portion} · {dish.pickup}</div>
                        <div className="mt-1 text-sm">
                          <span className="font-bold text-primary">{tenge(dish.price)}</span>
                          <span className="ml-2 text-primary-dark/40 line-through text-xs">{tenge(dish.oldPrice)}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button onClick={() => remove(dish.id)} className="text-primary-dark/40 hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                        <div className="flex items-center gap-2 bg-canvas rounded-full p-1">
                          <button onClick={() => setQty(dish.id, qty - 1)} className="grid place-items-center w-7 h-7 rounded-full bg-white hover:bg-mint/50"><Minus size={14} /></button>
                          <span className="w-5 text-center font-semibold">{qty}</span>
                          <button onClick={() => setQty(dish.id, qty + 1)} className="grid place-items-center w-7 h-7 rounded-full bg-white hover:bg-mint/50"><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="card p-5 lg:sticky lg:top-20 space-y-4">
          <h2 className="font-bold text-primary text-lg">Итого</h2>
          <div className="space-y-2 text-sm">
            <Row label={`Блюд: ${count}`} value={tenge(oldTotal)} muted />
            <Row label="Скидка LateBite" value={`−${tenge(saved)}`} accent />
            <div className="border-t border-black/[0.06] pt-2 flex justify-between font-extrabold text-primary text-lg">
              <span>К оплате</span><span>{tenge(total)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-mint/30 px-3 py-2 text-sm text-primary">
            <Leaf size={16} /> Вы спасаете ~{co2} кг CO₂
          </div>

          <button onClick={() => navigate('/checkout')} className="btn-primary w-full text-base !py-3">
            Оформить заказ <ArrowRight size={18} />
          </button>
          <Link to="/offers" className="block text-center text-sm text-primary-dark/60 hover:text-primary">
            продолжить выбор
          </Link>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, muted, accent }) {
  return (
    <div className="flex justify-between">
      <span className={muted ? 'text-primary-dark/60' : ''}>{label}</span>
      <span className={accent ? 'text-primary font-semibold' : muted ? 'text-primary-dark/60' : ''}>{value}</span>
    </div>
  )
}
