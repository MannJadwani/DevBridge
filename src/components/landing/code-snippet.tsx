'use client'

import React from 'react'
import { motion } from 'framer-motion'

const codeSnippet = `
// AI-Generated Project Spec
{
  "projectName": "E-commerce Platform",
  "description": "A modern online store with...",
  "features": [
    "User authentication",
    "Product catalog",
    "Shopping cart",
    "Payment integration"
  ],
  "techStack": {
    "frontend": "React",
    "backend": "Node.js",
    "database": "MongoDB"
  }
}
`

export default function CodeSnippet() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <pre className="text-blue-100 text-sm overflow-x-auto">
        <code>{codeSnippet}</code>
      </pre>
    </motion.div>
  )
}

