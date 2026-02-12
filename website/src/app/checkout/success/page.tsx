import type { Metadata } from "next";
import { Suspense } from "react";
import OrderSuccessClient from "@/components/OrderSuccessClient";
import OrderSuccessSkeleton from "@/components/skeletons/OrderSuccessSkeleton";

export const metadata: Metadata = {
  title: "Đặt hàng thành công — Xteink",
  description: "Đơn hàng của bạn đã được ghi nhận.",
};

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderSuccessSkeleton />}>
      <OrderSuccessClient />
    </Suspense>
  );
}
