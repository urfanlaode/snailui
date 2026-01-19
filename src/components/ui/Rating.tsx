import { Star } from 'lucide-react'

interface RatingProps {
  rating: number
  size?: number
}

export default function Rating({ rating, size = 20 }: RatingProps) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={i < Math.round(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
        />
      ))}
    </div>
  )
}
