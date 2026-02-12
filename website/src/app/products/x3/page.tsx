import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductDetail } from "@/services/api";

export const metadata: Metadata = {
  title: "Xteink X3 — Máy đọc sách e-ink ultra-compact",
  description:
    "Xteink X3: màn hình E-Ink 3.7 inch, 250 PPI, 60g, siêu nhỏ gọn.",
};

export default async function X3Page() {
  const product = await getProductDetail("x3");
  if (!product) return notFound();

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[960px]">
        <Link
          href="/products"
          className="scroll-reveal inline-flex items-center gap-2 text-sm text-gold hover:text-deep-gold transition-colors"
        >
          <ArrowLeft size={16} />
          Tất cả sản phẩm
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {/* Image */}
          <div className="scroll-reveal scroll-d1 glass-card relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {product.tag && (
              <span className="absolute top-4 left-4 rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-[#1A1A1A]">
                {product.tag}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="scroll-reveal scroll-d2">
            <h1 className="font-heading text-4xl font-bold text-paper">
              {product.name}
            </h1>
            <p className="mt-2 font-heading text-2xl font-bold text-gold-shimmer">
              {product.price}
            </p>
            <p className="mt-4 text-base leading-relaxed text-paper/70">
              {product.description}
            </p>

            {/* Specs */}
            <div className="mt-8 space-y-3">
              {product.specs.map((spec) => (
                <div
                  key={spec}
                  className="flex items-center border-b border-gold/10 pb-3"
                >
                  <span className="text-sm font-medium text-paper">{spec}</span>
                </div>
              ))}
            </div>

            <AddToCartButton
              productId={product.slug}
              slug={product.slug}
              productName={product.name}
              image={product.image}
              price={product.priceNumeric}
              type="product"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
