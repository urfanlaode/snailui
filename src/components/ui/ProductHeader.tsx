import { Category } from '@/features/products/types'
import { List } from 'lucide-react'

interface ProductHeaderProps {
  total: number
  category: string
  onSelectCategory: (category: string) => void
  categories: Category[]
  sortOrder: 'asc' | 'desc'
  onChangeSortOrder: (sort: 'asc' | 'desc') => void
}

export default function ProductHeader({
  total,
  category,
  categories,
  onSelectCategory,
  sortOrder,
  onChangeSortOrder,
}: ProductHeaderProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <span className="text-muted flex items-center gap-2">
        <List />
        {total} products
      </span>
      <div className="flex gap-2">
        <select
          value={category}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="border border-border rounded px-4 py-2 bg-white text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => onChangeSortOrder(e.target.value as 'asc' | 'desc')}
          className="border border-border rounded px-4 py-2 bg-white text-sm"
        >
          <option value="asc">Price low to high</option>
          <option value="desc">Price high to low</option>
        </select>
      </div>
    </div>
  )
}
