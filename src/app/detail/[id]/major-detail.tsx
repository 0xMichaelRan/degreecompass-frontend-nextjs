'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { BookOpen, School, Users, Info, Send } from "lucide-react"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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
  id: number;
  major_id: string;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
}

interface IntroData {
  intro_content: string;
  created_at: string;
  updated_at: string;
}

export default function MajorDetailPage() {
  const params = useParams()
  const [majorDetails, setMajorDetails] = useState<Major | null>(null)
  const [relatedMajors, setRelatedMajors] = useState<Major[]>([])
  const [loading, setLoading] = useState(true)
  const [qaData, setQaData] = useState<QAData[]>([])
  const [isQALoading, setIsQALoading] = useState(true)
  const [qaError, setQaError] = useState<string | null>(null)
  const [userQuestion, setUserQuestion] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [introData, setIntroData] = useState<string>('')
  const [isIntroLoading, setIsIntroLoading] = useState(true)
  const [introError, setIntroError] = useState<string | null>(null)
  const [isAiLoading, setIsAiLoading] = useState(false)

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userQuestion.trim() || !majorDetails) return

    setIsAiLoading(true)
    setAiResponse('')

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}`
      const response = await fetch(`${apiUrl}/api/majors/${majorDetails.major_id}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userQuestion,
          context: {
            major_name: majorDetails.major_name,
            major_id: majorDetails.major_id,
            intro_content: introData,
          }
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      setAiResponse(data.answer)
      setUserQuestion('')
    } catch (error) {
      console.error('Error getting AI response:', error)
      setAiResponse('Sorry, I encountered an error while processing your question. Please try again.')
    } finally {
      setIsAiLoading(false)
    }
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

      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  useEffect(() => {
    const fetchQAData = async () => {
      if (!majorDetails?.major_id) return;

      setIsQALoading(true);
      setQaError(null);

      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}`;
        const response = await fetch(`${apiUrl}/api/majors/${majorDetails.major_id}/qa`);
        if (!response.ok) throw new Error('Failed to fetch Q&A data');
        const data = await response.json();
        setQaData(data);
      } catch (error) {
        console.error('Error fetching QA data:', error);
        setQaError(error.message);
      } finally {
        setIsQALoading(false);
      }
    };

    fetchQAData();
  }, [majorDetails?.major_id]);

  useEffect(() => {
    const fetchIntroData = async () => {
      if (!majorDetails?.major_id) return;

      setIsIntroLoading(true);
      setIntroError(null);

      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}`;
        const response = await fetch(`${apiUrl}/api/majors/${majorDetails.major_id}/intro`);
        if (!response.ok) throw new Error('Failed to fetch intro data');
        const data = await response.json();
        setIntroData(data.data);
      } catch (error) {
        console.error('Error fetching intro data:', error);
        setIntroError(error.message);
      } finally {
        setIsIntroLoading(false);
      }
    };

    fetchIntroData();
  }, [majorDetails?.major_id]);

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
            {introData && (
              <div className="max-w-4xl mx-auto p-4">
                {/* <div className="bg-gray-900 rounded-lg shadow-lg p-6"> */}
                {/* <div className="prose prose-invert prose-sm max-w-none"> */}
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="markdown-content"
                  components={{
                    h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-purple-400 mt-4 mb-2" {...props} />,
                    h4: ({ node, ...props }) => <h4 className="text-md font-semibold text-purple-300 mt-3 mb-2" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-3" {...props} />,
                    li: ({ node, ...props }) => <li className="text-gray-200 mb-1" {...props} />,
                    p: ({ node, ...props }) => <p className="text-gray-200 mb-2" {...props} />
                  }}
                >
                  {introData.intro_content}
                </ReactMarkdown>
                {/* </div> */}
                {/* </div> */}
              </div>
            )}
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
              相关专业学科
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


          <Card className="mt-8 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white flex items-center">
                <Info className="h-5 w-5 mr-2 text-purple-400" />
                Q&A
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {qaData.map((q) => (
                  <AccordionItem key={q.id} value={q.id.toString()}>
                    <AccordionTrigger className="text-left text-gray-200 hover:text-purple-400">
                      {q.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      {q.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
          {qaError && (
            <div className="text-red-500 py-4">
              获取专业详情失败: {qaError}
            </div>
              )}

            </CardContent>
          </Card>

          <Card className="mt-8 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white flex items-center">
                <Send className="h-5 w-5 mr-2 text-purple-400" />
                我来问问
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleQuestionSubmit} className="space-y-4">
                <Textarea
                  placeholder="我想问问..."
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleQuestionSubmit(e);
                    }
                  }}
                  className="w-full bg-gray-700 text-gray-200 border-gray-600 focus:border-purple-400"
                />
                <Button 
                  type="submit" 
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                  disabled={isAiLoading || !userQuestion.trim()}
                >
                  {isAiLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                      处理中...
                    </span>
                  ) : '问问AI'}
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
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-gray-600">加载中...</p>
        </div>
      )}

    </main>
  )
}