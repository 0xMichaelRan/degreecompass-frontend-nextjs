'use client'

import { useState, useEffect } from 'react'
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

interface Category {
  category_id: string;
  category_name: string;
}

const PAGE_SIZE = 18;

const getMajors = async (page: number = 1, pageSize: number = PAGE_SIZE, categoryId?: string): Promise<MajorsResponse> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}`;
  const categoryParam = categoryId ? `&category=${categoryId}` : '';
  const response = await fetch(
    `${apiUrl}/api/majors?page=${page}&page_size=${pageSize}${categoryParam}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch majors');
  }
  return response.json();
};

export default function AllMajorsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("")
  const [visibleMajors, setVisibleMajors] = useState<Major[]>([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const fetchMajorsByCategory = async (categoryId: string) => {
    setLoading(true);
    setCurrentPage(1);
    try {
      const data = await getMajors(1, PAGE_SIZE, categoryId);
      setVisibleMajors(data.data);
      setHasMore(data.pagination.total_pages > 1);
    } catch (error) {
      console.error('Error fetching majors by category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category.category_name);
    setSelectedCategoryId(category.category_id);
    fetchMajorsByCategory(category.category_id);
  };

  useEffect(() => {
    const fetchInitialMajors = async () => {
      try {
        const result = await getMajors(1);
        const uniqueMajors = Array.from(new Map(result.data.map(major => [major.major_id, major])).values()) as Major[];
        setVisibleMajors(uniqueMajors);
        setTotalPages(result.pagination.total_pages);
      } catch (error) {
        console.error('Error fetching initial majors:', error);
      }
    };

    fetchInitialMajors();
  }, []);

  const filteredMajors = visibleMajors.filter(major =>
    major.major_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMoreMajors = async () => {
    if (!loading && hasMore) {
      setLoading(true);
      try {
        const nextPage = currentPage + 1;
        const result = await getMajors(nextPage, PAGE_SIZE, selectedCategoryId || undefined);
        setVisibleMajors(prev => [...prev, ...result.data]);
        setCurrentPage(nextPage);
        setHasMore(nextPage < result.pagination.total_pages);
      } catch (error) {
        console.error('Error fetching more majors:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleScroll = async () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      loadMoreMajors();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);

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
            key={category.category_id}
            onClick={() => handleCategoryClick(category)}
            variant={selectedCategory === category.category_name ? "default" : "outline"}
            className={`${selectedCategory === category.category_name
                ? "bg-gradient-to-r from-pink-500 to-yellow-500 text-white"
                : "text-gray-300 border-gray-600 hover:bg-white hover:bg-opacity-10"
              } transition-all duration-300 ease-in-out transform hover:scale-105`}
          >
            {category.category_name}
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
                key={`${major.major_id}-${major.category_name}`}
                href={`/detail/${major.major_id}`}
                className="text-purple-400 hover:text-purple-300 transition-colors text-sm p-2"
              >
                {major.major_name}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {hasMore && (
        <div className="text-center mt-4">
          <a
            onClick={loadMoreMajors}
            className="text-purple-400 hover:text-purple-300 cursor-pointer"
          >
            Load More
          </a>
        </div>
      )}

      {loading && <p className="text-center mt-4">Loading majors...</p>}
    </main>

  )
}