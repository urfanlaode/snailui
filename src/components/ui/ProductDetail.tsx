import { Product } from '@/features/products/types'
import { Shield, Star, Truck, Undo } from 'lucide-react'
import Image from 'next/image'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={400}
            height={400}
            className="object-contain rounded"
            priority
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-100 text-xs font-bold px-2 py-1 rounded uppercase">{product.category}</span>
            <span className="text-muted text-xs">by {product.brand}</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500 flex gap-2">
              <div className="flex">
                {Array.from({ length: Math.round(product.rating) }).map((_, i) => (
                  <Star key={i} className="h-5" />
                ))}
              </div>
              <span className="text-muted">({product.rating} reviews)</span>
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold">
              ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-muted line-through">${product.price.toFixed(2)}</span>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Save {Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>
          <div className="mb-2">
            <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            <span className="text-muted text-xs ml-2">({product.stock} units available)</span>
          </div>
          <div className="mb-4 text-muted">{product.description}</div>
          <div className="flex gap-2 mb-4">
            <div className="bg-gray-100 px-3 py-2 rounded text-xs flex items-center gap-1">
              <span>
                <Truck className="h-4" />
              </span>{' '}
              {product.shippingInformation}
            </div>
            <div className="bg-gray-100 px-3 py-2 rounded text-xs flex items-center gap-1">
              <span>
                <Shield className="h-4" />
              </span>{' '}
              {product.warrantyInformation}
            </div>
            <div className="bg-gray-100 px-3 py-2 rounded text-xs flex items-center gap-1">
              <span>
                <Undo className="h-4" />
              </span>{' '}
              {product.returnPolicy}
            </div>
          </div>
          <button className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
      {/* Customer Reviews Section */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">Customer Reviews</h2>
        <div className="space-y-4">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, idx) => (
              <div key={idx} className="bg-gray-50 rounded p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{review.reviewerName}</span>
                  <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                  <span className="text-xs text-muted">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <p className="text-sm">{review.comment}</p>
              </div>
            ))
          ) : (
            <div className="text-muted text-sm">No reviews yet.</div>
          )}
        </div>
      </div>
    </>
  )
}
