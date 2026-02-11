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
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        {/* Section Header */}
        <div className="text-center">
          <p className="scroll-reveal text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
            Sản phẩm
          </p>
          <h2 className="scroll-reveal scroll-d1 mt-4 font-heading text-3xl font-bold tracking-[-0.01em] text-paper md:text-5xl md:leading-[1.1]">
            Chọn máy đọc sách của bạn
          </h2>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {products.map((product, i) => (
            <div
              key={product.slug}
              className={`scroll-reveal scroll-d${i + 2} glass-card glass-card-hover overflow-hidden rounded-2xl`}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />
                {product.tag && (
                  <span className="absolute top-4 left-4 rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-[#1A1A1A]">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-2xl font-bold text-paper">
                  {product.name}
                </h3>
                <p className="mt-1 font-heading text-xl font-bold text-gold-shimmer">
                  {product.price}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">
                  {product.description}
                </p>

                {/* Specs chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.specs.map((spec) => (
                    <span
                      key={spec}
                      className="rounded-full border border-gold/15 bg-gold/[0.05] px-3 py-1 text-xs text-paper/60"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="btn-glass-primary inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-[#1A1A1A]"
                  >
                    Xem chi tiết
                    <ArrowRight size={16} />
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
                    className="btn-glass-secondary inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium text-paper"
                  >
                    <ShoppingBag size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
