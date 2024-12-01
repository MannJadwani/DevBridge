'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = ['Features', 'How it Works', 'Pricing', 'Contact']

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex space-x-8">
      {navItems.map((item) => {
        const href = `#${item.toLowerCase().replace(/\s+/g, '-')}`
        const isActive = pathname === href

        return (
          <Link
            key={item}
            href={href}
            className={cn(
              "relative text-blue-100 hover:text-white transition-colors duration-200 group",
              isActive && "text-white"
            )}
          >
            {item}
            <span className={cn(
              "absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-white group-hover:w-full transition-all duration-300",
              isActive && "w-full"
            )}/>
          </Link>
        )
      })}
    </div>
  )
}

