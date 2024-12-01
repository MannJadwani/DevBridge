"use client"

import { motion } from "framer-motion"
import { 
  Brain, 
  FileCode2, 
  MessageSquareCode, 
  GitBranch,
  Zap,
  Shield
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Understanding",
    description: "Natural language processing that understands your project needs and converts them to technical requirements."
  },
  {
    icon: FileCode2,
    title: "Smart Documentation",
    description: "Automatically generate comprehensive technical documentation in industry-standard formats."
  },
  {
    icon: MessageSquareCode,
    title: "Developer Queries",
    description: "Allow developers to query project requirements using natural language, powered by RAG."
  },
  {
    icon: GitBranch,
    title: "Version Control",
    description: "Track changes and maintain different versions of your project requirements."
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Instant updates and notifications when requirements change or need clarification."
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Enterprise-grade security to protect your sensitive project information."
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-950" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Everything you need to streamline communication between stakeholders and developers
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-slate-900 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}