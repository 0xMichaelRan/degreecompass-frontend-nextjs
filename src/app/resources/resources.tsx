'use client'

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Compass, Search, ExternalLink } from "lucide-react"

// This would typically come from a database or API
const resources = [
  {
    id: 1,
    name: "College Board",
    description: "Comprehensive information on college planning, SAT, and scholarships.",
    url: "https://www.collegeboard.org/",
    qrCode: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 2,
    name: "U.S. News Education",
    description: "Rankings and information on colleges, graduate schools, and global universities.",
    url: "https://www.usnews.com/education",
    qrCode: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 3,
    name: "Khan Academy",
    description: "Free online courses, lessons and practice for various subjects and standardized tests.",
    url: "https://www.khanacademy.org/",
    qrCode: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 4,
    name: "Common App",
    description: "A single online college application form used by over 900 colleges and universities.",
    url: "https://www.commonapp.org/",
    qrCode: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 5,
    name: "Federal Student Aid",
    description: "Information on financial aid programs and how to apply for them.",
    url: "https://studentaid.gov/",
    qrCode: "/placeholder.svg?height=100&width=100"
  }
]

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-yellow-50 text-yellow-900">
      <header className="bg-yellow-900 py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Compass className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-50">DegreeCompass</span>
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link href="/majors" className="text-yellow-200 hover:text-yellow-50">Majors</Link>
              <Link href="/compare" className="text-yellow-200 hover:text-yellow-50">Compare</Link>
              <Link href="/resources" className="text-yellow-50 font-semibold">Resources</Link>
            </nav>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          University Resources
        </h1>
        
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-600" />
            <Input
              type="search"
              placeholder="Search resources..."
              className="pl-10 bg-yellow-100 border-yellow-300 text-yellow-900 placeholder-yellow-600 focus:ring-yellow-500 focus:border-yellow-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="bg-yellow-100 border-yellow-300 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold mb-2">{resource.name}</h2>
                    <p className="text-yellow-800 mb-4">{resource.description}</p>
                    <Link 
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      Visit Website
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <Image
                      src={resource.qrCode}
                      alt={`QR Code for ${resource.name}`}
                      width={64}
                      height={64}
                      className="rounded-md"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-yellow-900 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-yellow-200">
          <p>&copy; 2024 DegreeCompass. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}