"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import type { ProductListingItem } from "@/services/types";
import { useCart } from "@/contexts/CartContext";

interface ProductListingClientProps {
  products: ProductListingItem[];
}

// Parse "1.590.000₫" → 1590000
function parsePrice(price: string): number {
  return parseInt(price.replace(/[^\d]/g, ""), 10) || 0;
}

export default function ProductListingClient({ products }: ProductListingClientProps) {
  const { addItem, openDrawer } = useCart();

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-[1320px]">
        {/* Section Header */}
        <div className="text-center">
          <p className="scroll-reveal text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
            Sản phẩm
          </p>
          <h2 className="scroll-reveal scroll-d1 mt-3 font-heading text-3xl font-bold tracking-[-0.01em] text-paper md:text-5xl md:leading-[1.1]">
            Chọn máy đọc sách của bạn
          </h2>
        </div>

        {/* Product Cards — horizontal on desktop, vertical compact on mobile */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {products.map((product, i) => (
            <div
              key={product.slug}
              className={`scroll-reveal scroll-d${i + 2} glass-card glass-card-hover overflow-hidden rounded-2xl`}
            >
              {/* Mobile: vertical compact | Desktop: horizontal */}
              <div className="md:flex">
                {/* Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-auto md:w-[44%] md:shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover"
                    loading="lazy"
                  />
                  {product.tag && (
                    <span className="absolute top-3 left-3 rounded-full bg-gold/90 px-2.5 py-0.5 text-xs font-semibold text-[#1A1A1A]">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-5 md:flex-1">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-paper md:text-2xl">
                      {product.name}
                    </h3>
                    <p className="mt-1 font-heading text-lg font-bold text-gold-shimmer">
                      {product.price}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-paper/70 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Specs chips — compact */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {product.specs.map((spec) => (
                        <span
                          key={spec}
                          className="rounded-full border border-gold/15 bg-gold/[0.05] px-2.5 py-0.5 text-[11px] text-paper/60"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="mt-4 flex gap-3">
                    <Link
                      href={`/products/${product.slug}`}
                      className="btn-glass-primary inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-[#1A1A1A]"
                    >
                      Xem chi tiết
                      <ArrowRight size={15} />
                    </Link>
                    <button
                      onClick={() => {
                        addItem({
                          id: product.slug,
                          slug: product.slug,
                          name: product.name,
                          image: product.image,
                          price: parsePrice(product.price),
                          type: "product",
                        });
                        openDrawer();
                      }}
                      className="btn-glass-secondary inline-flex h-10 items-center justify-center gap-2 rounded-xl px-3.5 text-sm font-medium text-paper"
                    >
                      <ShoppingBag size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
