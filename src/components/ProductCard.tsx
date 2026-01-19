import { Product } from '@/features/products/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
  const [imageLoaded, setImageLoaded] = useState(false)
  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white rounded-2xl shadow-md transition-transform duration-300 hover:-translate-y-1 flex flex-col overflow-hidden relative"
      style={{ minWidth: 260, maxWidth: 320 }}
    >
      {product.discountPercentage > 0 && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
          -{Math.round(product.discountPercentage)}%
        </span>
      )}
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={180}
        height={180}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
          imageLoaded ? 'image-fade-in' : 'opacity-0'
        }`}
      />
      <div className="bg-white px-5 pt-2 pb-4 flex flex-col gap-1">
        <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider mb-1">{product.category}</span>
        <h2 className="text-base font-semibold mb-1">{product.title}</h2>
        <p className="text-xs text-gray-500 mb-2 truncate">{product.description}</p>
        <div className="flex items-end justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">${discountedPrice}</span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
            )}
          </div>
          {product.stock > 0 && (
            <span className="bg-[#45776b] text-white text-xs font-semibold px-3 py-1 rounded-full">In Stock</span>
          )}
        </div>
      </div>
    </Link>
  )
}
