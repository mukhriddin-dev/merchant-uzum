import type { SkeletonProps, DataCardSkeletonProps } from "./type"

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`shimmer rounded-xl ${className}`} />
}

export function DataCardSkeleton({ className = "" }: DataCardSkeletonProps) {
  return (
    <div className={`w-full max-w-md rounded-[20px] bg-card p-6 shadow-sm ${className}`}>
      <div className="space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-1/3" />
        <div className="flex gap-2 pt-4">
          <Skeleton className="h-10 w-20 rounded-full" />
          <Skeleton className="h-10 w-20 rounded-full" />
          <Skeleton className="h-10 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}
