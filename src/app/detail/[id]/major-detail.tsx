'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" 
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import {  BookOpen, School, Users, Info, Send } from "lucide-react"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ReactMarkdown from 'react-markdown'
import { Textarea } from "@/components/ui/textarea"

interface Major {
  category_name: string;
  major_id: string;
  major_name: string;
  subject_id: string;
  subject_name: string;
}

interface RelatedMajors {
  data: Major[];
  pagination: {
    page: number;
    page_size: number;
    total_count: number;
    total_pages: number;
  };
}

interface QAData {
  qa_content: string;
  created_at: string;
  updated_at: string;
}



const commonQuestions = [
  {
    id: 'q1',
    question: 'What are the career prospects for Computer Science graduates?',
    answer: 'Computer Science graduates have excellent career prospects. They can pursue roles such as Software Developer, Data Scientist, AI Specialist, Systems Analyst, and Database Administrator. The tech industry is continuously growing, offering numerous opportunities in various sectors.'
  },
  {
    id: 'q2',
    question: 'How important are math skills for studying Computer Science?',
    answer: 'Math skills are quite important in Computer Science. You\'ll need a good foundation in areas like discrete mathematics, linear algebra, and calculus. These mathematical concepts are crucial for understanding algorithms, data structures, machine learning, and other core CS topics.'
  },
  {
    id: 'q3',
    question: 'What programming languages are typically taught in a Computer Science program?',
    answer: 'Computer Science programs typically teach a variety of programming languages. Common languages include Python, Java, C++, and JavaScript. The focus is often on understanding programming concepts rather than mastering specific languages, as the field evolves rapidly.'
  },
  {
    id: 'q4',
    question: 'Can I specialize within the Computer Science major?',
    answer: 'Yes, many Computer Science programs offer specializations or concentrations. Common areas of specialization include Artificial Intelligence, Cybersecurity, Data Science, Software Engineering, and Computer Graphics. These allow you to focus on specific areas of interest within the broader field of Computer Science.'
  },
]


export default function MajorDetailPage() {
  const params = useParams()
  const [majorDetails, setMajorDetails] = useState<Major | null>(null)
  const [relatedMajors, setRelatedMajors] = useState<Major[]>([])
  const [loading, setLoading] = useState(true)
  const [qaData, setQaData] = useState<QAData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [userQuestion, setUserQuestion] = useState('')
  const [aiResponse, setAiResponse] = useState('')

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send the question to your backend here
    // For now, we'll just simulate a response
    setAiResponse('Thank you for your question. An AI-generated response would appear here in a real application.')
    setUserQuestion('')
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}`;

        const detailsResponse = await fetch(`${apiUrl}/api/majors/${params.id}`)
        if (!detailsResponse.ok) throw new Error('Failed to fetch major details')
        const detailsData = await detailsResponse.json()
        setMajorDetails(detailsData)

        const relatedResponse = await fetch(`${apiUrl}/api/majors?subject=${detailsData.subject_id}&page=1&page_size=12`)
        if (!relatedResponse.ok) throw new Error('Failed to fetch related majors')
        const relatedData: RelatedMajors = await relatedResponse.json()
        setRelatedMajors(relatedData.data.filter(major => major.major_id !== detailsData.major_id))

        const qaResponse = await fetch(`http://localhost:3458/api/majors/${detailsData.major_id}/qa`)
        if (!qaResponse.ok) {
          throw new Error('Failed to fetch Q&A data')
        }
        const qaData = await qaResponse.json()
        setQaData(qaData)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  if (loading) return <div>Loading...</div>
  if (!majorDetails) return <div>Major not found</div>

  return (
      <main className="container mx-auto px-4 py-12 flex-grow">
        <Link 
          href={majorDetails?.category_name 
            ? `/majors?categoryId=${majorDetails.major_id.substring(0, 2)}` 
            : '/majors'
          } 
          className="text-purple-400 hover:text-purple-300 mb-4 inline-block"
        >
          ← Back to Majors
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {majorDetails.major_name}
            </h1>
            <div className="text-xl text-gray-300 mb-8">
              <p>abc1: {majorDetails.category_name}</p>
              <p>abc2: {majorDetails.subject_id}</p>
              <p>abc3: {majorDetails.subject_name}</p>
            </div>

            <div className="flex space-x-4 mb-8">
              <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white">
                Apply
              </Button>
              <Button variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white">
                Download
              </Button>
              <Button variant="outline" className="text-pink-400 border-pink-400 hover:bg-pink-400 hover:text-white">
                Call
              </Button>
            </div>

            <Card className="bg-gray-800 border-gray-700 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Common Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-2">
                  {/* Add common courses logic here */}
                </ul>
              </CardContent>
            </Card>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-400" />
                Related Majors
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 ml-2 text-gray-400 hover:text-gray-300" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-white p-2">
                      <p>相关专业学科</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {relatedMajors.map((major) => (
                  <Link 
                    key={major.major_id} 
                    href={`/detail/${major.major_id}`}
                  >
                    <Button 
                      variant="outline" 
                      className="w-full bg-gray-700 text-gray-200 border-purple-400 hover:bg-gray-600"
                    >
                      {major.major_name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <School className="h-5 w-5 mr-2 text-purple-400" />
                High School Subjects
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 ml-2 text-gray-400 hover:text-gray-300" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-white p-2">
                      <p>高中阶段学习过的课程</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-lg text-sm border border-purple-400">
                  数学
                </span>
                <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-lg text-sm border border-purple-400">
                  物理
                </span>
                <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-lg text-sm border border-purple-400">
                  化学
                </span>
                <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-lg text-sm border border-purple-400">
                  生物
                </span>
                <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-lg text-sm border border-purple-400">
                  地理
                </span>
              </div>
            </div>


        {error && (
          <div className="text-red-500 py-4">
            获取专业详情失败: {error}
          </div>
        )}

        {qaData && (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-gray-900 rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold mb-6 text-white">{majorDetails.major_name}</h1>
              
              <div className="prose prose-invert prose-lg max-w-none">
                <ReactMarkdown>{qaData.qa_content}</ReactMarkdown>
                <div className="text-sm text-gray-400 mt-4">
                  最后更新: {new Date(qaData.updated_at).toLocaleString('zh-CN')}
                </div>
              </div>
            </div>
          </div>
        )}
          </div>

          <div>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">专业信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-gray-300">专业代码: {majorDetails.major_id}</p>
                  <p className="text-gray-300">所属门类: {majorDetails.category_name}</p>
                  <p className="text-gray-300">所属学科: {majorDetails.subject_name}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-2 text-gray-600">加载中...</p>
          </div>
        )}


<Card className="mt-8 bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white flex items-center">
            <Info className="h-5 w-5 mr-2 text-purple-400" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {commonQuestions.map((q) => (
              <AccordionItem key={q.id} value={q.id}>
                <AccordionTrigger className="text-left text-gray-200 hover:text-purple-400">
                  {q.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {q.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="mt-8 bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white flex items-center">
            <Send className="h-5 w-5 mr-2 text-purple-400" />
            Ask Your Own Question
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleQuestionSubmit} className="space-y-4">
            <Textarea
              placeholder="Type your question here..."
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              className="w-full bg-gray-700 text-gray-200 border-gray-600 focus:border-purple-400"
            />
            <Button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white">
              Submit Question
            </Button>
          </form>
          {aiResponse && (
            <div className="mt-4 p-4 bg-gray-700 rounded-md">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">AI Response:</h3>
              <p className="text-gray-200">{aiResponse}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      </main>
  )
}