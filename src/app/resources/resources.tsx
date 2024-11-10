'use client'

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Compass, Search, ExternalLink, Menu, X } from "lucide-react"

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-black py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Compass className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">DegreeCompass</span>
            </Link>
            {isLoggedIn ? (
              <>
                <nav className="hidden md:flex items-center space-x-4">
                  <Link href="/majors" className="text-gray-300 hover:text-white">Majors</Link>
                  <Link href="/compare" className="text-gray-300 hover:text-white">Compare</Link>
                  <Link href="/resources" className="text-white font-semibold">Resources</Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" alt="@username" />
                          <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">username</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            user@example.com
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                  <DropdownMenuItem>
                        Log out
                  </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </nav>
                <div className="md:hidden">
                  <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                </div>
              </>
            ) : (
              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                onClick={() => setIsLoggedIn(!isLoggedIn)}
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 py-2">
          <nav className="container mx-auto px-4 flex flex-col space-y-2">
            <Link href="/majors" className="text-gray-300 hover:text-white py-2">Majors</Link>
            <Link href="/compare" className="text-gray-300 hover:text-white py-2">Compare</Link>
            <Link href="/resources" className="text-white font-semibold py-2">Resources</Link>
            <Link href="/profile" className="text-gray-300 hover:text-white py-2">Profile</Link>
            <Link href="/settings" className="text-gray-300 hover:text-white py-2">Settings</Link>
            <Button variant="ghost" className="justify-start px-0 hover:bg-transparent hover:text-white">
              Log out
            </Button>
          </nav>
        </div>
      )}

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

      <footer className="bg-black py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 DegreeCompass. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}