import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import SnapFlipRead from "@/components/SnapFlipRead";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <SnapFlipRead />

      {/* CTA → Products */}
      <section className="px-6 py-20 md:py-28 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-paper mb-4 scroll-reveal">
            Sẵn sàng khám phá?
          </h2>
          <p className="text-warm-cream/70 text-lg mb-8 scroll-reveal">
            Xem chi tiết sản phẩm, so sánh phiên bản, và tìm combo phù hợp với bạn.
          </p>
          <Link
            href="/products"
            className="btn-glass-primary inline-flex h-14 items-center gap-2 rounded-xl px-8 text-base font-semibold text-[#1A1A1A] scroll-reveal"
          >
            Xem sản phẩm
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
