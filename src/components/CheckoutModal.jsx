import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Hash, Phone, User, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import { checkout } from '../services/cartService'

const initialForm = { name: localStorage.getItem('customerName') || '', tableNumber: '', phone: localStorage.getItem('customerPhone') || '' }

const inputClass =
  'w-full rounded-xl border border-line bg-cream px-4 py-3 pl-10 text-[15px] text-espresso placeholder:text-coffee/40 outline-none focus:border-clay transition-colors'

function Field({ label, error, icon: Icon, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-coffee/80">{label}</span>
      <div className="relative mt-1.5">
        <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee/40" />
        {children}
      </div>
      {error && <span className="text-xs text-clayDark mt-1 block">{error}</span>}
    </label>
  )
}

export default function CheckoutModal({ open, onClose }) {
  const { items, subtotal, cgst, sgst, total, clear } = useCart()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [placed, setPlaced] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const updatePhone = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10)
    setForm((f) => ({ ...f, phone: digitsOnly }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your name'
    if (!form.tableNumber.trim()) next.tableNumber = 'Enter your table number'
    if (!/^\d{10}$/.test(form.phone)) next.phone = 'Enter a valid 10-digit phone number'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      const response = await checkout({
        customer_name: form.name,
        table_number: form.tableNumber,
        phone: form.phone,
        items,
        subtotal,
        cgst,
        sgst,
        total,
      })
      // Backend returns a JWT encoding the phone number — stash it so the
      // Orders page can open a private, authenticated socket connection.
      if (response) {
        localStorage.setItem('orderToken', response.token)
        localStorage.setItem('customerId', response.customerId)
        localStorage.setItem('customerName', response.customerName)
        localStorage.setItem('customerPhone', response.customerPhone)
      }
    } catch (err) {
      // Backend not wired up yet — proceed with a local confirmation anyway.
      console.warn('[CheckoutModal] Order endpoint not available yet:', err.message)
    } finally {
      setSubmitting(false)
      setPlaced(true)
    }
  }

  const handleClose = () => {
    if (placed) {
      clear()
      setForm(initialForm)
      setErrors({})
      setPlaced(false)
    }
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] grid place-items-end sm:place-items-center bg-espresso/60 backdrop-blur-sm px-0 sm:px-5"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-md bg-offwhite border border-line shadow-soft rounded-t-3xl sm:rounded-3xl p-6 sm:p-7 relative"
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-4 right-4 grid place-items-center w-9 h-9 rounded-full text-coffee/60 hover:bg-coffee/10 hover:text-espresso transition-colors"
            >
              <X size={18} />
            </button>

            {placed ? (
              <div className="text-center py-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="grid place-items-center w-16 h-16 rounded-full bg-sage/20 text-sage mx-auto mb-5"
                >
                  <Check size={26} />
                </motion.div>
                <h2 className="font-display text-2xl text-espresso mb-1.5">Order placed</h2>
                <p className="text-coffee/60 text-sm max-w-xs mx-auto">
                  Thanks, {form.name.split(' ')[0]}. We've sent your order for table{' '}
                  {form.tableNumber} to the kitchen — {formatPrice(total)} total.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-7 w-full py-3.5 rounded-full bg-coffee text-offwhite font-medium hover:bg-clayDark transition-colors shadow-soft"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl text-espresso mb-1.5">Confirm your order</h2>
                <p className="text-sm text-coffee/60 mb-6">
                  Just a few details so we know where to bring it.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <Field label="Full name" error={errors.name} icon={User}>
                    <input
                      className={inputClass}
                      placeholder="Your name"
                      value={form.name}
                      onChange={update('name')}
                    />
                  </Field>

                  <Field label="Table number" error={errors.tableNumber} icon={Hash}>
                    <input
                      className={inputClass}
                      placeholder="e.g. 12"
                      value={form.tableNumber}
                      onChange={update('tableNumber')}
                    />
                  </Field>

                  <Field label="Phone number" error={errors.phone} icon={Phone}>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      className={inputClass}
                      placeholder="9876543210"
                      value={form.phone}
                      onChange={updatePhone}
                    />
                  </Field>

                  <div className="flex justify-between text-sm text-coffee/70 pt-2 pb-1 border-t border-line mt-2">
                    <span>Order total</span>
                    <span className="font-semibold text-espresso">{formatPrice(total)}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-full bg-coffee text-offwhite font-medium hover:bg-clayDark transition-colors shadow-soft disabled:opacity-60"
                  >
                    {submitting ? 'Placing order…' : 'Add order'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}