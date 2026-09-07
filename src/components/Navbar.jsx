// import React, { useEffect, useState } from 'react'
// import { NavLink } from 'react-router-dom'
// import { AnimatePresence, motion } from 'framer-motion'
// import { Coffee, Menu, ShoppingBag, X } from 'lucide-react'
// import { useCart } from '../context/CartContext'

// const links = [
//   { to: '/', label: 'Home' },
//   { to: '/pre-booking', label: 'Book a table' },
//   { to: '/orders', label: 'Orders' },
//   { to: '/about', label: 'About' },
// ]

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false)
//   const [open, setOpen] = useState(false)
//   const { totalQuantity } = useCart()

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 12)
//     onScroll()
//     window.addEventListener('scroll', onScroll)
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [])

//   useEffect(() => {
//     setOpen(false)
//   }, [])

//   return (
//     <header
//       className={`sticky top-0 z-50 transition-all duration-300 ${
//         scrolled
//           ? 'bg-offwhite/90 backdrop-blur-md shadow-card border-b border-line'
//           : 'bg-cream/70 backdrop-blur-sm border-b border-transparent'
//       }`}
//     >
//       <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 h-[72px]">
//         <NavLink to="/" className="flex items-center gap-2.5 group" aria-label="Kindling home">
//           <motion.span
//             whileHover={{ rotate: -12, scale: 1.08 }}
//             transition={{ type: 'spring', stiffness: 300, damping: 12 }}
//             className="grid place-items-center w-10 h-10 rounded-full bg-coffee text-offwhite"
//           >
//             <Coffee size={18} strokeWidth={2.2} />
//           </motion.span>
//           <span className="font-display text-xl text-espresso tracking-tight">Kindling</span>
//         </NavLink>

//         <ul className="hidden md:flex items-center gap-8">
//           {links.map((link) => (
//             <li key={link.to}>
//               <NavLink
//                 to={link.to}
//                 className={({ isActive }) =>
//                   `relative font-medium text-[15px] py-1 transition-colors ${
//                     isActive ? 'text-espresso' : 'text-coffee/70 hover:text-espresso'
//                   }`
//                 }
//               >
//                 {({ isActive }) => (
//                   <>
//                     {link.label}
//                     {isActive && (
//                       <motion.span
//                         layoutId="nav-underline"
//                         className="absolute -bottom-1 left-0 right-0 h-[2px] bg-clay rounded-full"
//                       />
//                     )}
//                   </>
//                 )}
//               </NavLink>
//             </li>
//           ))}
//         </ul>

//         <div className="flex items-center gap-2">
//           <NavLink
//             to="/cart"
//             aria-label="View cart"
//             className={({ isActive }) =>
//               `relative grid place-items-center w-11 h-11 rounded-full transition-colors ${
//                 isActive ? 'bg-coffee text-offwhite' : 'bg-coffee/10 text-coffee hover:bg-coffee/20'
//               }`
//             }
//           >
//             <ShoppingBag size={19} />
//             <AnimatePresence>
//               {totalQuantity > 0 && (
//                 <motion.span
//                   key={totalQuantity}
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   exit={{ scale: 0 }}
//                   transition={{ type: 'spring', stiffness: 500, damping: 15 }}
//                   className="absolute -top-1 -right-1 min-w-[19px] h-[19px] px-1 rounded-full bg-clay text-offwhite text-[11px] font-semibold grid place-items-center"
//                 >
//                   {totalQuantity}
//                 </motion.span>
//               )}
//             </AnimatePresence>
//           </NavLink>

//           <button
//             onClick={() => setOpen((v) => !v)}
//             aria-label={open ? 'Close menu' : 'Open menu'}
//             aria-expanded={open}
//             className="md:hidden grid place-items-center w-11 h-11 rounded-full text-coffee hover:bg-coffee/10 transition-colors"
//           >
//             {open ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>
//       </nav>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.28, ease: 'easeInOut' }}
//             className="md:hidden overflow-hidden bg-offwhite border-b border-line"
//           >
//             <ul className="px-5 py-3 flex flex-col">
//               {links.map((link) => (
//                 <li key={link.to}>
//                   <NavLink
//                     to={link.to}
//                     onClick={() => setOpen(false)}
//                     className={({ isActive }) =>
//                       `block py-3 text-[15px] font-medium border-b border-line/70 last:border-none ${
//                         isActive ? 'text-espresso' : 'text-coffee/70'
//                       }`
//                     }
//                   >
//                     {link.label}
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   )
// }


import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import logoMark from '../assets/logo-mark.png'

const links = [
  { to: '/', label: 'Home' },
  { to: '/pre-booking', label: 'Book a table' },
  { to: '/orders', label: 'Orders' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { totalQuantity } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gradient-to-r from-offwhite via-cream to-offwhite backdrop-blur-md shadow-card border-b border-line'
          : 'bg-gradient-to-r from-cream via-[#F8EEDC] to-cream backdrop-blur-sm border-b border-transparent'
      }`}
    >
      {/* thin copper accent rule, echoes the logo's bronze relief */}
      <div className="h-[3px] w-full bg-gradient-to-r from-gold via-clay to-coffee opacity-80" />

      <nav className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-5 sm:px-8 h-[76px]">
        <NavLink to="/" className="flex items-center gap-3 group shrink-0" aria-label="Shades of Brown home">
          <motion.span
            whileHover={{ rotate: -8, scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 300, damping: 12 }}
            className="relative grid place-items-center w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full overflow-hidden bg-cream ring-1 ring-clay/30 shadow-card shrink-0"
          >
            <img
              src={logoMark}
              alt=""
              className="w-full h-full object-cover scale-[1.12]"
            />
          </motion.span>

          <span className="flex flex-col leading-none">
            <span className="font-display text-lg sm:text-xl text-espresso tracking-tight whitespace-nowrap">
              Shades of Brown
            </span>
            <span className="hidden sm:block text-[10.5px] tracking-[0.16em] text-coffee/55 uppercase mt-1">
              Coffee &amp; Conversations
            </span>
          </span>
        </NavLink>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `relative font-medium text-[15px] py-1 transition-colors ${
                    isActive ? 'text-espresso' : 'text-coffee/70 hover:text-espresso'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-clay rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 shrink-0">
          <NavLink
            to="/cart"
            aria-label="View cart"
            className={({ isActive }) =>
              `relative grid place-items-center w-11 h-11 rounded-full transition-colors ${
                isActive ? 'bg-coffee text-offwhite' : 'bg-coffee/10 text-coffee hover:bg-coffee/20'
              }`
            }
          >
            <ShoppingBag size={19} />
            <AnimatePresence>
              {totalQuantity > 0 && (
                <motion.span
                  key={totalQuantity}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  className="absolute -top-1 -right-1 min-w-[19px] h-[19px] px-1 rounded-full bg-clay text-offwhite text-[11px] font-semibold grid place-items-center"
                >
                  {totalQuantity}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="md:hidden grid place-items-center w-11 h-11 rounded-full text-coffee hover:bg-coffee/10 transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-gradient-to-b from-offwhite to-cream border-b border-line"
          >
            <ul className="px-5 py-3 flex flex-col">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 text-[15px] font-medium border-b border-line/70 last:border-none ${
                        isActive ? 'text-espresso' : 'text-coffee/70'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}


