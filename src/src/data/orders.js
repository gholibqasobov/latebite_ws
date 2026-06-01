// Seeded orders for the demo user account dashboard.
export const activeOrders = [
  {
    id: 'LB-2026-0512',
    restaurantId: 'navat',
    status: 'Готов к выдаче',
    pickup: 'сегодня 22:00–23:00',
    code: 'LB-2026-0512-NAVAT',
    items: [
      { dishId: 'kz-manty', qty: 1, price: 980 },
      { dishId: 'kz-baursak', qty: 1, price: 420 },
    ],
  },
  {
    id: 'LB-2026-0518',
    restaurantId: 'six',
    status: 'Принят',
    pickup: 'сегодня 22:30–00:00',
    code: 'LB-2026-0518-SIX',
    items: [{ dishId: 'eu-cheesecake', qty: 1, price: 910 }],
  },
]

export const orderHistory = [
  {
    id: 'LB-2026-0489',
    restaurantId: 'paul',
    date: '18 мая 2026',
    items: [{ dishId: 'eu-croissant', qty: 2, price: 480 }],
    total: 960,
  },
  {
    id: 'LB-2026-0455',
    restaurantId: 'delmeal',
    date: '14 мая 2026',
    items: [
      { dishId: 'it-margherita', qty: 1, price: 1120 },
      { dishId: 'it-tiramisu', qty: 1, price: 665 },
    ],
    total: 1785,
  },
  {
    id: 'LB-2026-0421',
    restaurantId: 'costa',
    date: '9 мая 2026',
    items: [{ dishId: 'cf-cappuccino', qty: 1, price: 760 }],
    total: 760,
  },
  {
    id: 'LB-2026-0388',
    restaurantId: 'navat',
    date: '2 мая 2026',
    items: [{ dishId: 'kz-beshbarmak', qty: 1, price: 1370 }],
    total: 1370,
  },
]

// Incoming orders shown in the B2B partner dashboard.
export const incomingOrders = [
  { id: 'LB-2026-0531', customer: 'Аружан К.', pickup: '22:00–23:00', status: 'Новый', code: 'LB-2026-0531', items: [{ dishId: 'kz-manty', qty: 2 }] },
  { id: 'LB-2026-0529', customer: 'Дамир С.', pickup: '22:00–23:00', status: 'Новый', code: 'LB-2026-0529', items: [{ dishId: 'kz-plov', qty: 1 }, { dishId: 'kz-baursak', qty: 1 }] },
  { id: 'LB-2026-0512', customer: 'Айгерим Н.', pickup: '22:00–23:00', status: 'Готов к выдаче', code: 'LB-2026-0512-NAVAT', items: [{ dishId: 'kz-manty', qty: 1 }, { dishId: 'kz-baursak', qty: 1 }] },
  { id: 'LB-2026-0498', customer: 'Тимур А.', pickup: '21:30–23:00', status: 'Выдан', code: 'LB-2026-0498', items: [{ dishId: 'kz-beshbarmak', qty: 1 }] },
]
