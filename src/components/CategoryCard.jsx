import React from 'react'
import { motion } from 'framer-motion'
import { LayoutGrid } from 'lucide-react'

export default function CategoryCard({ category, active, onSelect }) {
  return (
    <button
      onClick={() => onSelect(category.name)}
      aria-pressed={active}
      className="shrink-0 flex flex-col items-center gap-2 group focus-visible:outline-none"
    >
      <motion.span
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 350, damping: 15 }}
        className={`relative grid place-items-center w-[68px] h-[68px] sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 transition-colors ${
          active ? 'border-clay' : 'border-line group-hover:border-clay/50'
        }`}
      >
        {category.image ? (
          <img src={category.image} alt="" className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <span className={`grid place-items-center w-full h-full ${active ? 'bg-coffee text-offwhite' : 'bg-coffee/10 text-coffee'}`}>
            <LayoutGrid size={22} />
          </span>
        )}
        {active && (
          <motion.span
            layoutId="category-ring"
            className="absolute inset-0 rounded-full ring-2 ring-clay ring-offset-2 ring-offset-cream"
          />
        )}
      </motion.span>
      <span className={`text-[13px] font-medium transition-colors ${active ? 'text-espresso' : 'text-coffee/60'}`}>
        {category.name}
      </span>
    </button>
  )
}
