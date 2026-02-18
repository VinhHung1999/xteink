"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronDown,
  Loader2,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { AdminGuard } from "@/contexts/AuthContext";
import {
  getProductListing,
  getAccessories,
  getCheckoutPaymentMethods,
  getDistricts,
  getWards,
  getShippingFee,
  createAdminOrder,
  getProvinces,
} from "@/services/api";
import type {
  ProductListingItem,
  Accessory,
  Province,
  District,
  Ward,
  CheckoutPaymentMethod,
} from "@/services/types";

// ===== Helpers =====

function parsePrice(priceStr: string): number {
  // "1.590.000₫" → 1590000
  return parseInt(priceStr.replace(/[^\d]/g, ""), 10) || 0;
}

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "\u20ab";
}

// ===== Types =====

interface OrderLineItem {
  key: string; // unique key for React
  slug: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  type: "product" | "accessory";
}

// ===== Create Form Content =====

function CreateFormContent() {
  const router = useRouter();

  // Product catalog
  const [products, setProducts] = useState<ProductListingItem[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<CheckoutPaymentMethod[]>([]);
  const [loadingCatalog, setLoadingCatalog] = useState(true);

  // Order line items
  const [lineItems, setLineItems] = useState<OrderLineItem[]>([]);

  // Customer info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Address cascade
  const [provinceCode, setProvinceCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [wardCode, setWardCode] = useState("");
  const [address, setAddress] = useState("");
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  // Payment + shipping
  const [paymentId, setPaymentId] = useState("cod");
  const [shippingFee, setShippingFee] = useState(0);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [note, setNote] = useState("");

  // Form state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Load catalog on mount
  useEffect(() => {
    async function load() {
      try {
        const [prods, accs, provs, pms] = await Promise.all([
          getProductListing(),
          getAccessories(),
          getProvinces(),
          getCheckoutPaymentMethods(),
        ]);
        setProducts(prods);
        setAccessories(accs);
        setProvinces(provs);
        setPaymentMethods(pms);
      } catch {
        // Catalog load failed — form still usable
      } finally {
        setLoadingCatalog(false);
      }
    }
    load();
  }, []);

  // Address cascade
  const fetchDistricts = useCallback(async (code: string) => {
    if (!code) { setDistricts([]); return; }
    setLoadingDistricts(true);
    try { setDistricts(await getDistricts(code)); } catch { setDistricts([]); }
    finally { setLoadingDistricts(false); }
  }, []);

  const fetchWards = useCallback(async (code: string) => {
    if (!code) { setWards([]); return; }
    setLoadingWards(true);
    try { setWards(await getWards(code)); } catch { setWards([]); }
    finally { setLoadingWards(false); }
  }, []);

  // Shipping fee
  const subtotal = lineItems.reduce((s, i) => s + i.unitPrice * i.quantity, 0);

  const fetchShippingFee = useCallback(async (code: string, sub: number) => {
    if (!code) { setShippingFee(0); return; }
    setLoadingShipping(true);
    try {
      const data = await getShippingFee(code, sub);
      setShippingFee(data.fee);
    } catch { setShippingFee(35000); }
    finally { setLoadingShipping(false); }
  }, []);

  useEffect(() => {
    if (provinceCode) fetchShippingFee(provinceCode, subtotal);
  }, [provinceCode, subtotal, fetchShippingFee]);

  function handleProvinceChange(code: string) {
    setProvinceCode(code);
    setDistrictCode(""); setWardCode(""); setWards([]);
    fetchDistricts(code);
    clearError("province");
  }

  function handleDistrictChange(code: string) {
    setDistrictCode(code); setWardCode("");
    fetchWards(code);
    clearError("district");
  }

  function clearError(field: string) {
    if (errors[field]) setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  }

  // Product management
  function addProduct(prod: ProductListingItem) {
    const existing = lineItems.find((i) => i.slug === prod.slug);
    if (existing) {
      setLineItems((items) =>
        items.map((i) => i.slug === prod.slug ? { ...i, quantity: i.quantity + 1 } : i)
      );
    } else {
      setLineItems((items) => [...items, {
        key: `prod-${prod.slug}`,
        slug: prod.slug,
        name: prod.name,
        image: prod.image,
        unitPrice: parsePrice(prod.price),
        quantity: 1,
        type: "product",
      }]);
    }
    clearError("items");
  }

  function addAccessory(acc: Accessory) {
    const slug = acc.name.toLowerCase().replace(/\s+/g, "-");
    const existing = lineItems.find((i) => i.slug === slug);
    if (existing) {
      setLineItems((items) =>
        items.map((i) => i.slug === slug ? { ...i, quantity: i.quantity + 1 } : i)
      );
    } else {
      setLineItems((items) => [...items, {
        key: `acc-${slug}`,
        slug,
        name: acc.name,
        image: acc.image,
        unitPrice: parsePrice(acc.price),
        quantity: 1,
        type: "accessory",
      }]);
    }
    clearError("items");
  }

  function updateItemQuantity(key: string, qty: number) {
    if (qty <= 0) {
      setLineItems((items) => items.filter((i) => i.key !== key));
    } else {
      setLineItems((items) => items.map((i) => i.key === key ? { ...i, quantity: qty } : i));
    }
  }

  function removeItem(key: string) {
    setLineItems((items) => items.filter((i) => i.key !== key));
  }

  // Validation
  function validate(): boolean {
    const e: Record<string, string> = {};
    if (lineItems.length === 0) e.items = "Vui long chon it nhat 1 san pham";
    if (!name.trim()) e.name = "Vui long nhap ho ten";
    if (!phone.trim()) {
      e.phone = "Vui long nhap SDT";
    } else if (!/^0\d{9,10}$/.test(phone.replace(/[\s-]/g, ""))) {
      e.phone = "SDT khong hop le (10-11 so, bat dau bang 0)";
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      e.email = "Email khong hop le";
    }
    if (!provinceCode) e.province = "Vui long chon tinh/thanh";
    if (!districtCode) e.district = "Vui long chon quan/huyen";
    if (!wardCode) e.ward = "Vui long chon phuong/xa";
    if (!address.trim()) e.address = "Vui long nhap dia chi chi tiet";
    setErrors(e);

    const firstKey = Object.keys(e)[0];
    if (firstKey) {
      const el = document.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.focus(); }
    }
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setErrors({});

    try {
      const result = await createAdminOrder({
        customer: {
          name: name.trim(),
          phone: phone.replace(/[\s-]/g, ""),
          email: email.trim() || undefined,
        },
        shipping: {
          provinceCode,
          districtCode,
          wardCode,
          addressDetail: address.trim(),
        },
        paymentMethodId: paymentId,
        notes: note.trim() || undefined,
        items: lineItems.map((i) => ({
          slug: i.slug,
          name: i.name,
          image: i.image,
          unitPrice: i.unitPrice,
          quantity: i.quantity,
          type: i.type,
        })),
      });
      router.push(`/admin/orders/${result.id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Tao don that bai";
      setErrors({ submit: message });
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-paper/10 bg-paper/[0.03] px-4 py-3 text-sm text-paper placeholder:text-paper/30 outline-none transition-colors focus:border-gold/40 focus:bg-paper/[0.05]";
  const selectCls =
    "w-full appearance-none rounded-xl border border-paper/10 bg-paper/[0.03] px-4 py-3 pr-10 text-sm text-paper outline-none transition-colors focus:border-gold/40 focus:bg-paper/[0.05]";
  const labelCls = "block text-sm font-medium text-paper/70 mb-1.5";
  const errorCls = "mt-1 text-xs text-red-400";

  if (loadingCatalog) {
    return (
      <div className="bg-mysterious min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-paper/30" />
      </div>
    );
  }

  return (
    <div className="bg-mysterious min-h-screen px-4 py-6 md:px-8">
      <div className="mx-auto max-w-[1000px]">
        {/* Back */}
        <button
          onClick={() => router.push("/admin/orders")}
          className="inline-flex items-center gap-2 text-sm text-paper/50 transition-colors hover:text-paper"
        >
          <ArrowLeft size={16} />
          Quay lai danh sach
        </button>

        <h1 className="mt-4 font-heading text-2xl font-bold text-paper md:text-3xl">
          Tao don hang thu cong
        </h1>
        <p className="mt-1 text-sm text-paper/50">
          Don tu Zalo, Facebook DM
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_360px]">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Product Selector */}
              <div className="glass-card rounded-2xl p-5 space-y-4">
                <h2 className="text-base font-semibold text-paper">San pham</h2>

                {/* Products */}
                <div className="space-y-2">
                  <p className="text-xs text-paper/40">Thiet bi</p>
                  <div className="flex flex-wrap gap-2">
                    {products.map((p) => (
                      <button
                        key={p.slug}
                        type="button"
                        onClick={() => addProduct(p)}
                        className="glass-card rounded-xl px-3 py-2 text-xs font-medium text-paper transition-colors hover:bg-gold/10 hover:text-gold"
                      >
                        {p.name} — {p.price}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accessories */}
                <div className="space-y-2">
                  <p className="text-xs text-paper/40">Phu kien</p>
                  <div className="flex flex-wrap gap-2">
                    {accessories.map((a) => (
                      <button
                        key={a.name}
                        type="button"
                        onClick={() => addAccessory(a)}
                        className="glass-card rounded-xl px-3 py-2 text-xs font-medium text-paper transition-colors hover:bg-gold/10 hover:text-gold"
                      >
                        {a.name} — {a.price}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Items */}
                {lineItems.length > 0 && (
                  <div className="space-y-2 border-t border-paper/5 pt-4">
                    {lineItems.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center gap-3 rounded-xl border border-paper/5 p-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-paper truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-paper/40">
                            {formatPrice(item.unitPrice)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateItemQuantity(item.key, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-paper/10 text-paper/50 transition-colors hover:text-paper"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-sm text-paper">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateItemQuantity(item.key, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-paper/10 text-paper/50 transition-colors hover:text-paper"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(item.key)}
                            className="ml-1 text-red-400/50 transition-colors hover:text-red-400"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="w-24 text-right text-sm font-medium text-paper">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {errors.items && <p className={errorCls}>{errors.items}</p>}
              </div>

              {/* Customer Info */}
              <div className="glass-card rounded-2xl p-5 space-y-4">
                <h2 className="text-base font-semibold text-paper">Khach hang</h2>

                <div>
                  <label className={labelCls}>Ho ten <span className="text-red-400">*</span></label>
                  <input type="text" name="name" value={name}
                    onChange={(e) => { setName(e.target.value); clearError("name"); }}
                    placeholder="Nguyen Van A" className={inputCls} />
                  {errors.name && <p className={errorCls}>{errors.name}</p>}
                </div>

                <div>
                  <label className={labelCls}>SDT <span className="text-red-400">*</span></label>
                  <input type="tel" name="phone" value={phone}
                    onChange={(e) => { setPhone(e.target.value); clearError("phone"); }}
                    placeholder="0901 234 567" className={inputCls} />
                  {errors.phone && <p className={errorCls}>{errors.phone}</p>}
                </div>

                <div>
                  <label className={labelCls}>Email (khong bat buoc)</label>
                  <input type="email" name="email" value={email}
                    onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                    placeholder="email@example.com" className={inputCls} />
                  {errors.email && <p className={errorCls}>{errors.email}</p>}
                </div>
              </div>

              {/* Address */}
              <div className="glass-card rounded-2xl p-5 space-y-4">
                <h2 className="text-base font-semibold text-paper">Dia chi giao hang</h2>

                <div>
                  <label className={labelCls}>Tinh / Thanh pho <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <select name="province" value={provinceCode}
                      onChange={(e) => handleProvinceChange(e.target.value)}
                      className={selectCls}>
                      <option value="">— Chon tinh/thanh —</option>
                      {provinces.map((p) => <option key={p.code} value={p.code}>{p.name}</option>)}
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-paper/40" />
                  </div>
                  {errors.province && <p className={errorCls}>{errors.province}</p>}
                </div>

                <div>
                  <label className={labelCls}>Quan / Huyen <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <select name="district" value={districtCode}
                      onChange={(e) => { handleDistrictChange(e.target.value); clearError("district"); }}
                      className={selectCls} disabled={!provinceCode || loadingDistricts}>
                      <option value="">{loadingDistricts ? "Dang tai..." : "— Chon quan/huyen —"}</option>
                      {districts.map((d) => <option key={d.code} value={d.code}>{d.name}</option>)}
                    </select>
                    {loadingDistricts
                      ? <Loader2 size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-paper/40" />
                      : <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-paper/40" />}
                  </div>
                  {errors.district && <p className={errorCls}>{errors.district}</p>}
                </div>

                <div>
                  <label className={labelCls}>Phuong / Xa <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <select name="ward" value={wardCode}
                      onChange={(e) => { setWardCode(e.target.value); clearError("ward"); }}
                      className={selectCls} disabled={!districtCode || loadingWards}>
                      <option value="">{loadingWards ? "Dang tai..." : "— Chon phuong/xa —"}</option>
                      {wards.map((w) => <option key={w.code} value={w.code}>{w.name}</option>)}
                    </select>
                    {loadingWards
                      ? <Loader2 size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-paper/40" />
                      : <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-paper/40" />}
                  </div>
                  {errors.ward && <p className={errorCls}>{errors.ward}</p>}
                </div>

                <div>
                  <label className={labelCls}>Dia chi chi tiet <span className="text-red-400">*</span></label>
                  <input type="text" name="address" value={address}
                    onChange={(e) => { setAddress(e.target.value); clearError("address"); }}
                    placeholder="So nha, ten duong..." className={inputCls} />
                  {errors.address && <p className={errorCls}>{errors.address}</p>}
                </div>
              </div>

              {/* Payment + Note */}
              <div className="glass-card rounded-2xl p-5 space-y-4">
                <h2 className="text-base font-semibold text-paper">Thanh toan</h2>
                <div className="space-y-2">
                  {paymentMethods.map((pm) => (
                    <label
                      key={pm.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors ${
                        paymentId === pm.id
                          ? "border-gold/40 bg-gold/[0.06]"
                          : "border-paper/10 bg-paper/[0.02] hover:border-paper/20"
                      }`}
                    >
                      <input type="radio" name="payment" value={pm.id}
                        checked={paymentId === pm.id}
                        onChange={() => setPaymentId(pm.id)}
                        className="sr-only" />
                      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                        paymentId === pm.id ? "border-gold" : "border-paper/30"
                      }`}>
                        {paymentId === pm.id && <span className="h-2 w-2 rounded-full bg-gold" />}
                      </span>
                      <span className="text-sm text-paper">{pm.name}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className={labelCls}>Ghi chu (khong bat buoc)</label>
                  <textarea value={note} onChange={(e) => setNote(e.target.value)}
                    placeholder="Ghi chu cho don hang..." rows={2}
                    className={inputCls + " resize-none"} />
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div>
              <div className="sticky top-20 glass-card rounded-2xl p-5 space-y-4">
                <h2 className="text-base font-semibold text-paper">Tom tat don hang</h2>

                {lineItems.length === 0 ? (
                  <p className="text-sm text-paper/40">Chua chon san pham</p>
                ) : (
                  <div className="space-y-2">
                    {lineItems.map((item) => (
                      <div key={item.key} className="flex justify-between text-sm">
                        <span className="text-paper/70">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="text-paper">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2 border-t border-paper/5 pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-paper/60">Tam tinh</span>
                    <span className="text-paper">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-paper/60">Phi van chuyen</span>
                    <span className="text-paper">
                      {loadingShipping
                        ? "Dang tinh..."
                        : provinceCode
                          ? shippingFee === 0 ? "Mien phi" : formatPrice(shippingFee)
                          : "\u2014"}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-paper/5 pt-2">
                    <span className="text-base font-semibold text-paper">Tong cong</span>
                    <span className="font-heading text-xl font-bold text-gold">
                      {formatPrice(subtotal + shippingFee)}
                    </span>
                  </div>
                </div>

                {errors.submit && (
                  <p className="rounded-lg bg-red-500/10 p-3 text-center text-sm text-red-400">
                    {errors.submit}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting || lineItems.length === 0}
                  className="btn-glass-primary w-full inline-flex h-12 items-center justify-center rounded-xl text-base font-semibold text-[#1A1A1A] disabled:opacity-50"
                >
                  {submitting ? "Dang tao..." : "Tao don hang"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// ===== Exported Component =====

export default function AdminOrderCreateClient() {
  return (
    <AdminGuard>
      <CreateFormContent />
    </AdminGuard>
  );
}
