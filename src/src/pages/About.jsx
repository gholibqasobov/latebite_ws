import { Target, Recycle, Globe2, FileText, Handshake } from 'lucide-react'
import Img from '../components/Img.jsx'
import { IMAGES } from '../data/images.js'
import { globalEco } from '../data/ecoStats.js'

const sdgs = [
  { num: 12, title: 'Ответственное потребление', text: 'Сокращаем пищевые отходы и продлеваем жизнь готовой еде.', color: 'bg-[#BF8B2E]' },
  { num: 13, title: 'Борьба с изменением климата', text: 'Каждая спасённая порция снижает выбросы CO₂ на ~2,5 кг.', color: 'bg-[#3F7E44]' },
]

export default function About() {
  return (
    <div>
      <section className="bg-primary text-white">
        <div className="section py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="chip bg-white/10 text-mint font-semibold">О проекте</span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight">Спасаем еду, а не выбрасываем</h1>
            <p className="mt-4 text-white/70 max-w-md">
              В Казахстане ежедневно выбрасываются тонны качественной готовой еды.
              LateBite соединяет кафе и рестораны с людьми, которые готовы забрать
              остатки со скидкой — выигрывают все, и особенно планета.
            </p>
          </div>
          <Img src={IMAGES.cafeInterior} seed="about" alt="Кафе" className="rounded-[2rem] aspect-[4/3] object-cover shadow-card" />
        </div>
      </section>

      {/* Mission */}
      <section className="section py-14 grid md:grid-cols-3 gap-5">
        {[
          { icon: Target, title: 'Миссия', text: 'Сделать так, чтобы вкусная еда доходила до людей, а не до мусорного бака.' },
          { icon: Recycle, title: 'Подход', text: 'Технология + локальные партнёры = меньше отходов и доступные цены.' },
          { icon: Globe2, title: 'Влияние', text: `Уже спасено ${globalEco.meals.toLocaleString('ru-RU')} порций и ${globalEco.co2.toLocaleString('ru-RU')} кг CO₂.` },
        ].map((c) => (
          <div key={c.title} className="card p-6">
            <span className="grid place-items-center w-12 h-12 rounded-xl bg-mint/50 text-primary"><c.icon size={24} /></span>
            <h3 className="mt-4 font-bold text-primary-dark text-lg">{c.title}</h3>
            <p className="mt-2 text-primary-dark/60">{c.text}</p>
          </div>
        ))}
      </section>

      {/* SDG */}
      <section className="bg-white py-14">
        <div className="section">
          <h2 className="text-3xl font-extrabold text-primary text-center">Цели устойчивого развития ООН</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {sdgs.map((s) => (
              <div key={s.num} className="card p-6 flex gap-4">
                <div className={`grid place-items-center w-16 h-16 rounded-xl text-white font-extrabold text-2xl shrink-0 ${s.color}`}>{s.num}</div>
                <div>
                  <h3 className="font-bold text-primary-dark">ЦУР {s.num}: {s.title}</h3>
                  <p className="mt-1 text-primary-dark/60 text-sm">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners + reports */}
      <section className="section py-14 grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-bold text-primary flex items-center gap-2"><Handshake size={20} /> Партнёры</h3>
          <p className="text-primary-dark/60 text-sm mt-1">Кафе и рестораны Алматы, которые уже с нами:</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['PAUL', 'Costa Coffee', 'Six Coffee Wines', 'Navat', 'Daredzhani', 'Del Papa', 'Delicatesse'].map((n) => (
              <span key={n} className="chip bg-canvas border border-black/10 text-primary-dark/70">{n}</span>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h3 className="font-bold text-primary flex items-center gap-2"><FileText size={20} /> Отчёты</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {['Отчёт о воздействии 2025 (PDF)', 'Методика расчёта CO₂', 'Гид для партнёров'].map((r) => (
              <li key={r}><a href="#" className="text-primary hover:underline">{r}</a></li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
