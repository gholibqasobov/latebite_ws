import { createContext, useContext, useCallback, useState } from 'react'
import { CheckCircle2, X } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((p) => p.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (message, opts = {}) => {
      const id = Math.random().toString(36).slice(2)
      setToasts((p) => [...p, { id, message, ...opts }])
      setTimeout(() => dismiss(id), opts.duration || 2800)
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[1000] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-slide-in flex items-center gap-3 rounded-xl bg-primary text-white shadow-card px-4 py-3 pr-3 max-w-sm"
          >
            <CheckCircle2 size={20} className="text-mint shrink-0" />
            <span className="text-sm font-medium">{t.message}</span>
            <button onClick={() => dismiss(t.id)} className="ml-1 opacity-70 hover:opacity-100">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
