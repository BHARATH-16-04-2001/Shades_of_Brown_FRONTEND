import axios from 'axios'

// Central axios instance. Configure the backend origin via VITE_API_BASE_URL
// (see .env.example). Every request from every service file goes through
// this instance so the base URL only ever needs to change in one place.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
