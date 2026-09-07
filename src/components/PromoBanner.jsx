import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { mockPromos } from '../utils/mockData'

function PromoCard({ promo }) {
  return (
    <div className="shrink-0 w-[300px] sm:w-[340px] rounded-2xl bg-offwhite border border-line shadow-card overflow-hidden flex">
      <img
        src={promo.image}
        alt=""
        loading="lazy"
        className="w-28 sm:w-32 h-full object-cover"
      />
      <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
        <div>
          <p className="font-display text-[17px] text-espresso leading-snug truncate">{promo.title}</p>
          <p className="text-sm text-coffee/60 mt-0.5">{promo.subtitle}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          {promo.price ? (
            <span className="font-semibold text-clayDark">{promo.price}</span>
          ) : (
            <span />
          )}
          <button className="inline-flex items-center gap-1 text-sm font-medium text-coffee hover:text-clayDark transition-colors">
            View offer
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PromoBanner() {
  const track = [...mockPromos, ...mockPromos]

  return (
    <section aria-label="Current offers" className="py-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-5">
        <p className="font-display text-2xl text-espresso">Today's offers</p>
      </div>

      <div className="group [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <div className="flex gap-4 w-max animate-marquee group-hover:[animation-play-state:paused] px-5 sm:px-8">
          {track.map((promo, i) => (
            <PromoCard key={`${promo.id}-${i}`} promo={promo} />
          ))}
        </div>
      </div>
    </section>
  )
}
