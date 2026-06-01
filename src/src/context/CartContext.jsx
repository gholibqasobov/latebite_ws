import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  // items: { [dishId]: qty }
  const [items, setItems] = useState({})

  const add = (dishId, qty = 1) =>
    setItems((p) => ({ ...p, [dishId]: (p[dishId] || 0) + qty }))

  const setQty = (dishId, qty) =>
    setItems((p) => {
      const next = { ...p }
      if (qty <= 0) delete next[dishId]
      else next[dishId] = qty
      return next
    })

  const remove = (dishId) =>
    setItems((p) => {
      const next = { ...p }
      delete next[dishId]
      return next
    })

  const clear = () => setItems({})

  const count = useMemo(
    () => Object.values(items).reduce((a, b) => a + b, 0),
    [items],
  )

  const value = { items, add, setQty, remove, clear, count }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
