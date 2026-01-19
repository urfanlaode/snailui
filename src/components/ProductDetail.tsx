'use client'

import { Product } from '@/features/products/types'
import { cn } from '@/lib/utils'
import { RotateCcw, Shield, Truck } from 'lucide-react'
import ImageCarousel from './ImageCarousel'
import Rating from './ui/Rating'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageCarousel title={product.title} images={product.images} />
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-muted text-xs font-bold px-3 py-1 rounded-full uppercase">{product.category}</span>
            {product.brand && <span className="text-xs">by {product.brand}</span>}
          </div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center gap-2 mb-2">
            <Rating rating={product.rating} />
            <span className="">({product.rating} reviews)</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold">
              ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="line-through">${product.price.toFixed(2)}</span>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Save {Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>
          <div className="mb-2">
            <span className={cn('font-semibold', product.stock > 0 ? 'text-green-600' : 'text-red-600')}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            <span className="text-xs ml-2">({product.stock} units available)</span>
          </div>
          <div className="mb-4">{product.description}</div>
          <div className="flex gap-2 mb-4">
            <div className="bg-gray-100 px-3 py-2 rounded text-xs flex items-center gap-2">
              <span>
                <Truck className="h-6 text-primary" />
              </span>
              <div>
                <div className="text-primary font-bold text-sm">Shipping</div>
                {product.shippingInformation}
              </div>
            </div>
            <div className="bg-gray-100 px-3 py-2 rounded text-xs flex items-center gap-2">
              <span>
                <Shield className="h-6 text-primary" />
              </span>
              <div>
                <div className="text-primary font-bold text-sm">Warranty</div>
                {product.warrantyInformation}
              </div>
            </div>
            <div className="bg-gray-100 px-3 py-2 rounded text-xs flex items-center gap-2">
              <span>
                <RotateCcw className="h-6 text-primary" />
              </span>
              <div>
                <div className="text-primary font-bold text-sm">Returns</div>
                {product.returnPolicy}
              </div>
            </div>
          </div>
          <button className="bg-primary text-white px-6 py-2 rounded font-bold transition cursor-pointer text-sm">
            Add to Cart
          </button>

          {/* Customer Reviews Section */}
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-2">Customer Reviews</h2>
            <div className="space-y-4">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, idx) => (
                  <div key={idx} className="bg-muted rounded p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{review.reviewerName}</span>
                      <Rating key={`rating-review-${idx}`} rating={review.rating} size={12} />
                      <span className="text-xs">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-sm">No reviews yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
