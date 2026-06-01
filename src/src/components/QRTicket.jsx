import { QRCodeSVG } from 'qrcode.react'

// Renders a real QR code for an order pickup code.
export default function QRTicket({ value, size = 160 }) {
  return (
    <div className="inline-flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border-2 border-dashed border-primary/30">
      <QRCodeSVG
        value={value}
        size={size}
        fgColor="#1A4D3E"
        bgColor="#ffffff"
        level="M"
      />
      <span className="text-xs font-mono text-primary-dark/60 tracking-wider">{value}</span>
    </div>
  )
}
