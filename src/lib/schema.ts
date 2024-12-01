// src/lib/schemas.ts
import { z } from "zod"

export const ProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
})

export type ProjectFormValues = z.infer<typeof ProjectSchema>

export const RequirementSchema = z.object({
  title: z.string().min(1, "Requirement title is required"),
  description: z.string().min(1, "Requirement description is required"),
  type: z.enum(["functional", "non-functional", "technical"]),
  priority: z.enum(["high", "medium", "low"]),
  status: z.enum(["pending", "in-progress", "completed", "rejected"]).default("pending"),
})

export type RequirementFormValues = z.infer<typeof RequirementSchema>