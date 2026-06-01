import { SlidersHorizontal } from 'lucide-react'
import { CUISINES } from '../data/dishes.js'
import { useI18n } from '../lib/i18n.jsx'

export default function FilterBar({ filters, onChange }) {
  const { t, tx } = useI18n()
  const set = (key, value) => onChange({ ...filters, [key]: value })

  const distanceOptions = [
    { value: 'all', label: t('filter.dist.all') },
    { value: 'nearby', label: t('filter.dist.nearby') },
    { value: 'close', label: t('filter.dist.close') },
    { value: 'far', label: t('filter.dist.far') },
  ]

  const sortOptions = [
    { value: 'distance', label: t('filter.sort.distance') },
    { value: 'price-asc', label: t('filter.sort.priceAsc') },
    { value: 'price-desc', label: t('filter.sort.priceDesc') },
    { value: 'pickup', label: t('filter.sort.pickup') },
  ]

  return (
    <div className="card p-4 space-y-4">
      <div className="flex items-center gap-2 text-primary font-bold">
        <SlidersHorizontal size={18} /> {t('filter.title')}
      </div>

      <div>
        <label className="text-xs font-semibold text-primary-dark/50 uppercase tracking-wide">{t('filter.distance')}</label>
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
        <label className="text-xs font-semibold text-primary-dark/50 uppercase tracking-wide">{t('filter.cuisine')}</label>
        <select
          value={filters.cuisine}
          onChange={(e) => set('cuisine', e.target.value)}
          className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="all">{t('filter.cuisine.all')}</option>
          {CUISINES.map((c) => (
            <option key={c} value={c}>{tx(c)}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-primary-dark/50 uppercase tracking-wide">{t('filter.sort')}</label>
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
