import api from './api'

// The cart currently lives entirely in CartContext (local state).
// These functions are here so a future backend-synced cart is a small
// change at the call site rather than a rearchitecture.

// TODO: Replace with actual Django API endpoint once cart persistence exists.
export async function syncCart(cartItems) {
  try {
    const { data } = await api.post('/cart/sync/', { items: cartItems })
    return data
  } catch (err) {
    console.warn('[cartService] Cart sync endpoint not available yet:', err.message)
    return null
  }
}

// TODO: Replace with actual Django API endpoint for checkout/order creation.
export async function checkout(payload) {
  try {
    const { data } = await api.post('/orders/', payload)
    return data
  } catch (err) {
    console.warn('[cartService] Checkout endpoint not available yet:', err.message)
    throw err
  }
}
