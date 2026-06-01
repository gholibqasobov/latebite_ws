// ─────────────────────────────────────────────────────────────────────────
//  CENTRAL IMAGE CONFIG
//  All demo imagery is referenced from here so real assets can be dropped in
//  by editing ONE file. To use a local asset, replace the URL with an import
//  or a "/assets/..." path (put files in /public). See MATERIALS.txt.
//
//  Placeholders use Unsplash. The <Img> component falls back to a guaranteed
//  picsum.photos seed on error, so the UI never shows a broken image.
// ─────────────────────────────────────────────────────────────────────────

const u = (id, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

export const IMAGES = {
  // Home hero — REPLACE with the "Kazakh girl with food" photo (≥1600×1000).
  hero: u('1543353071-873f17a7a088', 1600, 1100),

  // Dish photos (placeholders) — keyed by dish id, see dishes.js
  dishes: {
    'kz-beshbarmak': u('1547592180-85f173990554'),
    'kz-baursak': u('1509365465985-25d11c17e812'),
    'kz-manty': u('1496116218417-1a781b1c416c'),
    'kz-plov': u('1604908176997-125f25cc6f3d'),
    'it-margherita': u('1565299624946-b28f40a0ae38'),
    'it-carbonara': u('1612874742237-6526221588e3'),
    'it-tiramisu': u('1571877227200-a0d98ea607e9'),
    'eu-croissant': u('1555507036-ab1f4038808a'),
    'eu-quiche': u('1488477181946-6428a0291777'),
    'eu-cheesecake': u('1565958011703-44f9829ba187'),
    'uz-lagman': u('1547928576-b822bc410bdf'),
    'uz-samsa': u('1601050690597-df0568f70950'),
    'veg-buddha': u('1512621776951-a57141f2eefd'),
    'veg-falafel': u('1593001874117-c99c800e3eb7'),
    'veg-smoothie': u('1505252585461-04db1eb84625'),
    'cf-cappuccino': u('1572442388796-11668a67e53d'),
    'cf-latte': u('1561882468-9110e03e0f78'),
    'cf-sandwich': u('1528735602780-2552fd46c7af'),
    'bk-cinnamon': u('1509365465985-25d11c17e812'),
    'bk-baguette': u('1549931319-a545dcf3bc73'),
  },

  // Restaurant cover / logos (placeholders)
  restaurants: {
    paul: u('1517433670267-08bbd4be890f', 400, 300),
    costa: u('1495474472287-4d71bcdd2085', 400, 300),
    six: u('1559339352-11d035aa65de', 400, 300),
    navat: u('1466978913421-dad2ebd01d17', 400, 300),
    delicatesse: u('1414235077428-338989a2e8c0', 400, 300),
    delmeal: u('1424847651672-bf20a4b0982b', 400, 300),
    daredzhani: u('1517248135467-4c7edcad34c4', 400, 300),
  },

  // Generic placeholders
  cafeInterior: u('1554118811-1e0d58224f24', 1200, 800),
  team: u('1556761175-5973dc0f32e7', 800, 600),
}

// Build a deterministic always-on fallback for any image.
export const fallbackFor = (seed) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed || 'latebite')}/800/600`
