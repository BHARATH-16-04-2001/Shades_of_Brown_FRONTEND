import React from 'react'
import { Link } from 'react-router-dom'
import { Coffee, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/#menu', label: 'Menu' },
  { to: '/cart', label: 'Cart' },
  { to: '/pre-booking', label: 'Pre-Booking' },
  { to: '/orders', label: 'Orders' },
  { to: '/about', label: 'About' },
]

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream/90 mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-clay text-espresso">
              <Coffee size={16} strokeWidth={2.2} />
            </span>
            <span className="font-display text-lg text-offwhite">Kindling</span>
          </div>
          <p className="text-sm text-cream/60 leading-relaxed max-w-[220px]">
            Fresh food. Great coffee. Made with love, one cup at a time.
          </p>
        </div>

        <div>
          <h3 className="font-display text-base text-offwhite mb-4">Quick links</h3>
          <ul className="space-y-2.5 text-sm text-cream/65">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-clay transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base text-offwhite mb-4">Contact</h3>
          <ul className="space-y-2.5 text-sm text-cream/65">
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-clay" />
              <span>Your Cafe Address</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={15} className="mt-0.5 shrink-0 text-clay" />
              <span>+91 XXXXX XXXXX</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={15} className="mt-0.5 shrink-0 text-clay" />
              <span>hello@kindling.cafe</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base text-offwhite mb-4">Follow us</h3>
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="grid place-items-center w-10 h-10 rounded-full bg-cream/10 hover:bg-clay hover:text-espresso transition-colors"
            >
              <Instagram size={17} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="grid place-items-center w-10 h-10 rounded-full bg-cream/10 hover:bg-clay hover:text-espresso transition-colors"
            >
              <Facebook size={17} />
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="grid place-items-center w-10 h-10 rounded-full bg-cream/10 hover:bg-clay hover:text-espresso transition-colors"
            >
              <MessageCircle size={17} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 px-5 sm:px-8 text-center text-xs text-cream/45">
        © 2026 Kindling Coffeehouse. All rights reserved.
      </div>
    </footer>
  )
}
