import type { Metadata } from "next";
import Link from "next/link";
import { use } from "react";
import { ArrowRight } from "lucide-react";
import { getGuidesData } from "@/services/api";

export const metadata: Metadata = {
  title: "Hướng dẫn — Xteink X4",
  description:
    "Hướng dẫn sử dụng Xteink X4 — thiết lập, chuyển sách, cài firmware Crosspoint tiếng Việt.",
};

export default function GuidesPage() {
  const guides = use(getGuidesData());

  return (
    <section className="px-6 pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-[1320px]">
        {/* Header */}
        <div className="mb-12 text-center scroll-reveal">
          <h1 className="font-heading text-3xl md:text-5xl font-semibold text-paper mb-4">
            Hướng dẫn sử dụng
          </h1>
          <p className="text-warm-cream/70 text-lg max-w-xl mx-auto">
            Mọi thứ bạn cần để bắt đầu đọc sách cùng Xteink X4.
          </p>
        </div>

        {/* Guide cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.href}
                href={guide.href}
                className="glass-card group rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg scroll-reveal"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(212,165,116,0.12)]">
                  <Icon size={24} className="text-gold" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-paper mb-3">
                  {guide.title}
                </h3>
                <p className="text-warm-cream/70 text-sm leading-relaxed mb-6">
                  {guide.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-all group-hover:gap-2.5">
                  Xem hướng dẫn
                  <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
