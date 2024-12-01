"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

interface Project {
  id: string
  name: string
  description: string
  createdAt: string
  status: string
}

export function ProjectList({ userId }: { userId: string }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects', {
          headers: {
            'Content-Type': 'application/json',
            'X-User-Id': userId // Pass clerk userId in header
          }
        })
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [userId])

  if (loading) { 
    return <div>Loading projects...</div>
  }

  if (projects.length === 0) {
    return (
      <Card className="col-span-full">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No projects found. Create your first project to get started.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {projects.map((project) => (
        <Link href={`/projects/${project.id}`} key={project.id}>
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{project.name}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
                </span>
              </CardTitle>
              <p className="text-muted-foreground">{project.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Status: {project.status}
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  )
}