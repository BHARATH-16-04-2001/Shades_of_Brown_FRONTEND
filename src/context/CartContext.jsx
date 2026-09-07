import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

const CartContext = createContext(null)

const CGST_RATE = 0.025
const SGST_RATE = 0.025

const CART_STORAGE_KEY = 'cart-items'

function getInitialCart() {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)

    if (!storedCart) {
      return []
    }

    return JSON.parse(storedCart)
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error)
    return []
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((i) => i.id === action.item.id)

      if (existing) {
        return state.map((i) =>
          i.id === action.item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }

      return [...state, { ...action.item, quantity: 1 }]
    }

    case 'INCREASE':
      return state.map((i) =>
        i.id === action.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )

    case 'DECREASE':
      return state
        .map((i) =>
          i.id === action.id
            ? { ...i, quantity: i.quantity - 1 }
            : i
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
  const [items, dispatch] = useReducer(
    cartReducer,
    [],
    getInitialCart
  )

  // Save cart whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(items)
      )
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
    }
  }, [items])

  const value = useMemo(() => {
    const totalQuantity = items.reduce(
      (sum, i) => sum + i.quantity,
      0
    )

    const subtotal = items.reduce(
      (sum, i) => sum + i.quantity * i.price,
      0
    )

    const cgst = Math.round(subtotal * CGST_RATE)
    const sgst = Math.round(subtotal * SGST_RATE)
    const totalGst = cgst + sgst
    const total = subtotal + cgst + sgst

    return {
      items,
      totalQuantity,
      subtotal,
      cgst,
      sgst,
      totalGst,
      total,
      addItem: (item) =>
        dispatch({ type: 'ADD_ITEM', item }),
      increase: (id) =>
        dispatch({ type: 'INCREASE', id }),
      decrease: (id) =>
        dispatch({ type: 'DECREASE', id }),
      remove: (id) =>
        dispatch({ type: 'REMOVE', id }),
      clear: () =>
        dispatch({ type: 'CLEAR' }),
    }
  }, [items])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)

  if (!ctx) {
    throw new Error(
      'useCart must be used within a CartProvider'
    )
  }

  return ctx
}