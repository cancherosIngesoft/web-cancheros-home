import { Skeleton } from "@/components/ui/skeleton"

const LoadingReservation=()=> {
  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg shadow-sm animate-pulse">
      <Skeleton className="w-24 h-24 rounded-lg" />
      <div className="flex-1 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-9 w-[100px]" />
        <Skeleton className="h-9 w-[100px]" />
      </div>
    </div>
  )
}

export default LoadingReservation