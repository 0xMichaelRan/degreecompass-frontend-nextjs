import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Compass, BookOpen, Briefcase, School } from "lucide-react"

// This would typically come from a database or API based on user selection
const comparisonData = {
  major1: {
    id: 1,
    name: "Computer Science",
    shortExplanation: "Study of computation, information, and automation.",
    commonCourses: ["Programming", "Data Structures", "Algorithms", "Databases", "AI", "Software Engineering"],
    careerPaths: ["Software Developer", "Data Scientist", "AI Specialist", "Cybersecurity Analyst", "Cloud Architect"],
    highSchoolSubjects: ["Mathematics", "Physics", "Computer Studies", "Logic"]
  },
  major2: {
    id: 2,
    name: "Business Administration",
    shortExplanation: "Study of managing business operations and resources.",
    commonCourses: ["Management", "Finance", "Marketing", "Business Ethics", "Organizational Behavior", "Strategy"],
    careerPaths: ["Business Manager", "Financial Analyst", "Marketing Specialist", "HR Manager", "Entrepreneur"],
    highSchoolSubjects: ["Mathematics", "Economics", "Business Studies", "English"]
  }
}

export default function MajorComparisonPage() {
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
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
          Major Comparison
        </h1>
        
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Field</TableHead>
                <TableHead className="w-1/3 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  {comparisonData.major1.name}
                </TableHead>
                <TableHead className="w-1/3 text-center bg-gradient-to-r from-pink-500 to-orange-600 text-white">
                  {comparisonData.major2.name}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Description</TableCell>
                <TableCell>{comparisonData.major1.shortExplanation}</TableCell>
                <TableCell>{comparisonData.major2.shortExplanation}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-purple-400" />
                    Common Courses
                  </div>
                </TableCell>
                <TableCell>
                  <ul className="list-disc list-inside">
                    {comparisonData.major1.commonCourses.map((course, index) => (
                      <li key={index}>{course}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <ul className="list-disc list-inside">
                    {comparisonData.major2.commonCourses.map((course, index) => (
                      <li key={index}>{course}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-purple-400" />
                    Career Paths
                  </div>
                </TableCell>
                <TableCell>
                  <ul className="list-disc list-inside">
                    {comparisonData.major1.careerPaths.map((path, index) => (
                      <li key={index}>{path}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <ul className="list-disc list-inside">
                    {comparisonData.major2.careerPaths.map((path, index) => (
                      <li key={index}>{path}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <School className="h-5 w-5 mr-2 text-purple-400" />
                    Related High School Subjects
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {comparisonData.major1.highSchoolSubjects.map((subject, index) => (
                      <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {comparisonData.major2.highSchoolSubjects.map((subject, index) => (
                      <span key={index} className="bg-pink-500 text-white px-2 py-1 rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white text-lg px-8 py-3 rounded-full">
            Compare Different Majors
          </Button>
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