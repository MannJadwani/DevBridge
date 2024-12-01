"use client"

import { motion } from "framer-motion"
import { Users, Code2, LineChart } from "lucide-react"

const benefits = {
  nonTechnical: [
    "Express ideas without technical jargon",
    "Get accurate cost and time estimates",
    "Track project progress clearly",
  ],
  developers: [
    "Receive clear, structured requirements",
    "Query specifications in natural language",
    "Reduce revision cycles",
  ],
  managers: [
    "Improve team communication",
    "Accelerate project timelines",
    "Reduce development costs",
  ],
}

export function BenefitsSection() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Benefits for Everyone
          </h2>
          <p className="text-slate-300">
            Streamlined communication that works for all team members
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-6 rounded-lg bg-gradient-to-b from-slate-800 to-slate-900"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              For Non-Technical Users
            </h3>
            <ul className="space-y-3">
              {benefits.nonTechnical.map((benefit, index) => (
                <li key={index} className="text-slate-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-lg bg-gradient-to-b from-slate-800 to-slate-900"
          >
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              For Developers
            </h3>
            <ul className="space-y-3">
              {benefits.developers.map((benefit, index) => (
                <li key={index} className="text-slate-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-lg bg-gradient-to-b from-slate-800 to-slate-900"
          >
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <LineChart className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              For Project Managers
            </h3>
            <ul className="space-y-3">
              {benefits.managers.map((benefit, index) => (
                <li key={index} className="text-slate-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}