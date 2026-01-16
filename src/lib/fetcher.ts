type FetcherOptions = RequestInit & {
  params?: Record<string, any>
}

class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data: any
  ) {
    super(`API Error ${status}: ${statusText}`)
  }
}

export async function fetcher<T>(url: string, options?: FetcherOptions): Promise<T> {
  const { params, ...fetchOptions } = options || {}

  // Build URL with query params
  const baseUrl = 'https://dummyjson.com'
  let fullUrl = `${baseUrl}${url}`
  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value))
    })
    fullUrl = `${baseUrl}${url}?${searchParams.toString()}`
  }

  const response = await fetch(fullUrl, {
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    ...fetchOptions,
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new ApiError(response.status, response.statusText, data)
  }

  return response.json()
}
