import Image from "next/image";
import { Check } from "lucide-react";
import { use } from "react";
import { getPricingData } from "@/services/api";

export default function Pricing() {
  const pricing = use(getPricingData());
  return (
    <section id="price" className="bg-mysterious px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="scroll-reveal-left glass-card relative aspect-square w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/products/x4/gallery/xteink_x4_product_gallery_variant_2.jpg"
              alt="Xteink X4 eReader"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <p className="scroll-reveal text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
              {pricing.label}
            </p>
            <div className="scroll-reveal scroll-d1 mt-4 flex items-baseline gap-3">
              <span className="font-heading text-4xl font-bold tracking-[-0.02em] text-gold-shimmer md:text-6xl">
                {pricing.price}
              </span>
              <span className="text-sm text-charcoal/50 line-through">
                {pricing.originalPrice}
              </span>
            </div>

            <ul className="mt-8 space-y-3">
              {pricing.included.map((item, i) => (
                <li
                  key={item}
                  className={`scroll-reveal-right scroll-d${Math.min(i + 1, 7)} flex items-start gap-3`}
                >
                  <Check size={18} className="mt-0.5 shrink-0 text-sage" strokeWidth={2.5} />
                  <span className="text-sm text-charcoal/80">{item}</span>
                </li>
              ))}
            </ul>

            <div className="scroll-reveal scroll-d6 mt-8 flex flex-wrap gap-4">
              {pricing.trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-xs text-charcoal/60">
                  <badge.icon size={16} strokeWidth={1.8} />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>

            <div className="scroll-reveal scroll-d7 mt-8 flex flex-wrap gap-4">
              <a
                href="#"
                className="btn-glass-primary inline-flex h-13 items-center rounded-xl px-8 text-base font-semibold text-[#1A1A1A]"
              >
                Bắt đầu đọc
              </a>
              <a
                href="#accessories"
                className="btn-glass-secondary inline-flex h-12 items-center rounded-xl px-6 text-base font-medium text-charcoal"
              >
                Xem phụ kiện
              </a>
            </div>
          </div>
        </div>

        <div id="accessories" className="mt-20">
          <h3 className="scroll-reveal font-body text-lg font-bold uppercase tracking-[0.08em] text-ink">
            Phụ kiện
          </h3>
          <div className="mt-6 -mx-4 flex gap-4 overflow-x-auto px-4 pt-4 pb-8 snap-x snap-mandatory">
            {pricing.accessories.map((a, i) => (
              <div
                key={a.name}
                className={`scroll-reveal scroll-d${Math.min(i + 1, 7)} glass-card glass-card-hover min-w-[160px] snap-center rounded-xl p-3`}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  <Image src={a.image} alt={a.name} fill sizes="160px" className="object-cover" loading="lazy" />
                </div>
                <p className="mt-2 text-sm font-medium text-ink">{a.name}</p>
                <p className="text-sm text-gold">{a.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
