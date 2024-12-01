// app/api/projects/[id]/questions/[questionsId]/answer/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(
  req: NextRequest,
  { params }:any
) {
  const { id, questionsId } = await params
  const userId = req.headers.get('x-user-id')

  try {
    const body = await req.json()
    const { answer } = body

    const question = await prisma.question.findUnique({
      where: {
        id: questionsId,
        projectId: id
      },
      include: {
        project: true
      }
    })

    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 })
    }

    // Update question with answer
    const updatedQuestion = await prisma.question.update({
      where: {
        id: questionsId,
        projectId: id
      },
      data: {
        answer,
        status: 'answered'
      }
    })

    // Only generate follow-up questions if we haven't reached max depth
    if (question.depth < 2) {
      // Generate follow-up questions based on the answer
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
            - depth: ${question.depth + 1}
            Always Provide an array even if only one question is there
            `
          },
          {
            role: "user",
            content: `Project: ${question.project.name}
            Original Question: ${question.text}
            Answer: ${answer}
            
            Generate 2 specific follow-up questions to gather more detailed information based on this answer.`
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })

      const content = completion.choices[0].message.content;
      const response = content ? JSON.parse(content) : {};
      const followUpQuestions = response.questions || [];

      // Create follow-up questions in database
      console.log( '>>>>>>>>>>>>>>>>>>>>>',followUpQuestions )
      console.log(followUpQuestions.map((q: any) => ({
        text: q.text,
        category: q.category,
        priority: q.priority.toLowerCase(),
        projectId: id,
        parentId: questionsId,
        status: 'pending',
        depth: question.depth + 1
      })))
      if (followUpQuestions.length > 0) {
        const data=await prisma.question.createMany({
          data: followUpQuestions.map((q: any) => ({
            text: q.text,
            category: q.category,
            priority: q.priority.toLowerCase(),
            projectId: id,
            parentId: questionsId,
            status: 'pending',
            depth: question.depth + 1
          }))
        })
        console.log(data)
      }
    }

    // Check if all questions are answered
    const allQuestions = await prisma.question.findMany({
      where: {
        projectId: id
      }
    })

    const allAnswered = allQuestions.every(q => q.status === 'answered')

    if (allAnswered) {
      // Generate requirements automatically when all questions are answered
      const reqResponse = await fetch(`${req.nextUrl.origin}/api/projects/${id}/requirements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId ?? ''
        }
      })

      if (!reqResponse.ok) {
        console.error('Failed to generate requirements')
      }
    }

    return NextResponse.json(updatedQuestion)
  } catch (error) {
    console.error("[ANSWER_QUESTION_POST]", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}