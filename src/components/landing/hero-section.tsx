import React from 'react'
import Link from 'next/link'
import { Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedBackground from './animated-background'
import CodeSnippet from './code-snippet'
import ScatteredIcons from './scattred-icons'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 mt-4">
      <AnimatedBackground />
      <ScatteredIcons />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Bridge the Gap Between Vision and Code
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Our AI-powered platform transforms your app ideas into comprehensive project specifications, 
              facilitating seamless communication between non-technical visionaries and developers.
            </p>
            <Button asChild>
              <Link href="/dashboard" className="bg-white text-gray-950 hover:text-white hover:bg-blue-100 ">
                Get Started
              </Link>
            </Button>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-blue-800 rounded-lg p-6 shadow-2xl">
              <div className="flex items-center mb-4">
                <Terminal className="text-blue-300 mr-2" />
                <h2 className="text-blue-300 text-lg font-semibold">AI-Generated Project Spec</h2>
              </div>
              <CodeSnippet />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

