'use client'

import { useState, useEffect, useRef } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Compass, Search } from "lucide-react"

// This would typically come from an API
const allMajors = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Major ${i + 1}`,
  category: ['STEM', 'Business', 'Social Sciences', 'Humanities', 'Health Sciences', 'Arts'][Math.floor(Math.random() * 6)]
}))

const categories = ['All', 'STEM', 'Business', 'Social Sciences', 'Humanities', 'Health Sciences', 'Arts']

export default function AllMajorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [visibleMajors, setVisibleMajors] = useState([])
  const [loading, setLoading] = useState(false)
  const loader = useRef(null)

  const loadMoreMajors = () => {
    setLoading(true)
    setTimeout(() => {
      const nextBatch = allMajors.slice(visibleMajors.length, visibleMajors.length + 20)
      setVisibleMajors(prev => [...prev, ...nextBatch])
      setLoading(false)
    }, 500) // Simulating API delay
  }

  useEffect(() => {
    loadMoreMajors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && visibleMajors.length < allMajors.length) {
          loadMoreMajors()
        }
      },
      { threshold: 1 }
    )

    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => observer.disconnect()
  }, [loading, visibleMajors])

  const filteredMajors = visibleMajors.filter(major =>
    major.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || major.category === selectedCategory)
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
          All Majors
        </h1>
        
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search majors..."
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "text-gray-300 border-gray-600 hover:bg-gray-700"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMajors.map((major) => (
                <Link key={major.id} href={`/detail/${major.id}`} className="text-purple-400 hover:text-purple-300 transition-colors">
                  {major.name}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {loading && <p className="text-center mt-4">Loading more majors...</p>}
        <div ref={loader} className="h-10" />
      </main>

      <footer className="bg-black py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 DegreeCompass. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}