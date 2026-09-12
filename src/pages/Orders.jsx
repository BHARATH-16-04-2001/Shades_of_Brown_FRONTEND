import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getOrders } from '../services/orderService'
import { formatDate, formatPrice } from '../utils/format'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'
import { useOrderSocket } from '../hooks/useOrderSocket'

const statusStyles = {
  Pending: 'bg-line text-coffee',
  Confirmed: 'bg-gold/25 text-clayDark',
  Preparing: 'bg-clay/20 text-clayDark',
  Ready: 'bg-sage/20 text-sage',
  Completed: 'bg-coffee/10 text-coffee',
  Cancelled: 'bg-red-100 text-red-600',
}

function OrderCard({ order, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
      className="rounded-2xl bg-offwhite border border-line shadow-card p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="font-display text-lg text-espresso">Order #{order.order_number}</p>
          <p className="text-xs text-coffee/50 mt-0.5">{formatDate(order.created_at)}</p>
        </div>
        <span
          className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${statusStyles[order.status] || 'bg-line text-coffee'}`}
        >
          {order.status}
        </span>
      </div>

      <ul className="text-sm text-coffee/70 space-y-1 mb-4">
        {order.items.map((it, i) => (
          <li key={i}>
            {it.quantity} × {it.food_name} <span className="float-right">{formatPrice(it.total_price)}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between pt-3 border-t border-line">
        <span className="font-semibold text-espresso">{formatPrice(order.total)}</span>
        <button className="text-sm font-medium text-coffee hover:text-clayDark transition-colors">
          View details
        </button>
      </div>
    </motion.article>
  )
}

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState('loading')
  const [orderToken] = useState(() => localStorage.getItem('orderToken'))



  useEffect(() => {
    let cancelled = false
    getOrders()
      .then((data) => {
        if (cancelled) return
        setOrders(data.orders || [])
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

    useOrderSocket(orderToken, (message) => {
    if (message.type !== 'order_status_update') return

    setOrders((prev) =>
      prev.map((o) =>
        o.id === message.order_id ? { ...o, status: message.status } : o
      )
    )
    setJustUpdatedId(message.order_id)
    window.setTimeout(() => setJustUpdatedId(null), 2000)
  })

  return (
    <section className="max-w-4xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <h1 className="font-display text-3xl text-espresso mb-8">Your orders</h1>

      {status === 'loading' && <LoadingSpinner label="Fetching your orders…" count={3} />}

      {status === 'error' && (
        <EmptyState title="Couldn't load orders" message="Please refresh and try again." />
      )}

      {status === 'ready' &&
        (orders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            message="Once you place an order, you'll be able to track it here."
          />
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {orders.map((order, i) => (
              <OrderCard key={order.id} order={order} index={i} />
            ))}
          </div>
        ))}
    </section>
  )
}
