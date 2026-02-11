import type { Metadata } from "next";
import SocialProof from "@/components/SocialProof";
import Testimonials from "@/components/Testimonials";
import Lifestyle from "@/components/Lifestyle";

export const metadata: Metadata = {
  title: "Cộng đồng — Xteink X4",
  description:
    "Cộng đồng người dùng Xteink X4 — đánh giá từ báo chí, YouTube, và câu chuyện từ độc giả Việt Nam.",
};

export default function CommunityPage() {
  return (
    <>
      <SocialProof />
      <Testimonials />
      <Lifestyle />
    </>
  );
}
