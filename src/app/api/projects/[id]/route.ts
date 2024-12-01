// src/app/api/projects/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: any 
) {
  const userId = req.headers.get('x-user-id')
  
  const { id } = await params;

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: id,
        userId: userId ?? undefined,
      },
      include: {
        questions: {
          orderBy: { createdAt: 'asc' }
        },
        requirements: true
      }
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("[PROJECT_GET]", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}