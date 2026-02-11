import type { Metadata } from "next";
import { getProvinces, getCheckoutPaymentMethods } from "@/services/api";
import CheckoutClient from "@/components/CheckoutClient";

export const metadata: Metadata = {
  title: "Thanh toán — Xteink",
  description: "Hoàn tất đơn hàng Xteink của bạn.",
};

export default async function CheckoutPage() {
  const [provinces, paymentMethods] = await Promise.all([
    getProvinces(),
    getCheckoutPaymentMethods(),
  ]);

  return <CheckoutClient provinces={provinces} paymentMethods={paymentMethods} />;
}
