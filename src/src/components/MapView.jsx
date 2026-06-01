import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import L from 'leaflet'
import { Link } from 'react-router-dom'
import { restaurants, USER_LOCATION } from '../data/restaurants.js'
import { dishesByRestaurant } from '../data/dishes.js'
import { distanceToRestaurant, formatDistance } from '../data/geo.js'
import { tenge } from '../lib/format.js'

// Custom pin marker (divIcon) — avoids missing default-marker-icon assets.
const pinIcon = (count) =>
  L.divIcon({
    className: '',
    html: `<div style="position:relative;transform:translate(-50%,-100%)">
      <div style="background:#1A4D3E;color:#fff;font-weight:700;font-size:12px;
        padding:4px 9px;border-radius:9999px;box-shadow:0 4px 12px rgba(0,0,0,.25);
        white-space:nowrap;display:flex;align-items:center;gap:4px">
        🍽 ${count}
      </div>
      <div style="width:10px;height:10px;background:#1A4D3E;transform:rotate(45deg);
        margin:-5px auto 0;box-shadow:0 4px 12px rgba(0,0,0,.15)"></div>
    </div>`,
    iconSize: [0, 0],
  })

export default function MapView({ onSelectRestaurant }) {
  return (
    <MapContainer
      center={[USER_LOCATION.lat, USER_LOCATION.lng]}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full h-[420px] lg:h-full min-h-[420px]"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User location */}
      <CircleMarker
        center={[USER_LOCATION.lat, USER_LOCATION.lng]}
        radius={9}
        pathOptions={{ color: '#F4D03F', fillColor: '#F4D03F', fillOpacity: 1, weight: 3 }}
      >
        <Popup>Вы здесь · {USER_LOCATION.label}</Popup>
      </CircleMarker>

      {restaurants.map((r) => {
        const list = dishesByRestaurant(r.id)
        const distance = formatDistance(distanceToRestaurant(r))
        return (
          <Marker key={r.id} position={[r.lat, r.lng]} icon={pinIcon(list.length)}>
            <Popup minWidth={240} maxWidth={260}>
              <div className="font-sans">
                <div className="font-bold text-primary text-base">{r.name}</div>
                <div className="text-xs text-primary-dark/60 mb-2">
                  ★ {r.rating} · {r.cuisine} · {distance}
                </div>
                <ul className="space-y-1.5 max-h-44 overflow-auto pr-1">
                  {list.map((d) => (
                    <li key={d.id} className="flex justify-between gap-2 text-sm">
                      <span className="truncate">{d.name}</span>
                      <span className="font-semibold text-primary whitespace-nowrap">{tenge(d.price)}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onSelectRestaurant?.(r.id)}
                  className="btn-primary w-full mt-3 !py-2 text-sm"
                >
                  Показать {list.length} предложений
                </button>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
