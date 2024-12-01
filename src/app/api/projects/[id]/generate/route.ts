import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

interface QuestionNode {
  text: string
  category: string
  priority: string
  depth: number
  parentId?: string
}

export async function POST(
  req: NextRequest,
  { params }: any
) {
  const userId = req.headers.get('x-user-id')
  const questionId = req.nextUrl.searchParams.get('questionId')
  
  try {
    // If questionId is provided in query params, we're generating follow-up questions
    if (questionId) {
      return handleFollowUpQuestions(req, params.id, questionId, userId)
    }
    
    // Otherwise, generate initial questions
    return handleInitialQuestions(req, params.id, userId)
  } catch (error) {
    console.error("[GENERATE_QUESTIONS_POST]", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

async function handleInitialQuestions(req: NextRequest, projectId: string, userId: string | null) {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      userId: userId ?? undefined,
    }
  })

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a senior software requirements analyst. Generate comprehensive initial questions to gather software requirements.
        
        Categories to cover:
        - User Requirements (target users, user stories, use cases)
        - Functional Requirements (features, workflows, business rules)
        - Technical Requirements (architecture, tech stack, APIs)
        - Security Requirements (authentication, authorization, data protection)
        - Performance Requirements (speed, scalability, reliability)
        - Integration Requirements (third-party systems, APIs)
        - UI/UX Requirements (design, usability, accessibility)
        
        Format: JSON array of objects with:
        - text: detailed question text
        - category: requirement category
        - priority: "high", "medium", or "low"
        - depth: 0 (for initial questions)`
      },
      {
        role: "user",
        content: `Project: ${project.name}
        Description: ${project.description}
        
        Generate specific questions to gather comprehensive requirements for this project.`
      }
    ],
    temperature: 0.7,
    response_format: { type: "json_object" }
  })

  const response = JSON.parse(completion.choices[0].message.content || '{}')
  const questions = response.questions || []

  // Create questions in database
  await prisma.question.createMany({
    data: questions.map((q: QuestionNode) => ({
      text: q.text,
      category: q.category,
      priority: q.priority.toLowerCase(),
      projectId: projectId,
      status: 'pending',
      depth: 0
    }))
  })

  await prisma.project.update({
    where: { id: projectId },
    data: { 
      questionsGenerated: true,
      status: 'in_progress'
    }
  })

  return NextResponse.json({
    success: true,
    questionCount: questions.length
  })
}

async function handleFollowUpQuestions(
  req: NextRequest, 
  projectId: string, 
  questionId: string,
  userId: string | null
) {
  const question = await prisma.question.findUnique({
    where: {
      id: questionId,
      projectId: projectId
    },
    include: {
      project: true
    }
  })

  if (!question || !question.answer) {
    return NextResponse.json({ error: "Question not found or not answered" }, { status: 404 })
  }

  // Only generate follow-ups if we haven't reached max depth
  if (question.depth >= 2) {
    return NextResponse.json({ message: "Maximum question depth reached" })
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a senior software requirements analyst. Based on the previous question and its answer, generate relevant follow-up questions to gather more detailed requirements.
        
        Format: JSON array of objects with:
        - text: detailed follow-up question text
        - category: same category as parent question
        - priority: "high", "medium", or "low"
        - depth: ${question.depth + 1}`
      },
      {
        role: "user",
        content: `Project: ${question.project.name}
        Original Question: ${question.text}
        Answer: ${question.answer}
        
        Generate 2-3 specific follow-up questions to gather more detailed information based on this answer.`
      }
    ],
    temperature: 0.7,
    response_format: { type: "json_object" }
  })

  const response = JSON.parse(completion.choices[0].message.content || '{}')
  const followUpQuestions = response.questions || []

  // Create follow-up questions in database
  await prisma.question.createMany({
    data: followUpQuestions.map((q: QuestionNode) => ({
      text: q.text,
      category: q.category,
      priority: q.priority.toLowerCase(),
      projectId: projectId,
      parentId: questionId,
      status: 'pending',
      depth: question.depth + 1
    }))
  })

  return NextResponse.json({
    success: true,
    questionCount: followUpQuestions.length
  })
}