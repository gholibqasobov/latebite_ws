// Global counters shown on the home eco-tracker.
export const globalEco = {
  co2: 128450, // кг CO₂ сэкономлено
  meals: 51380, // спасённых порций
  trees: 5870, // сохранённых деревьев
}

// Monthly analytics for the B2B dashboard (Recharts).
export const partnerAnalytics = {
  revenueByDay: [
    { day: 'Пн', revenue: 42000, meals: 38 },
    { day: 'Вт', revenue: 38500, meals: 31 },
    { day: 'Ср', revenue: 51200, meals: 46 },
    { day: 'Чт', revenue: 47800, meals: 41 },
    { day: 'Пт', revenue: 68900, meals: 59 },
    { day: 'Сб', revenue: 73400, meals: 64 },
    { day: 'Вс', revenue: 56100, meals: 49 },
  ],
  totals: {
    revenue: 377900, // ₸ за неделю
    meals: 328,
    wasteSaved: 820, // кг
    rating: 4.6,
  },
}
