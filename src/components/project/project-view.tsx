"use client"

import { Project, Requirement } from "@prisma/client"
import { ProjectHeader } from "@/components/project/project-header"
import { RequirementsList } from "@/components/project/requirements-list"
import { ProjectSidebar } from "@/components/project/project-sidebar"

interface ProjectWithRequirements extends Project {
  requirements: Requirement[]
}

export function ProjectView({ project }: { project: ProjectWithRequirements }) {
  return (
    <div className="h-screen flex dark:bg-gray-950">
      <ProjectSidebar project={project} />
      <div className="flex-1 overflow-auto">
        <ProjectHeader project={project} />
        <main className="container mx-auto py-6">
          <RequirementsList 
            projectId={project.id} 
            requirements={project.requirements} 
          />
        </main>
      </div>
    </div>
  )
}