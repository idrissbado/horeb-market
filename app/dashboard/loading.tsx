import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar skeleton */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r bg-white">
          <div className="flex h-16 items-center border-b px-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-32 ml-3" />
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="px-3 py-4">
              <div className="flex items-center gap-3 mb-6 px-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <div className="space-y-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full rounded-md" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="md:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <div className="flex flex-1 justify-between px-4 md:px-6">
            <div className="flex flex-1 items-center">
              <Skeleton className="h-8 w-8 md:hidden" />
            </div>
            <div className="ml-4 flex items-center md:ml-6 gap-3">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>

        <main className="py-6 px-4 sm:px-6 md:px-8">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-10 w-32" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>

            <Skeleton className="h-8 w-32 mt-8" />
            <Skeleton className="h-64 rounded-xl" />
          </div>
        </main>
      </div>
    </div>
  )
}

