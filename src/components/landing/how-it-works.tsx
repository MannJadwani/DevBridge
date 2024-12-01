"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  FileText, 
  Database, 
  Search,
  AlertTriangle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// How It Works Section
export function HowItWorksSection() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Describe Your Project",
      description: "Start by explaining your project in plain language. No technical jargon required."
    },
    {
      icon: FileText,
      title: "AI-Powered Questions",
      description: "Our AI asks targeted questions to understand your needs and requirements."
    },
    {
      icon: Database,
      title: "Generate Documentation",
      description: "Automatically create detailed technical documentation from your responses."
    },
    {
      icon: Search,
      title: "Smart Queries",
      description: "Developers can query the documentation using natural language."
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            A simple four-step process to transform your ideas into clear technical specifications
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-blue-800/50 backdrop-blur-sm rounded-lg p-6 border border-blue-700/50 hover:border-blue-600/50 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-700/50 rounded-lg flex items-center justify-center mb-4">
                  {<step.icon className="w-6 h-6 text-blue-200" />}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-blue-100">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}