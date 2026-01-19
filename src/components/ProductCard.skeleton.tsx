export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden relative animate-pulse min-w-65 max-w-[320px]">
      <div className="flex justify-center items-center pt-6 pb-4 px-4 bg-muted">
        <div className="bg-liner-to-r from-gray-100 to-gray-200 rounded-lg w-36 h-55" />
      </div>
      <div className="bg-white px-5 pt-2 pb-4 flex flex-col gap-2">
        <div className="h-3 w-16 bg-gray-100 rounded mb-1" />
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-1" />
        <div className="h-3 w-full bg-gray-100 rounded mb-1" />
        <div className="h-3 w-5/6 bg-gray-100 rounded mb-2" />
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-10 bg-gray-100 rounded" />
          </div>
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  )
}
