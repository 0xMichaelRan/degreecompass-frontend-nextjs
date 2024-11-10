'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Compass, Search } from "lucide-react"
import { useState } from "react"

const majors = [
  { id: 1, name: "Computer Science", category: "STEM" },
  { id: 2, name: "Business Administration", category: "Business" },
  { id: 3, name: "Psychology", category: "Social Sciences" },
  { id: 4, name: "Mechanical Engineering", category: "STEM" },
  { id: 5, name: "Biology", category: "STEM" },
  { id: 6, name: "English Literature", category: "Humanities" },
  { id: 7, name: "Economics", category: "Social Sciences" },
  { id: 8, name: "Chemistry", category: "STEM" },
  { id: 9, name: "Political Science", category: "Social Sciences" },
  { id: 10, name: "Graphic Design", category: "Arts" },
  { id: 11, name: "Nursing", category: "Health Sciences" },
  { id: 12, name: "Marketing", category: "Business" },
]

export default function MajorListPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMajors = majors.filter(major =>
    major.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Explore Majors
        </h1>
        
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search majors..."
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMajors.map((major) => (
                <Link key={major.id} href={`/majors/${major.id}`} className="text-purple-400 hover:text-purple-300 transition-colors">
                  {major.name}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <Link href="/majors/all">
            <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white text-lg px-8 py-3 rounded-full">
              View All Majors
            </Button>
          </Link>
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