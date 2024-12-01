// src/components/landing/pricing-section.tsx
"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Starter",
    price: "49",
    description: "Perfect for small teams and simple projects",
    features: [
      "Up to 5 team members",
      "3 active projects",
      "Basic AI assistance",
      "Standard documentation",
      "Email support"
    ]
  },
  {
    name: "Professional",
    price: "99",
    description: "Ideal for growing teams with complex needs",
    features: [
      "Up to 15 team members",
      "10 active projects",
      "Advanced AI features",
      "Custom documentation templates",
      "Priority support",
      "API access",
      "Analytics dashboard"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with specific requirements",
    features: [
      "Unlimited team members",
      "Unlimited projects",
      "Custom AI training",
      "White-label documentation",
      "24/7 dedicated support",
      "Custom integrations",
      "Advanced security features",
      "SLA guarantee"
    ]
  }
]

export function PricingSection() {
  return (
    <section className="py-20 bg-slate-900" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-300">
            Choose the plan that best fits your team's needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative p-8 bg-slate-900 rounded-lg">
                {plan.popular && (
                  <div className="absolute top-0 right-8 transform -translate-y-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                      Most Popular
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {plan.name.replace(/"/g, "&quot;")}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-slate-400">/month</span>
                  )}
                </div>
                <p className="text-slate-300 mb-6">{plan.description.replace(/"/g, "&quot;")}</p>
                <Button className="w-full mb-6" variant={plan.popular ? "default" : "outline"}>
                  Get Started
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-5 h-5 text-emerald-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
