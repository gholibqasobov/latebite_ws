import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import MapView from '../components/MapView.jsx'
import FilterBar from '../components/FilterBar.jsx'
import DishCard from '../components/DishCard.jsx'
import { dishes } from '../data/dishes.js'
import { restaurantById, restaurants } from '../data/restaurants.js'
import { distanceToRestaurant, distanceBucket } from '../data/geo.js'

const pickupMinutes = (d) => {
  // parse "сегодня HH:MM–HH:MM" -> minutes of start time, for sorting
  const m = d.pickup.match(/(\d{1,2}):(\d{2})/)
  return m ? parseInt(m[1]) * 60 + parseInt(m[2]) : 9999
}

export default function Offers() {
  const [filters, setFilters] = useState({ distance: 'all', cuisine: 'all', sort: 'distance' })
  const [restaurantFilter, setRestaurantFilter] = useState(null)

  const filtered = useMemo(() => {
    let list = dishes.slice()

    if (restaurantFilter) list = list.filter((d) => d.restaurantId === restaurantFilter)

    if (filters.cuisine !== 'all') list = list.filter((d) => d.cuisine === filters.cuisine)

    if (filters.distance !== 'all') {
      list = list.filter((d) => {
        const r = restaurantById(d.restaurantId)
        return distanceBucket(distanceToRestaurant(r)) === filters.distance
      })
    }

    list.sort((a, b) => {
      if (filters.sort === 'price-asc') return a.price - b.price
      if (filters.sort === 'price-desc') return b.price - a.price
      if (filters.sort === 'pickup') return pickupMinutes(a) - pickupMinutes(b)
      // distance (default)
      return (
        distanceToRestaurant(restaurantById(a.restaurantId)) -
        distanceToRestaurant(restaurantById(b.restaurantId))
      )
    })
    return list
  }, [filters, restaurantFilter])

  const activeRestaurant = restaurantFilter ? restaurantById(restaurantFilter) : null

  return (
    <div className="section py-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold text-primary">Предложения рядом</h1>
          <p className="text-primary-dark/60 mt-1">
            {restaurants.length} заведений · {dishes.length} блюд со скидкой в Алматы
          </p>
        </div>
      </div>

      {/* Map */}
      <div className="mt-6 rounded-[1.25rem] overflow-hidden shadow-card">
        <MapView onSelectRestaurant={setRestaurantFilter} />
      </div>

      <div className="mt-8 grid lg:grid-cols-[280px_1fr] gap-6 items-start">
        <div className="lg:sticky lg:top-20">
          <FilterBar filters={filters} onChange={setFilters} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-primary-dark/60">
              Найдено: <b className="text-primary">{filtered.length}</b>
            </span>
            {activeRestaurant && (
              <button
                onClick={() => setRestaurantFilter(null)}
                className="chip bg-mint/50 text-primary font-semibold"
              >
                {activeRestaurant.name} <X size={14} />
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="card p-10 text-center text-primary-dark/60">
              Ничего не найдено. Попробуйте изменить фильтры.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((d) => (
                <DishCard key={d.id} dish={d} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
