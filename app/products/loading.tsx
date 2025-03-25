import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsLoading() {
  return (
    <div className="container py-8">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-8">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>

      <Skeleton className="h-10 w-48 mb-8" />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar skeleton */}
        <div className="w-full md:w-64 space-y-6 hidden md:block">
          <Skeleton className="h-8 w-32 mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>

          <Skeleton className="h-8 w-32 mt-6 mb-4" />
          <Skeleton className="h-12 w-full rounded-lg" />

          <Skeleton className="h-8 w-32 mt-6 mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>

        {/* Products grid skeleton */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <Skeleton className="w-full sm:w-64 h-10 rounded-full" />
            <div className="flex gap-2 w-full sm:w-auto">
              <Skeleton className="w-32 h-10 rounded-full" />
              <Skeleton className="w-10 h-10 rounded-full md:hidden" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-6 w-3/4" />
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-3 w-8 ml-1" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


  