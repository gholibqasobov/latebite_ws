import { useState } from 'react'
import { Info, X } from 'lucide-react'
import { useT } from '../lib/i18n.jsx'

// Subtle badge clarifying this is an investor prototype, not the live product.
export default function DemoBadge() {
  const t = useT()
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed bottom-5 left-5 z-[900]">
      {open ? (
        <div className="card p-4 max-w-xs animate-fade-up">
          <div className="flex items-start gap-2">
            <Info size={18} className="text-primary mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-primary">{t('demo.title')}</p>
              <p className="text-primary-dark/70 mt-1">{t('demo.body')}</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-primary-dark/40 hover:text-primary-dark">
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="chip bg-accent text-primary-dark shadow-card font-bold"
        >
          <Info size={14} /> DEMO
        </button>
      )}
    </div>
  )
}
