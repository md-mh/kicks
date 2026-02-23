// Skeleton loader for product cards during loading state.
export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden animate-pulse">
      <div className="bg-gray-200 aspect-square" />
      <div className="p-3 md:p-4 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-9 bg-gray-200 rounded w-full" />
      </div>
    </div>
  );
}
