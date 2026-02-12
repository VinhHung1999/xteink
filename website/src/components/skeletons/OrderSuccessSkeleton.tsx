import { Bone } from "./Skeleton";

export default function OrderSuccessSkeleton() {
  return (
    <section className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-[960px]">
        {/* Success header */}
        <div className="flex items-center gap-3">
          <Bone className="h-10 w-10 rounded-full" />
          <div>
            <Bone className="h-8 w-64" />
            <Bone className="mt-1 h-4 w-48" />
          </div>
        </div>

        {/* 2-column grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_380px]">
          {/* Left — order info */}
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-5">
              <Bone className="h-4 w-24" />
              <Bone className="mt-2 h-5 w-40" />
            </div>
            <div className="glass-card rounded-2xl p-5 space-y-2">
              <Bone className="h-5 w-32" />
              {[...Array(4)].map((_, i) => (
                <Bone key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>

          {/* Right — products + totals */}
          <div className="glass-card rounded-2xl p-5">
            <Bone className="h-5 w-28" />
            <div className="mt-4 space-y-3">
              {[0, 1].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Bone className="h-12 w-12 shrink-0 rounded-lg" />
                  <div className="flex-1">
                    <Bone className="h-4 w-full" />
                    <Bone className="mt-1 h-3 w-16" />
                  </div>
                  <Bone className="h-4 w-20 shrink-0" />
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-paper/5 pt-4">
              <Bone className="h-4 w-full" />
              <Bone className="h-4 w-full" />
              <Bone className="mt-2 h-7 w-48" />
            </div>
            <Bone className="mt-4 h-11 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
