'use client'

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ExternalLink } from "lucide-react"

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
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        University Resources
      </h1>

      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search resources..."
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="bg-gray-800 border-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold mb-2 text-white">{resource.name}</h2>
                  <p className="text-gray-300 mb-4">{resource.description}</p>
                  <Link
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-400 hover:text-purple-300"
                  >
                    Visit Website
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <Image
                    src="/placeholder.svg"
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
  )
}