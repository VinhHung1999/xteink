import Image from "next/image";
import { use } from "react";
import { getProductData } from "@/services/api";

export default function Product() {
  const product = use(getProductData());
  return (
    <section id="product" className="bg-mysterious px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="scroll-reveal-left glass-card relative aspect-square w-full overflow-hidden rounded-2xl">
          <Image
            src={product.image}
            alt={`${product.title} eReader — mỏng 5.9mm, nhẹ 74g`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="scroll-reveal text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
            {product.subtitle}
          </p>
          <h2 className="scroll-reveal scroll-d1 mt-4 font-heading text-3xl font-bold tracking-[-0.02em] text-paper md:text-5xl md:leading-[1.1]">
            {product.title}
          </h2>
          <p className="scroll-reveal scroll-d2 mt-5 text-base leading-relaxed text-paper/70 md:text-lg">
            {product.description}
          </p>

          <div className="mt-8 space-y-6">
            {product.features.map((f, i) => (
              <div
                key={f.title}
                className={`scroll-reveal-right scroll-d${i + 3} flex gap-4`}
              >
                <div className="glass-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-gold">
                  <f.icon size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-body text-base font-semibold text-paper">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm text-paper/70">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
