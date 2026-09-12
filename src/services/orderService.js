import api from './api'
import { mockOrders } from '../utils/mockData'

// TODO: Replace with actual Django API endpoint, e.g. GET /orders/


export async function getOrders() {
  const customerId = localStorage.getItem("customerId");
  try {
    const { data } = await api.get(`/orders/customers/${customerId}/orders/`)
    console.log("data from orders", data)
    return data
  } catch (err) {
    console.warn('[orderService] Falling back to mock orders:', err.message)
    return mockOrders
  }
}