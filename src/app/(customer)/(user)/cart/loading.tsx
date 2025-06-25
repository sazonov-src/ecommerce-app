import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <Skeleton className="h-16 w-16 rounded-full" />
    </div>
  );
} 