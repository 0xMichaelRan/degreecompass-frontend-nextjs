import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, BookOpen, ArrowRight, School, Briefcase, DollarSign, TrendingUp } from "lucide-react"

// This would typically come from a database or API based on user selection
const comparisonData = {
  major1: {
    id: 1,
    name: "Computer Science",
    shortExplanation: "Study of computation, information, and automation.",
    commonCourses: ["Programming", "Data Structures", "Algorithms", "Databases", "AI", "Software Engineering"],
    careerPaths: ["Software Developer", "Data Scientist", "AI Specialist", "Cybersecurity Analyst", "Cloud Architect"],
    averageSalary: 92000,
    jobGrowth: "13% (Much faster than average)",
    highSchoolSubjects: ["Mathematics", "Physics", "Computer Studies", "Logic"]
  },
  major2: {
    id: 2,
    name: "Business Administration",
    shortExplanation: "Study of managing business operations and resources.",
    commonCourses: ["Management", "Finance", "Marketing", "Business Ethics", "Organizational Behavior", "Strategy"],
    careerPaths: ["Business Manager", "Financial Analyst", "Marketing Specialist", "HR Manager", "Entrepreneur"],
    averageSalary: 73000,
    jobGrowth: "8% (As fast as average)",
    highSchoolSubjects: ["Mathematics", "Economics", "Business Studies", "English"]
  }
}

export default function MajorComparisonPage() {
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
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
          Major Comparison
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {Object.values(comparisonData).map((major, index) => (
            <div key={major.id} className={`space-y-6 ${index === 0 ? 'md:pr-4' : 'md:pl-4'}`}>
              <div className={`p-6 rounded-lg bg-gradient-to-br ${index === 0 ? 'from-blue-500 to-purple-600' : 'from-pink-500 to-orange-600'}`}>
                <h2 className="text-3xl font-bold mb-2 text-white">{major.name}</h2>
                <p className="text-xl text-gray-200">{major.shortExplanation}</p>
              </div>
              
              <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-700">
                  <CardTitle className="flex items-center text-white">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Common Courses
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-1 text-gray-300">
                    {major.commonCourses.map((course, idx) => (
                      <li key={idx} className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2 text-purple-400" />
                        {course}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-700">
                  <CardTitle className="flex items-center text-white">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Career Paths
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-1 text-gray-300">
                    {major.careerPaths.map((path, idx) => (
                      <li key={idx} className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2 text-purple-400" />
                        {path}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-700">
                    <CardTitle className="flex items-center text-white text-sm">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Avg. Salary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-green-400">${major.averageSalary.toLocaleString()}</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-700">
                    <CardTitle className="flex items-center text-white text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Job Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-blue-400">{major.jobGrowth}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-700">
                  <CardTitle className="flex items-center text-white">
                    <School className="h-5 w-5 mr-2" />
                    Related High School Subjects
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="flex flex-wrap gap-2">
                    {major.highSchoolSubjects.map((subject, idx) => (
                      <li key={idx} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
                        {subject}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
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