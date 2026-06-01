import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { dict, dishL10n, restaurantL10n, reviewL10n, commonMap, dayMap, pluralEn } from '../data/translations.js'

const I18nCtx = createContext(null)
const STORAGE_KEY = 'latebite-lang'
const DEFAULT_LANG = 'ru'

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LANG
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG
  })

  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem(STORAGE_KEY, lang) } catch {}
  }, [lang])

  const setLang = useCallback((l) => setLangState(l), [])
  const toggleLang = useCallback(() => setLangState((l) => (l === 'ru' ? 'en' : 'ru')), [])

  const value = useMemo(() => {
    const t = (key, vars) => {
      const entry = dict[key]
      let s = entry ? (entry[lang] ?? entry.ru ?? key) : key
      if (vars) for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v))
      return s
    }

    const tr = (value) => {
      if (value == null) return value
      if (typeof value === 'object' && ('ru' in value || 'en' in value)) {
        return value[lang] ?? value.ru ?? value.en ?? ''
      }
      return value
    }

    // Translate well-known RU strings (statuses, cuisines, etc.)
    const tx = (s) => {
      if (lang !== 'en' || s == null) return s
      return commonMap[s] ?? s
    }

    // Translate a dish field: name / description / portion / pickup / cuisine
    const td = (dish, field) => {
      if (!dish) return ''
      const override = dishL10n[dish.id]?.[field]
      if (override && override[lang]) return override[lang]
      const raw = dish[field]
      if (lang === 'en') {
        if (field === 'pickup') return translatePickup(raw)
        if (field === 'portion') return translatePortion(raw)
        if (field === 'cuisine') return commonMap[raw] ?? raw
      }
      return raw
    }

    // Translate a restaurant field
    const tres = (r, field) => {
      if (!r) return ''
      const override = restaurantL10n[r.id]?.[field]
      if (override && override[lang]) return override[lang]
      if (lang === 'en' && field === 'cuisine') return commonMap[r[field]] ?? r[field]
      return r[field]
    }

    // Translate a review row
    const trev = (rev, field) => {
      if (!rev) return ''
      const override = reviewL10n[rev.id]?.[field]
      if (override && override[lang]) return override[lang]
      if (lang === 'en' && field === 'date') return translateDate(rev[field])
      return rev[field]
    }

    // Day label for charts
    const tday = (d) => (lang === 'en' ? dayMap[d] ?? d : d)

    // Plural helper that adapts to current language
    const plr = (n, ru1, ru2, ru5, en1, en2) => {
      if (lang === 'en') return n === 1 ? en1 : en2
      const mod10 = n % 10
      const mod100 = n % 100
      if (mod10 === 1 && mod100 !== 11) return ru1
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return ru2
      return ru5
    }

    const numberLocale = () => (lang === 'en' ? 'en-US' : 'ru-RU')

    return { lang, setLang, toggleLang, t, tr, tx, td, tres, trev, tday, plr, numberLocale }
  }, [lang, setLang, toggleLang])

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nCtx)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

export const useT = () => useI18n().t
export const useLang = () => useI18n().lang

// "сегодня 22:00–23:00" -> "today 22:00–23:00"
function translatePickup(s) {
  if (!s) return s
  return s.replace('сегодня', 'today').replace('завтра', 'tomorrow')
}

// "300 г" -> "300 g", "350 мл + 90 г" -> "350 ml + 90 g", "30 см" -> "30 cm",
// "5 шт. / 400 г" -> "5 pcs / 400 g"
function translatePortion(s) {
  if (!s) return s
  return s
    .replace(/мл/g, 'ml')
    .replace(/кг/g, 'kg')
    .replace(/\bг\b/g, 'g')
    .replace(/см/g, 'cm')
    .replace(/шт\./g, 'pcs')
    .replace(/шт/g, 'pcs')
}

// "19 мая 2026" -> "May 19, 2026"
const MONTHS_RU_EN = {
  января: 'January', февраля: 'February', марта: 'March', апреля: 'April',
  мая: 'May', июня: 'June', июля: 'July', августа: 'August',
  сентября: 'September', октября: 'October', ноября: 'November', декабря: 'December',
}
function translateDate(s) {
  if (!s) return s
  const m = s.match(/^(\d{1,2})\s+([а-яА-Я]+)\s+(\d{4})$/)
  if (!m) return s
  const month = MONTHS_RU_EN[m[2].toLowerCase()] ?? m[2]
  return `${month} ${m[1]}, ${m[3]}`
}
