import { use } from "react";
import { getAccessories } from "@/services/api";

export default function Accessories() {
  const accessories = use(getAccessories());

  return (
    <section className="bg-mysterious-surface px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="text-center">
          <p className="scroll-reveal text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
            Phụ kiện
          </p>
          <h2 className="scroll-reveal scroll-d1 mt-4 font-heading text-3xl font-bold tracking-[-0.01em] text-paper md:text-5xl md:leading-[1.1]">
            Hoàn thiện trải nghiệm đọc
          </h2>
          <p className="scroll-reveal scroll-d2 mt-5 text-base text-paper/70 md:text-lg">
            Bổ sung phụ kiện để tận hưởng đọc sách tốt hơn.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {accessories.map((accessory, i) => (
            <div
              key={accessory.name}
              className={`scroll-reveal scroll-d${i + 3} glass-card glass-card-hover rounded-2xl p-6`}
            >
              {/* Image placeholder */}
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-charcoal/20 mb-4">
                <div className="flex items-center justify-center h-full">
                  <p className="text-paper/40 text-sm text-center px-4">
                    {accessory.name}
                    <br />
                    <span className="text-xs">Image Coming Soon</span>
                  </p>
                </div>
              </div>

              {/* Name */}
              <h3 className="font-heading text-xl font-bold text-paper">
                {accessory.name}
              </h3>

              {/* Price */}
              <p className="mt-2 text-2xl font-bold text-gold-shimmer">
                {accessory.price}
              </p>

              {/* Color swatches (if available) */}
              {accessory.colors && accessory.colors.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-paper/60 mb-2">
                    {accessory.colors.length} màu
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {accessory.colors.map((color) => (
                      <div
                        key={color.name}
                        className="group relative"
                        title={color.name}
                      >
                        <div
                          className="h-8 w-8 rounded-full border-2 border-gold/20 cursor-pointer transition-all hover:border-gold hover:scale-110"
                          style={{ backgroundColor: color.hex }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <a
                href="#price"
                className="mt-6 btn-glass-secondary inline-flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold text-paper border border-gold/20 hover:border-gold/40"
              >
                Mua kèm
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
