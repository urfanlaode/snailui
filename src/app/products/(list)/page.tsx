'use client'

import ItemNotFound from '@/components/ItemNotFound'
import ProductCard from '@/components/ProductCard'
import ProductCardSkeleton from '@/components/ProductCard.skeleton'
import ProductFilter from '@/components/ProductFilter'
import { useCategories, useInfiniteProducts } from '@/features/products/hooks'
import { SortOrder } from '@/types'
import { LoaderCircle } from 'lucide-react'
import { useMemo, useState } from 'react'

export default function ProductsPage() {
  const [category, setCategory] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<SortOrder | undefined>(undefined)

  const { data: categories = [] } = useCategories()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteProducts(category, sortOrder)

  const allProducts = useMemo(() => data?.pages.flatMap((page) => page.products) || [], [data])
  const total = data?.pages?.[0]?.total || 0

  const sentinelRef = useMemo(() => {
    if (typeof window === 'undefined') return null
    let ref: HTMLDivElement | null = null
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )
    return (node: HTMLDivElement) => {
      if (ref) observer.unobserve(ref)
      if (node) observer.observe(node)
      ref = node
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4">
      <header className="mb-4 sm:mb-8">
        <ProductFilter
          total={Number(total)}
          categories={categories}
          category={category}
          onSelectCategory={setCategory}
          sortOrder={sortOrder}
          onChangeSortOrder={setSortOrder}
        />
      </header>
      <hr className="mb-4 sm:mb-6" />
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}
      {!isLoading && allProducts.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div ref={sentinelRef} className="h-10" />
          {isFetchingNextPage && (
            <div className="flex justify-center">
              <LoaderCircle className="animate-spin h-6 w-6 mr-2 text-gray-400" />
            </div>
          )}
        </>
      )}
      {!isLoading && allProducts.length <= 0 && <ItemNotFound message="No Results" />}
    </div>
  )
}
