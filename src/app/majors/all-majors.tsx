'use client'

import { useState, useEffect, useRef } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Compass, Search } from "lucide-react"
import axios from 'axios';
import { motion } from "framer-motion"


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

const defaultMajors = {
  "data": [
    {
      "category_name": "工学",
      "major_id": "081103",
      "major_name": "港口航道与海岸工程",
      "subject_id": "0811",
      "subject_name": "水利"
    },
    {
      "category_name": "工学",
      "major_id": "081104T",
      "major_name": "水务工程",
      "subject_id": "0811",
      "subject_name": "水利"
    },
    {
      "category_name": "工学",
      "major_id": "081201",
      "major_name": "测绘工程",
      "subject_id": "0812",
      "subject_name": "测绘"
    },
    {
      "category_name": "工学",
      "major_id": "081202",
      "major_name": "遥感科学与技术",
      "subject_id": "0812",
      "subject_name": "测绘"
    },
    {
      "category_name": "工学",
      "major_id": "081203T",
      "major_name": "导航工程",
      "subject_id": "0812",
      "subject_name": "测绘"
    },
    {
      "category_name": "工学",
      "major_id": "081204T",
      "major_name": "地理国情监测",
      "subject_id": "0812",
      "subject_name": "测绘"
    },
    {
      "category_name": "工学",
      "major_id": "081301",
      "major_name": "化学工程与工艺",
      "subject_id": "0813",
      "subject_name": "化工与制药"
    },
    {
      "category_name": "工学",
      "major_id": "081302",
      "major_name": "制药工程",
      "subject_id": "0813",
      "subject_name": "化工与制药"
    },
    {
      "category_name": "工学",
      "major_id": "081303T",
      "major_name": "资源循环科学与工程",
      "subject_id": "0813",
      "subject_name": "化工与制药"
    },
    {
      "category_name": "工学",
      "major_id": "081304T",
      "major_name": "能源化学工程",
      "subject_id": "0813",
      "subject_name": "化工与制药"
    },
    {
      "category_name": "工学",
      "major_id": "081305T",
      "major_name": "化学工程与工业生物工程",
      "subject_id": "0813",
      "subject_name": "化工与制药"
    },
    {
      "category_name": "工学",
      "major_id": "081401",
      "major_name": "地质工程",
      "subject_id": "0814",
      "subject_name": "地质"
    },
    {
      "category_name": "工学",
      "major_id": "081402",
      "major_name": "勘查技术与工程",
      "subject_id": "0814",
      "subject_name": "地质"
    },
    {
      "category_name": "工学",
      "major_id": "081403",
      "major_name": "资源勘查工程",
      "subject_id": "0814",
      "subject_name": "地质"
    },
    {
      "category_name": "工学",
      "major_id": "081404T",
      "major_name": "地下水科学与工程",
      "subject_id": "0814",
      "subject_name": "地质"
    },
    {
      "category_name": "工学",
      "major_id": "081501",
      "major_name": "采矿工程",
      "subject_id": "0815",
      "subject_name": "矿业"
    },
    {
      "category_name": "工学",
      "major_id": "081502",
      "major_name": "石油工程",
      "subject_id": "0815",
      "subject_name": "矿业"
    },
    {
      "category_name": "工学",
      "major_id": "081503",
      "major_name": "矿物加工工程",
      "subject_id": "0815",
      "subject_name": "矿业"
    },
    {
      "category_name": "工学",
      "major_id": "081504",
      "major_name": "油气储运工程",
      "subject_id": "0815",
      "subject_name": "矿业"
    },
    {
      "category_name": "工学",
      "major_id": "081505T",
      "major_name": "矿物资源工程",
      "subject_id": "0815",
      "subject_name": "矿业"
    }
  ],
  "pagination": {
    "page": 14,
    "page_size": 20,
    "total_count": 512,
    "total_pages": 26
  }
};

export default function AllMajorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [visibleMajors, setVisibleMajors] = useState<Major[]>(defaultMajors.data)
  const [loading, setLoading] = useState(false)
  const loader = useRef(null)
  const [currentPage, setCurrentPage] = useState<number>(defaultMajors.pagination.page)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [totalPages, setTotalPages] = useState<number>(defaultMajors.pagination.total_pages)

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
            <Link href="/" className="flex items-center space-x-2">
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


        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredMajors.map((major) => (
                <Link 
                  key={major.major_id} 
                  href={`/detail/${major.major_id}`} 
                  className="text-purple-400 hover:text-purple-300 transition-colors text-sm p-2"
                >
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