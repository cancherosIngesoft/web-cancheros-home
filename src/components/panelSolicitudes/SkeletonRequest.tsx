import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonRequest() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 flex items-center gap-6">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <Skeleton className="h-10 w-28" />
      </CardContent>
    </Card>
  )
}

