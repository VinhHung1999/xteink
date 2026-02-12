import { Bone } from "./Skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[960px]">
        {/* Back link */}
        <Bone className="h-4 w-28" />

        {/* Hero: gallery + info */}
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          {/* Gallery */}
          <div>
            <Bone className="aspect-square w-full rounded-2xl" />
            <div className="mt-3 flex gap-2">
              {[...Array(4)].map((_, i) => (
                <Bone key={i} className="h-16 w-16 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <Bone className="h-10 w-64" />
            <Bone className="mt-2 h-4 w-48" />
            <Bone className="mt-4 h-8 w-36" />
            <Bone className="mt-4 h-16 w-full" />
            <Bone className="mt-6 h-12 w-full rounded-xl" />
            <div className="mt-4 flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <Bone key={i} className="h-6 w-28 rounded-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="glass-card rounded-2xl p-5">
              <Bone className="h-10 w-10 rounded-lg" />
              <Bone className="mt-3 h-5 w-32" />
              <Bone className="mt-2 h-10 w-full" />
            </div>
          ))}
        </div>

        {/* Specs table */}
        <div className="mt-16">
          <Bone className="h-8 w-40" />
          <div className="mt-6 space-y-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 border-b border-paper/5 px-4 py-3.5"
              >
                <Bone className="h-4 w-28 shrink-0" />
                <Bone className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
