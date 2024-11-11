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
      
      if (nextPage > 2 && visibleMajors.length < (nextPage - 1) * result.pagination.page_size) {
        const missingPages = [];
        for (let i = 1; i < nextPage; i++) {
          missingPages.push(getMajors(i));
        }
        const results = await Promise.all(missingPages);
        const allPreviousMajors = results.flatMap(result => result.data);
        setVisibleMajors([...allPreviousMajors, ...result.data]);
      } else {
        setVisibleMajors(prev => [...prev, ...result.data]);
      }
      
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

  )
}