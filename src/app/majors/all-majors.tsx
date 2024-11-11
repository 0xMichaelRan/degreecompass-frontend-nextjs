'use client'

import { useState, useEffect, useRef } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Compass, Search } from "lucide-react"
import axios from 'axios';

interface Major {
  category_name: string;
  major_id: string;
  major_name: string;
  subject_id: string;
  subject_name: string;
}

interface Pagination {
  page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
}

interface MajorsResponse {
  data: Major[];
  pagination: Pagination;
}

const getMajors = async (page: number = 1, pageSize: number = 20): Promise<MajorsResponse> => {
  const response = await fetch(
    `http://localhost:5000/api/majors?page=${page}&page_size=${pageSize}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch majors');
  }
  return response.json();
};

const categories = ['All', 'STEM', 'Business', 'Social Sciences', 'Humanities', 'Health Sciences', 'Arts']

export default function AllMajorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [visibleMajors, setVisibleMajors] = useState<Major[]>([])
  const [loading, setLoading] = useState(false)
  const loader = useRef(null)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);

  const loadMoreMajors = async () => {
    if (currentPage >= totalPages) {
      setHasMore(false);
      return;
    }

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const result = await getMajors(nextPage);
      setVisibleMajors(prev => [...prev, ...result.data]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < result.pagination.total_pages);
    } catch (error) {
      console.error('Error loading more majors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialMajors = async () => {
      try {
        const result = await getMajors(1);
        setVisibleMajors(result.data);
        setTotalPages(result.pagination.total_pages);
        setCurrentPage(1);
      } catch (error) {
        console.error('Error fetching initial majors:', error);
      }
    };

    fetchInitialMajors();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMoreMajors()
        }
      },
      { threshold: 1 }
    )

    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => observer.disconnect()
  }, [loading, hasMore])

  const filteredMajors = visibleMajors.filter(major =>
    major.major_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || major.category_name === selectedCategory)
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
            <Link href="/majors">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                Get Started
              </Button>
            </Link>
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
                className={`${selectedCategory === category
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
                <Link key={major.major_id} href={`/detail/${major.major_id}`} className="text-purple-400 hover:text-purple-300 transition-colors">
                  {major.major_name}
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