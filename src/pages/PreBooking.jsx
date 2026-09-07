import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Check, Clock, Users } from 'lucide-react'

const initialForm = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: 2,
  table: 'no-preference',
  request: '',
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-coffee/80">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="text-xs text-clayDark mt-1 block">{error}</span>}
    </label>
  )
}

const inputClass =
  'w-full rounded-xl border border-line bg-offwhite px-4 py-3 text-[15px] text-espresso placeholder:text-coffee/40 outline-none focus:border-clay transition-colors'

export default function PreBooking() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your name'
    if (!/^[0-9+\s-]{7,15}$/.test(form.phone)) next.phone = 'Enter a valid phone number'
    if (!form.date) next.date = 'Choose a date'
    if (!form.time) next.time = 'Choose a time'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire up to services/bookingService.js once the Django booking
    // API is ready — createBooking(form)
    if (validate()) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <section className="max-w-lg mx-auto px-5 sm:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="grid place-items-center w-16 h-16 rounded-full bg-sage/20 text-sage mx-auto mb-5"
        >
          <Check size={26} />
        </motion.div>
        <h1 className="font-display text-2xl text-espresso mb-2">Table requested</h1>
        <p className="text-coffee/60">
          We've received your request for {form.guests} guest{form.guests > 1 ? 's' : ''} on{' '}
          {form.date} at {form.time}. We'll confirm shortly.
        </p>
        <button
          onClick={() => {
            setForm(initialForm)
            setSubmitted(false)
          }}
          className="mt-8 px-6 py-3 rounded-full bg-coffee text-offwhite font-medium hover:bg-clayDark transition-colors"
        >
          Book another table
        </button>
      </section>
    )
  }

  return (
    <section className="max-w-2xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <h1 className="font-display text-3xl text-espresso mb-2">Reserve a table</h1>
      <p className="text-coffee/60 mb-9">
        Tell us when you're coming and we'll have a table ready.
      </p>

      <form onSubmit={handleSubmit} noValidate className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" error={errors.name}>
          <input
            className={inputClass}
            placeholder="Your name"
            value={form.name}
            onChange={update('name')}
          />
        </Field>

        <Field label="Phone number" error={errors.phone}>
          <input
            className={inputClass}
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={update('phone')}
          />
        </Field>

        <Field label="Date" error={errors.date}>
          <div className="relative">
            <CalendarDays size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee/40" />
            <input
              type="date"
              className={`${inputClass} pl-10`}
              value={form.date}
              onChange={update('date')}
            />
          </div>
        </Field>

        <Field label="Time" error={errors.time}>
          <div className="relative">
            <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee/40" />
            <input
              type="time"
              className={`${inputClass} pl-10`}
              value={form.time}
              onChange={update('time')}
            />
          </div>
        </Field>

        <Field label="Guests">
          <div className="relative">
            <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee/40" />
            <input
              type="number"
              min={1}
              max={20}
              className={`${inputClass} pl-10`}
              value={form.guests}
              onChange={update('guests')}
            />
          </div>
        </Field>

        <Field label="Table preference">
          <select className={inputClass} value={form.table} onChange={update('table')}>
            <option value="no-preference">No preference</option>
            <option value="window">Window seat</option>
            <option value="outdoor">Outdoor</option>
            <option value="booth">Booth</option>
            <option value="bar">Bar counter</option>
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Special request (optional)">
            <textarea
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Allergies, occasion, seating notes…"
              value={form.request}
              onChange={update('request')}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-coffee text-offwhite font-medium hover:bg-clayDark transition-colors shadow-soft"
          >
            Request table
          </button>
        </div>
      </form>
    </section>
  )
}
