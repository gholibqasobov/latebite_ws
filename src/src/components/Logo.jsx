import { Link } from 'react-router-dom'

// Simple wordmark + leaf mark. Replace with a provided SVG logo if available
// (see MATERIALS.txt) by swapping this component's contents.
export default function Logo({ light = false, className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-extrabold text-xl tracking-tight ${className}`}>
      <span className="grid place-items-center w-8 h-8 rounded-lg bg-primary text-mint">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6" />
        </svg>
      </span>
      <span className={light ? 'text-white' : 'text-primary'}>
        Late<span className="text-accent">Bite</span>
      </span>
    </Link>
  )
}
