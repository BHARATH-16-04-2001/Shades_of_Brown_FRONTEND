import React, { createContext, useContext, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

const TAX_RATE = 0.05

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((i) => i.id === action.item.id)
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...state, { ...action.item, quantity: 1 }]
    }
    case 'INCREASE':
      return state.map((i) =>
        i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    case 'DECREASE':
      return state
        .map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    case 'REMOVE':
      return state.filter((i) => i.id !== action.id)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [])

  const value = useMemo(() => {
    const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0)
    const subtotal = items.reduce((sum, i) => sum + i.quantity * i.price, 0)
    const tax = Math.round(subtotal * TAX_RATE)
    const total = subtotal + tax

    return {
      items,
      totalQuantity,
      subtotal,
      tax,
      total,
      addItem: (item) => dispatch({ type: 'ADD_ITEM', item }),
      increase: (id) => dispatch({ type: 'INCREASE', id }),
      decrease: (id) => dispatch({ type: 'DECREASE', id }),
      remove: (id) => dispatch({ type: 'REMOVE', id }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
