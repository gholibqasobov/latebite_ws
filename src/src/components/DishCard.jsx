import { Plus, Clock, MapPin, Leaf } from 'lucide-react'
import Img from './Img.jsx'
import { tenge } from '../lib/format.js'
import { discountPct, CO2_PER_MEAL } from '../data/dishes.js'
import { restaurantById } from '../data/restaurants.js'
import { distanceToRestaurant, formatDistance } from '../data/geo.js'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function DishCard({ dish }) {
  const { add } = useCart()
  const { toast } = useToast()
  const restaurant = restaurantById(dish.restaurantId)
  const distance = formatDistance(distanceToRestaurant(restaurant))
  const pct = discountPct(dish)

  const handleAdd = () => {
    add(dish.id)
    toast(`«${dish.name}» добавлено в корзину`)
  }

  return (
    <article className="card overflow-hidden flex flex-col group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Img
          src={dish.photo}
          alt={dish.name}
          seed={dish.id}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 chip bg-accent text-primary-dark font-bold shadow-soft">
          −{pct}%
        </span>
        <span className="absolute top-3 right-3 chip bg-white/90 text-primary font-semibold shadow-soft">
          <Leaf size={13} /> −{CO2_PER_MEAL} кг CO₂
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-primary-dark/60">
          <span className="font-semibold text-primary">{restaurant.name}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-0.5"><MapPin size={12} /> {distance}</span>
        </div>

        <h3 className="mt-1 font-bold text-primary-dark leading-tight">{dish.name}</h3>
        <p className="mt-1 text-sm text-primary-dark/60 line-clamp-2">{dish.description}</p>

        <div className="mt-2 flex items-center gap-2 text-xs text-primary-dark/60">
          <span className="chip bg-mint/40 text-primary">{dish.portion}</span>
          <span className="inline-flex items-center gap-1"><Clock size={13} /> {dish.pickup}</span>
        </div>

        <div className="mt-auto pt-3 flex items-end justify-between">
          <div>
            <div className="text-xs text-primary-dark/40 line-through">{tenge(dish.oldPrice)}</div>
            <div className="text-lg font-extrabold text-primary">{tenge(dish.price)}</div>
          </div>
          <button onClick={handleAdd} className="btn-primary !px-4 !py-2 text-sm">
            <Plus size={16} /> В корзину
          </button>
        </div>
      </div>
    </article>
  )
}
