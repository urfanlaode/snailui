import { Category } from '@/features/products/types'
import { SortOrder } from '@/types'
import { ArrowDown, ArrowDownUp, ArrowUp, List } from 'lucide-react'

interface ProductFilterProps {
  total: number
  category: string
  onSelectCategory: (category: string) => void
  categories: Category[]
  sortOrder?: SortOrder
  onChangeSortOrder: (sort?: SortOrder) => void
}

export default function ProductFilter({
  total,
  category,
  categories,
  onSelectCategory,
  sortOrder,
  onChangeSortOrder,
}: ProductFilterProps) {
  const isPriceSort = sortOrder && sortOrder.sortBy === 'price'
  const isAsc = isPriceSort && sortOrder.order === 'asc'
  const isDesc = isPriceSort && sortOrder.order === 'desc'

  const buttonText = (
    <>
      <span className="mr-2">
        {isAsc ? (
          <ArrowUp className="h-3 w-5" />
        ) : isDesc ? (
          <ArrowDown className="h-3 w-5" />
        ) : (
          <ArrowDownUp className="h-3 w-5" />
        )}
      </span>
      {isAsc ? 'Price: Low to High' : isDesc ? 'Price: High to Low' : 'Sort by Price'}
    </>
  )

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <span className="flex items-center gap-2">
        <List />
        {total} products
      </span>
      <div className="flex gap-2">
        {/*Filter*/}
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

        {/*Sort*/}
        <button
          type="button"
          className={`flex items-center rounded px-4 py-2 text-sm border transition-colors
            ${
              isPriceSort
                ? 'bg-[#45776b] text-white border-[#45776b]'
                : 'bg-white text-[#2d3a3a] border-[#e6e5e2] hover:bg-gray-50'
            }
          `}
          onClick={() => {
            if (!isPriceSort) {
              onChangeSortOrder({ sortBy: 'price', order: 'desc' })
            } else if (isDesc) {
              onChangeSortOrder({ sortBy: 'price', order: 'asc' })
            } else {
              onChangeSortOrder(undefined)
            }
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}
