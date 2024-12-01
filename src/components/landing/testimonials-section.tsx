// src/components/landing/testimonials-section.tsx
"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    quote: "DevBridge has transformed how we communicate with our development team. What used to take weeks of back-and-forth now happens seamlessly.",
    author: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    image: "/testimonial1.jpg"
  },
  {
    quote: "As a developer, having clear, structured requirements that I can query naturally has been a game-changer. It's like having a product manager on demand.",
    author: "Michael Chen",
    role: "Senior Developer",
    company: "InnovateLabs",
    image: "/testimonial2.jpg"
  },
  {
    quote: "The AI-powered questioning system helps us uncover edge cases and requirements we might have missed. It's like having an expert BA on the team.",
    author: "Emily Rodriguez",
    role: "Project Manager",
    company: "SoftSolutions",
    image: "/testimonial3.jpg"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Teams Worldwide
          </h2>
          <p className="text-slate-300">
            See how DevBridge is transforming project communication
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative p-6 bg-slate-900 rounded-lg space-y-4">
                <p className="text-slate-300 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 overflow-hidden">
                    <img 
                      src={`/api/placeholder/48/48`} 
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-slate-400">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}