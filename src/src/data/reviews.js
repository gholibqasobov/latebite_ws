export const reviews = [
  { id: 1, author: 'Аружан К.', rating: 5, date: '19 мая 2026', text: 'Спасла отличные манты за полцены, всё свежее. Очень удобно!' },
  { id: 2, author: 'Дамир С.', rating: 5, date: '17 мая 2026', text: 'Беру кофе и выпечку перед закрытием — экономлю и не выбрасывается еда.' },
  { id: 3, author: 'Тимур А.', rating: 4, date: '15 мая 2026', text: 'Хорошие порции, иногда выбор небольшой ближе к ночи. Но в целом супер.' },
  { id: 4, author: 'Айгерим Н.', rating: 5, date: '12 мая 2026', text: 'Любимое приложение — и планете помогаю, и бюджету.' },
]

// Eco impact aggregated for the demo user.
export const userEco = {
  co2: 47.5, // кг
  meals: 19,
  trees: 3,
  money: 24800, // ₸ сэкономлено
}

export const referral = {
  code: 'AIGERIM2026',
  invited: 4,
  bonus: 2000, // ₸
  promos: [
    { code: 'LATE15', desc: '−15% на первый заказ', expires: 'до 31 мая' },
    { code: 'ECO500', desc: '−500 ₸ за приглашённого друга', expires: 'бессрочно' },
    { code: 'WEEKEND', desc: '−10% по выходным', expires: 'до 30 июня' },
  ],
}
