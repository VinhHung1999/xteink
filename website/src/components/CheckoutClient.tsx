"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { Province, District, CheckoutPaymentMethod } from "@/services/types";

interface CheckoutClientProps {
  provinces: Province[];
  paymentMethods: CheckoutPaymentMethod[];
}

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "₫";
}

const SHIPPING_FEE = 30000;

export default function CheckoutClient({ provinces, paymentMethods }: CheckoutClientProps) {
  const router = useRouter();
  const { items, totalItems, totalPrice, clearCart } = useCart();

  // Redirect to home if cart is empty (after hydration)
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    if (hydrated && items.length === 0) {
      router.replace("/");
    }
  }, [hydrated, items.length, router]);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [wardCode, setWardCode] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentId, setPaymentId] = useState("cod");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Cascade data
  const selectedProvince = provinces.find((p) => p.code === provinceCode);
  const districts: District[] = selectedProvince?.districts ?? [];
  const selectedDistrict = districts.find((d) => d.code === districtCode);
  const wards = selectedDistrict?.wards ?? [];

  // Reset child selects on parent change
  useEffect(() => {
    setDistrictCode("");
    setWardCode("");
  }, [provinceCode]);
  useEffect(() => {
    setWardCode("");
  }, [districtCode]);

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Vui lòng nhập họ tên";
    if (!phone.trim()) {
      e.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^0\d{9}$/.test(phone.replace(/[\s-]/g, ""))) {
      e.phone = "Số điện thoại không hợp lệ (VD: 0901234567)";
    }
    if (!provinceCode) e.province = "Vui lòng chọn tỉnh/thành";
    if (!districtCode) e.district = "Vui lòng chọn quận/huyện";
    if (!wardCode) e.ward = "Vui lòng chọn phường/xã";
    if (!address.trim()) e.address = "Vui lòng nhập địa chỉ chi tiết";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    // Build order summary for success page
    const orderData = {
      orderId: "XTK" + Date.now().toString(36).toUpperCase(),
      name: name.trim(),
      phone: phone.replace(/[\s-]/g, ""),
      email: email.trim() || undefined,
      address: `${address.trim()}, ${wards.find((w) => w.code === wardCode)?.name}, ${selectedDistrict?.name}, ${selectedProvince?.name}`,
      note: note.trim() || undefined,
      paymentMethod: paymentMethods.find((p) => p.id === paymentId)?.name ?? "COD",
      items: items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
      subtotal: totalPrice,
      shipping: SHIPPING_FEE,
      total: totalPrice + SHIPPING_FEE,
    };

    // Store order for success page, clear cart, redirect
    sessionStorage.setItem("xteink-last-order", JSON.stringify(orderData));
    clearCart();
    router.push("/checkout/success");
  }

  // Don't render form until hydrated (avoids flash)
  if (!hydrated || items.length === 0) {
    return null;
  }

  const inputCls =
    "w-full rounded-xl border border-paper/10 bg-paper/[0.03] px-4 py-3 text-sm text-paper placeholder:text-paper/30 outline-none transition-colors focus:border-gold/40 focus:bg-paper/[0.05]";
  const selectCls =
    "w-full appearance-none rounded-xl border border-paper/10 bg-paper/[0.03] px-4 py-3 pr-10 text-sm text-paper outline-none transition-colors focus:border-gold/40 focus:bg-paper/[0.05]";
  const labelCls = "block text-sm font-medium text-paper/70 mb-1.5";
  const errorCls = "mt-1 text-xs text-red-400";

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1100px]">
        <h1 className="scroll-reveal font-heading text-3xl font-bold text-paper md:text-4xl">
          Thanh toán
        </h1>
        <p className="scroll-reveal scroll-d1 mt-2 text-sm text-paper/50">
          {totalItems} sản phẩm trong giỏ hàng
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mt-10 grid gap-10 md:grid-cols-[1fr_380px]">
            {/* Left: Form */}
            <div className="scroll-reveal scroll-d2 space-y-6">
              {/* Name */}
              <div>
                <label className={labelCls}>
                  Họ tên <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className={inputCls}
                />
                {errors.name && <p className={errorCls}>{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className={labelCls}>
                  Số điện thoại <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0901 234 567"
                  className={inputCls}
                />
                {errors.phone && <p className={errorCls}>{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className={labelCls}>Email (không bắt buộc)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className={inputCls}
                />
              </div>

              {/* Province */}
              <div>
                <label className={labelCls}>
                  Tỉnh / Thành phố <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={provinceCode}
                    onChange={(e) => setProvinceCode(e.target.value)}
                    className={selectCls}
                  >
                    <option value="">— Chọn tỉnh/thành —</option>
                    {provinces.map((p) => (
                      <option key={p.code} value={p.code}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-paper/40"
                  />
                </div>
                {errors.province && <p className={errorCls}>{errors.province}</p>}
              </div>

              {/* District */}
              <div>
                <label className={labelCls}>
                  Quận / Huyện <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={districtCode}
                    onChange={(e) => setDistrictCode(e.target.value)}
                    className={selectCls}
                    disabled={!provinceCode}
                  >
                    <option value="">— Chọn quận/huyện —</option>
                    {districts.map((d) => (
                      <option key={d.code} value={d.code}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-paper/40"
                  />
                </div>
                {errors.district && <p className={errorCls}>{errors.district}</p>}
              </div>

              {/* Ward */}
              <div>
                <label className={labelCls}>
                  Phường / Xã <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={wardCode}
                    onChange={(e) => setWardCode(e.target.value)}
                    className={selectCls}
                    disabled={!districtCode}
                  >
                    <option value="">— Chọn phường/xã —</option>
                    {wards.map((w) => (
                      <option key={w.code} value={w.code}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-paper/40"
                  />
                </div>
                {errors.ward && <p className={errorCls}>{errors.ward}</p>}
              </div>

              {/* Detailed address */}
              <div>
                <label className={labelCls}>
                  Địa chỉ chi tiết <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Số nhà, tên đường..."
                  className={inputCls}
                />
                {errors.address && <p className={errorCls}>{errors.address}</p>}
              </div>

              {/* Note */}
              <div>
                <label className={labelCls}>Ghi chú đơn hàng (không bắt buộc)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ghi chú cho đơn hàng..."
                  rows={3}
                  className={inputCls + " resize-none"}
                />
              </div>

              {/* Payment Methods (S5.3) */}
              <div>
                <h3 className="text-base font-semibold text-paper mb-3">
                  Phương thức thanh toán
                </h3>
                <div className="space-y-2">
                  {paymentMethods.map((pm) => (
                    <label
                      key={pm.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
                        paymentId === pm.id
                          ? "border-gold/40 bg-gold/[0.06]"
                          : "border-paper/10 bg-paper/[0.02] hover:border-paper/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={pm.id}
                        checked={paymentId === pm.id}
                        onChange={() => setPaymentId(pm.id)}
                        className="sr-only"
                      />
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          paymentId === pm.id
                            ? "border-gold"
                            : "border-paper/30"
                        }`}
                      >
                        {paymentId === pm.id && (
                          <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                        )}
                      </span>
                      <span className="text-lg">{pm.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-paper">{pm.name}</p>
                        <p className="text-xs text-paper/50">{pm.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Order summary */}
            <div className="scroll-reveal scroll-d3">
              <div className="sticky top-20 glass-card rounded-2xl p-6">
                <h3 className="font-heading text-lg font-semibold text-paper">
                  Đơn hàng của bạn
                </h3>

                <div className="mt-4 space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-paper">{item.name}</p>
                        <p className="text-xs text-paper/50">x{item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-paper">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2 border-t border-paper/5 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-paper/60">Tạm tính</span>
                    <span className="text-paper">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-paper/60">Phí vận chuyển</span>
                    <span className="text-paper">{formatPrice(SHIPPING_FEE)}</span>
                  </div>
                  <div className="flex justify-between border-t border-paper/5 pt-3">
                    <span className="text-base font-semibold text-paper">Tổng cộng</span>
                    <span className="font-heading text-xl font-bold text-gold-shimmer">
                      {formatPrice(totalPrice + SHIPPING_FEE)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-glass-primary mt-6 inline-flex h-13 w-full items-center justify-center rounded-xl text-base font-semibold text-[#1A1A1A] disabled:opacity-50"
                >
                  {submitting ? "Đang xử lý..." : "Đặt hàng"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
