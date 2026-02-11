"use client";

import { useCart } from "@/contexts/CartContext";

interface AddToCartButtonProps {
  productId: string;
  slug: string;
  productName: string;
  image: string;
  price: number;
  type: "product" | "accessory";
}

export default function AddToCartButton({
  productId,
  slug,
  productName,
  image,
  price,
  type,
}: AddToCartButtonProps) {
  const { addItem, openDrawer } = useCart();

  return (
    <button
      onClick={() => {
        addItem({ id: productId, slug, name: productName, image, price, type });
        openDrawer();
      }}
      className="mt-8 btn-glass-primary inline-flex h-13 w-full items-center justify-center rounded-xl text-base font-semibold text-[#1A1A1A]"
    >
      Thêm vào giỏ hàng
    </button>
  );
}
