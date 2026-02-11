"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "₫";
}

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isDrawerOpen,
    totalItems,
    totalPrice,
    removeItem,
    updateQuantity,
    clearCart,
    closeDrawer,
  } = useCart();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDrawerOpen, closeDrawer]);

  return (
    <>
      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-[80] bg-[#1A1A1A]/50 backdrop-blur-sm"
          style={{ animation: "fade-in 0.2s ease-out" }}
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[90] flex h-full w-full max-w-sm flex-col ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-out`}
        style={{
          background: "rgba(26,26,26,0.95)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          boxShadow: "-4px 0 32px rgba(0,0,0,0.3)",
          borderLeft: "1px solid rgba(232,224,214,0.05)",
        }}
      >
        {/* Header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-paper/5 px-4">
          <h2 className="font-heading text-lg font-semibold text-paper">
            Giỏ hàng{totalItems > 0 && ` (${totalItems})`}
          </h2>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-paper/60 transition-colors hover:text-paper"
            onClick={closeDrawer}
            aria-label="Đóng giỏ hàng"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/5">
              <ShoppingBag size={28} className="text-paper/30" />
            </div>
            <p className="text-sm text-paper/50">
              Giỏ hàng trống. Hãy khám phá sản phẩm của chúng tôi!
            </p>
          </div>
        ) : (
          <>
            {/* Item list */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="animate-cart-item-in flex gap-3 rounded-xl bg-paper/[0.03] p-3"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-sm font-medium text-paper">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-gold">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-paper/10 text-paper/60 transition-colors hover:border-gold/30 hover:text-paper"
                            aria-label="Giảm số lượng"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm text-paper">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-paper/10 text-paper/60 transition-colors hover:border-gold/30 hover:text-paper"
                            aria-label="Tăng số lượng"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-paper/30 transition-colors hover:text-red-400"
                          aria-label="Xóa sản phẩm"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear all */}
              {items.length > 1 && (
                <button
                  onClick={clearCart}
                  className="mt-4 w-full text-center text-xs text-paper/40 underline underline-offset-2 transition-colors hover:text-paper/60"
                >
                  Xóa tất cả
                </button>
              )}
            </div>

            {/* Footer — total + checkout */}
            <div className="shrink-0 border-t border-paper/5 px-4 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-paper/70">Tạm tính</span>
                <span className="font-heading text-xl font-bold text-gold-shimmer">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <button
                className="btn-glass-primary mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl text-base font-semibold text-[#1A1A1A]"
                onClick={() => {
                  closeDrawer();
                  router.push("/checkout");
                }}
              >
                Đặt hàng ngay
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
