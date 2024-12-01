"use client"

import { useAuth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NewProjectDialog } from '@/components/new-project-dialog'
import { ProjectList } from '@/components/project-list'
import { LayoutGrid } from 'lucide-react'

export default function DashboardPage() {
  const { userId } = useAuth()
  
  // if (!userId) {
  //   redirect('/sign-in')
  // }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto py-10 px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <LayoutGrid className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Projects
              </h1>
            </div>
            <p className="text-slate-600 text-lg">
              Manage your software requirements documentation
            </p>
          </div>
          <NewProjectDialog userId={userId || ''} />
        </div>

        {/* Projects Grid */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/50 backdrop-blur-xl rounded-2xl shadow-xl -z-10" />
          <div className="relative p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ProjectList userId={userId || ''} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}