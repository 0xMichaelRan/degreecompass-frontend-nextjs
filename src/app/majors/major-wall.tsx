'use client'

import { useState, useEffect, useRef } from 'react'
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Compass, Search, BookOpen } from "lucide-react"

// Generate 500 dummy majors
const allMajors = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,
  name: `Major ${i + 1}`,
  category: ['STEM', 'Business', 'Social Sciences', 'Humanities', 'Health Sciences', 'Arts'][Math.floor(Math.random() * 6)],
  icon: ['💻', '📊', '🧠', '📚', '🏥', '🎨'][Math.floor(Math.random() * 6)]
}))

const categories = ['All', 'STEM', 'Business', 'Social Sciences', 'Humanities', 'Health Sciences', 'Arts']

export default function MajorWallPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [visibleMajors, setVisibleMajors] = useState([])
  const [loading, setLoading] = useState(false)
  const loader = useRef(null)

  const filteredMajors = allMajors.filter(major =>
    (major.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    major.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === "All" || major.category === selectedCategory)
  )

  const loadMoreMajors = () => {
    setLoading(true)
    setTimeout(() => {
      const nextBatch = filteredMajors.slice(visibleMajors.length, visibleMajors.length + 20)
      setVisibleMajors(prev => [...prev, ...nextBatch])
      setLoading(false)
    }, 500) // Simulating API delay
  }

  useEffect(() => {
    setVisibleMajors([])
    loadMoreMajors()
  }, [searchTerm, selectedCategory])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && visibleMajors.length < filteredMajors.length) {
          loadMoreMajors()
        }
      },
      { threshold: 1 }
    )

    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => observer.disconnect()
  }, [loading, visibleMajors, filteredMajors])

  return (
      <main className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-5xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">
            Major Wall
          </span>
        </motion.h1>
        
        <motion.div 
          className="mb-8 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`${
                selectedCategory === category
                  ? "bg-gradient-to-r from-pink-500 to-yellow-500 text-white"
                  : "text-gray-300 border-gray-600 hover:bg-white hover:bg-opacity-10"
              } transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <motion.div 
          className="mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search majors..."
              className="pl-10 bg-white bg-opacity-10 border-gray-600 text-white placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 w-full backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {visibleMajors.map((major) => (
            <motion.div
              key={major.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Link href={`/majors/${major.id}`}>
                <Card className="bg-white bg-opacity-10 border-gray-600 hover:bg-opacity-20 transition-all duration-300 ease-in-out transform hover:scale-105 backdrop-blur-sm">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <span className="text-3xl mb-2">{major.icon}</span>
                    <h2 className="text-lg font-bold mb-1">{major.name}</h2>
                    <p className="text-gray-300 text-sm">{major.category}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {loading && (
          <p className="text-center mt-8 text-gray-400">Loading more majors...</p>
        )}
        <div ref={loader} className="h-10" />

        {visibleMajors.length === 0 && !loading && (
          <motion.p 
            className="text-center mt-8 text-gray-400 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No majors found matching your search criteria. Try something else!
          </motion.p>
        )}
      </main>
  )
}