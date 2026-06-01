import { useState } from 'react'
import { Mail, MapPin, Phone, Instagram, Send, Music2, CheckCircle2 } from 'lucide-react'
import { useToast } from '../context/ToastContext.jsx'

export default function Contacts() {
  const { toast } = useToast()
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    toast('Сообщение отправлено')
  }

  return (
    <div className="section py-10">
      <h1 className="text-3xl font-extrabold text-primary">Контакты</h1>
      <p className="text-primary-dark/60 mt-1">Свяжитесь с нами или оставьте сообщение — мы ответим.</p>

      <div className="mt-8 grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Item icon={Mail} title="Email" value="hello@latebite.kz" href="mailto:hello@latebite.kz" />
          <Item icon={Phone} title="Телефон" value="+7 727 000 00 00" href="tel:+77270000000" />
          <Item icon={MapPin} title="Адрес" value="г. Алматы, пр. Достык 132" />

          <div className="card p-5">
            <h3 className="font-bold text-primary mb-3">Мы в соцсетях</h3>
            <div className="flex gap-3">
              <Social icon={Instagram} label="Instagram" />
              <Social icon={Send} label="Telegram" />
              <Social icon={Music2} label="TikTok" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          {sent ? (
            <div className="h-full grid place-items-center text-center py-8">
              <div>
                <CheckCircle2 size={48} className="mx-auto text-primary" />
                <h3 className="mt-3 text-xl font-bold text-primary">Спасибо!</h3>
                <p className="text-primary-dark/60 mt-1">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <h3 className="font-bold text-primary text-lg">Форма обратной связи</h3>
              <Field label="Имя" />
              <Field label="Email" type="email" />
              <label className="block">
                <span className="text-xs font-semibold text-primary-dark/50 uppercase tracking-wide">Сообщение</span>
                <textarea required rows={4} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </label>
              <button type="submit" className="btn-primary w-full">Отправить</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function Item({ icon: Icon, title, value, href }) {
  const content = (
    <div className="card p-4 flex items-center gap-3 hover:shadow-soft transition-shadow">
      <span className="grid place-items-center w-11 h-11 rounded-xl bg-mint/50 text-primary"><Icon size={20} /></span>
      <div>
        <div className="text-xs text-primary-dark/50">{title}</div>
        <div className="font-semibold text-primary-dark">{value}</div>
      </div>
    </div>
  )
  return href ? <a href={href}>{content}</a> : content
}

function Social({ icon: Icon, label }) {
  return (
    <a href="#" aria-label={label} className="grid place-items-center w-11 h-11 rounded-full bg-primary text-white hover:bg-primary-light transition-colors">
      <Icon size={18} />
    </a>
  )
}

function Field({ label, type = 'text' }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-primary-dark/50 uppercase tracking-wide">{label}</span>
      <input required type={type} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30" />
    </label>
  )
}
