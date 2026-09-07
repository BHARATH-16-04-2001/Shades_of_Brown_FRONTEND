import api from './api'
import { mockCategories, mockMenuItems } from '../utils/mockData'

// TODO: Confirm exact Django REST Framework endpoint paths and swap in below.
// Expected shapes (adjust the mapping in normalizeItem/normalizeCategory if
// the actual DRF serializer fields differ):
//   GET /categories/  -> [{ id, name, slug, image }]
//   GET /menu-items/  -> [{ id, name, description, price, category, image, is_veg }]

function normalizeCategory(raw) {
  return {
    id: raw.id,
    name: raw.name,
    image: raw.image || raw.image_url || null,
  }
}

function normalizeItem(raw) {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description || '',
    price: Number(raw.price),
    category: raw.category_name || 'all',
    image: raw.image || raw.image_url || null,
    isVeg: raw.subcategory_name == "Veg"
  }
}

export async function getCategories() {
  try {
    const { data } = await api.get('/menu/categories/')
    console.log('[menuService] getCategories() response:', data, data.results)
    if(data.results && Array.isArray(data.results) && data.results?.length)
      return [{
        id: 'all',
        name: 'All',
        description: '',
        price: 0,
        category: 'all',
        image: null,
        isVeg: null,
      }, ...data.results.map(normalizeCategory)]
    
    throw new Error('Empty categories response')
  } catch (err) {
    // Backend not reachable yet during early frontend development —
    // fall back to mock categories so the UI remains fully browsable.
    console.log('[menuService] Falling back to mock categories:', err.message)
  }
}

export async function getMenuItems() {
  try {
    const { data } = await api.get('/menu/home-items/')
    if (Array.isArray(data.results) && data.results.length) {
      return data.results.map(normalizeItem)
    }
    throw new Error('Empty menu response')
  } catch (err) {
    console.warn('[menuService] Falling back to mock menu items:', err.message)
  }
}
