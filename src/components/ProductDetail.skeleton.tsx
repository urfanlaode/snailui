export default function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left large rectangle */}
      <div className="flex-1">
        <div className="bg-linear-to-r from-gray-100 to-gray-200 rounded-lg w-full h-139" />
      </div>
      {/* Right side skeletons */}
      <div className="flex flex-col gap-4 flex-[1.2]">
        <div className="bg-linear-to-r from-gray-100 to-gray-200 rounded w-28 h-6" />
        <div className="bg-linear-to-r from-gray-100 to-gray-200 rounded w-3/4 h-6" />
        <div className="bg-linear-to-r from-gray-100 to-gray-200 rounded w-full h-16" />
        <div className="bg-linear-to-r from-gray-100 to-gray-200 rounded w-28 h-6" />
      </div>
    </div>
  )
}
