// app/loading.tsx
export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="animate-pulse space-y-6">
        {/* Header skeleton */}
        <div className="space-y-3">
          <div className="h-4 w-24 bg-surface-2 rounded-full" />
          <div className="h-10 w-96 bg-surface-2 rounded-2xl" />
          <div className="h-5 w-72 bg-surface-2 rounded-xl" />
        </div>
        {/* Cards skeleton */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card p-5 space-y-3">
              <div className="w-10 h-10 bg-surface-2 rounded-xl" />
              <div className="h-7 w-20 bg-surface-2 rounded-lg" />
              <div className="h-4 w-28 bg-surface-2 rounded-lg" />
            </div>
          ))}
        </div>
        {/* Content rows */}
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 card p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-surface-1 rounded-xl">
                <div className="w-12 h-12 bg-surface-2 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-48 bg-surface-2 rounded-lg" />
                  <div className="h-3 w-32 bg-surface-2 rounded-lg" />
                  <div className="h-2 w-full bg-surface-2 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="card p-5 space-y-3">
                <div className="h-5 w-32 bg-surface-2 rounded-lg" />
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex gap-2">
                    <div className="w-4 h-4 bg-surface-2 rounded-full shrink-0" />
                    <div className="h-4 flex-1 bg-surface-2 rounded-lg" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
