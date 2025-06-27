import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => (
  <>
    <div className="scrollbar-hide flex space-x-3 overflow-x-auto py-2">
      {[...Array(4)].map((_, index) => (
        <Skeleton key={index} className="h-12 w-28 shrink-0 rounded-xl" />
      ))}
    </div>
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Skeleton className="h-16 w-16 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    ))}
  </div>
  </>
);

export default LoadingSkeleton;
