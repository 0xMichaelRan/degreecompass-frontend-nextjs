import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Compass, BookOpen, ArrowRight, School } from "lucide-react"

// This would typically come from a database or API
const majorDetails = {
  id: 1,
  name: "Computer Science",
  shortExplanation: "Computer Science is the study of computation, information, and automation. It involves the theory, design, development, and application of software and software systems.",
  commonCourses: ["Introduction to Programming", "Data Structures and Algorithms", "Database Systems", "Computer Networks", "Artificial Intelligence", "Software Engineering"],
  relatedMajors: ["Software Engineering", "Information Technology", "Data Science", "Cybersecurity"],
  highSchoolSubjects: ["Mathematics", "Physics", "Computer Studies", "Logic"]
}

const allMajors = [
  { id: 1, name: "Computer Science" },
  { id: 2, name: "Business Administration" },
  { id: 3, name: "Psychology" },
  { id: 4, name: "Mechanical Engineering" },
  { id: 5, name: "Biology" },
]

export default function MajorDetailPage() {
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
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Link href="/majors" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
          ← Back to Majors
        </Link>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4 text-white">{majorDetails.name}</h1>
            <p className="text-xl text-gray-300 mb-8">{majorDetails.shortExplanation}</p>
            
            <Card className="bg-gray-800 border-gray-700 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Common Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-300">
                  {majorDetails.commonCourses.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Related Majors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-300">
                  {majorDetails.relatedMajors.map((major, index) => (
                    <li key={index}>{major}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <School className="h-5 w-5 mr-2" />
                  Most Related High School Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-300">
                  {majorDetails.highSchoolSubjects.map((subject, index) => (
                    <li key={index}>{subject}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Compare Majors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Select another major to compare with {majorDetails.name}:</p>
                <Select>
                  <SelectTrigger className="w-full bg-gray-700 text-white border-gray-600">
                    <SelectValue placeholder="Choose a major" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-white border-gray-600">
                    {allMajors.filter(m => m.id !== majorDetails.id).map((major) => (
                      <SelectItem key={major.id} value={major.id.toString()}>
                        {major.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                  Compare Majors
                </Button>
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