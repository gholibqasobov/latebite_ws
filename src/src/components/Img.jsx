import { useState } from 'react'
import { fallbackFor } from '../data/images.js'

// Image with a guaranteed fallback so the demo never shows a broken-image icon.
// On error it swaps to a deterministic picsum.photos seed.
export default function Img({ src, alt = '', seed, className = '', ...rest }) {
  const [errored, setErrored] = useState(false)
  const finalSrc = errored ? fallbackFor(seed || alt || src) : src
  return (
    <img
      src={finalSrc}
      alt={alt}
      loading="lazy"
      onError={() => !errored && setErrored(true)}
      className={className}
      {...rest}
    />
  )
}
