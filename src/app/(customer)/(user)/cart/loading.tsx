import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
      <Skeleton className="h-16 w-16 rounded-full" />
    </div>
  );
}
