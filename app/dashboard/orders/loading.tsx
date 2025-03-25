import { Skeleton } from "@/components/ui/skeleton"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function OrdersLoading() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="w-full md:w-64 h-10 rounded-full" />
        </div>

        {/* Tabs skeleton */}
        <Skeleton className="h-10 w-full max-w-md rounded-full" />

        {/* Orders skeleton */}
        <div className="space-y-4 mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="p-4 bg-muted/30">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Order details skeleton (expanded view) */}
              {i === 0 && (
                <div className="p-4 border-t">
                  <div className="space-y-4">
                    <div>
                      <Skeleton className="h-6 w-24 mb-2" />
                      <div className="space-y-3">
                        {Array.from({ length: 2 }).map((_, j) => (
                          <div key={j} className="flex items-center gap-3">
                            <Skeleton className="h-16 w-16 rounded-md" />
                            <div className="flex-1">
                              <Skeleton className="h-5 w-48 mb-1" />
                              <Skeleton className="h-4 w-32" />
                            </div>
                            <Skeleton className="h-5 w-20" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 pt-4 border-t">
                      <div className="flex-1">
                        <Skeleton className="h-6 w-32 mb-2" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-40" />
                          <Skeleton className="h-4 w-56" />
                          <Skeleton className="h-4 w-48" />
                          <Skeleton className="h-4 w-40" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <Skeleton className="h-6 w-40 mb-2" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-48" />
                          <Skeleton className="h-4 w-56" />
                          <Skeleton className="h-4 w-40" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <Skeleton className="h-9 w-28 rounded-md" />
                      <div className="space-x-2">
                        <Skeleton className="h-9 w-28 rounded-md inline-block" />
                        <Skeleton className="h-9 w-28 rounded-md inline-block" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

