import React from 'react'
import { motion } from 'framer-motion'
import { Coffee, Heart, Leaf, Salad } from 'lucide-react'

const values = [
  { icon: Coffee, label: 'Freshly brewed', text: 'Beans roasted weekly, ground to order.' },
  { icon: Salad, label: 'Fresh ingredients', text: 'Local produce, sourced daily.' },
  { icon: Heart, label: 'Made with love', text: 'Every plate leaves the kitchen by hand.' },
  { icon: Leaf, label: 'Quality first', text: 'No shortcuts, ever, on what matters.' },
]

export default function About() {
  return (
    <section className="max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-10 items-center mb-20"
      >
        <div>
          <p className="font-display text-3xl text-espresso mb-4">Our story</p>
          <p className="text-coffee/70 leading-relaxed">
            Kindling started as a single espresso machine and a folding table
            on a quiet corner. What began as a way to share good coffee with
            neighbors grew, one regular at a time, into a full kitchen and a
            room people now call their own. We still keep the same rhythm we
            started with — early mornings, fresh dough, and a pot always on.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=700&q=80&auto=format&fit=crop"
          alt="Warm interior of a small coffeehouse"
          className="rounded-2xl shadow-card w-full h-72 object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-10 items-center mb-20"
      >
        <img
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&q=80&auto=format&fit=crop"
          alt="Coffee being poured with care"
          className="rounded-2xl shadow-card w-full h-72 object-cover order-2 md:order-1"
        />
        <div className="order-1 md:order-2">
          <p className="font-display text-3xl text-espresso mb-4">Our philosophy</p>
          <p className="text-coffee/70 leading-relaxed">
            Fresh ingredients, quality food, and warm service — in that order.
            We'd rather run out of a dish than serve it half right, and we'd
            rather remember your name than rush you out the door.
          </p>
        </div>
      </motion.div>

      <div>
        <p className="font-display text-3xl text-espresso mb-8 text-center">Why choose us</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map(({ icon: Icon, label, text }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl bg-offwhite border border-line p-5 text-center"
            >
              <span className="grid place-items-center w-11 h-11 rounded-full bg-coffee/10 text-coffee mx-auto mb-3">
                <Icon size={19} />
              </span>
              <p className="font-display text-[15px] text-espresso mb-1">{label}</p>
              <p className="text-xs text-coffee/55 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
