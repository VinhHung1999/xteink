import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";

export const metadata: Metadata = {
  title: "Xteink X3 — Máy đọc sách e-ink ultra-compact",
  description:
    "Xteink X3: màn hình E-Ink 3.7 inch, 250 PPI, 60g, siêu nhỏ gọn. Giá 1.790.000₫.",
};

export default function X3Page() {
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
              src="/images/products/x3/gallery/xteink_x3_ultra_compact_magnetic_ereader_space_black_72_99usd.jpg"
              alt="Xteink X3"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <span className="absolute top-4 left-4 rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-[#1A1A1A]">
              2026 New
            </span>
          </div>

          {/* Info */}
          <div className="scroll-reveal scroll-d2">
            <h1 className="font-heading text-4xl font-bold text-paper">
              Xteink X3
            </h1>
            <p className="mt-2 font-heading text-2xl font-bold text-gold-shimmer">
              1.790.000₫
            </p>
            <p className="mt-4 text-base leading-relaxed text-paper/70">
              Phiên bản ultra-compact — siêu nhẹ, siêu sắc nét, cho những ai yêu sự tối giản.
            </p>

            {/* Specs */}
            <div className="mt-8 space-y-3">
              {[
                ["Màn hình", "3.7\" E-Ink"],
                ["Độ phân giải", "250 PPI"],
                ["Trọng lượng", "60g"],
                ["Pin", "Đọc 2 tuần"],
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

            <AddToCartButton productName="Xteink X3" />
          </div>
        </div>
      </div>
    </section>
  );
}
