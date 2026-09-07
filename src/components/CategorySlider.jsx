import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CategoryCard from './CategoryCard'

export default function CategorySlider({ categories, selected, onSelect }) {
  const trackRef = useRef(null)

  const scrollBy = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 240, behavior: 'smooth' })
  }

  return (
    <section id="categories" className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
      <div className="flex items-center justify-between mb-5">
        <p className="font-display text-2xl text-espresso">Explore categories</p>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll categories left"
            className="grid place-items-center w-9 h-9 rounded-full border border-line text-coffee hover:bg-coffee/10 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll categories right"
            className="grid place-items-center w-9 h-9 rounded-full border border-line text-coffee hover:bg-coffee/10 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-5 sm:gap-7 overflow-x-auto scrollbar-hide pb-1 scroll-smooth"
      >
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            active={selected === cat.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  )
}
