export default function ProductDetailSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center">
          <div className="w-100 h-100 bg-gray-200 rounded" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-gray-200 h-6 w-24 rounded" />
            <div className="bg-gray-100 h-4 w-16 rounded" />
          </div>
          <div className="h-8 bg-gray-200 rounded mb-2 w-3/4" />
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-5 w-5 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="bg-gray-100 h-4 w-20 rounded" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 bg-gray-200 w-24 rounded" />
            <div className="h-6 bg-gray-100 w-16 rounded" />
            <div className="h-6 bg-red-200 w-16 rounded" />
          </div>
          <div className="mb-2">
            <div className="h-5 bg-gray-200 w-32 rounded" />
          </div>
          <div className="mb-4">
            <div className="h-4 bg-gray-100 w-full rounded mb-1" />
            <div className="h-4 bg-gray-100 w-5/6 rounded" />
          </div>
          <div className="flex gap-2 mb-4">
            <div className="bg-gray-100 px-6 py-4 rounded w-32 h-8" />
            <div className="bg-gray-100 px-6 py-4 rounded w-32 h-8" />
            <div className="bg-gray-100 px-6 py-4 rounded w-32 h-8" />
          </div>
          <div className="bg-green-200 w-32 h-10 rounded" />
        </div>
      </div>
      {/* Customer Reviews Section */}
      <div className="mt-8">
        <div className="h-6 bg-gray-200 w-48 rounded mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="bg-gray-50 rounded p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-100 rounded" />
                <div className="h-3 w-16 bg-gray-100 rounded" />
              </div>
              <div className="h-4 bg-gray-100 w-3/4 rounded mb-1" />
              <div className="h-4 bg-gray-100 w-2/3 rounded" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
