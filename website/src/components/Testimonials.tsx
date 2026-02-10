import { use } from "react";
import { getTestimonials } from "@/services/api";

export default function Testimonials() {
  const testimonials = use(getTestimonials());
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="text-center">
          <div className="scroll-reveal gold-divider mb-8">
            <span className="gold-divider-icon">✦</span>
          </div>
          <h2 className="scroll-reveal scroll-d1 font-body text-2xl font-bold uppercase tracking-[0.08em] text-paper md:text-3xl">
            Từ những người đã đọc
          </h2>
        </div>

        <div className="mt-12 -mx-4 flex gap-6 overflow-x-auto px-4 pt-4 pb-8 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pt-0 md:pb-0">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`scroll-reveal scroll-d${i + 2} glass-card glass-card-hover relative min-w-[300px] snap-center rounded-2xl border-l-[3px] border-l-gold p-7 pt-10 md:min-w-0`}
            >
              <span className="quote-mark absolute top-3 left-4 font-heading text-[4rem] leading-none text-gold/15 select-none">
                &ldquo;
              </span>
              <blockquote className="relative font-heading text-lg font-normal italic leading-relaxed text-paper">
                {t.quote}
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="glass-icon h-10 w-10 rounded-full flex items-center justify-center">
                  <span className="font-heading text-sm font-semibold text-gold">
                    {t.name.charAt(t.name.length - 1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-paper">{t.name}</p>
                  <p className="text-xs text-paper/50">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
