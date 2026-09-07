import React from 'react'
import { Coffee } from 'lucide-react'

export default function EmptyState({ title, message, action }) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-6">
      <span className="grid place-items-center w-14 h-14 rounded-full bg-coffee/10 text-coffee mb-4">
        <Coffee size={22} />
      </span>
      <h3 className="font-display text-xl text-espresso mb-1.5">{title}</h3>
      <p className="text-sm text-coffee/60 max-w-xs">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
