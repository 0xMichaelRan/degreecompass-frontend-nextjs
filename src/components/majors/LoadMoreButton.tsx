import { Button } from "@/components/ui/button"

interface LoadMoreButtonProps {
  onClick: () => void
  loading: boolean
}

export function LoadMoreButton({ onClick, loading }: LoadMoreButtonProps) {
  return (
    <div className="text-center mt-4">
      <Button
        onClick={onClick}
        disabled={loading}
        variant="ghost"
        className="text-purple-400 hover:text-purple-300"
      >
        {loading ? 'Loading...' : 'Load More'}
      </Button>
    </div>
  )
} 