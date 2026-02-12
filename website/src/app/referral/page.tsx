import type { Metadata } from "next";
import ReferralClient from "@/components/ReferralClient";

export const metadata: Metadata = {
  title: "Giới thiệu bạn bè — Nhận thưởng cùng Xteink",
  description:
    "Chia sẻ Xteink với bạn bè. Khi họ mua hàng, cả hai cùng nhận ưu đãi. Giới thiệu 11 người — nhận X4 miễn phí!",
  openGraph: {
    title: "Giới thiệu bạn bè — Nhận thưởng cùng Xteink",
    description:
      "Mời bạn bè dùng Xteink X4. Cả hai cùng nhận ưu đãi khi mua hàng.",
  },
};

export default function ReferralPage() {
  return <ReferralClient />;
}
