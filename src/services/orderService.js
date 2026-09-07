import api from './api'
import { mockOrders } from '../utils/mockData'

// TODO: Replace with actual Django API endpoint, e.g. GET /orders/
export async function getOrders() {
  try {
    const { data } = await api.get('/orders/')
    if (Array.isArray(data) && data.length) return data
    throw new Error('Empty orders response')
  } catch (err) {
    console.warn('[orderService] Falling back to mock orders:', err.message)
    return mockOrders
  }
}
