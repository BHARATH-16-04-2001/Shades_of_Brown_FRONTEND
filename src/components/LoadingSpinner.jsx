import React from 'react'

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-offwhite border border-line overflow-hidden">
      <div className="h-44 bg-line/70 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-2/3 rounded bg-line/70 animate-pulse" />
        <div className="h-3 w-full rounded bg-line/50 animate-pulse" />
        <div className="h-3 w-4/5 rounded bg-line/50 animate-pulse" />
        <div className="flex items-center justify-between pt-1">
          <div className="h-4 w-12 rounded bg-line/70 animate-pulse" />
          <div className="h-8 w-20 rounded-full bg-line/70 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default function LoadingSpinner({ label = "Loading today's delicious menu…", count = 8 }) {
  return (
    <div>
      <p className="text-center text-sm text-coffee/60 mb-6">{label}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}
