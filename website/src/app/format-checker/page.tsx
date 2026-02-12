import type { Metadata } from "next";
import FormatCheckerClient from "@/components/FormatCheckerClient";

export const metadata: Metadata = {
  title: "Kiểm tra định dạng sách — Xteink",
  description:
    "Kiểm tra file sách có tương thích với Xteink X4 không. Hỗ trợ EPUB, PDF, MOBI, TXT, FB2, DJVU.",
};

export default function FormatCheckerPage() {
  return <FormatCheckerClient />;
}
