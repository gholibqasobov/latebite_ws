import { Link } from 'react-router-dom'
import { Percent, MapPin, Leaf, Search, CreditCard, ShoppingBag, ArrowRight, TreePine, Utensils, Cloud } from 'lucide-react'
import Img from '../components/Img.jsx'
import EcoCounter from '../components/EcoCounter.jsx'
import { IMAGES } from '../data/images.js'
import { globalEco } from '../data/ecoStats.js'
import { useT } from '../lib/i18n.jsx'

export default function Home() {
  const t = useT()

  const whyCards = [
    { icon: Percent, title: t('home.why.1.title'), text: t('home.why.1.text') },
    { icon: MapPin, title: t('home.why.2.title'), text: t('home.why.2.text') },
    { icon: Leaf, title: t('home.why.3.title'), text: t('home.why.3.text') },
  ]

  const steps = [
    { icon: Search, title: t('home.how.1.title'), text: t('home.how.1.text') },
    { icon: CreditCard, title: t('home.how.2.title'), text: t('home.how.2.text') },
    { icon: ShoppingBag, title: t('home.how.3.title'), text: t('home.how.3.text') },
  ]

  return (
    <div>
      {/* HERO */}
      <section className="section pt-10 pb-12 lg:pt-16 lg:pb-20 grid lg:grid-cols-2 gap-10 items-center">
        <div className="animate-fade-up">
          <span className="chip bg-mint/50 text-primary font-semibold">{t('home.chip')}</span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-[1.05]">
            {t('home.hero.line1')}<br />{t('home.hero.line2')}<br />
            <span className="text-accent drop-shadow-sm">{t('home.hero.line3')}</span>
          </h1>
          <p className="mt-5 text-lg text-primary-dark/70 max-w-md">{t('home.hero.lead')}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/offers" className="btn-primary text-base !px-7 !py-3">
              {t('home.hero.cta.view')} <ArrowRight size={18} />
            </Link>
            <Link to="/partner" className="btn-outline text-base !px-7 !py-3">
              {t('home.hero.cta.rest')}
            </Link>
          </div>
        </div>

        <div className="relative animate-fade-up">
          <div className="absolute -inset-4 bg-mint/40 rounded-[2rem] blur-2xl -z-10" />
          <Img
            src={IMAGES.hero}
            alt={t('home.hero.heroAlt')}
            seed="latebite-hero"
            className="w-full aspect-[4/3] object-cover rounded-[2rem] shadow-card"
          />
          <div className="absolute -bottom-5 -left-3 sm:left-6 card px-4 py-3 flex items-center gap-3">
            <span className="grid place-items-center w-10 h-10 rounded-full bg-accent text-primary-dark">
              <Leaf size={20} />
            </span>
            <div>
              <div className="text-xs text-primary-dark/60">{t('home.hero.savedLabel')}</div>
              <div className="font-extrabold text-primary">{t('home.hero.savedValue')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section py-12">
        <h2 className="text-center text-3xl font-extrabold text-primary">{t('home.why.title')}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {whyCards.map((c) => (
            <div key={c.title} className="card p-6 hover:-translate-y-1 transition-transform">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-mint/50 text-primary">
                <c.icon size={24} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-primary-dark">{c.title}</h3>
              <p className="mt-2 text-primary-dark/60">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-14">
        <div className="section">
          <h2 className="text-center text-3xl font-extrabold text-primary">{t('home.how.title')}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3 relative">
            {steps.map((s, i) => (
              <div key={s.title} className="text-center relative">
                <div className="mx-auto grid place-items-center w-16 h-16 rounded-2xl bg-primary text-mint">
                  <s.icon size={28} />
                </div>
                <div className="mt-2 text-accent font-extrabold text-sm">{t('home.how.step', { n: i + 1 })}</div>
                <h3 className="mt-1 text-lg font-bold text-primary-dark">{s.title}</h3>
                <p className="mt-2 text-primary-dark/60 max-w-xs mx-auto">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ECO TRACKER */}
      <section className="section py-16">
        <div className="rounded-[2rem] bg-primary text-white p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-mint/10 rounded-full" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-accent/10 rounded-full" />
          <h2 className="text-3xl font-extrabold relative">{t('home.eco.title')}</h2>
          <p className="mt-2 text-white/70 relative">{t('home.eco.sub')}</p>

          <div className="mt-10 grid gap-8 sm:grid-cols-3 relative">
            <EcoStat icon={Cloud} value={globalEco.co2} unit={t('home.eco.co2.unit')} label={t('home.eco.co2.label')} />
            <EcoStat icon={Utensils} value={globalEco.meals} unit={t('home.eco.meals.unit')} label={t('home.eco.meals.label')} />
            <EcoStat icon={TreePine} value={globalEco.trees} unit={t('home.eco.trees.unit')} label={t('home.eco.trees.label')} />
          </div>
        </div>
      </section>
    </div>
  )
}

function EcoStat({ icon: Icon, value, unit, label }) {
  return (
    <div className="flex flex-col items-center">
      <Icon size={32} className="text-mint" />
      <div className="mt-3 text-4xl sm:text-5xl font-extrabold text-accent">
        <EcoCounter value={value} />
      </div>
      <div className="text-mint font-semibold">{unit}</div>
      <div className="text-white/60 text-sm mt-1">{label}</div>
    </div>
  )
}
