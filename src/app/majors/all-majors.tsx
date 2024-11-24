'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from "next/link"
import { useSearchParams, useRouter } from 'next/navigation'
import debounce from 'lodash/debounce'
import axios from 'axios'
import { CategoryButtons } from '@/components/majors/CategoryButtons'
import { SearchBar } from '@/components/majors/SearchBar'
import { MajorsList } from '@/components/majors/MajorsList'
import { LoadMoreButton } from '@/components/majors/LoadMoreButton'

// Types
interface Major {
  category_name: string
  major_id: string
  major_name: string
  subject_id: string
  subject_name: string
}

interface Pagination {
  page: number
  page_size: number
  total_count: number
  total_pages: number
}

interface MajorsResponse {
  data: Major[]
  pagination: Pagination
}

interface Category {
  category_id: string
  category_name: string
}

// Constants
const PAGE_SIZE = 18
const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api`

// API Functions
const fetchMajors = async (page: number = 1, pageSize: number = PAGE_SIZE, categoryId?: string): Promise<MajorsResponse> => {
  const categoryParam = categoryId ? `&category=${categoryId}` : ''
  const { data } = await axios.get<MajorsResponse>(
    `${API_BASE_URL}/majors?page=${page}&page_size=${pageSize}${categoryParam}`
  )
  return data
}

const searchMajorsApi = async (keyword: string, page: number, pageSize: number): Promise<MajorsResponse> => {
  const { data } = await axios.get<MajorsResponse>(
    `${API_BASE_URL}/majors/search?keyword=${encodeURIComponent(keyword)}&page=${page}&page_size=${pageSize}`
  )
  return data
}

// Component
export default function AllMajorsPage() {
  // Hooks
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // State
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    searchParams.get('categoryId') || ""
  )
  const [visibleMajors, setVisibleMajors] = useState<Major[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories`)
        if (!response.ok) throw new Error('Failed to fetch categories')
        const data = await response.json()
        setCategories(data.data)

        // **New Addition: Handle Initial Category Selection**
        if (selectedCategoryId) {
          const initialCategory = data.data.find(cat => cat.category_id === selectedCategoryId)
          if (initialCategory) {
            handleCategorySelect(initialCategory.category_id, initialCategory.category_name)
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handlers
  const handleSearch = useCallback(
    debounce(async (keyword: string) => {
      if (!keyword.trim()) { 
        const result = await fetchMajors(1, PAGE_SIZE, selectedCategoryId)
        setVisibleMajors(result.data)
        setHasMore(result.pagination.total_pages > 1)
        return
      }

      setLoading(true)
      try {
        const result = await searchMajorsApi(keyword, 1, PAGE_SIZE)
        setVisibleMajors(result.data)
        setCurrentPage(1)
        setHasMore(result.pagination.total_pages > 1)
      } catch (error) {
        console.error('Error searching majors:', error)
      } finally {
        setLoading(false)
      }
    }, 300),
    [selectedCategoryId]
  )

  const handleCategorySelect = async (categoryId: string, categoryName: string = "") => {
    setSelectedCategory(categoryName)
    setSelectedCategoryId(categoryId)
    setLoading(true)
    
    try {
      const data = await fetchMajors(1, PAGE_SIZE, categoryId)
      setVisibleMajors(data.data)
      setCurrentPage(1)
      setHasMore(data.pagination.total_pages > 1)
      router.push(categoryId ? `/majors?categoryId=${categoryId}` : '/majors')
    } catch (error) {
      console.error('Error fetching majors by category:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMoreMajors = async () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    const nextPage = currentPage + 1
    
    try {
      const result = searchTerm
        ? await searchMajorsApi(searchTerm, nextPage, PAGE_SIZE)
        : await fetchMajors(nextPage, PAGE_SIZE, selectedCategoryId)
      
      setVisibleMajors(prev => [...prev, ...result.data])
      setCurrentPage(nextPage)
      setHasMore(nextPage < result.pagination.total_pages)
    } catch (error) {
      console.error('Error loading more majors:', error)
    } finally {
      setLoading(false)
    }
  }

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.pageYOffset >= 
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreMajors()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading, hasMore, currentPage])

  return (
    <main className="container mx-auto px-4 py-12">
      <CategoryButtons 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      
      <SearchBar 
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          handleSearch(e.target.value)
        }}
      />

      <MajorsList majors={visibleMajors} />

      {hasMore && (
        <LoadMoreButton onClick={loadMoreMajors} loading={loading} />
      )}
    </main>
  )
}