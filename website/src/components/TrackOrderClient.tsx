"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Loader2, Package, CheckCircle, Truck, MapPin, XCircle } from "lucide-react";
import { getOrder } from "@/services/api";
import type { OrderDetailResponse } from "@/services/types";

const STATUS_STEPS = [
  { key: "PENDING", label: "Chờ xử lý", icon: Package },
  { key: "CONFIRMED", label: "Đã xác nhận", icon: CheckCircle },
  { key: "SHIPPING", label: "Đang giao hàng", icon: Truck },
  { key: "DELIVERED", label: "Đã giao", icon: MapPin },
];

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "₫";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusIndex(status: string): number {
  if (status === "CANCELLED") return -1;
  return STATUS_STEPS.findIndex((s) => s.key === status);
}

export default function TrackOrderClient() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<OrderDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedOrder = orderNumber.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedOrder) {
      setError("Vui lòng nhập mã đơn hàng");
      return;
    }
    if (!trimmedPhone || !/^0\d{9,10}$/.test(trimmedPhone)) {
      setError("Vui lòng nhập số điện thoại hợp lệ");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const result = await getOrder(trimmedOrder);
      // Verify phone matches
      if (result.customer.phone !== trimmedPhone) {
        setError("Số điện thoại không khớp với đơn hàng này");
        return;
      }
      setOrder(result);
    } catch {
      setError("Không tìm thấy đơn hàng. Vui lòng kiểm tra lại mã đơn.");
    } finally {
      setLoading(false);
    }
  }

  const currentStep = order ? getStatusIndex(order.status) : -1;
  const isCancelled = order?.status === "CANCELLED";

  return (
    <div className="bg-mysterious min-h-screen px-6 pt-32 pb-20">
      <div className="mx-auto max-w-[700px]">
        {/* Header */}
        <div className="text-center">
          <p className="scroll-reveal text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
            Tra cứu đơn hàng
          </p>
          <h1 className="scroll-reveal scroll-d1 mt-4 font-heading text-3xl font-bold text-paper md:text-4xl">
            Theo dõi đơn hàng
          </h1>
          <p className="scroll-reveal scroll-d2 mt-3 text-sm text-paper/60">
            Nhập mã đơn hàng và số điện thoại để xem trạng thái giao hàng.
          </p>
        </div>

        {/* Search form */}
        <form
          onSubmit={handleSubmit}
          className="scroll-reveal scroll-d3 mt-10 glass-card rounded-2xl p-6"
          data-testid="track-order-form"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="orderNumber" className="mb-1.5 block text-xs font-medium text-paper/60">
                Mã đơn hàng
              </label>
              <input
                id="orderNumber"
                type="text"
                value={orderNumber}
                onChange={(e) => { setOrderNumber(e.target.value); setError(""); }}
                placeholder="VD: XT-20260212-0001"
                className="glass-input h-12 w-full rounded-xl px-4 text-sm text-paper placeholder:text-warm-cream/30 focus:outline-none"
                data-testid="track-order-number"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-xs font-medium text-paper/60">
                Số điện thoại đặt hàng
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setError(""); }}
                placeholder="VD: 0901234567"
                className="glass-input h-12 w-full rounded-xl px-4 text-sm text-paper placeholder:text-warm-cream/30 focus:outline-none"
                data-testid="track-order-phone"
              />
            </div>
          </div>
          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-glass-primary mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-[#1A1A1A] disabled:opacity-50"
            data-testid="track-order-submit"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Search size={16} />
            )}
            Tra cứu
          </button>
        </form>

        {/* Results */}
        {order && (
          <div className="mt-8 space-y-6 animate-fade-up">
            {/* Status timeline */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-heading text-lg font-semibold text-paper">
                Trạng thái đơn hàng
              </h2>

              {isCancelled ? (
                <div className="mt-4 flex items-center gap-3 rounded-xl bg-red-500/10 px-4 py-3">
                  <XCircle size={20} className="text-red-400 shrink-0" />
                  <p className="text-sm font-medium text-red-400">
                    Đơn hàng đã bị hủy
                  </p>
                </div>
              ) : (
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    {STATUS_STEPS.map((step, i) => {
                      const Icon = step.icon;
                      const isActive = i <= currentStep;
                      const isCurrent = i === currentStep;
                      return (
                        <div key={step.key} className="flex flex-1 flex-col items-center relative">
                          {/* Connector line */}
                          {i > 0 && (
                            <div
                              className={`absolute top-5 right-1/2 h-0.5 w-full -translate-y-1/2 ${
                                i <= currentStep ? "bg-gold" : "bg-paper/10"
                              }`}
                              style={{ zIndex: 0 }}
                            />
                          )}
                          {/* Icon circle */}
                          <div
                            className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                              isCurrent
                                ? "bg-gold text-[#1A1A1A]"
                                : isActive
                                ? "bg-gold/20 text-gold"
                                : "bg-paper/5 text-paper/30"
                            }`}
                          >
                            <Icon size={18} />
                          </div>
                          <p
                            className={`mt-2 text-center text-[10px] font-medium md:text-xs ${
                              isActive ? "text-paper" : "text-paper/30"
                            }`}
                          >
                            {step.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Order info */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-heading text-lg font-semibold text-paper">
                Thông tin đơn hàng
              </h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-paper/50">Mã đơn</span>
                  <span className="font-mono text-gold">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-paper/50">Ngày đặt</span>
                  <span className="text-paper">{formatDate(order.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-paper/50">Thanh toán</span>
                  <span className="text-paper">{order.paymentMethodName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-paper/50">Giao đến</span>
                  <span className="text-right text-paper max-w-[60%]">{order.shippingAddress}</span>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-heading text-lg font-semibold text-paper">
                Sản phẩm
              </h2>
              <div className="mt-4 space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-paper">{item.productName}</p>
                      <p className="text-xs text-paper/50">x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-paper">
                      {formatPrice(item.totalPrice)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2 border-t border-paper/5 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-paper/50">Tạm tính</span>
                  <span className="text-paper">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-paper/50">Phí giao hàng</span>
                  <span className="text-paper">
                    {order.shippingFee === 0 ? "Miễn phí" : formatPrice(order.shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold">
                  <span className="text-paper">Tổng cộng</span>
                  <span className="text-gold">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
