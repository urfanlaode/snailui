export default function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-border rounded-xl shadow-sm p-4 flex flex-col relative animate-pulse">
      <div className="absolute top-3 left-3 w-12 h-5 bg-gray-200 rounded" />
      <div className="w-full h-48 bg-gray-200 rounded mb-4" />
      <div className="h-5 bg-gray-200 rounded mb-2 w-3/4" />
      <div className="flex items-center gap-2 mb-1">
        <div className="h-5 bg-gray-200 rounded w-16" />
        <div className="h-4 bg-gray-100 rounded w-10" />
      </div>
    </div>
  )
}
