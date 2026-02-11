import type { Metadata } from "next";
import { Suspense } from "react";
import ProductListing from "@/components/ProductListing";
import Accessories from "@/components/Accessories";

export const metadata: Metadata = {
  title: "Sản phẩm — Xteink",
  description:
    "Máy đọc sách e-ink Xteink X4 và X3. Chọn model phù hợp, xem phụ kiện và đặt hàng.",
};

export default function ProductsPage() {
  return (
    <>
      <Suspense>
        <ProductListing />
      </Suspense>
      <Accessories />
    </>
  );
}
