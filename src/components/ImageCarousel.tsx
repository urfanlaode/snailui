import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'

interface ImageCarouselProps {
  images: string[]
  title: string
}

const ImageCarousel = ({ images, title }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index))
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
        {!loadedImages.has(currentIndex) && <div className="absolute inset-0 skeleton-shimmer" />}
        <Image
          src={images[currentIndex]}
          width={400}
          height={400}
          alt={`${title} - Image ${currentIndex + 1}`}
          loading={currentIndex === 0 ? 'eager' : 'lazy'}
          onLoad={() => handleImageLoad(currentIndex)}
          className={`w-full h-full object-contain transition-opacity duration-300  ${
            loadedImages.has(currentIndex) ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {images.length > 1 && (
          <>
            <Button
              size="icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 shadow-lg cursor-pointer"
              onClick={goToPrevious}
              aria-label="Previous image"
              variant="ghost"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 shadow-lg cursor-pointer"
              onClick={goToNext}
              aria-label="Next image"
              variant="ghost"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'cursor-pointer shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all',
                index === currentIndex
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-transparent hover:border-muted-foreground/30'
              )}
              aria-label={`Go to image ${index + 1}`}
            >
              <Image
                src={image}
                width={60}
                height={60}
                alt={`${title} thumbnail ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Navigation Dots (Mobile) */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 sm:hidden">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary w-4' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageCarousel
