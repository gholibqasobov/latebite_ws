import { Target, Recycle, Globe2, FileText, Handshake } from 'lucide-react'
import Img from '../components/Img.jsx'
import { IMAGES } from '../data/images.js'
import { globalEco } from '../data/ecoStats.js'
import { useI18n } from '../lib/i18n.jsx'

export default function About() {
  const { t, numberLocale } = useI18n()
  const nl = numberLocale()
  const sdgs = [
    { num: 12, title: t('about.sdg.12.title'), text: t('about.sdg.12.text'), color: 'bg-[#BF8B2E]' },
    { num: 13, title: t('about.sdg.13.title'), text: t('about.sdg.13.text'), color: 'bg-[#3F7E44]' },
  ]
  return (
    <div>
      <section className="bg-primary text-white">
        <div className="section py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="chip bg-white/10 text-mint font-semibold">{t('about.chip')}</span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight">{t('about.title')}</h1>
            <p className="mt-4 text-white/70 max-w-md">{t('about.lead')}</p>
          </div>
          <Img src={IMAGES.cafeInterior} seed="about" alt={t('about.coverAlt')} className="rounded-[2rem] aspect-[4/3] object-cover shadow-card" />
        </div>
      </section>

      {/* Mission */}
      <section className="section py-14 grid md:grid-cols-3 gap-5">
        {[
          { icon: Target, title: t('about.mission.title'), text: t('about.mission.text') },
          { icon: Recycle, title: t('about.approach.title'), text: t('about.approach.text') },
          { icon: Globe2, title: t('about.impact.title'), text: t('about.impact.text', { meals: globalEco.meals.toLocaleString(nl), co2: globalEco.co2.toLocaleString(nl) }) },
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
          <h2 className="text-3xl font-extrabold text-primary text-center">{t('about.sdg.title')}</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {sdgs.map((s) => (
              <div key={s.num} className="card p-6 flex gap-4">
                <div className={`grid place-items-center w-16 h-16 rounded-xl text-white font-extrabold text-2xl shrink-0 ${s.color}`}>{s.num}</div>
                <div>
                  <h3 className="font-bold text-primary-dark">{t('about.sdg.label', { n: s.num, title: s.title })}</h3>
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
          <h3 className="font-bold text-primary flex items-center gap-2"><Handshake size={20} /> {t('about.partners.title')}</h3>
          <p className="text-primary-dark/60 text-sm mt-1">{t('about.partners.sub')}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['PAUL', 'Costa Coffee', 'Six Coffee Wines', 'Navat', 'Daredzhani', 'Del Papa', 'Delicatesse'].map((n) => (
              <span key={n} className="chip bg-canvas border border-black/10 text-primary-dark/70">{n}</span>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h3 className="font-bold text-primary flex items-center gap-2"><FileText size={20} /> {t('about.reports.title')}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {[t('about.reports.1'), t('about.reports.2'), t('about.reports.3')].map((r) => (
              <li key={r}><a href="#" className="text-primary hover:underline">{r}</a></li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
