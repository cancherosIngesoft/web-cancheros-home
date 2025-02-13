import { Card, CardContent } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const SkeletonTeamInfo=()=> {
    return (
      <Card className="border-0 shadow-none">
        <CardContent className="grid gap-6 md:grid-cols-[auto_1fr] items-start p-6">
          <Skeleton className="w-32 h-32 rounded-lg" />
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-[60px]" />
              <Skeleton className="h-5 w-[150px]" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-full max-w-[300px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

export default SkeletonTeamInfo