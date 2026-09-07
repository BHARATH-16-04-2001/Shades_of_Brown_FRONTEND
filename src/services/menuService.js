import api from './api'
import { mockCategories, mockMenuItems } from '../utils/mockData'

// TODO: Confirm exact Django REST Framework endpoint paths and swap in below.
// Expected shapes (adjust the mapping in normalizeItem/normalizeCategory if
// the actual DRF serializer fields differ):
//   GET /categories/  -> [{ id, name, slug, image }]
//   GET /menu-items/  -> [{ id, name, description, price, category, image, is_veg }]

function normalizeCategory(raw) {
  return {
    id: raw.slug || raw.id,
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
    category: raw.category_slug || raw.category || 'all',
    image: raw.image || raw.image_url || null,
    isVeg: raw.is_veg ?? raw.isVeg ?? null,
  }
}

export async function getCategories() {
  try {
    const { data } = await api.get('/categories/')
    if (Array.isArray(data) && data.length) {
      return data.map(normalizeCategory)
    }
    throw new Error('Empty categories response')
  } catch (err) {
    // Backend not reachable yet during early frontend development —
    // fall back to mock categories so the UI remains fully browsable.
    console.warn('[menuService] Falling back to mock categories:', err.message)
    return mockCategories
  }
}

export async function getMenuItems() {
  try {
    const { data } = await api.get('/menu-items/')
    if (Array.isArray(data) && data.length) {
      return data.map(normalizeItem)
    }
    throw new Error('Empty menu response')
  } catch (err) {
    console.warn('[menuService] Falling back to mock menu items:', err.message)
    return mockMenuItems
  }
}
