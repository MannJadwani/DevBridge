"use client"

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

const problems = [
  {
    before: "Misinterpreted requirements leading to costly revisions",
    after: "Crystal clear specifications that developers understand immediately",
    icon: "💰"
  },
  {
    before: "Technical language barrier between stakeholders",
    after: "Natural communication translated into technical documentation",
    icon: "🗣️"
  },
  {
    before: "Time wasted in back-and-forth clarifications",
    after: "Streamlined process with AI-guided questioning",
    icon: "⏱️"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function ProblemSection() {
  return (
    <>
      {/* Separator */}
      <div className="relative h-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_0px,#3b82f630,transparent)]" />
        <div className="absolute inset-x-0 -bottom-px h-24 bg-gradient-to-b from-transparent via-slate-950 to-slate-950" />
      </div>

      <section className="relative py-32 bg-slate-950 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_500px_500px_at_50%_-100px,#3b82f615,transparent)]" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #ffffff05 0, transparent 2px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="container relative mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">The </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Communication Gap
              </span>
              <span className="text-white"> in Software Development</span>
            </h2>
            <p className="text-xl text-slate-300">
              See how DevBridge transforms common challenges into smooth collaboration
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto relative"
          >
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-1/2 w-8 h-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 hidden md:block">
              <div className="h-full w-px bg-gradient-to-b from-red-500/30 to-emerald-500/30 mx-auto" />
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 rounded-full p-2"
              >
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </motion.div>
            </div>

            {/* Without DevBridge */}
            <div className="space-y-8">
              <motion.h3 
                variants={itemVariants}
                className="text-2xl font-semibold text-red-400 flex items-center gap-3 mb-8"
              >
                <AlertTriangle className="w-6 h-6" />
                Without DevBridge
              </motion.h3>
              {problems.map((problem, index) => (
                <motion.div
                  key={`before-${index}`}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/50 to-red-900/50 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500" />
                  <div className="relative p-6 bg-red-950/30 border border-red-900/50 rounded-lg backdrop-blur-sm">
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl">{problem.icon}</span>
                      <p className="text-lg text-slate-200">{problem.before}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* With DevBridge */}
            <div className="space-y-8">
              <motion.h3 
                variants={itemVariants}
                className="text-2xl font-semibold text-emerald-400 flex items-center gap-3 mb-8"
              >
                <CheckCircle2 className="w-6 h-6" />
                With DevBridge
              </motion.h3>
              {problems.map((problem, index) => (
                <motion.div
                  key={`after-${index}`}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 to-emerald-900/50 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500" />
                  <div className="relative p-6 bg-emerald-950/30 border border-emerald-900/50 rounded-lg backdrop-blur-sm">
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl">{problem.icon}</span>
                      <p className="text-lg text-slate-200">{problem.after}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default ProblemSection;