import Image from "next/image";
import { use } from "react";
import { getFeatures } from "@/services/api";

export default function Features() {
  const features = use(getFeatures());
  return (
    <section id="features" className="bg-mysterious-surface px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="text-center">
          <p className="scroll-reveal text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
            Snap. Flip. Read.
          </p>
          <h2 className="scroll-reveal scroll-d1 mt-4 font-body text-2xl font-bold uppercase tracking-[0.08em] text-paper md:text-3xl">
            Mọi thứ bạn cần, không gì thừa
          </h2>
        </div>

        <div className="mt-12 -mx-4 flex gap-5 overflow-x-auto px-4 pt-4 pb-8 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pt-0 md:pb-0">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`scroll-reveal scroll-d${i + 2} glass-card glass-card-hover group relative min-w-[280px] snap-center overflow-hidden rounded-2xl md:min-w-0`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  sizes="(max-width: 768px) 85vw, 50vw"
                  className="object-cover img-hover-zoom"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-[#1A1A1A]/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="font-heading text-lg font-bold text-paper">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-paper/85">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
