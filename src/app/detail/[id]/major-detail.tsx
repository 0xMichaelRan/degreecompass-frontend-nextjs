import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, BookOpen, ArrowRight, School, Users } from "lucide-react"

// This would typically come from a database or API
const majorDetails = {
  id: 1,
  name: "Computer Science",
  shortExplanation: "Computer Science is the study of computation, information, and automation. It involves the theory, design, development, and application of software and software systems.",
  commonCourses: ["Introduction to Programming", "Data Structures and Algorithms", "Database Systems", "Computer Networks", "Artificial Intelligence", "Software Engineering"],
  relatedMajors: ["Software Engineering", "Information Technology", "Data Science", "Cybersecurity"],
  highSchoolSubjects: ["Mathematics", "Physics", "Computer Studies", "Logic"]
}

const compareMajors = [
  { id: 2, name: "Business Administration" },
  { id: 3, name: "Electrical Engineering" },
  { id: 4, name: "Data Science" },
]

export default function MajorDetailPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-black py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/majors" className="flex items-center space-x-2">
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
              {majorDetails.name}
            </h1>
            <p className="text-xl text-gray-300 mb-8">{majorDetails.shortExplanation}</p>

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
                  {majorDetails.commonCourses.map((course, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <ArrowRight className="h-4 w-4 mr-2 text-purple-400" />
                      {course}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-400" />
                Related Majors
              </h2>
              <div className="flex flex-wrap gap-2">
                {majorDetails.relatedMajors.map((major, index) => (
                  <span key={index} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm">
                    {major}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <School className="h-5 w-5 mr-2 text-purple-400" />
                Most Related High School Subjects
              </h2>
              <div className="flex flex-wrap gap-2">
                {majorDetails.highSchoolSubjects.map((subject, index) => (
                  <span key={index} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-lg text-sm border border-purple-400">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Compare Majors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Compare {majorDetails.name} with:</p>
                <div className="space-y-2">
                  {compareMajors.map((major) => (
                    <Link key={major.id} href={`/compare/`}>
                      {/* <Link key={major.id} href={`/compare/${majorDetails.id}/${major.id}`}> */}
                      <Button variant="outline" className="w-full text-left justify-start bg-gray-700 hover:bg-gray-600 border-gray-600">
                        {major.name}
                      </Button>
                    </Link>
                  ))}
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