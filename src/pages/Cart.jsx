import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import EmptyState from '../components/EmptyState'
import CheckoutModal from '../components/CheckoutModal'

function CartRow({ item }) {
  const { increase, decrease, remove } = useCart()

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-4 py-5 border-b border-line last:border-none"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 rounded-xl object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="font-display text-[17px] text-espresso truncate">{item.name}</p>
        <p className="text-sm text-coffee/60 mt-0.5">{formatPrice(item.price)}</p>

        <div className="flex items-center gap-3 mt-2.5">
          <div className="flex items-center gap-3 bg-coffee/10 rounded-full px-2.5 py-1.5">
            <button
              onClick={() => decrease(item.id)}
              aria-label={`Decrease ${item.name} quantity`}
              className="grid place-items-center w-6 h-6 rounded-full hover:bg-coffee/15 text-coffee transition-colors"
            >
              <Minus size={13} />
            </button>
            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
            <button
              onClick={() => increase(item.id)}
              aria-label={`Increase ${item.name} quantity`}
              className="grid place-items-center w-6 h-6 rounded-full hover:bg-coffee/15 text-coffee transition-colors"
            >
              <Plus size={13} />
            </button>
          </div>

          <button
            onClick={() => remove(item.id)}
            className="inline-flex items-center gap-1 text-xs text-coffee/50 hover:text-clayDark transition-colors"
          >
            <Trash2 size={13} />
            Remove
          </button>
        </div>
      </div>

      <span className="font-semibold text-espresso shrink-0">
        {formatPrice(item.price * item.quantity)}
      </span>
    </motion.li>
  )
}

export default function Cart() {
  const { items, subtotal, cgst, sgst, totalGst, total } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <section className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <h1 className="font-display text-3xl text-espresso mb-8">Your cart</h1>

      {items.length === 0 ? (
        <EmptyState
          title="Your cart is empty ☕"
          message="Add something delicious from our menu to get started."
          action={
            <Link
              to="/#menu"
              className="inline-flex px-6 py-3 rounded-full bg-coffee text-offwhite font-medium hover:bg-clayDark transition-colors"
            >
              Explore menu
            </Link>
          }
        />
      ) : (
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          <ul>
            <AnimatePresence>
              {items.map((item) => (
                <CartRow key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </ul>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-fit rounded-2xl bg-offwhite border border-line shadow-card p-6 sticky top-24"
          >
            <p className="font-display text-lg text-espresso mb-4">Order summary</p>
            <div className="space-y-2.5 text-sm text-coffee/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>CGST</span>
                <span>{formatPrice(cgst)}</span>
              </div>
              <div className="flex justify-between">
                <span>SGST</span>
                <span>{formatPrice(sgst)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total GST</span>
                <span>{formatPrice(totalGst)}</span>
              </div>
            </div>
            <div className="flex justify-between font-semibold text-espresso mt-4 pt-4 border-t border-line">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button
              onClick={() => setCheckoutOpen(true)}
              className="w-full mt-6 py-3.5 rounded-full bg-coffee text-offwhite font-medium hover:bg-clayDark transition-colors shadow-soft"
            >
              Proceed
            </button>
          </motion.aside>
        </div>
      )}

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </section>
  )
}