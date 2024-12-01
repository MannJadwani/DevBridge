// src/app/api/projects/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ProjectSchema } from "@/lib/schema"

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  
  try {
    const body = await req.json()
    const validation = ProjectSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const { name, description } = validation.data

    const project = await prisma.project.create({
      data: {
        name,
        description,
        userId: userId || '',
        status: 'draft',
        questionsGenerated: false
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("[PROJECTS_POST]", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  
  try {
    const projects = await prisma.project.findMany({
      where: { userId: userId || undefined },
      include: {
        _count: {
          select: {
            questions: true,
            requirements: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error("[PROJECTS_GET]", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

