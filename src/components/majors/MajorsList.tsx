import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface Major {
  major_id: string
  major_name: string
  category_name: string
}

interface MajorsListProps {
  majors: Major[]
}

export function MajorsList({ majors }: MajorsListProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {majors.map((major) => (
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
  )
} 