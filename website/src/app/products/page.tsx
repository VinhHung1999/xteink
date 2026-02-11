import type { Metadata } from "next";
import Product from "@/components/Product";
import Features from "@/components/Features";
import ProductComparison from "@/components/ProductComparison";
import Accessories from "@/components/Accessories";
import Pricing from "@/components/Pricing";
import PurchaseInfo from "@/components/PurchaseInfo";
import MobileStickyCTA from "@/components/MobileStickyCTA";

export const metadata: Metadata = {
  title: "Sản phẩm — Xteink X4",
  description:
    "Máy đọc sách e-ink 4.3 inch, 74g. Xem chi tiết, so sánh phiên bản, phụ kiện và combo giá tốt.",
};

export default function ProductsPage() {
  return (
    <>
      <Product />
      <Features />
      <ProductComparison />
      <Accessories />
      <Pricing />
      <PurchaseInfo />
      <MobileStickyCTA />
    </>
  );
}
