import { motion } from "framer-motion"
import { Button } from "../ui/button"

interface CategoryButtonsProps {
  categories: Category[]
  selectedCategory: string
  onCategorySelect: (categoryId: string, categoryName: string) => void
}

export function CategoryButtons({ categories, selectedCategory, onCategorySelect }: CategoryButtonsProps) {
  return (
    <motion.div
      className="mb-8 flex flex-wrap justify-center gap-2"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Button
        onClick={() => onCategorySelect("", "")}
        variant={selectedCategory === "" ? "default" : "outline"}
        className={`${selectedCategory === ""
          ? "bg-gradient-to-r from-pink-500 to-yellow-500 text-white"
          : "text-gray-300 border-gray-600 hover:bg-white hover:bg-opacity-10"
        } transition-all duration-300 ease-in-out transform hover:scale-105`}
      >
        全部专业
      </Button>
      {categories.map((category) => (
        <Button
          key={category.category_id}
          onClick={() => onCategorySelect(category.category_id, category.category_name)}
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
  )
} 