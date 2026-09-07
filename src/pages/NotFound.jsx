import React from 'react'
import { Link } from 'react-router-dom'
import { Coffee } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="max-w-lg mx-auto px-5 sm:px-8 py-28 text-center">
      <span className="grid place-items-center w-16 h-16 rounded-full bg-coffee/10 text-coffee mx-auto mb-5">
        <Coffee size={26} />
      </span>
      <h1 className="font-display text-3xl text-espresso mb-2">Oops! Page not found.</h1>
      <p className="text-coffee/60 mb-8">
        This table isn't set. Let's get you back to something delicious.
      </p>
      <Link
        to="/"
        className="inline-flex px-6 py-3 rounded-full bg-coffee text-offwhite font-medium hover:bg-clayDark transition-colors"
      >
        Back home
      </Link>
    </section>
  )
}
