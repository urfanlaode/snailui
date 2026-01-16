'use client'

import ItemNotFound from '@/components/ui/ItemNotFound'
import ProductCard from '@/components/ui/ProductCard'
import ProductCardSkeleton from '@/components/ui/ProductCard.skeleton'
import ProductHeader from '@/components/ui/ProductHeader'
import { useCategories, useInfiniteProducts } from '@/features/products/hooks'
import { useMemo, useState } from 'react'

export default function ProductsPage() {
  const [category, setCategory] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

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
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <ProductHeader
          total={Number(total)}
          categories={categories}
          category={category}
          onSelectCategory={setCategory}
          sortOrder={sortOrder}
          onChangeSortOrder={setSortOrder}
        />
      </header>
      <hr className="mb-6" />
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}
      {!isLoading && allProducts.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div ref={sentinelRef} className="h-10" />
          {isFetchingNextPage && <div className="flex justify-center mt-4 text-muted">Loading more...</div>}
        </>
      )}
      {!isLoading && allProducts.length <= 0 && <ItemNotFound message="No Results" />}
    </div>
  )
}
