import { use } from "react";
import Image from "next/image";
import { getProductComparison } from "@/services/api";

export default function ProductComparison() {
  const comparison = use(getProductComparison());
  const { x4, x3 } = comparison;

  const specRows = [
    { key: "screen", label: "Màn hình" },
    { key: "ppi", label: "Độ nét (PPI)" },
    { key: "weight", label: "Trọng lượng" },
    { key: "thickness", label: "Độ mỏng" },
    { key: "price", label: "Giá" },
  ];

  return (
    <section className="bg-mysterious px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="text-center">
          <p className="scroll-reveal text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
            So sánh
          </p>
          <h2 className="scroll-reveal scroll-d1 mt-4 font-heading text-3xl font-bold tracking-[-0.01em] text-paper md:text-5xl md:leading-[1.1]">
            Chọn model phù hợp với bạn
          </h2>
          <p className="scroll-reveal scroll-d2 mt-5 text-base text-paper/70 md:text-lg">
            X4 và X3 — hai lựa chọn hoàn hảo cho những người yêu sách.
          </p>
        </div>

        {/* Product Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-12">
          {/* X4 Card */}
          <div className="scroll-reveal scroll-d3 glass-card glass-card-hover rounded-2xl overflow-hidden">
            {/* Tag */}
            {x4.tag && (
              <div className="bg-gold px-4 py-2 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-ink">
                  {x4.tag}
                </span>
              </div>
            )}
            {/* Image */}
            <div className="relative aspect-square w-full">
              <Image
                src={x4.image}
                alt={x4.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Info */}
            <div className="p-6">
              <h3 className="font-heading text-2xl font-bold text-paper">
                {x4.name}
              </h3>
              <p className="mt-2 text-3xl font-bold text-gold-shimmer">
                {x4.specs.price}
              </p>
              <a
                href="#price"
                className="mt-4 btn-glass-primary inline-flex h-12 w-full items-center justify-center rounded-xl text-base font-semibold text-[#1A1A1A]"
              >
                Chọn X4
              </a>
            </div>
          </div>

          {/* X3 Card */}
          <div className="scroll-reveal scroll-d4 glass-card glass-card-hover rounded-2xl overflow-hidden">
            {/* Tag */}
            {x3.tag && (
              <div className="bg-sage px-4 py-2 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-ink">
                  {x3.tag}
                </span>
              </div>
            )}
            {/* Image */}
            <div className="relative aspect-square w-full bg-charcoal/20">
              <div className="flex items-center justify-center h-full">
                <p className="text-paper/40 text-sm">X3 Image Coming Soon</p>
              </div>
            </div>
            {/* Info */}
            <div className="p-6">
              <h3 className="font-heading text-2xl font-bold text-paper">
                {x3.name}
              </h3>
              <p className="mt-2 text-3xl font-bold text-gold-shimmer">
                {x3.specs.price}
              </p>
              <a
                href="#price"
                className="mt-4 btn-glass-secondary inline-flex h-12 w-full items-center justify-center rounded-xl text-base font-semibold text-paper border border-gold/30"
              >
                Chọn X3
              </a>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="scroll-reveal scroll-d5 mt-12 overflow-hidden rounded-2xl glass-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/10">
                <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider text-gold md:px-6">
                  Thông số
                </th>
                <th className="px-4 py-4 text-center text-sm font-bold text-paper md:px-6">
                  X4
                </th>
                <th className="px-4 py-4 text-center text-sm font-bold text-paper md:px-6">
                  X3
                </th>
              </tr>
            </thead>
            <tbody>
              {specRows.map((row) => {
                const x4Advantage = x4.advantages.includes(row.key);
                const x3Advantage = x3.advantages.includes(row.key);

                return (
                  <tr key={row.key} className="border-b border-gold/5">
                    <td className="px-4 py-4 text-sm font-medium text-paper/70 md:px-6">
                      {row.label}
                    </td>
                    <td
                      className={`px-4 py-4 text-center text-sm font-semibold md:px-6 ${
                        x4Advantage ? "text-sage" : "text-paper"
                      }`}
                    >
                      {x4.specs[row.key as keyof typeof x4.specs]}
                    </td>
                    <td
                      className={`px-4 py-4 text-center text-sm font-semibold md:px-6 ${
                        x3Advantage ? "text-sage" : "text-paper"
                      }`}
                    >
                      {x3.specs[row.key as keyof typeof x3.specs]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
