import { FIVE_MINUTES_MS, TEN_MINUTES_MS } from '@/constants'
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

export function useInfiniteProducts(category: string, sortOrder: 'asc' | 'desc') {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', category, sortOrder],
    queryFn: ({ pageParam = 0 }) =>
      getProducts({
        skip: pageParam,
        limit: 30,
        sortBy: 'price',
        order: sortOrder,
        category: category || undefined,
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
