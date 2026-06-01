// Centralised RU/EN dictionary for the LateBite demo.
//
// `dict`             — UI string keys (used via `t('key')`).
// `commonMap`        — RU phrase → EN translation for known shared strings
//                      (statuses, cuisines, etc.) used via `tx()` / `td()` / `tres()`.
// `dishL10n`         — per-dish overrides (name, description, etc.).
// `restaurantL10n`   — per-restaurant overrides (cuisine, address, etc.).
// `reviewL10n`       — per-review overrides (author, text).
// `dayMap`           — short weekday RU → EN.
// `pluralEn(n, one, other)` — convenience EN plural picker.

export const pluralEn = (n, one, other) => (n === 1 ? one : other)

// Mon = Пн, Tue = Вт, etc.
export const dayMap = {
  Пн: 'Mon', Вт: 'Tue', Ср: 'Wed', Чт: 'Thu', Пт: 'Fri', Сб: 'Sat', Вс: 'Sun',
}

// Generic RU → EN map for repeated short labels.
export const commonMap = {
  // Statuses
  'Новый': 'New',
  'Принят': 'Accepted',
  'Готов к выдаче': 'Ready for pickup',
  'Выдан': 'Picked up',

  // Cuisines
  'Казахская': 'Kazakh',
  'Итальянская': 'Italian',
  'Европейская': 'European',
  'Узбекская': 'Uzbek',
  'Грузинская': 'Georgian',
  'Вегетарианская': 'Vegetarian',
  'Кофейня': 'Café',
  'Пекарня': 'Bakery',

  // Tags
  'выпечка': 'pastry',
  'кофе': 'coffee',
  'веган': 'vegan',
}

export const dishL10n = {
  'eu-croissant': {
    name: { en: 'Almond croissant' },
    description: { en: 'Flaky croissant with almond cream and slivered almonds.' },
  },
  'eu-quiche': {
    name: { en: 'Quiche Lorraine' },
    description: { en: 'Open tart with bacon, cheese and a creamy filling.' },
  },
  'bk-baguette': {
    name: { en: 'Traditional baguette' },
    description: { en: 'Crisp French baguette baked fresh this morning.' },
  },
  'cf-cappuccino': {
    name: { en: 'Cappuccino + muffin' },
    description: { en: 'Large cappuccino and chocolate muffin — closing-time combo.' },
  },
  'cf-sandwich': {
    name: { en: 'Chicken sandwich' },
    description: { en: 'Ciabatta with grilled chicken, pesto and tomatoes.' },
  },
  'cf-latte': {
    name: { en: 'Latte + cheesecake' },
    description: { en: 'Oat-milk latte and a slice of New York cheesecake.' },
  },
  'cf-latte-2': {
    name: { en: 'Specialty flat white' },
    description: { en: 'Flat white on the bean of the day + homemade cookie.' },
  },
  'eu-cheesecake': {
    name: { en: 'San Sebastian cheesecake' },
    description: { en: 'Basque burnt cheesecake with a soft, creamy texture.' },
  },
  'veg-smoothie': {
    name: { en: 'Mango smoothie bowl' },
    description: { en: 'Mango, banana, granola and chia seeds.' },
  },
  'kz-beshbarmak': {
    name: { en: 'Beshbarmak' },
    description: { en: 'Traditional dish: boiled meat with homemade noodles and onion sauce.' },
  },
  'kz-manty': {
    name: { en: 'Manti with meat (5 pcs)' },
    description: { en: 'Juicy steamed manti with beef and onion.' },
  },
  'kz-baursak': {
    name: { en: 'Baursaks' },
    description: { en: 'Fresh fluffy baursaks — for tea or the road.' },
  },
  'kz-plov': {
    name: { en: 'Beef plov' },
    description: { en: 'Fluffy plov with carrots, chickpeas and cumin.' },
  },
  'uz-lagman': {
    name: { en: 'Lagman' },
    description: { en: 'Hand-pulled noodles with beef and vegetable sauce.' },
  },
  'uz-samsa': {
    name: { en: 'Tandoor samsa (2 pcs)' },
    description: { en: 'Flaky samsa with meat from a real tandoor.' },
  },
  'it-margherita': {
    name: { en: 'Margherita pizza' },
    description: { en: 'Thin crust, tomato sauce, mozzarella, basil.' },
  },
  'it-carbonara': {
    name: { en: 'Carbonara pasta' },
    description: { en: 'Spaghetti with bacon, egg sauce and parmesan.' },
  },
  'it-tiramisu': {
    name: { en: 'Tiramisu' },
    description: { en: 'Classic dessert with mascarpone and coffee.' },
  },
  'bk-cinnamon': {
    name: { en: 'Cinnamon roll' },
    description: { en: 'Soft bun with cinnamon and cream-cheese glaze.' },
  },
  'veg-buddha': {
    name: { en: 'Buddha bowl' },
    description: { en: 'Quinoa, chickpeas, avocado, vegetables and tahini sauce.' },
  },
  'veg-falafel': {
    name: { en: 'Falafel pita' },
    description: { en: 'Crispy falafel, vegetables and hummus in a pita.' },
  },
}

export const restaurantL10n = {
  paul: { address: { en: 'Al-Farabi Ave 77/8, Esentai Mall' } },
  costa: { address: { en: 'Gogol Street 39, Almaty' } },
  six: { address: { en: 'Kabanbay Batyr Street 77, Almaty' } },
  navat: { address: { en: 'Dostyk Street 132, Almaty' } },
  daredzhani: { address: { en: 'Bogenbay Batyr Street 142, Almaty' } },
  delmeal: { address: { en: 'Tole Bi Street 264, Almaty' } },
  delicatesse: { address: { en: 'Samal-2 microdistrict 58, Almaty' } },
}

export const reviewL10n = {
  1: {
    author: { en: 'Aruzhan K.' },
    text: { en: 'Saved great manti for half price, everything fresh. So convenient!' },
  },
  2: {
    author: { en: 'Damir S.' },
    text: { en: 'I grab coffee and pastries before closing — I save money and food does not get thrown out.' },
  },
  3: {
    author: { en: 'Timur A.' },
    text: { en: 'Good portions, sometimes the choice is small late at night. But overall super.' },
  },
  4: {
    author: { en: 'Aigerim N.' },
    text: { en: 'Favourite app — I help the planet and the wallet at the same time.' },
  },
}

// UI strings used across pages.
// Use {var} placeholders for interpolation via `t('key', { var: value })`.
export const dict = {
  // ────────── Nav / shared ──────────
  'nav.offers':        { ru: 'Предложения',  en: 'Offers' },
  'nav.about':         { ru: 'О проекте',    en: 'About' },
  'nav.partner':       { ru: 'Партнёрам',    en: 'For partners' },
  'nav.contacts':      { ru: 'Контакты',     en: 'Contact' },
  'nav.account':       { ru: 'Кабинет',      en: 'Account' },
  'nav.account.aria':  { ru: 'Аккаунт',      en: 'Account' },
  'nav.cart.aria':     { ru: 'Корзина',      en: 'Cart' },
  'nav.menu.aria':     { ru: 'Меню',         en: 'Menu' },
  'nav.lang.aria':     { ru: 'Сменить язык', en: 'Change language' },

  // ────────── Footer ──────────
  'footer.tagline':       { ru: 'Спасаем еду в кафе и ресторанах Алматы. Меньше отходов — больше пользы для планеты.', en: 'Saving food at cafés and restaurants in Almaty. Less waste — more good for the planet.' },
  'footer.platform':      { ru: 'Платформа',         en: 'Platform' },
  'footer.account':       { ru: 'Личный кабинет',    en: 'My account' },
  'footer.forPartners':   { ru: 'Для партнёров',     en: 'For partners' },
  'footer.company':       { ru: 'Компания',          en: 'Company' },
  'footer.about':         { ru: 'О проекте',         en: 'About' },
  'footer.contacts':      { ru: 'Контакты',          en: 'Contact' },
  'footer.sustainReports':{ ru: 'Отчёты об устойчивости', en: 'Sustainability reports' },
  'footer.social':        { ru: 'Мы в соцсетях',     en: 'Follow us' },
  'footer.copyright':     { ru: '© 2026 LateBite. Демо-версия для презентации.', en: '© 2026 LateBite. Demo build for presentation.' },

  // ────────── Demo badge ──────────
  'demo.title':  { ru: 'Демо-версия', en: 'Demo build' },
  'demo.body':   { ru: 'Прототип для презентации. Оплата Kaspi, вход и уведомления — имитация. Данные кафе и блюд демонстрационные.', en: 'Prototype for presentation. Kaspi payment, login and notifications are simulated. Café and dish data are illustrative.' },

  // ────────── Home ──────────
  'home.chip':           { ru: '🌱 Спасаем еду в Алматы', en: '🌱 Saving food in Almaty' },
  'home.hero.line1':     { ru: 'СПАСАЙ ЕДУ.',       en: 'SAVE FOOD.' },
  'home.hero.line2':     { ru: 'ЭКОНОМЬ ДЕНЬГИ.',   en: 'SAVE MONEY.' },
  'home.hero.line3':     { ru: 'БЕРЕГИ ПЛАНЕТУ.',   en: 'SAVE THE PLANET.' },
  'home.hero.lead':      { ru: 'LateBite соединяет вас с кафе и ресторанами, у которых остались нераспроданные блюда. Берите вкусную еду со скидкой до 70% — и помогайте сократить пищевые отходы.', en: 'LateBite connects you with cafés and restaurants that have unsold meals left over. Grab great food at up to 70% off — and help cut food waste.' },
  'home.hero.cta.view':  { ru: 'Смотреть предложения', en: 'See offers' },
  'home.hero.cta.rest':  { ru: 'Я ресторан',        en: 'I run a restaurant' },
  'home.hero.heroAlt':   { ru: 'Девушка с едой LateBite', en: 'Person with LateBite food' },
  'home.hero.savedLabel':{ ru: 'Уже спасено',       en: 'Already saved' },
  'home.hero.savedValue':{ ru: '128 450 кг CO₂',    en: '128,450 kg CO₂' },

  'home.why.title':      { ru: 'Почему LateBite',   en: 'Why LateBite' },
  'home.why.1.title':    { ru: 'Скидки 50–70%',     en: 'Discounts 50–70%' },
  'home.why.1.text':     { ru: 'Любимые блюда из кафе и ресторанов по цене в 2–3 раза ниже.', en: 'Your favourite café and restaurant meals at 2–3× lower prices.' },
  'home.why.2.title':    { ru: 'Еда рядом с вами',  en: 'Food right next to you' },
  'home.why.2.text':     { ru: 'Находите предложения поблизости на интерактивной карте Алматы.', en: 'Find nearby offers on an interactive map of Almaty.' },
  'home.why.3.title':    { ru: 'Меньше отходов',    en: 'Less waste' },
  'home.why.3.text':     { ru: 'Каждая спасённая порция сокращает выбросы примерно на 2,5 кг CO₂.', en: 'Each rescued portion cuts emissions by about 2.5 kg of CO₂.' },

  'home.how.title':      { ru: 'Как это работает',  en: 'How it works' },
  'home.how.step':       { ru: 'Шаг {n}',           en: 'Step {n}' },
  'home.how.1.title':    { ru: 'Найдите предложение', en: 'Find an offer' },
  'home.how.1.text':     { ru: 'Откройте карту и выберите блюдо в кафе рядом.', en: 'Open the map and pick a meal at a café nearby.' },
  'home.how.2.title':    { ru: 'Оплатите через Kaspi', en: 'Pay via Kaspi' },
  'home.how.2.text':     { ru: 'Забронируйте и оплатите в пару касаний.', en: 'Reserve and pay in a couple of taps.' },
  'home.how.3.title':    { ru: 'Заберите заказ',    en: 'Pick up your order' },
  'home.how.3.text':     { ru: 'Покажите QR-код в кафе и заберите еду.', en: 'Show the QR code at the café and grab your food.' },

  'home.eco.title':      { ru: 'Наш общий вклад',   en: 'Our combined impact' },
  'home.eco.sub':        { ru: 'Вместе сообщество LateBite уже изменило ситуацию', en: 'Together the LateBite community has already made a difference' },
  'home.eco.co2.unit':   { ru: 'кг CO₂',            en: 'kg CO₂' },
  'home.eco.co2.label':  { ru: 'сэкономлено выбросов', en: 'of emissions saved' },
  'home.eco.meals.unit': { ru: 'порций',            en: 'meals' },
  'home.eco.meals.label':{ ru: 'спасено от мусора', en: 'saved from waste' },
  'home.eco.trees.unit': { ru: 'деревьев',          en: 'trees' },
  'home.eco.trees.label':{ ru: 'условно сохранено', en: 'equivalent saved' },

  // ────────── Offers ──────────
  'offers.title':        { ru: 'Предложения рядом', en: 'Offers near you' },
  'offers.sub':          { ru: '{rest} заведений · {dish} блюд со скидкой в Алматы', en: '{rest} venues · {dish} discounted meals in Almaty' },
  'offers.found':        { ru: 'Найдено:',          en: 'Found:' },
  'offers.empty':        { ru: 'Ничего не найдено. Попробуйте изменить фильтры.', en: 'Nothing found. Try adjusting the filters.' },

  // ────────── FilterBar ──────────
  'filter.title':        { ru: 'Фильтры',           en: 'Filters' },
  'filter.distance':     { ru: 'Расстояние',        en: 'Distance' },
  'filter.cuisine':      { ru: 'Кухня',             en: 'Cuisine' },
  'filter.sort':         { ru: 'Сортировка',        en: 'Sort' },
  'filter.dist.all':     { ru: 'Любое',             en: 'Any' },
  'filter.dist.nearby':  { ru: 'Рядом',             en: 'Nearby' },
  'filter.dist.close':   { ru: 'Близко',            en: 'Close' },
  'filter.dist.far':     { ru: 'Далеко',            en: 'Far' },
  'filter.cuisine.all':  { ru: 'Все кухни',         en: 'All cuisines' },
  'filter.sort.distance':{ ru: 'По расстоянию',     en: 'By distance' },
  'filter.sort.priceAsc':{ ru: 'Цена: по возрастанию', en: 'Price: low to high' },
  'filter.sort.priceDesc':{ ru: 'Цена: по убыванию', en: 'Price: high to low' },
  'filter.sort.pickup':  { ru: 'По времени выдачи', en: 'By pickup time' },

  // ────────── DishCard / Map ──────────
  'dish.add':            { ru: 'В корзину',         en: 'Add to cart' },
  'dish.addedToast':     { ru: '«{name}» добавлено в корзину', en: '“{name}” added to cart' },
  'map.youHere':         { ru: 'Вы здесь · {label}', en: 'You are here · {label}' },
  'map.showOffers':      { ru: 'Показать {n} предложений', en: 'Show {n} offers' },
  'map.userLocation':    { ru: 'пл. Республики, Алматы', en: 'Republic Square, Almaty' },

  // ────────── Cart ──────────
  'cart.empty.title':    { ru: 'Корзина пуста',     en: 'Cart is empty' },
  'cart.empty.sub':      { ru: 'Загляните в предложения — там вкусно и со скидкой.', en: 'Check out the offers — tasty and discounted.' },
  'cart.empty.cta':      { ru: 'Смотреть предложения', en: 'See offers' },
  'cart.title':          { ru: 'Корзина',           en: 'Cart' },
  'cart.sub':            { ru: 'Можно собрать заказ из нескольких заведений и оплатить разом.', en: 'You can mix dishes from several venues and pay for everything at once.' },
  'cart.summary.total':  { ru: 'Итого',             en: 'Summary' },
  'cart.summary.dishes': { ru: 'Блюд: {n}',         en: 'Dishes: {n}' },
  'cart.summary.discount':{ ru: 'Скидка LateBite',  en: 'LateBite discount' },
  'cart.summary.toPay':  { ru: 'К оплате',          en: 'Total' },
  'cart.summary.co2':    { ru: 'Вы спасаете ~{n} кг CO₂', en: 'You are saving ~{n} kg of CO₂' },
  'cart.summary.cta':    { ru: 'Оформить заказ',    en: 'Checkout' },
  'cart.continue':       { ru: 'продолжить выбор',  en: 'continue browsing' },

  // ────────── Checkout ──────────
  'checkout.title':      { ru: 'Оформление и оплата', en: 'Checkout and payment' },
  'checkout.order':      { ru: 'Ваш заказ',         en: 'Your order' },
  'checkout.toPay':      { ru: 'К оплате',          en: 'Total' },
  'checkout.method':     { ru: 'Способ оплаты',     en: 'Payment method' },
  'checkout.kaspiSub':   { ru: 'Kaspi Pay · оплата в приложении', en: 'Kaspi Pay · pay in the app' },
  'checkout.phone':      { ru: 'Номер телефона +7 (777) 123-45-67', en: 'Phone number +7 (777) 123-45-67' },
  'checkout.payBtn':     { ru: 'Оплатить {total} через Kaspi', en: 'Pay {total} with Kaspi' },
  'checkout.paying':     { ru: 'Оплата через Kaspi…', en: 'Paying with Kaspi…' },
  'checkout.disclaimer': { ru: 'Демо-оплата. Реальные платежи Kaspi.kz подключаются на запуске.', en: 'Demo payment. Real Kaspi.kz integration ships at launch.' },
  'checkout.empty':      { ru: 'Корзина пуста.',    en: 'Your cart is empty.' },
  'checkout.toOffers':   { ru: 'К предложениям',    en: 'See offers' },

  // ────────── CheckoutSuccess ──────────
  'success.title':       { ru: 'Заказ оплачен!',    en: 'Order paid!' },
  'success.sub':         { ru: 'Покажите этот QR-код на кассе кафе, чтобы забрать заказ.', en: 'Show this QR code at the café to pick up your order.' },
  'success.pickup':      { ru: 'Заберите заказ в указанное время выдачи', en: 'Pick up your order within the stated time window' },
  'success.paid':        { ru: 'Оплачено: {total}', en: 'Paid: {total}' },
  'success.myOrders':    { ru: 'Мои заказы',        en: 'My orders' },
  'success.continue':    { ru: 'Продолжить покупки', en: 'Continue shopping' },

  // ────────── Account ──────────
  'acc.userName':        { ru: 'Айгерим Нурланова', en: 'Aigerim Nurlanova' },
  'acc.tab.active':      { ru: 'Активные заказы',   en: 'Active orders' },
  'acc.tab.history':     { ru: 'История',           en: 'History' },
  'acc.tab.eco':         { ru: 'Эко-трекер',        en: 'Eco tracker' },
  'acc.tab.referral':    { ru: 'Рефералы',          en: 'Referrals' },
  'acc.tab.profile':     { ru: 'Профиль',           en: 'Profile' },
  'acc.empty.active':    { ru: 'Нет активных заказов', en: 'No active orders' },
  'acc.pickup':          { ru: 'Выдача: {time}',    en: 'Pickup: {time}' },
  'acc.eco.co2':         { ru: 'CO₂ сэкономлено',   en: 'CO₂ saved' },
  'acc.eco.meals':       { ru: 'порций спасено',    en: 'meals saved' },
  'acc.eco.trees':       { ru: 'деревьев сохранено', en: 'trees saved' },
  'acc.eco.money':       { ru: 'сэкономлено',       en: 'money saved' },
  'acc.eco.forestTitle': { ru: 'Ваш лес',           en: 'Your forest' },
  'acc.eco.forestSub':   { ru: 'Каждые ~6 спасённых порций = 1 условное дерево', en: 'Every ~6 rescued meals = 1 equivalent tree' },
  'acc.eco.nextTree':    { ru: 'До следующего дерева: {n} {plural}', en: 'Until the next tree: {n} {plural}' },
  'acc.eco.portionOne':  { ru: 'порция', en: 'portion' },
  'acc.eco.portionFew':  { ru: 'порции', en: 'portions' },
  'acc.eco.portionMany': { ru: 'порций', en: 'portions' },
  'acc.ref.title':       { ru: 'Пригласите друга — получите скидку', en: 'Invite a friend — get a discount' },
  'acc.ref.sub':         { ru: 'Друг получает −15% на первый заказ, вы — 500 ₸ бонусов.', en: 'Your friend gets −15% on their first order, you get 500 ₸ in bonuses.' },
  'acc.ref.copy':        { ru: 'Скопировать',       en: 'Copy' },
  'acc.ref.copied':      { ru: 'Промокод скопирован', en: 'Promo code copied' },
  'acc.ref.invited':     { ru: 'приглашено',        en: 'invited' },
  'acc.ref.bonuses':     { ru: 'бонусов',           en: 'in bonuses' },
  'acc.ref.promosTitle': { ru: 'Промокоды и бонусы', en: 'Promo codes & bonuses' },
  'acc.ref.promo.LATE15.desc':  { ru: '−15% на первый заказ', en: '−15% off your first order' },
  'acc.ref.promo.ECO500.desc':  { ru: '−500 ₸ за приглашённого друга', en: '−500 ₸ per invited friend' },
  'acc.ref.promo.WEEKEND.desc': { ru: '−10% по выходным', en: '−10% on weekends' },
  'acc.ref.promo.LATE15.expires':  { ru: 'до 31 мая', en: 'until May 31' },
  'acc.ref.promo.ECO500.expires':  { ru: 'бессрочно', en: 'no expiry' },
  'acc.ref.promo.WEEKEND.expires': { ru: 'до 30 июня', en: 'until June 30' },
  'acc.profile.title':   { ru: 'Личные данные',     en: 'Personal info' },
  'acc.profile.name':    { ru: 'Имя',               en: 'Name' },
  'acc.profile.phone':   { ru: 'Телефон',           en: 'Phone' },
  'acc.profile.email':   { ru: 'Email',             en: 'Email' },
  'acc.profile.save':    { ru: 'Сохранить',         en: 'Save' },
  'acc.profile.saved':   { ru: 'Изменения сохранены', en: 'Changes saved' },
  'acc.pay.title':       { ru: 'Способы оплаты',    en: 'Payment methods' },
  'acc.pay.add':         { ru: '+ Добавить способ оплаты', en: '+ Add payment method' },
  'acc.notif.title':     { ru: 'Уведомления',       en: 'Notifications' },
  'acc.notif.push':      { ru: 'Push-уведомления',  en: 'Push notifications' },
  'acc.notif.email':     { ru: 'Email-рассылка',    en: 'Email newsletter' },

  // ────────── Partner ──────────
  'partner.badge':       { ru: 'Кабинет партнёра',  en: 'Partner dashboard' },
  'partner.weekRev':     { ru: 'Выручка / нед.',    en: 'Revenue / wk' },
  'partner.sold':        { ru: 'Продано блюд',      en: 'Meals sold' },
  'partner.tab.menu':    { ru: 'Меню',              en: 'Menu' },
  'partner.tab.orders':  { ru: 'Заказы',            en: 'Orders' },
  'partner.tab.scanner': { ru: 'QR-сканер',         en: 'QR scanner' },
  'partner.tab.analytics':{ ru: 'Аналитика',        en: 'Analytics' },
  'partner.tab.reviews': { ru: 'Отзывы',            en: 'Reviews' },
  'partner.tab.profile': { ru: 'Профиль',           en: 'Profile' },

  'partner.menu.title':  { ru: 'Surplus-блюда ({n})', en: 'Surplus dishes ({n})' },
  'partner.menu.add':    { ru: 'Добавить блюдо',    en: 'Add dish' },
  'partner.menu.edit':   { ru: 'Изм.',              en: 'Edit' },
  'partner.menu.removed':{ ru: 'Блюдо удалено',     en: 'Dish removed' },
  'partner.menu.saved':  { ru: 'Блюдо сохранено',   en: 'Dish saved' },
  'partner.menu.left':   { ru: 'осталось: {n} шт',  en: 'left: {n} pcs' },

  'partner.form.editTitle':{ ru: 'Редактировать блюдо', en: 'Edit dish' },
  'partner.form.newTitle': { ru: 'Новое блюдо',     en: 'New dish' },
  'partner.form.name':     { ru: 'Название',        en: 'Name' },
  'partner.form.price':    { ru: 'Цена со скидкой, ₸', en: 'Sale price, ₸' },
  'partner.form.oldPrice': { ru: 'Старая цена, ₸',  en: 'Old price, ₸' },
  'partner.form.qty':      { ru: 'Количество',      en: 'Quantity' },
  'partner.form.portion':  { ru: 'Порция / вес',    en: 'Portion / weight' },
  'partner.form.pickup':   { ru: 'Время выдачи',    en: 'Pickup window' },
  'partner.form.description':{ ru: 'Описание',      en: 'Description' },
  'partner.form.photoNote':{ ru: 'Фото загружается в реальной версии; в демо используется заглушка.', en: 'Photo upload ships in the real version; the demo uses a placeholder.' },
  'partner.form.cancel':   { ru: 'Отмена',          en: 'Cancel' },
  'partner.form.save':     { ru: 'Сохранить',       en: 'Save' },

  'partner.orders.accept': { ru: 'Принять',         en: 'Accept' },
  'partner.orders.give':   { ru: 'Выдать',          en: 'Hand over' },
  'partner.orders.dish':   { ru: 'Блюдо',           en: 'Dish' },
  'partner.orders.pickup': { ru: 'Выдача: {time}',  en: 'Pickup: {time}' },

  'partner.scan.btn':      { ru: 'Сканировать QR заказа', en: 'Scan order QR' },
  'partner.scan.scanning': { ru: 'Сканирование…',   en: 'Scanning…' },
  'partner.scan.hint':     { ru: 'Демо: камера имитируется, берётся следующий заказ из очереди.', en: 'Demo: camera is simulated; the next order in the queue is taken.' },
  'partner.scan.result':   { ru: 'Результат',       en: 'Result' },
  'partner.scan.confirmed':{ ru: 'Заказ подтверждён', en: 'Order confirmed' },
  'partner.scan.empty':    { ru: 'Отсканируйте QR-код клиента, чтобы подтвердить выдачу.', en: 'Scan the customer QR code to confirm pickup.' },
  'partner.scan.queue':    { ru: 'В очереди на выдачу:', en: 'Queued for pickup:' },
  'partner.scan.allDone':  { ru: 'Все заказы выданы', en: 'All orders handed over' },
  'partner.scan.toast':    { ru: 'Заказ {id} подтверждён', en: 'Order {id} confirmed' },

  'partner.an.revenue':    { ru: 'Выручка / нед.',  en: 'Revenue / wk' },
  'partner.an.meals':      { ru: 'Продано блюд',    en: 'Meals sold' },
  'partner.an.waste':      { ru: 'Спасено еды',     en: 'Food saved' },
  'partner.an.rating':     { ru: 'Рейтинг',         en: 'Rating' },
  'partner.an.revByDay':   { ru: 'Выручка по дням, ₸', en: 'Revenue by day, ₸' },
  'partner.an.mealsByDay': { ru: 'Продано блюд по дням', en: 'Meals sold by day' },

  'partner.rev.count':     { ru: '{n} отзывов',     en: '{n} reviews' },
  'partner.prof.title':    { ru: 'Профиль заведения', en: 'Venue profile' },
  'partner.prof.name':     { ru: 'Название',        en: 'Name' },
  'partner.prof.address':  { ru: 'Адрес',           en: 'Address' },
  'partner.prof.hours':    { ru: 'Часы работы',     en: 'Opening hours' },
  'partner.prof.phone':    { ru: 'Телефон',         en: 'Phone' },
  'partner.prof.save':     { ru: 'Сохранить',       en: 'Save' },
  'partner.prof.saved':    { ru: 'Профиль сохранён', en: 'Profile saved' },

  // ────────── About ──────────
  'about.chip':      { ru: 'О проекте',  en: 'About' },
  'about.title':     { ru: 'Спасаем еду, а не выбрасываем', en: 'We save food, we don’t throw it out' },
  'about.lead':      { ru: 'В Казахстане ежедневно выбрасываются тонны качественной готовой еды. LateBite соединяет кафе и рестораны с людьми, которые готовы забрать остатки со скидкой — выигрывают все, и особенно планета.', en: 'Every day in Kazakhstan tonnes of good prepared food go to waste. LateBite connects cafés and restaurants with people happy to pick up leftovers at a discount — everyone wins, especially the planet.' },
  'about.coverAlt':  { ru: 'Кафе',       en: 'Café' },
  'about.mission.title': { ru: 'Миссия', en: 'Mission' },
  'about.mission.text':  { ru: 'Сделать так, чтобы вкусная еда доходила до людей, а не до мусорного бака.', en: 'Make sure tasty food reaches people, not the bin.' },
  'about.approach.title':{ ru: 'Подход', en: 'Approach' },
  'about.approach.text': { ru: 'Технология + локальные партнёры = меньше отходов и доступные цены.', en: 'Technology + local partners = less waste and affordable prices.' },
  'about.impact.title':  { ru: 'Влияние', en: 'Impact' },
  'about.impact.text':   { ru: 'Уже спасено {meals} порций и {co2} кг CO₂.', en: 'Already saved {meals} meals and {co2} kg of CO₂.' },

  'about.sdg.title':     { ru: 'Цели устойчивого развития ООН', en: 'UN Sustainable Development Goals' },
  'about.sdg.label':     { ru: 'ЦУР {n}: {title}',  en: 'SDG {n}: {title}' },
  'about.sdg.12.title':  { ru: 'Ответственное потребление', en: 'Responsible consumption' },
  'about.sdg.12.text':   { ru: 'Сокращаем пищевые отходы и продлеваем жизнь готовой еде.', en: 'We cut food waste and extend the life of prepared food.' },
  'about.sdg.13.title':  { ru: 'Борьба с изменением климата', en: 'Climate action' },
  'about.sdg.13.text':   { ru: 'Каждая спасённая порция снижает выбросы CO₂ на ~2,5 кг.', en: 'Each rescued portion cuts CO₂ emissions by ~2.5 kg.' },

  'about.partners.title':{ ru: 'Партнёры',          en: 'Partners' },
  'about.partners.sub':  { ru: 'Кафе и рестораны Алматы, которые уже с нами:', en: 'Almaty cafés and restaurants already with us:' },
  'about.reports.title': { ru: 'Отчёты',            en: 'Reports' },
  'about.reports.1':     { ru: 'Отчёт о воздействии 2025 (PDF)', en: '2025 Impact report (PDF)' },
  'about.reports.2':     { ru: 'Методика расчёта CO₂', en: 'CO₂ calculation methodology' },
  'about.reports.3':     { ru: 'Гид для партнёров', en: 'Partner guide' },

  // ────────── Contacts ──────────
  'contacts.title':     { ru: 'Контакты',          en: 'Contact' },
  'contacts.sub':       { ru: 'Свяжитесь с нами или оставьте сообщение — мы ответим.', en: 'Get in touch or leave a message — we’ll get back to you.' },
  'contacts.email':     { ru: 'Email',             en: 'Email' },
  'contacts.phone':     { ru: 'Телефон',           en: 'Phone' },
  'contacts.address':   { ru: 'Адрес',             en: 'Address' },
  'contacts.addressVal':{ ru: 'г. Алматы, пр. Достык 132', en: 'Almaty, Dostyk Ave 132' },
  'contacts.social':    { ru: 'Мы в соцсетях',     en: 'Follow us' },
  'contacts.form.title':{ ru: 'Форма обратной связи', en: 'Contact form' },
  'contacts.form.name': { ru: 'Имя',               en: 'Name' },
  'contacts.form.email':{ ru: 'Email',             en: 'Email' },
  'contacts.form.msg':  { ru: 'Сообщение',         en: 'Message' },
  'contacts.form.send': { ru: 'Отправить',         en: 'Send' },
  'contacts.sent':      { ru: 'Сообщение отправлено', en: 'Message sent' },
  'contacts.thanks':    { ru: 'Спасибо!',          en: 'Thank you!' },
  'contacts.thanksSub': { ru: 'Мы свяжемся с вами в ближайшее время.', en: 'We’ll be in touch shortly.' },

  // ────────── Login ──────────
  'login.title':        { ru: 'Вход в LateBite',   en: 'Sign in to LateBite' },
  'login.sub':          { ru: 'Войдите по номеру телефона', en: 'Sign in with your phone number' },
  'login.phone':        { ru: 'Телефон',           en: 'Phone' },
  'login.btn':          { ru: 'Войти',             en: 'Sign in' },
  'login.or':           { ru: 'или',               en: 'or' },
  'login.partner':      { ru: 'Вход для партнёров', en: 'Partner sign-in' },
  'login.demoNote':     { ru: 'Демо-вход: авторизация имитируется, код из SMS не требуется.', en: 'Demo sign-in: auth is simulated, no SMS code needed.' },
}
