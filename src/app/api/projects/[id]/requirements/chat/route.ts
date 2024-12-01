// app/api/projects/[id]/requirements/chat/route.ts
import { NextRequest, NextResponse } from "next/server"
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(
  req: NextRequest,
  { params }: any
) {
  try {
    const body = await req.json()
    const { message, requirements } = body

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a helpful software requirements analyst assistant. 
          You are discussing requirements for a software project.
          Be concise but informative in your responses.
          
          Current project requirements:
          ${requirements.map((req: any) => 
            `- ${req.title} (${req.type}, ${req.priority}): ${req.description}`
          ).join('\n')}`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
    })

    return NextResponse.json({ 
      response: completion.choices[0].message.content 
    })
  } catch (error) {
    console.error("[REQUIREMENTS_CHAT_ERROR]", error)
    return NextResponse.json(
      { error: "Failed to process chat message" }, 
      { status: 500 }
    )
  }
}