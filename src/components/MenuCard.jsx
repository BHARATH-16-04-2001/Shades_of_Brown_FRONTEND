import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Plus } from 'lucide-react'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'

export default function MenuCard({ item, index = 0 }) {
  const { addItem } = useCart()
  const [justAdded, setJustAdded] = useState(false)

  const handleAdd = () => {
    addItem(item)
    setJustAdded(true)
    window.clearTimeout(handleAdd._t)
    handleAdd._t = window.setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl bg-offwhite border border-line shadow-card overflow-hidden flex flex-col"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {item.isVeg !== null && (
          <span
            className={`absolute top-3 left-3 w-4 h-4 rounded-[3px] border-2 grid place-items-center ${
              item.isVeg ? 'border-sage bg-offwhite' : 'border-clayDark bg-offwhite'
            }`}
            aria-label={item.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
            title={item.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-sage' : 'bg-clayDark'}`} />
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display text-[18px] text-espresso leading-snug">{item.name}</h3>
        <p className="text-sm text-coffee/60 mt-1 leading-relaxed line-clamp-2 flex-1">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="font-semibold text-espresso">{formatPrice(item.price)}</span>
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.92 }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
              justAdded ? 'bg-sage text-offwhite' : 'bg-coffee text-offwhite hover:bg-clayDark'
            }`}
          >
            {justAdded ? (
              <>
                <Check size={14} /> Added
              </>
            ) : (
              <>
                <Plus size={14} /> Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}
