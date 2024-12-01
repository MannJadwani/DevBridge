// src/components/landing/feature-card.tsx
import { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  delay?: number
}

export function FeatureCard({ title, description, icon: Icon, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000" />
      <div className="relative p-6 bg-slate-900 rounded-lg">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </div>
    </motion.div>
  )
}