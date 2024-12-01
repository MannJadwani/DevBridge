import { Project } from "@prisma/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, ListTodo, Settings, Files } from "lucide-react"

interface ProjectSidebarProps {
  project: Project
}

export function ProjectSidebar({ project }: ProjectSidebarProps) {
  return (
    <div className="w-64 border-r p-4 space-y-4">
      <div className="flex items-center gap-2 px-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            <Home className="h-4 w-4" />
          </Button>
        </Link>
        <span className="font-semibold">Project Menu</span>
      </div>
      
      <nav className="space-y-1">
        <Link href={`/projects/${project.id}`}>
          <Button variant="ghost" className="w-full justify-start">
            <ListTodo className="mr-2 h-4 w-4" />
            Requirements
          </Button>
        </Link>
        <Link href={`/projects/${project.id}/docs`}>
          <Button variant="ghost" className="w-full justify-start">
            <Files className="mr-2 h-4 w-4" />
            Documentation
          </Button>
        </Link>
        <Link href={`/projects/${project.id}/settings`}>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </nav>
    </div>
  )
}
