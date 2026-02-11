"use client";

interface AddToCartButtonProps {
  productName: string;
}

export default function AddToCartButton({ productName }: AddToCartButtonProps) {
  return (
    <button
      onClick={() => alert(`Đã thêm ${productName} vào giỏ hàng!`)}
      className="mt-8 btn-glass-primary inline-flex h-13 w-full items-center justify-center rounded-xl text-base font-semibold text-[#1A1A1A]"
    >
      Thêm vào giỏ hàng
    </button>
  );
}
