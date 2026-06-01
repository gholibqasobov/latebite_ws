import { IMAGES } from './images.js'

// CO₂ saved per rescued portion (kg) — used across the eco-tracker.
export const CO2_PER_MEAL = 2.5

// Every dish carries all fields required by the spec:
// точное название, фото, описание, исходная цена, цена со скидкой (−50…70%),
// размер порции/вес, время выдачи.
export const dishes = [
  // PAUL — Европейская / пекарня
  { id: 'eu-croissant', restaurantId: 'paul', name: 'Круассан с миндалём', cuisine: 'Европейская', description: 'Свежий слоёный круассан с миндальным кремом и хлопьями.', oldPrice: 1200, price: 480, portion: '110 г', pickup: 'сегодня 19:00–21:00', photo: IMAGES.dishes['eu-croissant'], tags: ['выпечка'] },
  { id: 'eu-quiche', restaurantId: 'paul', name: 'Киш Лорен', cuisine: 'Европейская', description: 'Открытый пирог с беконом, сыром и сливочной заливкой.', oldPrice: 2200, price: 880, portion: '220 г', pickup: 'сегодня 20:00–22:00', photo: IMAGES.dishes['eu-quiche'], tags: [] },
  { id: 'bk-baguette', restaurantId: 'paul', name: 'Багет традиционный', cuisine: 'Европейская', description: 'Хрустящий французский багет, выпечен сегодня утром.', oldPrice: 900, price: 320, portion: '250 г', pickup: 'сегодня 20:30–21:30', photo: IMAGES.dishes['bk-baguette'], tags: ['выпечка'] },

  // Costa Coffee — кофейня
  { id: 'cf-cappuccino', restaurantId: 'costa', name: 'Капучино + маффин', cuisine: 'Кофейня', description: 'Большой капучино и шоколадный маффин — комбо к закрытию.', oldPrice: 1900, price: 760, portion: '350 мл + 90 г', pickup: 'сегодня 21:00–23:00', photo: IMAGES.dishes['cf-cappuccino'], tags: ['кофе'] },
  { id: 'cf-sandwich', restaurantId: 'costa', name: 'Сэндвич с курицей', cuisine: 'Европейская', description: 'Чиабатта с курицей гриль, песто и томатами.', oldPrice: 2100, price: 840, portion: '230 г', pickup: 'сегодня 21:30–23:00', photo: IMAGES.dishes['cf-sandwich'], tags: [] },
  { id: 'cf-latte', restaurantId: 'costa', name: 'Латте + чизкейк', cuisine: 'Кофейня', description: 'Латте на овсяном молоке и кусочек нью-йоркского чизкейка.', oldPrice: 2400, price: 960, portion: '350 мл + 120 г', pickup: 'сегодня 21:00–23:00', photo: IMAGES.dishes['cf-latte'], tags: ['кофе'] },

  // Six Coffee Wines — кофейня
  { id: 'cf-latte-2', restaurantId: 'six', name: 'Спешелти флэт-уайт', cuisine: 'Кофейня', description: 'Флэт-уайт на зерне дня + домашнее печенье.', oldPrice: 2000, price: 700, portion: '200 мл + 60 г', pickup: 'сегодня 22:00–00:00', photo: IMAGES.dishes['cf-latte'], tags: ['кофе'] },
  { id: 'eu-cheesecake', restaurantId: 'six', name: 'Чизкейк San Sebastian', cuisine: 'Европейская', description: 'Баскский жжёный чизкейк, нежная кремовая текстура.', oldPrice: 2600, price: 910, portion: '140 г', pickup: 'сегодня 22:30–00:00', photo: IMAGES.dishes['eu-cheesecake'], tags: [] },
  { id: 'veg-smoothie', restaurantId: 'six', name: 'Смузи-боул манго', cuisine: 'Вегетарианская', description: 'Манго, банан, гранола и семена чиа.', oldPrice: 2300, price: 800, portion: '300 г', pickup: 'сегодня 21:30–23:30', photo: IMAGES.dishes['veg-smoothie'], tags: ['веган'] },

  // Navat — казахская
  { id: 'kz-beshbarmak', restaurantId: 'navat', name: 'Бешбармак', cuisine: 'Казахская', description: 'Традиционное блюдо: отварное мясо с домашней лапшой и луковым соусом.', oldPrice: 3900, price: 1370, portion: '450 г', pickup: 'сегодня 22:00–23:00', photo: IMAGES.dishes['kz-beshbarmak'], tags: [] },
  { id: 'kz-manty', restaurantId: 'navat', name: 'Манты с мясом (5 шт.)', cuisine: 'Казахская', description: 'Сочные манты на пару с говядиной и луком.', oldPrice: 2800, price: 980, portion: '5 шт. / 400 г', pickup: 'сегодня 22:00–23:00', photo: IMAGES.dishes['kz-manty'], tags: [] },
  { id: 'kz-baursak', restaurantId: 'navat', name: 'Баурсаки', cuisine: 'Казахская', description: 'Свежие пышные баурсаки — к чаю или на дорогу.', oldPrice: 1200, price: 420, portion: '300 г', pickup: 'сегодня 22:00–23:00', photo: IMAGES.dishes['kz-baursak'], tags: ['выпечка'] },
  { id: 'kz-plov', restaurantId: 'navat', name: 'Плов с говядиной', cuisine: 'Казахская', description: 'Рассыпчатый плов с морковью, нутом и зирой.', oldPrice: 2900, price: 1015, portion: '400 г', pickup: 'сегодня 21:30–23:00', photo: IMAGES.dishes['kz-plov'], tags: [] },

  // Daredzhani — грузинская / узбекская
  { id: 'uz-lagman', restaurantId: 'daredzhani', name: 'Лагман', cuisine: 'Узбекская', description: 'Тянутая лапша с говядиной и овощным соусом.', oldPrice: 2700, price: 945, portion: '420 г', pickup: 'сегодня 22:30–00:00', photo: IMAGES.dishes['uz-lagman'], tags: [] },
  { id: 'uz-samsa', restaurantId: 'daredzhani', name: 'Самса из тандыра (2 шт.)', cuisine: 'Узбекская', description: 'Слоёная самса с мясом из настоящего тандыра.', oldPrice: 1600, price: 560, portion: '2 шт. / 320 г', pickup: 'сегодня 22:00–00:00', photo: IMAGES.dishes['uz-samsa'], tags: [] },

  // Del Papa — итальянская
  { id: 'it-margherita', restaurantId: 'delmeal', name: 'Пицца Маргарита', cuisine: 'Итальянская', description: 'Тонкое тесто, томатный соус, моцарелла, базилик.', oldPrice: 3200, price: 1120, portion: '30 см', pickup: 'сегодня 22:00–23:00', photo: IMAGES.dishes['it-margherita'], tags: [] },
  { id: 'it-carbonara', restaurantId: 'delmeal', name: 'Паста Карбонара', cuisine: 'Итальянская', description: 'Спагетти с беконом, яичным соусом и пармезаном.', oldPrice: 2900, price: 1015, portion: '350 г', pickup: 'сегодня 21:30–23:00', photo: IMAGES.dishes['it-carbonara'], tags: [] },
  { id: 'it-tiramisu', restaurantId: 'delmeal', name: 'Тирамису', cuisine: 'Итальянская', description: 'Классический десерт с маскарпоне и кофе.', oldPrice: 1900, price: 665, portion: '160 г', pickup: 'сегодня 22:00–23:00', photo: IMAGES.dishes['it-tiramisu'], tags: [] },

  // Delicatesse Bakery — пекарня / веган
  { id: 'bk-cinnamon', restaurantId: 'delicatesse', name: 'Синнабон с корицей', cuisine: 'Европейская', description: 'Мягкая булочка с корицей и сливочной глазурью.', oldPrice: 1500, price: 525, portion: '130 г', pickup: 'сегодня 19:30–21:00', photo: IMAGES.dishes['bk-cinnamon'], tags: ['выпечка'] },
  { id: 'veg-buddha', restaurantId: 'delicatesse', name: 'Будда-боул', cuisine: 'Вегетарианская', description: 'Киноа, нут, авокадо, овощи и тахини-соус.', oldPrice: 2600, price: 910, portion: '380 г', pickup: 'сегодня 19:00–21:00', photo: IMAGES.dishes['veg-buddha'], tags: ['веган'] },
  { id: 'veg-falafel', restaurantId: 'delicatesse', name: 'Фалафель в пите', cuisine: 'Вегетарианская', description: 'Хрустящий фалафель, овощи и хумус в пите.', oldPrice: 1800, price: 630, portion: '300 г', pickup: 'сегодня 19:00–21:00', photo: IMAGES.dishes['veg-falafel'], tags: ['веган'] },
]

export const discountPct = (d) => Math.round((1 - d.price / d.oldPrice) * 100)
export const dishById = (id) => dishes.find((d) => d.id === id)
export const dishesByRestaurant = (rid) => dishes.filter((d) => d.restaurantId === rid)

export const CUISINES = ['Казахская', 'Итальянская', 'Европейская', 'Узбекская', 'Вегетарианская', 'Кофейня']
