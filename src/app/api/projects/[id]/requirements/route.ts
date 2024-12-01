import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(
  req: NextRequest,
  { params }:  any
) {
  const { id } = await params;

  const userId = req.headers.get('x-user-id')
  console.log({
    where: {
      id: id,
      userId: userId ?? undefined,
    },
    include: {
      questions: {
        where: {
          status: 'answered'
        }
      }
    }})
  
  const project = await prisma.project.findUnique({
    where: {
      id: id,
    },
    include: {
      questions: {
        where: {
          status: 'answered'
        }
      }
    }
  })

  try {
    
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a senior software requirements analyst. Create structured software requirements based on project information and answers.
      
            Generate requirements in these categories:
            - Functional Requirements
            - Technical Requirements
            - Non-Functional Requirements
      
            Format each requirement as:
            - title: concise requirement title
            - description: detailed requirement description
            - type: "functional", "technical", or "non-functional"
            - priority: "high", "medium", or "low"
      
            Please ensure the output is in JSON format.`
          },
          {
            role: "user",
            content: `
            Project: ${project.name}
            Description: ${project.description}
      
            Questions and Answers:
            ${project.questions.map(q => `
            Question (${q.category}): ${q.text}
            Answer: ${q.answer}
            `).join('\n')}
      
            Generate comprehensive software requirements based on this information in JSON format.`
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      });
      

    const response = JSON.parse(completion.choices[0].message.content || '{}')
    const requirements = response.requirements || []

    // Create requirements in database
    await prisma.requirement.createMany({
      data: requirements.map((req: any) => ({
        title: req.title,
        description: req.description,
        type: req.type,
        priority: req.priority.toLowerCase(),
        status: 'pending',
        projectId: id
      }))
    })

    // Update project status
    await prisma.project.update({
      where: { id: id },
      data: { status: 'completed' }
    })

    return NextResponse.json({
      success: true,
      requirementCount: requirements.length
    })
  } catch (error) {
    console.error("[GENERATE_REQUIREMENTS_POST]", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}