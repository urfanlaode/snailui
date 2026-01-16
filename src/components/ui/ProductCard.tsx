import { Product } from '@/features/products/types'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white border border-border rounded-xl shadow-sm hover:shadow-lg transition-shadow p-4 flex flex-col relative"
    >
      {product.discountPercentage > 0 && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{Math.round(product.discountPercentage)}%
        </span>
      )}
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={300}
        height={200}
        className="w-full h-48 object-contain mb-4"
        loading="lazy"
      />
      <h2 className="text-base font-semibold mb-1">{product.title}</h2>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg font-bold">
          ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
        </span>
        {product.discountPercentage > 0 && (
          <span className="text-sm text-muted line-through">${product.price.toFixed(2)}</span>
        )}
      </div>
    </Link>
  )
}
