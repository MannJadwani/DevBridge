"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, Loader2, ClipboardList, MessageSquare } from "lucide-react"
import { RequirementsChat } from "@/components/requirement-chat"

interface Question {
  id: string
  text: string
  answer: string | null
  category: string
  priority: string
  status: string
  projectId: string
  createdAt: string
  depth: number
  parentId: string | null
  followUps: Question[]
}

interface Project {
  id: string
  name: string
  description: string
  createdAt: string
  status: string
  questionsGenerated: boolean
  questions: Question[]
  requirements: any[]
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'feature':
      return 'bg-green-500';
    case 'bug':
      return 'bg-red-500';
    case 'enhancement':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
}

const QuestionCard = ({ 
    question,
    answer,
    onAnswerChange,
    onSubmit,
  }: { 
    question: Question
    answer: string
    onAnswerChange: (value: string) => void
    onSubmit: () => void
  }) => {
    return (
      <Card className="border-l-4 border-l-primary shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <span className="text-lg font-medium leading-tight">{question.text}</span>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="px-3 py-1">{question.category}</Badge>
              <Badge variant="outline" className="px-3 py-1">{question.priority}</Badge>
              {question.depth > 0 && (
                <Badge variant="secondary" className="px-3 py-1">Follow-up</Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => onAnswerChange(e.target.value)}
              rows={4}
              className="resize-none focus:ring-2 focus:ring-blue-100"
            />
            <Button 
              onClick={onSubmit}
              disabled={!answer?.trim()}
              className="w-full sm:w-auto"
            >
              Submit Answer
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }
  const QuestionItem = ({ question, depth = 0 }: { question: Question; depth?: number }) => {
    return (
      <div 
        className={`border-l-2 border-blue-100 pl-4 py-2 ${
          depth > 0 ? 'ml-6' : ''
        }`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {depth > 0 && (
                  <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
                )}
                <p className="font-medium text-slate-800">{question.text}</p>
              </div>
              {question.answer && (
                <div className="mt-2 ml-6">
                  <p className="text-sm text-slate-500 mb-1">Answer:</p>
                  <p className="text-slate-600 bg-blue-50/50 p-3 rounded-md">
                    {question.answer}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="shrink-0">{question.category}</Badge>
              <Badge variant="outline" className="shrink-0">{question.priority}</Badge>
              {depth > 0 && (
                <Badge variant="secondary" className="shrink-0">Follow-up</Badge>
              )}
            </div>
          </div>
          {question.followUps && question.followUps.length > 0 && (
            <div className="space-y-2 mt-2">
              {question.followUps.map((followUp) => (
                <QuestionItem 
                  key={followUp.id} 
                  question={followUp} 
                  depth={depth + 1} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  const QuestionAnswerForm = ({ 
    question,
    answer,
    onAnswerChange,
    onSubmit,
  }: { 
    question: Question
    answer: string
    onAnswerChange: (value: string) => void
    onSubmit: () => void
  }) => {
    return (
      <Card className="border-l-4 border-l-primary shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Current Question:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50/50 p-4 rounded-lg">
              <p className="font-medium text-slate-800">{question.text}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">{question.category}</Badge>
                <Badge variant="outline">{question.priority}</Badge>
              </div>
            </div>
            <Textarea
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => onAnswerChange(e.target.value)}
              rows={4}
              className="resize-none focus:ring-2 focus:ring-blue-100"
            />
            <Button 
              onClick={onSubmit}
              disabled={!answer?.trim()}
              className="w-full sm:w-auto"
            >
              Submit Answer
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [generating, setGenerating] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [flatQuestions, setFlatQuestions] = useState<Question[]>([])

  useEffect(() => {
    fetchProject()
  }, [params.id])

  // Flatten the question hierarchy into a single array
  const flattenQuestions = (questions: Question[]): Question[] => {
    let flat: Question[] = [];
    questions.forEach(question => {
      flat.push(question);
      if (question.followUps?.length > 0) {
        flat = flat.concat(flattenQuestions(question.followUps));
      }
    });
    return flat.filter(q => !q.answer); // Only include unanswered questions
  };

  async function fetchProject() {
    setError(null)
    setLoading(true)
  
    try {
      const data = await fetchProjectData()
      const organizedData = organizeQuestionHierarchy(data)
      setProject(organizedData)
  
      const unansweredQuestions = getUnansweredQuestions(organizedData.questions)
      setFlatQuestions(unansweredQuestions)
  
      // Reset to first unanswered question if available
      if (unansweredQuestions.length > 0) {
        setCurrentQuestionIndex(0)
        setCurrentAnswer("")
      }
  
      // Generate requirements if all questions are answered
      await handleRequirementsGeneration(organizedData, unansweredQuestions)
  
    } catch (error) {
      setError('Error loading project. Please try again.')
      console.error('Error fetching project:', error)
    } finally {
      setLoading(false)
    }
  }
  
  // Helper function to fetch initial project data
  async function fetchProjectData() {
    const response = await fetch(`/api/projects/${params.id}`)
    if (!response.ok) throw new Error('Failed to fetch project')
    return response.json()
  }
  
  // Helper function to organize questions into hierarchy
  function organizeQuestionHierarchy(data: any) {
    // Create a map of all questions
    const questionMap = new Map<string, Question>()
    data.questions.forEach((q: Question) => {
      q.followUps = []
      questionMap.set(q.id, q)
    })
    
    // Organize questions into hierarchy
    const rootQuestions: Question[] = []
    data.questions.forEach((q: Question) => {
      if (q.parentId) {
        const parent = questionMap.get(q.parentId)
        if (parent) {
          parent.followUps.push(q)
        }
      } else {
        rootQuestions.push(q)
      }
    })
    
    return { ...data, questions: rootQuestions }
  }
  
  // Helper function to get flat list of unanswered questions
  function getUnansweredQuestions(questions: Question[]): Question[] {
    return questions.reduce((acc: Question[], q: Question) => {
      // Add parent question if unanswered
      if (!q.answer) {
        acc.push(q)
      }
      // Add unanswered follow-ups
      q.followUps?.forEach((followUp: Question) => {
        if (!followUp.answer) {
          acc.push(followUp)
        }
      })
      return acc
    }, [])
  }
  
  // Helper function to handle requirements generation
  async function handleRequirementsGeneration(data: any, unansweredQuestions: Question[]) {
    const shouldGenerateRequirements = 
      unansweredQuestions.length === 0 && 
      data.questions.length > 0 && 
      data.requirements.length === 0
  
    if (!shouldGenerateRequirements) return
  
    try {
      const reqResponse = await fetch(`/api/projects/${params.id}/requirements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
  
      if (!reqResponse.ok) {
        console.error('Failed to generate requirements')
        return
      }
  
      // Refresh project data to get new requirements
      const updatedResponse = await fetch(`/api/projects/${params.id}`)
      if (updatedResponse.ok) {
        const updatedData = await updatedResponse.json()
        setProject(updatedData)
      }
    } catch (error) {
      console.error('Error generating requirements:', error)
    }
  }
  async function generateQuestions() {
    if (!project || generating) return
    setGenerating(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/projects/${params.id}/generate`, {
        method: 'POST'
      })
      if (!response.ok) throw new Error('Failed to generate questions')
      await fetchProject()
    } catch (error) {
      setError('Failed to generate questions. Please try again.')
      console.error('Error generating questions:', error)
    } finally {
      setGenerating(false)
    }
  }

  async function handleAnswerSubmit() {
    const currentQuestion = flatQuestions[currentQuestionIndex]
    if (!currentQuestion || !currentAnswer.trim()) return

    try {
      const response = await fetch(`/api/projects/${params.id}/questions/${currentQuestion.id}/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer: currentAnswer })
      })

      if (!response.ok) throw new Error('Failed to submit answer')
      
      // Refresh project to get any new follow-up questions
      await fetchProject()
      
      // Clear current answer
      setCurrentAnswer("")
      
    } catch (error) {
      setError('Failed to submit answer. Please try again.')
      console.error('Error submitting answer:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Project not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8 bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                {project.name}
              </h1>
              <p className="text-slate-600 mt-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant={project.status === 'completed' ? 'default' : 'secondary'} className="px-3 py-1">
                  {project.status}
                </Badge>
                {flatQuestions.length > 0 && (
                  <Badge variant="outline" className="px-3 py-1">
                    Question {currentQuestionIndex + 1} of {flatQuestions.length}
                  </Badge>
                )}
              </div>
            </div>
            {!project.questionsGenerated && (
              <Button 
                onClick={generateQuestions} 
                disabled={generating}
                className="w-full md:w-auto"
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Questions...
                  </>
                ) : 'Generate Questions'}
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="questions" className="space-y-4">
          <TabsList className="w-full sm:w-auto bg-white/50 backdrop-blur-sm p-1 rounded-lg">
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Questions
            </TabsTrigger>
            <TabsTrigger value="requirements" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Requirements
              {project.requirements.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {project.requirements.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <TabsContent value="questions">
              <div className="space-y-6">
                {!project.questionsGenerated ? (
                  <Card className="border-none shadow-sm bg-white/80">
                    <CardContent className="pt-6">
                      <p className="text-center text-slate-600">
                        Click "Generate Questions" to start the requirements gathering process.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-8">
                    {/* Current question form for unanswered questions */}
                    {flatQuestions.length > 0 && (
                      <QuestionAnswerForm
                        question={flatQuestions[currentQuestionIndex]}
                        answer={currentAnswer}
                        onAnswerChange={setCurrentAnswer}
                        onSubmit={handleAnswerSubmit}
                      />
                    )}
                    
                    {/* All questions list */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4">All Questions</h2>
                      <div className="space-y-6 bg-white/80 rounded-lg p-4">
                        {project.questions.map((question) => (
                          <QuestionItem key={question.id} question={question} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="requirements">
              <div className="space-y-6">
                {project.requirements.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      {project.requirements.map((req) => (
                        <Card key={req.id} className="shadow-md hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                              <span className="text-lg font-medium">{req.title}</span>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className={`px-3 py-1 ${getTypeColor(req.type)}`}>
                                  {req.type}
                                </Badge>
                                <Badge variant="outline" className={`px-3 py-1 ${getPriorityColor(req.priority)}`}>
                                  {req.priority}
                                </Badge>
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-600 whitespace-pre-wrap">{req.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div>
                      <RequirementsChat 
                        projectId={project.id} 
                        requirements={project.requirements}
                      />
                    </div>
                  </div>
                ) : (
                  <Card className="border-none shadow-sm bg-white/80">
                    <CardContent className="pt-6">
                      <p className="text-center text-slate-600">
                        {project.status === 'completed' 
                          ? 'Requirements are being generated...'
                          : 'Requirements will appear here once all questions are answered.'}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}