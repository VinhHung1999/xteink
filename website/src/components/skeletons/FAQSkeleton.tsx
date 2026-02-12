import { Bone } from "./Skeleton";

export default function FAQSkeleton() {
  return (
    <section className="bg-mysterious px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[820px]">
        {/* Section header */}
        <div className="text-center">
          <Bone className="mx-auto h-3 w-32" />
          <Bone className="mx-auto mt-4 h-10 w-72 md:h-12" />
        </div>

        {/* Accordion items */}
        <div className="mt-12 space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card rounded-xl px-6 py-5">
              <div className="flex items-center justify-between">
                <Bone className="h-5 w-full max-w-[80%]" />
                <Bone className="h-5 w-5 shrink-0 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
