"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderData {
  orderId: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  note?: string;
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "₫";
}

export default function OrderSuccessClient() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    const raw = sessionStorage.getItem("xteink-last-order");
    if (!raw) {
      router.replace("/");
      return;
    }
    loaded.current = true;
    setOrder(JSON.parse(raw));
  }, [router]);

  function handleGoHome() {
    sessionStorage.removeItem("xteink-last-order");
    router.push("/");
  }

  if (!order) return null;

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[640px]">
        {/* Success header */}
        <div className="scroll-reveal text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
            <CheckCircle size={32} className="text-sage" />
          </div>
          <h1 className="mt-4 font-heading text-3xl font-bold text-paper">
            Đặt hàng thành công!
          </h1>
          <p className="mt-2 text-sm text-paper/50">
            Cảm ơn bạn đã tin tưởng Xteink. Chúng tôi sẽ liên hệ sớm nhất.
          </p>
        </div>

        {/* Order details */}
        <div className="scroll-reveal scroll-d1 mt-10 glass-card rounded-2xl p-6">
          {/* Order ID */}
          <div className="flex items-center justify-between border-b border-paper/5 pb-4">
            <span className="text-sm text-paper/60">Mã đơn hàng</span>
            <span className="font-mono text-sm font-bold text-gold">
              {order.orderId}
            </span>
          </div>

          {/* Customer info */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-paper/60">Họ tên</span>
              <span className="text-paper">{order.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-paper/60">Điện thoại</span>
              <span className="text-paper">{order.phone}</span>
            </div>
            {order.email && (
              <div className="flex justify-between text-sm">
                <span className="text-paper/60">Email</span>
                <span className="text-paper">{order.email}</span>
              </div>
            )}
            <div className="flex justify-between gap-4 text-sm">
              <span className="shrink-0 text-paper/60">Địa chỉ</span>
              <span className="text-right text-paper">{order.address}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-paper/60">Thanh toán</span>
              <span className="text-paper">{order.paymentMethod}</span>
            </div>
            {order.note && (
              <div className="flex justify-between gap-4 text-sm">
                <span className="shrink-0 text-paper/60">Ghi chú</span>
                <span className="text-right text-paper/80">{order.note}</span>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="mt-6 border-t border-paper/5 pt-4">
            <p className="text-sm font-medium text-paper/70">Sản phẩm</p>
            <div className="mt-3 space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-paper">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-paper">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="mt-4 space-y-2 border-t border-paper/5 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-paper/60">Tạm tính</span>
              <span className="text-paper">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-paper/60">Phí vận chuyển</span>
              <span className="text-paper">{formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-paper/5 pt-3">
              <span className="text-base font-semibold text-paper">Tổng cộng</span>
              <span className="font-heading text-xl font-bold text-gold-shimmer">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Back to home */}
        <div className="scroll-reveal scroll-d2 mt-8 text-center">
          <button
            onClick={handleGoHome}
            className="btn-glass-primary inline-flex h-12 items-center rounded-xl px-8 text-base font-semibold text-[#1A1A1A]"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </section>
  );
}
