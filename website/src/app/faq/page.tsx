import type { Metadata } from "next";
import { use } from "react";
import FAQ from "@/components/FAQ";
import { getFAQData } from "@/services/api";

export const metadata: Metadata = {
  title: "Câu hỏi thường gặp — Xteink X4",
  description:
    "Giải đáp mọi thắc mắc về máy đọc sách Xteink X4 — định dạng sách, pin, bảo hành, giao hàng.",
};

export default function FAQPage() {
  const faqItems = use(getFAQData());

  const faqJsonLd = {
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQ />
    </>
  );
}
