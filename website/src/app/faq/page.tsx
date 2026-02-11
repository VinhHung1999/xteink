import type { Metadata } from "next";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Câu hỏi thường gặp — Xteink X4",
  description:
    "Giải đáp mọi thắc mắc về máy đọc sách Xteink X4 — định dạng sách, pin, bảo hành, giao hàng.",
};

export default function FAQPage() {
  return <FAQ />;
}
