'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Compass, Search } from "lucide-react"
import { useState } from "react"

const majors = [
  { id: 1, name: "哲学", category: "01" },
  { id: 2, name: "逻辑学", category: "01" },
  { id: 3, name: "宗教学", category: "01" },
  { id: 4, name: "伦理学", category: "01" },
  { id: 5, name: "经济学", category: "02" },
  { id: 6, name: "经济统计学", category: "02" },
  { id: 7, name: "国民经济管理", category: "02" },
  { id: 8, name: "资源与环境经济学", category: "12" },
  { id: 9, name: "商务经济学", category: "02" },
  { id: 10, name: "能源经济", category: "02" },
  { id: 11, name: "财政学", category: "03" },
  { id: 12, name: "税收学", category: "03" },
  { id: 13, name: "金融学", category: "03" },
  { id: 14, name: "金融工程", category: "03" },
  { id: 15, name: "保险学", category: "03" },
  { id: 16, name: "投资学", category: "03" },
  { id: 17, name: "金融数学", category: "03" },
  { id: 18, name: "信用管理", category: "03" },
]

export default function MajorListHomePage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMajors = majors.filter(major =>
    major.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
      <main className="container mx-auto px-4 py-12">

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
                <Link key={major.id} href={`/majors?categoryId=${major.category}`} className="text-purple-400 hover:text-purple-300 transition-colors">
                  {major.name}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <Link href="/majors">
            <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white text-lg px-8 py-3 rounded-full">
              View All Majors
            </Button>
          </Link>
        </div>
      </main>
  )
}