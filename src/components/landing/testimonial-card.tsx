// src/components/landing/testimonial-card.tsx
import { motion } from "framer-motion"
import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
  image: string
  delay?: number
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  image,
  delay = 0
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000" />
      <div className="relative p-6 bg-slate-900 rounded-lg space-y-4">
        <p className="text-slate-300 italic">"{quote.replace(/"/g, '&quot;')}"</p>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-800 overflow-hidden">
            <Image 
              src={`/api/placeholder/48/48`} 
              alt={author.replace(/"/g, '&quot;')}
              className="w-full h-full object-cover"
              width={48}
              height={48}
            />
          </div>
          <div>
            <div className="font-semibold text-white">{author}</div>
            <div className="text-sm text-slate-400">
              {role} at {company}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}