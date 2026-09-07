import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MenuCard from './MenuCard'
import EmptyState from './EmptyState'

export default function MenuGrid({ items, selectedCategory }) {
  if (!items.length) {
    return (
      <EmptyState
        title="Nothing here yet"
        message="We couldn't find anything in this category. Try browsing another one."
      />
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
      >
        {items.map((item, i) => (
          <MenuCard key={item.id} item={item} index={i} />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
