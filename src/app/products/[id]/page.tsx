'use client'

import ItemNotFound from '@/components/ItemNotFound'
import ProductDetail from '@/components/ProductDetail'
import ProductDetailSkeleton from '@/components/ProductDetail.skeleton'
import { useProduct } from '@/features/products/hooks'
import { use } from 'react'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: product, isLoading } = useProduct(Number(id))

  return (
    <div className="max-w-6xl mx-auto">
      {isLoading && <ProductDetailSkeleton />}
      {!isLoading && product && <ProductDetail product={product} />}
      {/*{!isLoading && !product && <ItemNotFound message="Product Not Found" />}*/}
    </div>
  )
}
