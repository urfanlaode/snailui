import { fetcher } from '@/lib/fetcher'
import { Category, Product, ProductsResponse, ProductsParams } from './types'

export async function getProducts(params?: ProductsParams & { category?: string }) {
  if (params?.category) {
    return fetcher<ProductsResponse>(`/products/category/${params.category}`, { params })
  }
  return fetcher<ProductsResponse>('/products', { params })
}

export async function getProduct(id: number): Promise<Product> {
  return fetcher<Product>(`/products/${id}`)
}

export async function getCategories(): Promise<Category[]> {
  return fetcher<Category[]>('/products/categories')
}

export async function getProductsByCategory(category: string): Promise<ProductsResponse> {
  return fetcher<ProductsResponse>(`/products/category/${category}`)
}
