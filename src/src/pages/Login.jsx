import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Phone, ArrowRight, Store } from 'lucide-react'
import Logo from '../components/Logo.jsx'

// Demo login screen — for show only. Any input proceeds to the app.
export default function Login() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('+7 777 123 45 67')

  return (
    <div className="section py-16 max-w-md">
      <div className="card p-8">
        <div className="flex justify-center"><Logo /></div>
        <h1 className="mt-6 text-2xl font-extrabold text-primary text-center">Вход в LateBite</h1>
        <p className="text-center text-primary-dark/60 text-sm mt-1">Войдите по номеру телефона</p>

        <label className="block mt-6">
          <span className="text-xs font-semibold text-primary-dark/50 uppercase tracking-wide">Телефон</span>
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-black/10 px-3 focus-within:ring-2 focus-within:ring-primary/30">
            <Phone size={16} className="text-primary-dark/40" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="flex-1 py-2.5 bg-transparent focus:outline-none" />
          </div>
        </label>

        <button onClick={() => navigate('/account')} className="btn-primary w-full mt-5">
          Войти <ArrowRight size={18} />
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-primary-dark/40">
          <div className="flex-1 h-px bg-black/10" /> или <div className="flex-1 h-px bg-black/10" />
        </div>

        <button onClick={() => navigate('/partner')} className="btn-outline w-full">
          <Store size={18} /> Вход для партнёров
        </button>

        <p className="mt-5 text-center text-xs text-primary-dark/40">
          Демо-вход: авторизация имитируется, код из SMS не требуется.
        </p>
      </div>
    </div>
  )
}
