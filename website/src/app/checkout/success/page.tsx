import type { Metadata } from "next";
import OrderSuccessClient from "@/components/OrderSuccessClient";

export const metadata: Metadata = {
  title: "Đặt hàng thành công — Xteink",
  description: "Đơn hàng của bạn đã được ghi nhận.",
};

export default function OrderSuccessPage() {
  return <OrderSuccessClient />;
}
