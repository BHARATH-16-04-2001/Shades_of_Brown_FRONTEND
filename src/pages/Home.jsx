import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import PromoBanner from '../components/PromoBanner'
import CategorySlider from '../components/CategorySlider'
import MenuGrid from '../components/MenuGrid'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'
import { getCategories, getMenuItems } from '../services/menuService'

// function Hero() {
//   return (
//     <section className="relative overflow-hidden">
//       <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-20 sm:pt-20 sm:pb-28 grid md:grid-cols-2 gap-12 items-center">
//         <div>
//           <motion.h1
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.55, ease: 'easeOut' }}
//             className="font-display text-[42px] leading-[1.08] sm:text-6xl sm:leading-[1.05] text-espresso text-balance"
//           >
//             Freshly brewed.
//             <br />
//             <span className="italic text-clayDark">Made with love.</span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
//             className="mt-5 text-coffee/70 text-[17px] leading-relaxed max-w-md"
//           >
//             A neighborhood coffeehouse serving food and drinks prepared fresh
//             for you, every single morning.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.32 }}
//           >
//             <a
//               href="#menu"
//               className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-full bg-coffee text-offwhite font-medium hover:bg-clayDark transition-colors shadow-soft"
//             >
//               Explore menu
//               <ArrowRight size={16} />
//             </a>
//           </motion.div>
//         </div>

//         <div className="relative h-[340px] sm:h-[420px]">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
//             className="absolute inset-0 flex items-center justify-center"
//           >
//             <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] animate-floaty">
//               <div className="absolute inset-0 rounded-blob bg-clay/25 blur-sm" />
//               <img
//                 src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=80&auto=format&fit=crop"
//                 alt="Freshly poured cappuccino with latte art"
//                 className="relative w-full h-full object-cover rounded-blob shadow-soft"
//               />
//               <span className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-2">
//                 <span className="w-1.5 h-6 rounded-full bg-espresso/10 animate-steam" style={{ animationDelay: '0s' }} />
//                 <span className="w-1.5 h-7 rounded-full bg-espresso/10 animate-steam" style={{ animationDelay: '0.4s' }} />
//                 <span className="w-1.5 h-5 rounded-full bg-espresso/10 animate-steam" style={{ animationDelay: '0.8s' }} />
//               </span>
//             </div>
//           </motion.div>

//           <motion.span
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.6 }}
//             className="absolute top-3 right-2 sm:right-6 w-16 h-16 rounded-full bg-sage/20 animate-floaty"
//             style={{ animationDelay: '0.6s' }}
//           />
//           <motion.span
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.75 }}
//             className="absolute bottom-6 left-0 w-10 h-10 rounded-full bg-gold/25 animate-floaty"
//             style={{ animationDelay: '1.1s' }}
//           />
//         </div>
//       </div>
//     </section>
//   )
// }

import heroImage from "../assets/hero_sec.jpeg";


function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-20 sm:pt-20 sm:pb-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="font-display text-[42px] leading-[1.08] sm:text-6xl sm:leading-[1.05] text-espresso text-balance"
          >
            Freshly brewed.
            <br />
            <span className="italic text-clayDark">
              Made with love.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.15,
              ease: "easeOut",
            }}
            className="mt-5 text-coffee/70 text-[17px] leading-relaxed max-w-md"
          >
            A neighborhood coffeehouse serving food and drinks prepared fresh
            for you, every single morning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
          >
            <a
              href="#menu"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-full bg-coffee text-offwhite font-medium hover:bg-clayDark transition-colors shadow-soft"
            >
              Explore menu
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>

        <div className="relative h-[340px] sm:h-[420px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] animate-floaty">
              <div className="absolute inset-0 rounded-blob bg-clay/25 blur-sm" />

              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=80&auto=format&fit=crop"
                alt="Freshly poured cappuccino with latte art"
                className="relative w-full h-full object-cover rounded-blob shadow-soft"
              />

              <span className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-2">
                <span
                  className="w-1.5 h-6 rounded-full bg-espresso/10 animate-steam"
                  style={{ animationDelay: "0s" }}
                />
                <span
                  className="w-1.5 h-7 rounded-full bg-espresso/10 animate-steam"
                  style={{ animationDelay: "0.4s" }}
                />
                <span
                  className="w-1.5 h-5 rounded-full bg-espresso/10 animate-steam"
                  style={{ animationDelay: "0.8s" }}
                />
              </span>
            </div>
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute top-3 right-2 sm:right-6 w-16 h-16 rounded-full bg-sage/20 animate-floaty"
            style={{ animationDelay: "0.6s" }}
          />

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="absolute bottom-6 left-0 w-10 h-10 rounded-full bg-gold/25 animate-floaty"
            style={{ animationDelay: "1.1s" }}
          />
        </div>
      </div>
    </section>
  );
}

// 10153162826
// IDFC0080432

export default function Home() {
  const [categories, setCategories] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    let cancelled = false
    async function load() {
      setStatus('loading')
      try {
        const [cats, items] = await Promise.all([getCategories(), getMenuItems()])
        if (cancelled) return
        setCategories(cats)
        setMenuItems(items)
        setStatus('ready')
      } catch (err) {
        if (cancelled) return
        console.error(err)
        setStatus('error')
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return menuItems
    return menuItems.filter((item) => item.category === selectedCategory)
  }, [menuItems, selectedCategory])

  return (
    <>
      <Hero />
      <PromoBanner />
      <CategorySlider
        categories={categories.length ? categories : [{ id: 'all', name: 'All', image: null }]}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <section id="menu" className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12 scroll-mt-24">
        <p className="font-display text-2xl sm:text-3xl text-espresso mb-7">Our menu</p>

        {status === 'loading' && <LoadingSpinner />}

        {status === 'error' && (
          <EmptyState
            title="Couldn't load the menu"
            message="Something went wrong reaching the kitchen. Please refresh and try again."
          />
        )}

        {status === 'ready' && (
          <MenuGrid items={filteredItems} selectedCategory={selectedCategory} />
        )}
      </section>
    </>
  )
}
