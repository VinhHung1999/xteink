import { Bone } from "./Skeleton";

export default function ProductListingSkeleton() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-[1320px]">
        {/* Section header */}
        <div className="text-center">
          <Bone className="mx-auto h-3 w-24" />
          <Bone className="mx-auto mt-4 h-10 w-80 md:h-12" />
          <Bone className="mx-auto mt-3 h-4 w-64" />
        </div>

        {/* 2-card grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="glass-card overflow-hidden rounded-2xl">
              <Bone className="aspect-[16/9] w-full rounded-none" />
              <div className="p-5">
                <Bone className="h-6 w-48" />
                <Bone className="mt-2 h-5 w-32" />
                <Bone className="mt-3 h-10 w-full" />
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {[...Array(4)].map((_, j) => (
                    <Bone key={j} className="h-6 w-24 rounded-full" />
                  ))}
                </div>
                <div className="mt-4 flex gap-3">
                  <Bone className="h-10 flex-1 rounded-xl" />
                  <Bone className="h-10 flex-1 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
