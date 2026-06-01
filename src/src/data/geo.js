import { USER_LOCATION } from './restaurants.js'

// Haversine distance in meters between two lat/lng points.
export function distanceMeters(a, b) {
  const R = 6371000
  const toRad = (x) => (x * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

export function distanceToRestaurant(restaurant) {
  return distanceMeters(USER_LOCATION, restaurant)
}

export function formatDistance(m) {
  if (m < 1000) return `${Math.round(m / 10) * 10} м`
  return `${(m / 1000).toFixed(1)} км`
}

// Distance buckets used by the filter bar.
export function distanceBucket(m) {
  if (m <= 2000) return 'nearby' // рядом
  if (m <= 4000) return 'close' // близко
  return 'far' // далеко
}
