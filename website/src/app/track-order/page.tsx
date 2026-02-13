import type { Metadata } from "next";
import TrackOrderClient from "@/components/TrackOrderClient";

export const metadata: Metadata = {
  title: "Tra cứu đơn hàng — Xteink",
  description:
    "Nhập mã đơn hàng và số điện thoại để theo dõi trạng thái giao hàng Xteink của bạn.",
};

export default function TrackOrderPage() {
  return <TrackOrderClient />;
}
