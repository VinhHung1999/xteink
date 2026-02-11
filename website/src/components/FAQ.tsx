"use client";

import { use, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getFAQData } from "@/services/api";

export default function FAQ() {
  const faqItems = use(getFAQData());
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  // FAQ structured data for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="bg-mysterious px-6 py-20 md:py-28">
      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-[820px]">
        {/* Section Header */}
        <div className="text-center">
          <p className="scroll-reveal text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
            Câu hỏi thường gặp
          </p>
          <h2 className="scroll-reveal scroll-d1 mt-4 font-heading text-3xl font-bold tracking-[-0.01em] text-paper md:text-5xl md:leading-[1.1]">
            Bạn thắc mắc, chúng tôi giải đáp
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-12 space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = expanded === i;
            return (
              <div
                key={i}
                className={`scroll-reveal scroll-d${Math.min(i + 2, 7)} glass-card overflow-hidden rounded-xl transition-colors ${
                  isOpen ? "border border-gold/20" : ""
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.03]"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-body text-sm font-semibold text-paper md:text-base">
                    {item.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    strokeWidth={1.8}
                    className={`shrink-0 text-gold transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-gold/10 px-6 pb-5 pt-4">
                      <p className="text-sm leading-relaxed text-paper/70">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
