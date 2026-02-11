import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";

export const metadata: Metadata = {
  title: "Xteink X4 — Máy đọc sách e-ink 4.3 inch",
  description:
    "Xteink X4: màn hình E-Ink 4.3 inch, 220 PPI, 74g, gắn nam châm lên điện thoại. Chỉ 1.590.000₫.",
};

export default function X4Page() {
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
              src="/images/products/x4/gallery/xteink_x4_product_gallery_variant_2.jpg"
              alt="Xteink X4"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <span className="absolute top-4 left-4 rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-[#1A1A1A]">
              Bestseller
            </span>
          </div>

          {/* Info */}
          <div className="scroll-reveal scroll-d2">
            <h1 className="font-heading text-4xl font-bold text-paper">
              Xteink X4
            </h1>
            <p className="mt-2 font-heading text-2xl font-bold text-gold-shimmer">
              1.590.000₫
            </p>
            <p className="mt-4 text-base leading-relaxed text-paper/70">
              Thư viện bỏ túi nhẹ hơn một bộ bài. Gắn nam châm lên điện thoại, lật ra là đọc.
            </p>

            {/* Specs */}
            <div className="mt-8 space-y-3">
              {[
                ["Màn hình", "4.3\" E-Ink"],
                ["Độ phân giải", "220 PPI"],
                ["Trọng lượng", "74g"],
                ["Độ mỏng", "4.9mm"],
                ["Pin", "650mAh — đọc 2 tuần"],
                ["Bộ nhớ", "32GB + thẻ SD"],
                ["Kết nối", "USB-C"],
                ["Định dạng", "EPUB, PDF, TXT, MOBI"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-gold/10 pb-3"
                >
                  <span className="text-sm text-paper/60">{label}</span>
                  <span className="text-sm font-medium text-paper">{value}</span>
                </div>
              ))}
            </div>

            <AddToCartButton
              productId="x4"
              slug="x4"
              productName="Xteink X4"
              image="/images/products/x4/gallery/xteink_x4_product_gallery_variant_2.jpg"
              price={1590000}
              type="product"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
