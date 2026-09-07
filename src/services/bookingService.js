import api from './api'

// TODO: Replace with actual Django API endpoint, e.g. POST /bookings/
export async function createBooking(payload) {
  try {
    const { data } = await api.post('/bookings/', payload)
    return data
  } catch (err) {
    console.warn('[bookingService] Booking endpoint not available yet:', err.message)
    throw err
  }
}
