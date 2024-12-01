"use client"

import { useState } from "react"
import { Requirement } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { NewRequirementDialog } from "./new-requirement-dialog"

interface RequirementsListProps {
  projectId: string
  requirements: Requirement[]
}
type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | null | undefined;

export function RequirementsList({ projectId, requirements }: RequirementsListProps) {
  const [showNewDialog, setShowNewDialog] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Requirements</h2>
          <p className="text-sm text-muted-foreground">
            Manage your project requirements and specifications
          </p>
        </div>
        <Button onClick={() => setShowNewDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Requirement
        </Button>
      </div>

      <div className="grid gap-4">
        {requirements.map((req) => (
          <Card key={req.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{req.title}</CardTitle>
                  <CardDescription>{req.description}</CardDescription>
                </div>
                <Badge variant={getStatusVariant(req.status)}>
                  {req.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Badge variant="outline">{req.type}</Badge>
                <Badge variant="outline">{req.priority}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <NewRequirementDialog
        projectId={projectId}
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
      />
    </div>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case "completed":
      return "default";
    case "in-progress":
      return "secondary";
    case "pending":
      return "outline";
    default:
      return "destructive";
  }
}
