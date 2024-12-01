'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  return (
    <>
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.5, 1.5, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          borderRadius: ["30%", "30%", "50%", "50%", "30%"],
        }}
        transition={{
          duration: 25,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </>
  )
}

