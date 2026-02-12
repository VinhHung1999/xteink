"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { getOrder } from "@/services/api";
import type { OrderDetailResponse } from "@/services/types";
import { trackPurchase } from "@/utils/analytics";
import OrderSuccessSkeleton from "@/components/skeletons/OrderSuccessSkeleton";

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "₫";
}

export default function OrderSuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const [order, setOrder] = useState<OrderDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    if (!orderNumber) {
      router.replace("/");
      return;
    }
    loaded.current = true;
    getOrder(orderNumber)
      .then((data) => {
        setOrder(data);
        if (data) {
          trackPurchase(data.orderNumber, data.total);
        }
      })
      .catch(() => router.replace("/"))
      .finally(() => setLoading(false));
  }, [orderNumber, router]);

  if (loading) {
    return <OrderSuccessSkeleton />;
  }

  if (!order) return null;

  return (
    <section className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-[960px]">
        {/* Success header — compact */}
        <div className="scroll-reveal flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage/20">
            <CheckCircle size={20} className="text-sage" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-paper md:text-3xl">
              Đặt hàng thành công!
            </h1>
            <p className="text-sm text-paper/50">
              Cảm ơn bạn đã tin tưởng Xteink. Chúng tôi sẽ liên hệ sớm nhất.
            </p>
          </div>
        </div>

        {/* 2-column grid: mobile = products first, desktop = info left + products right */}
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_380px]">

          {/* LEFT (desktop) / BOTTOM (mobile): Order info */}
          <div className="order-2 md:order-1 space-y-5">
            {/* Order number + status */}
            <div className="scroll-reveal glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-paper/60">Mã đơn hàng</span>
                <span className="font-mono text-sm font-bold text-gold">
                  {order.orderNumber}
                </span>
              </div>
            </div>

            {/* Customer + Shipping info */}
            <div className="scroll-reveal scroll-d1 glass-card rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-gold mb-3">Thông tin giao hàng</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-paper/60">Họ tên</span>
                  <span className="text-paper">{order.customer.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-paper/60">Điện thoại</span>
                  <span className="text-paper">{order.customer.phone}</span>
                </div>
                {order.customer.email && (
                  <div className="flex justify-between text-sm">
                    <span className="text-paper/60">Email</span>
                    <span className="text-paper">{order.customer.email}</span>
                  </div>
                )}
                <div className="flex justify-between gap-4 text-sm">
                  <span className="shrink-0 text-paper/60">Địa chỉ</span>
                  <span className="text-right text-paper">{order.shippingAddress}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-paper/60">Thanh toán</span>
                  <span className="text-paper">{order.paymentMethodName}</span>
                </div>
                {order.notes && (
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="shrink-0 text-paper/60">Ghi chú</span>
                    <span className="text-right text-paper/80">{order.notes}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bank transfer info */}
            {order.paymentInfo?.bankName && (
              <div className="scroll-reveal scroll-d2 rounded-2xl border border-gold/20 bg-gold/[0.04] p-5">
                <h3 className="text-sm font-semibold text-gold mb-3">Thông tin chuyển khoản</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-paper/60">Ngân hàng</span>
                    <span className="text-paper">{order.paymentInfo.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-paper/60">Số tài khoản</span>
                    <span className="font-mono text-paper">{order.paymentInfo.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-paper/60">Chủ tài khoản</span>
                    <span className="text-paper">{order.paymentInfo.accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-paper/60">Số tiền</span>
                    <span className="font-semibold text-gold">
                      {formatPrice(order.paymentInfo.amount ?? order.total)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-paper/60">Nội dung CK</span>
                    <span className="font-mono font-bold text-paper">
                      {order.paymentInfo.transferContent}
                    </span>
                  </div>
                </div>
                {order.paymentInfo.qrDataUrl && (
                  <div className="mt-4 flex justify-center">
                    <Image
                      src={order.paymentInfo.qrDataUrl}
                      alt="QR chuyển khoản"
                      width={140}
                      height={140}
                      className="rounded-lg"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Gateway stub message */}
            {order.paymentInfo?.message && !order.paymentInfo.bankName && (
              <div className="scroll-reveal rounded-2xl border border-paper/10 bg-paper/[0.03] p-5">
                <p className="text-sm text-paper/70">{order.paymentInfo.message}</p>
              </div>
            )}
          </div>

          {/* RIGHT (desktop) / TOP (mobile): Products + Totals */}
          <div className="order-1 md:order-2">
            <div className="scroll-reveal glass-card rounded-2xl p-5 md:sticky md:top-20">
              <h3 className="text-sm font-semibold text-gold mb-4">Sản phẩm đã đặt</h3>

              {/* Items */}
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 items-center justify-between text-sm">
                      <div>
                        <p className="text-paper font-medium">{item.productName}</p>
                        <p className="text-xs text-paper/50">×{item.quantity}</p>
                      </div>
                      <span className="text-paper font-medium">
                        {formatPrice(item.totalPrice)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-5 space-y-2 border-t border-paper/5 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-paper/60">Tạm tính</span>
                  <span className="text-paper">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-paper/60">Phí vận chuyển</span>
                  <span className="text-paper">
                    {order.shippingFee === 0 ? "Miễn phí" : formatPrice(order.shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-paper/5 pt-3">
                  <span className="text-base font-semibold text-paper">Tổng cộng</span>
                  <span className="font-heading text-xl font-bold text-gold-shimmer">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              {/* Back to home — inside card on mobile, below on desktop */}
              <button
                onClick={() => router.push("/")}
                className="btn-glass-primary mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold text-[#1A1A1A]"
              >
                Về trang chủ
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
