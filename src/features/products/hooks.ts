import { FIVE_MINUTES_MS, TEN_MINUTES_MS } from '@/constants'
import { SortOrder } from '@/types'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getCategories, getProduct, getProducts, getProductsByCategory } from './api'
import { ProductsParams } from './types'

export function useProducts(params?: ProductsParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
    staleTime: FIVE_MINUTES_MS,
  })
}

export function useInfiniteProducts(category: string, sortOrder?: SortOrder) {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', category, sortOrder],
    queryFn: ({ pageParam = 0 }) =>
      getProducts({
        skip: pageParam,
        limit: 24,
        category: category || undefined,
        ...(sortOrder ?? {}),
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.reduce((sum, page) => sum + page.products.length, 0)
      return totalLoaded < lastPage.total ? totalLoaded : undefined
    },
    staleTime: FIVE_MINUTES_MS,
  })
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    staleTime: FIVE_MINUTES_MS,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: TEN_MINUTES_MS,
  })
}

export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => getProductsByCategory(category),
    staleTime: FIVE_MINUTES_MS,
  })
}
