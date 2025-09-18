interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  variant?: "text" | "rectangular" | "circular";
}

export function Skeleton({
  className = "",
  width = "100%",
  height = "1rem",
  variant = "text",
}: SkeletonProps) {
  const baseClasses = "skeleton bg-gray-200 rounded";

  const variantClasses = {
    text: "h-4",
    rectangular: "rounded-md",
    circular: "rounded-full",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
    />
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="relative bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-all duration-500">
      {/* Header skeleton */}
      <div className="bg-gray-50 border-b border-gray-200/50 px-6 py-4">
        <div className="grid grid-cols-4 gap-4">
          <Skeleton width="80%" height="1.5rem" />
          <Skeleton width="60%" height="1.5rem" />
          <Skeleton width="70%" height="1.5rem" />
          <Skeleton width="50%" height="1.5rem" />
        </div>
      </div>

      {/* Rows skeleton */}
      <div className="divide-y divide-gray-200/50">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="px-6 py-4">
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="space-y-2">
                <Skeleton width="85%" height="1rem" />
                <Skeleton width="60%" height="0.75rem" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton variant="circular" width="2rem" height="2rem" />
                <Skeleton width="70%" height="1rem" />
              </div>
              <Skeleton
                width="80px"
                height="2rem"
                variant="rectangular"
                className="rounded-full"
              />
              <Skeleton width="60%" height="1rem" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative bg-white border border-gray-200 rounded-xl p-4 shadow-lg transition-all duration-500"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 space-y-2">
              <Skeleton width="80%" height="1.25rem" />
              <div className="flex items-center gap-2">
                <Skeleton variant="circular" width="1.5rem" height="1.5rem" />
                <Skeleton width="60%" height="0.875rem" />
              </div>
            </div>
            <Skeleton width="60px" height="1.5rem" />
          </div>
          <Skeleton
            width="100px"
            height="2rem"
            variant="rectangular"
            className="rounded-full"
          />
        </div>
      ))}
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-lg transition-all duration-500"
        >
          <div className="flex items-center gap-4">
            <Skeleton variant="circular" width="3rem" height="3rem" />
            <div className="flex-1 space-y-2">
              <Skeleton width="70%" height="0.875rem" />
              <Skeleton width="50%" height="2rem" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-8 space-y-4">
          <Skeleton width="300px" height="2.5rem" />
          <Skeleton width="500px" height="1.25rem" />
        </div>

        {/* Stats skeleton */}
        <StatsSkeleton />

        {/* Filters skeleton */}
        <div className="mb-8 relative bg-white border border-gray-200 rounded-2xl p-6 shadow-lg transition-all duration-500">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-2">
              <Skeleton width="120px" height="1rem" />
              <Skeleton width="100%" height="3rem" variant="rectangular" />
            </div>
            <div className="w-full sm:w-56 space-y-2">
              <Skeleton width="80px" height="1rem" />
              <Skeleton width="100%" height="3rem" variant="rectangular" />
            </div>
            <Skeleton width="120px" height="3rem" variant="rectangular" />
          </div>
        </div>

        {/* Table skeleton */}
        <div className="hidden md:block">
          <TableSkeleton rows={8} />
        </div>

        {/* Mobile cards skeleton */}
        <div className="md:hidden">
          <CardSkeleton count={6} />
        </div>
      </div>
    </div>
  );
}
