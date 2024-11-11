'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, BookOpen, ArrowRight, School, Users } from "lucide-react"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Major {
  category_name: string;
  major_id: string;
  major_name: string;
  subject_id: string;
  subject_name: string;
}

export default function MajorDetailPage() {
  const params = useParams()
  const [majorDetails, setMajorDetails] = useState<Major | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMajorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/majors/${params.id}`)
        if (!response.ok) throw new Error('Failed to fetch major details')
        const data = await response.json()
        setMajorDetails(data)
      } catch (error) {
        console.error('Error fetching major details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMajorDetails()
  }, [params.id])

  if (loading) return <div>Loading...</div>
  if (!majorDetails) return <div>Major not found</div>

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-black py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Compass className="h-6 w-6 text-purple-400" />
              <span className="text-2xl font-bold text-white">DegreeCompass</span>
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link href="/majors" className="text-gray-300 hover:text-white">Majors</Link>
              <Link href="/compare" className="text-gray-300 hover:text-white">Compare</Link>
              <Link href="/resources" className="text-gray-300 hover:text-white">Resources</Link>
            </nav>
            <Link href="/majors">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Link href="/majors" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
          ← Back to Majors
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {majorDetails.major_name}
            </h1>
            <div className="text-xl text-gray-300 mb-8">
              <p>学科门类: {majorDetails.category_name}</p>
              <p>学科代码: {majorDetails.subject_id}</p>
              <p>学科名称: {majorDetails.subject_name}</p>
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
              </h2>
              <div className="flex flex-wrap gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm">
                        相同学科门类
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-white p-2">
                      <p>具有相同的学科门类的专业</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger>
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm">
                        相同学科
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-white p-2">
                      <p>具有相同的学科代码的专业</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger>
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm">
                        相近专业
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-white p-2">
                      <p>专业代码相近的专业</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <School className="h-5 w-5 mr-2 text-purple-400" />
                High School Subjects
              </h2>
              <div className="flex flex-wrap gap-2">
                {/* Add high school subjects logic here */}
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
          </div>
        </div>
      </main>

      <footer className="bg-black py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 DegreeCompass. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}