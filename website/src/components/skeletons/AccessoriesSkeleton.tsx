import { Bone } from "./Skeleton";

export default function AccessoriesSkeleton() {
  return (
    <section className="px-6 py-12 md:py-16">
      <div className="mx-auto max-w-[1320px]">
        {/* Section header */}
        <div className="text-center">
          <Bone className="mx-auto h-3 w-24" />
          <Bone className="mx-auto mt-4 h-10 w-72 md:h-12" />
          <Bone className="mx-auto mt-3 h-4 w-56" />
        </div>

        {/* 3-card grid */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="glass-card rounded-2xl p-4">
              <Bone className="aspect-[3/2] w-full rounded-lg" />
              <div className="mt-3 flex items-center justify-between">
                <Bone className="h-5 w-36" />
                <Bone className="h-5 w-20" />
              </div>
              <div className="mt-2 flex gap-1.5">
                {[...Array(3)].map((_, j) => (
                  <Bone key={j} className="h-6 w-6 rounded-full" />
                ))}
              </div>
              <Bone className="mt-3 h-10 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
