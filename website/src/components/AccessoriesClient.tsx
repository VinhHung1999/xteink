"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import type { Accessory } from "@/services/types";
import { useCart } from "@/contexts/CartContext";

interface AccessoriesClientProps {
  accessories: Accessory[];
}

function parsePrice(price: string): number {
  return parseInt(price.replace(/[^\d]/g, ""), 10) || 0;
}

function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default function AccessoriesClient({ accessories }: AccessoriesClientProps) {
  const { addItem, openDrawer } = useCart();

  // Track selected color index per accessory (keyed by accessory name)
  const [selectedColors, setSelectedColors] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {};
    accessories.forEach((a) => {
      if (a.colors && a.colors.length > 0) {
        defaults[a.name] = 0; // default to first color
      }
    });
    return defaults;
  });

  function selectColor(accessoryName: string, colorIndex: number) {
    setSelectedColors((prev) => ({ ...prev, [accessoryName]: colorIndex }));
  }

  return (
    <section className="bg-mysterious-surface px-6 py-12 md:py-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="text-center">
          <p className="scroll-reveal text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
            Phụ kiện
          </p>
          <h2 className="scroll-reveal scroll-d1 mt-3 font-heading text-3xl font-bold tracking-[-0.01em] text-paper md:text-5xl md:leading-[1.1]">
            Hoàn thiện trải nghiệm đọc
          </h2>
          <p className="scroll-reveal scroll-d2 mt-3 text-sm text-paper/70 md:text-base">
            Bổ sung phụ kiện để tận hưởng đọc sách tốt hơn.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {accessories.map((accessory, i) => {
            const hasColors = accessory.colors && accessory.colors.length > 0;
            const selectedIdx = selectedColors[accessory.name] ?? 0;
            const selectedColor = hasColors ? accessory.colors![selectedIdx] : null;

            return (
              <div
                key={accessory.name}
                className={`scroll-reveal scroll-d${i + 3} glass-card glass-card-hover rounded-2xl p-4`}
              >
                {/* Image placeholder */}
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-charcoal/20 mb-3">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-paper/40 text-xs text-center px-4">
                      {accessory.name}
                      {selectedColor && (
                        <>
                          <br />
                          <span className="text-[10px] text-gold/60">{selectedColor.name}</span>
                        </>
                      )}
                      <br />
                      <span className="text-[10px]">Image Coming Soon</span>
                    </p>
                  </div>
                </div>

                {/* Name + Price inline */}
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-heading text-lg font-bold text-paper">
                    {accessory.name}
                  </h3>
                  <p className="shrink-0 text-lg font-bold text-gold-shimmer">
                    {accessory.price}
                  </p>
                </div>

                {/* Color swatches (selectable) */}
                {hasColors && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-paper/60 mb-1.5">
                      Màu: <span className="text-paper/80">{selectedColor?.name}</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {accessory.colors!.map((color, ci) => {
                        const isSelected = ci === selectedIdx;
                        return (
                          <button
                            key={color.name}
                            type="button"
                            title={color.name}
                            onClick={() => selectColor(accessory.name, ci)}
                            className={`h-7 w-7 rounded-full border-2 transition-all hover:scale-110 ${
                              isSelected
                                ? "border-gold ring-2 ring-gold/30 scale-110"
                                : "border-paper/20 hover:border-gold/50"
                            }`}
                            style={{ backgroundColor: color.hex }}
                            aria-label={`Chọn màu ${color.name}`}
                            aria-pressed={isSelected}
                            data-testid={`color-swatch-${toSlug(color.name)}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Add to Cart CTA */}
                <button
                  onClick={() => {
                    // Use color in ID so different colors = different cart items
                    const colorSuffix = selectedColor ? `-${toSlug(selectedColor.name)}` : "";
                    addItem({
                      id: `accessory-${toSlug(accessory.name)}${colorSuffix}`,
                      slug: toSlug(accessory.name),
                      name: accessory.name,
                      image: accessory.image,
                      price: parsePrice(accessory.price),
                      type: "accessory",
                      ...(selectedColor && {
                        color: selectedColor.name,
                        colorHex: selectedColor.hex,
                      }),
                    });
                    openDrawer();
                  }}
                  className="mt-4 btn-glass-secondary inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-paper border border-gold/20 hover:border-gold/40"
                  data-testid={`add-to-cart-${toSlug(accessory.name)}`}
                >
                  <ShoppingBag size={15} />
                  Thêm vào giỏ
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
