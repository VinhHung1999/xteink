"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Copy,
  Check,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Package,
  CreditCard,
  Clock,
} from "lucide-react";
import { AdminGuard } from "@/contexts/AuthContext";
import { getAdminOrderDetail } from "@/services/api";
import type { AdminOrderDetail, OrderStatus } from "@/services/types";

// ===== Constants =====

const STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "Cho xu ly",
  CONFIRMED: "Da xac nhan",
  SHIPPING: "Dang giao",
  DELIVERED: "Da giao",
  CANCELLED: "Da huy",
};

const STATUS_COLOR: Record<OrderStatus, string> = {
  PENDING: "bg-gold/20 text-gold",
  CONFIRMED: "bg-sage/20 text-sage",
  SHIPPING: "bg-cyan-500/20 text-cyan-400",
  DELIVERED: "bg-sage/20 text-sage",
  CANCELLED: "bg-red-500/20 text-red-400",
};

const PAYMENT_STATUS_COLOR: Record<string, string> = {
  PENDING: "text-gold",
  PAID: "text-sage",
  FAILED: "text-red-400",
};

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "\u20ab";
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

// ===== Copy Button =====

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback — do nothing
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-paper/40 transition-colors hover:bg-paper/5 hover:text-paper/60"
      title={`Copy ${label}`}
    >
      {copied ? <Check size={12} className="text-sage" /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

// ===== Detail Content =====

function OrderDetailContent({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [order, setOrder] = useState<AdminOrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getAdminOrderDetail(orderId);
      setOrder(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Khong the tai don hang");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  if (loading) {
    return (
      <div className="bg-mysterious min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-paper/30" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-mysterious min-h-screen px-4 py-6 md:px-8">
        <div className="mx-auto max-w-[1000px]">
          <button
            onClick={() => router.push("/admin/orders")}
            className="inline-flex items-center gap-2 text-sm text-paper/50 transition-colors hover:text-paper"
          >
            <ArrowLeft size={16} />
            Quay lai
          </button>
          <div className="mt-8 glass-card rounded-2xl p-6 text-center">
            <p className="text-red-400">{error || "Khong tim thay don hang"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-mysterious min-h-screen px-4 py-6 md:px-8">
      <div className="mx-auto max-w-[1000px]">
        {/* Back + Header */}
        <button
          onClick={() => router.push("/admin/orders")}
          className="inline-flex items-center gap-2 text-sm text-paper/50 transition-colors hover:text-paper"
        >
          <ArrowLeft size={16} />
          Quay lai danh sach
        </button>

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-paper md:text-3xl">
              {order.orderNumber}
            </h1>
            <p className="mt-1 text-sm text-paper/50">
              Dat luc {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${STATUS_COLOR[order.status]}`}
            >
              {STATUS_LABEL[order.status]}
            </span>
            <span
              className={`text-sm font-medium ${PAYMENT_STATUS_COLOR[order.paymentStatus] || "text-paper/50"}`}
            >
              {order.paymentStatus}
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Customer Info */}
          <div className="glass-card rounded-2xl p-5 space-y-4">
            <h2 className="flex items-center gap-2 text-base font-semibold text-paper">
              <Package size={18} className="text-gold" />
              Thong tin khach hang
            </h2>

            <div className="space-y-3">
              <div>
                <p className="text-lg font-semibold text-paper">
                  {order.customer.name}
                </p>
              </div>

              {/* Phone — large, tap-to-call on mobile */}
              <div className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-gold" />
                <a
                  href={`tel:${order.customer.phone}`}
                  className="text-lg font-mono font-semibold text-gold transition-colors hover:text-gold/80"
                >
                  {order.customer.phone}
                </a>
                <CopyButton text={order.customer.phone} label="SDT" />
              </div>

              {/* Email */}
              {order.customer.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} className="shrink-0 text-paper/40" />
                  <span className="text-sm text-paper/70">
                    {order.customer.email}
                  </span>
                </div>
              )}

              {/* Address — with copy button */}
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-paper/40" />
                <div className="flex-1">
                  <p className="text-sm text-paper/70">
                    {order.shipping.fullAddress}
                  </p>
                  <CopyButton
                    text={order.shipping.fullAddress}
                    label="dia chi"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="glass-card rounded-2xl p-5 space-y-4">
            <h2 className="flex items-center gap-2 text-base font-semibold text-paper">
              <CreditCard size={18} className="text-gold" />
              Thanh toan
            </h2>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-paper/60">Phuong thuc</span>
                <span className="font-medium text-paper">
                  {order.paymentMethodName}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-paper/60">Tam tinh</span>
                <span className="text-paper">
                  {formatPrice(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-paper/60">Phi van chuyen</span>
                <span className="text-paper">
                  {order.shippingFee === 0
                    ? "Mien phi"
                    : formatPrice(order.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between border-t border-paper/5 pt-2">
                <span className="text-base font-semibold text-paper">
                  Tong cong
                </span>
                <span className="font-heading text-xl font-bold text-gold">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>

            {order.notes && (
              <div className="rounded-xl bg-paper/[0.03] p-3">
                <p className="text-xs text-paper/40">Ghi chu</p>
                <p className="mt-1 text-sm text-paper/70">{order.notes}</p>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-paper/30">
              <Clock size={12} />
              Cap nhat: {formatDate(order.updatedAt)}
            </div>
          </div>
        </div>

        {/* Bank Transfer Info */}
        {order.bankTransferInfo && (
          <div className="mt-6 glass-card rounded-2xl p-5 space-y-3">
            <h2 className="text-base font-semibold text-paper">
              Thong tin chuyen khoan
            </h2>
            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-paper/60">Ngan hang</span>
                  <span className="text-paper">
                    {order.bankTransferInfo.bankName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-paper/60">So tai khoan</span>
                  <span className="font-mono text-paper">
                    {order.bankTransferInfo.accountNumber}
                    <CopyButton
                      text={order.bankTransferInfo.accountNumber}
                      label="STK"
                    />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-paper/60">Chu tai khoan</span>
                  <span className="text-paper">
                    {order.bankTransferInfo.accountHolder}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-paper/60">So tien</span>
                  <span className="font-semibold text-gold">
                    {formatPrice(order.bankTransferInfo.amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-paper/60">Noi dung CK</span>
                  <span className="font-mono text-paper">
                    {order.bankTransferInfo.content}
                    <CopyButton
                      text={order.bankTransferInfo.content}
                      label="noi dung"
                    />
                  </span>
                </div>
              </div>
              {order.bankTransferInfo.qrUrl && (
                <div className="flex justify-center">
                  <Image
                    src={order.bankTransferInfo.qrUrl}
                    alt="QR chuyen khoan"
                    width={160}
                    height={160}
                    className="rounded-xl"
                    unoptimized
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Order Items */}
        <div className="mt-6 glass-card rounded-2xl p-5">
          <h2 className="text-base font-semibold text-paper">
            San pham ({order.items.length})
          </h2>

          <div className="mt-4 space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-paper/5 p-3"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-paper/[0.03]">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-paper truncate">
                    {item.productName}
                  </p>
                  <p className="text-xs text-paper/40">
                    {formatPrice(item.unitPrice)} x {item.quantity}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-paper">
                  {formatPrice(item.totalPrice)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== Exported Component =====

export default function AdminOrderDetailClient({
  orderId,
}: {
  orderId: string;
}) {
  return (
    <AdminGuard>
      <OrderDetailContent orderId={orderId} />
    </AdminGuard>
  );
}
