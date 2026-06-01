import { SlidersHorizontal } from 'lucide-react'
import { CUISINES } from '../data/dishes.js'

const distanceOptions = [
  { value: 'all', label: 'Любое' },
  { value: 'nearby', label: 'Рядом' },
  { value: 'close', label: 'Близко' },
  { value: 'far', label: 'Далеко' },
]

const sortOptions = [
  { value: 'distance', label: 'По расстоянию' },
  { value: 'price-asc', label: 'Цена: по возрастанию' },
  { value: 'price-desc', label: 'Цена: по убыванию' },
  { value: 'pickup', label: 'По времени выдачи' },
]

export default function FilterBar({ filters, onChange }) {
  const set = (key, value) => onChange({ ...filters, [key]: value })

  return (
    <div className="card p-4 space-y-4">
      <div className="flex items-center gap-2 text-primary font-bold">
        <SlidersHorizontal size={18} /> Фильтры
      </div>

      <div>
        <label className="text-xs font-semibold text-primary-dark/50 uppercase tracking-wide">Расстояние</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {distanceOptions.map((o) => (
            <button
              key={o.value}
              onClick={() => set('distance', o.value)}
              className={`chip border transition-colors ${
                filters.distance === o.value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-primary-dark/70 border-black/10 hover:border-primary'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-primary-dark/50 uppercase tracking-wide">Кухня</label>
        <select
          value={filters.cuisine}
          onChange={(e) => set('cuisine', e.target.value)}
          className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="all">Все кухни</option>
          {CUISINES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-primary-dark/50 uppercase tracking-wide">Сортировка</label>
        <select
          value={filters.sort}
          onChange={(e) => set('sort', e.target.value)}
          className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
