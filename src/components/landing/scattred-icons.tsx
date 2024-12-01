'use client'

import React, { useEffect, useRef } from 'react'
import { Code, Database, Server, Cpu, Cloud, Globe } from 'lucide-react'

const icons = [
  { Icon: Code, initialPosition: { x: 10, y: 20 } },
  { Icon: Database, initialPosition: { x: 80, y: 15 } },
  { Icon: Server, initialPosition: { x: 25, y: 70 } },
  { Icon: Cpu, initialPosition: { x: 70, y: 60 } },
  { Icon: Cloud, initialPosition: { x: 40, y: 30 } },
  { Icon: Globe, initialPosition: { x: 60, y: 80 } }
]

export default function ScatteredIcons() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (clientX - left) / width
      const y = (clientY - top) / height

      container.querySelectorAll('.icon').forEach((icon: Element) => {
        const iconElement = icon as HTMLElement
        const speed = parseFloat(iconElement.dataset.speed || '0.05')
        const initialX = parseFloat(iconElement.dataset.initialX || '0')
        const initialY = parseFloat(iconElement.dataset.initialY || '0')

        const moveX = (x - 0.5) * speed * 100
        const moveY = (y - 0.5) * speed * 100

        iconElement.style.transform = `translate(${initialX + moveX}%, ${initialY + moveY}%)`
      })
    }

    container.addEventListener('mousemove', handleMouseMove)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map(({ Icon, initialPosition }, index) => (
        <div
          key={index}
          className="icon absolute transition-all duration-300 ease-out hover:scale-125 hover:filter hover:drop-shadow-glow"
          style={{
            left: `${initialPosition.x}%`,
            top: `${initialPosition.y}%`,
            transform: `translate(0%, 0%)`,
          }}
          data-speed={0.05 + Math.random() * 0.1}
          data-initial-x="0"
          data-initial-y="0"
        >
          <Icon className="w-8 h-8 text-blue-200 opacity-50" />
        </div>
      ))}
    </div>
  )
}

