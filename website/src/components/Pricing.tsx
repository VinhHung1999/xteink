import Image from "next/image";
import { Check } from "lucide-react";
import { use } from "react";
import { getPricingData } from "@/services/api";
import OrderNowButton from "./OrderNowButton";

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
              <span className="text-sm text-paper/50 line-through">
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
                  <span className="text-sm text-paper/80">{item}</span>
                </li>
              ))}
            </ul>

            <div className="scroll-reveal scroll-d6 mt-8 flex flex-wrap gap-4">
              {pricing.trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-xs text-paper/60">
                  <badge.icon size={16} strokeWidth={1.8} />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>

            <div className="scroll-reveal scroll-d7 mt-8">
              <OrderNowButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
