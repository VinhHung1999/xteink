import Image from "next/image";
import { use } from "react";
import { getLifestyleMoments } from "@/services/api";

export default function Lifestyle() {
  const moments = use(getLifestyleMoments());
  return (
    <section className="bg-mysterious px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="text-center">
          <h2 className="scroll-reveal text-glow font-heading text-3xl font-bold tracking-[-0.01em] text-paper md:text-[2.75rem] md:leading-[1.2]">
            Những khoảnh khắc đọc sách
          </h2>
          <p className="scroll-reveal scroll-d1 mt-3 text-base text-paper/70">
            X4 nhỏ gọn để bạn đọc ở bất cứ đâu — và bất cứ lúc nào.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {moments.map((m, i) => (
            <div
              key={m.caption}
              className={`scroll-reveal scroll-d${i + 2} group relative overflow-hidden rounded-2xl border border-[rgba(232,224,214,0.04)] shadow-[0_4px_24px_rgba(0,0,0,0.12)] ${
                i === 0 || i === 3 ? "aspect-[4/3]" : "aspect-[3/2]"
              }`}
            >
              <Image
                src={m.image}
                alt={m.caption}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover img-hover-zoom"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-5 right-5 font-heading text-sm font-medium text-[#E8E0D6] md:text-base">
                {m.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
