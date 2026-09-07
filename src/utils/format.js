export function formatPrice(value) {
  const n = Number(value) || 0
  return `₹${n.toLocaleString('en-IN')}`
}

export function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}
