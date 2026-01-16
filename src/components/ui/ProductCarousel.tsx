'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface ProductCarouselProps {
  title: string
  images: string[]
}

export default function ProductCarousel({ title, images = [] }: ProductCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
  const selectImage = (idx: number) => setCurrentImage(idx)

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center">
      <div className="relative w-full flex items-center justify-center">
        <button
          onClick={prevImage}
          className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-60 z-10"
          aria-label="Previous image"
          disabled={images.length <= 1}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <Image
          src={images[currentImage]}
          alt={title}
          width={400}
          height={400}
          className="object-contain rounded"
          priority
        />
        <button
          onClick={nextImage}
          className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-60 z-10"
          aria-label="Next image"
          disabled={images.length <= 1}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <div className="flex gap-2 mt-4 overflow-x-auto">
        {images.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={`${title} ${i + 1}`}
            width={60}
            height={60}
            onClick={() => selectImage(i)}
            className={`cursor-pointer rounded border-2 ${currentImage === i ? 'border-primary' : 'border-transparent'} hover:border-primary`}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  )
}
