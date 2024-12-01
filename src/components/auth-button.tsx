'use client'

import React from 'react'
import { SignInButton, SignUpButton,SignedIn,SignedOut,UserButton } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'

export default function AuthButtons() {
    if (typeof window !== 'undefined')
  return (
    <>
      <SignedIn>
      <UserButton/>
</SignedIn>
      <SignedOut>
      <SignInButton mode="modal">
        <Button 
          variant="ghost" 
          className="text-blue-100 hover:text-white hover:bg-blue-800/50 transition-all duration-200"
        >
          Sign In
        </Button>
      </SignInButton>
      
      <SignUpButton mode="modal">
        <Button 
          className="bg-gradient-to-r from-blue-500 via-cyan-500 to-white hover:from-blue-600 hover:via-cyan-600 hover:to-blue-100 text-blue-900 font-semibold shadow-md hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          Get Started
        </Button>
      </SignUpButton>
      </SignedOut>
    </>
  )
}

