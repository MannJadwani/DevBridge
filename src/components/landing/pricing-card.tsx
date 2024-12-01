// src/components/landing/pricing-card.tsx
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface PricingCardProps {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  delay?: number
}

export function PricingCard({
  name,
  price,
  description,
  features,
  popular = false,
  delay = 0
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000" />
      <div className="relative p-8 bg-slate-900 rounded-lg">
        {popular && (
          <div className="absolute top-0 right-8 transform -translate-y-1/2">
            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm">
              Most Popular
            </div>
          </div>
        )}
        <h3 className="text-xl font-semibold text-white mb-2">
          {name}
        </h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-white">${price}</span>
          {price !== "Custom" && <span className="text-slate-400">/month</span>}
        </div>
        <p className="text-slate-300 mb-6">{description}</p>
        <Button className="w-full mb-6" variant={popular ? "default" : "outline"}>
          Get Started
        </Button>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-slate-300">
              <Check className="w-5 h-5 text-emerald-400" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
