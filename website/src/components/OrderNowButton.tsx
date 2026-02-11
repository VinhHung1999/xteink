"use client";

import { useCart } from "@/contexts/CartContext";

export default function OrderNowButton() {
  const { addItem, openDrawer } = useCart();

  return (
    <button
      onClick={() => {
        addItem({
          id: "x4",
          slug: "x4",
          name: "Xteink X4",
          image: "/images/products/x4/gallery/xteink_x4_product_gallery_variant_2.jpg",
          price: 1590000,
          type: "product",
        });
        openDrawer();
      }}
      className="btn-glass-primary inline-flex h-13 items-center rounded-xl px-8 text-base font-semibold text-[#1A1A1A]"
    >
      Đặt hàng ngay
    </button>
  );
}
