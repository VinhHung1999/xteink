/**
 * API Service Layer
 *
 * Fetches data from the backend API (port 3001).
 * Maps BE icon strings → LucideIcon components via resolveIcon().
 * Falls back to mock data if BE is unavailable (resilience).
 * Function signatures unchanged — zero component changes needed.
 */

import {
  ProductData,
  ProductDetailData,
  Feature,
  PricingData,
  Testimonial,
  LifestyleMoment,
  NavLink,
  FooterData,
  SnapFlipReadStep,
  ProductComparisonData,
  Accessory,
  PurchaseInfoData,
  ProductListingItem,
  FAQItem,
  SocialProofData,
  Guide,
  Province,
  District,
  Ward,
  CheckoutPaymentMethod,
  CreateOrderPayload,
  CreateOrderResponse,
  OrderDetailResponse,
  ShippingFeeResponse,
  AdminOrderListResponse,
  AdminOrderDetail,
  OrderStatus,
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from "./types";
import { resolveIcon } from "../utils/icon-map";

// Mock fallbacks
import { mockProductData } from "./mock/product";
import { mockFeatures } from "./mock/features";
import { mockPricingData } from "./mock/pricing";
import { mockTestimonials } from "./mock/testimonials";
import { mockLifestyleMoments } from "./mock/lifestyle";
import { mockNavLinks } from "./mock/navigation";
import { mockFooterData } from "./mock/footer";
import { mockSnapFlipReadSteps } from "./mock/snap-flip-read";
import { mockProductComparison } from "./mock/product-comparison";
import { mockAccessories } from "./mock/accessories";
import { mockPurchaseInfoData } from "./mock/purchase-info";
import { mockProductListing } from "./mock/product-listing";
import { mockFAQData } from "./mock/faq";
import { mockSocialProofData } from "./mock/social-proof";
import { mockGuides } from "./mock/guides";
import { mockProvinces, mockDistrictsByProvince, mockWardsByDistrict } from "./mock/addresses";
import { mockCheckoutPaymentMethods } from "./mock/checkout-payment";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, { credentials: "include" });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText} — ${endpoint}`);
  }
  return res.json() as Promise<T>;
}

// ===== Helper types for BE responses (icon as string) =====

interface RawProductFeature {
  icon: string;
  title: string;
  description: string;
}

interface RawProductData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: RawProductFeature[];
}

interface RawSnapFlipReadStep {
  icon: string;
  title: string;
  description: string;
  step: string;
}

interface RawTrustBadge {
  icon: string;
  label: string;
}

interface RawPricingData {
  label: string;
  price: string;
  originalPrice: string;
  included: string[];
  trustBadges: RawTrustBadge[];
  accessories: Accessory[];
}

interface RawPaymentMethod {
  icon: string;
  name: string;
  description: string;
}

interface RawShippingInfo {
  icon: string;
  region: string;
  time: string;
  note?: string;
}

interface RawWarrantyInfo {
  icon: string;
  title: string;
  description: string;
}

interface RawBundleItem {
  icon: string;
  name: string;
}

interface RawPurchaseInfoData {
  paymentMethods: RawPaymentMethod[];
  shippingInfo: RawShippingInfo[];
  warranty: RawWarrantyInfo[];
  bundleItems: RawBundleItem[];
  freeShippingNote: string;
}

interface RawGuide {
  icon: string;
  title: string;
  description: string;
  href: string;
}

// ===== 15 Content APIs =====

/**
 * Fetch product data (Xteink X4)
 * GET /api/products/x4
 */
export async function getProductData(): Promise<ProductData> {
  try {
    const raw = await fetchAPI<RawProductData>("/api/products/x4");
    return {
      ...raw,
      features: raw.features.map((f) => ({
        ...f,
        icon: resolveIcon(f.icon),
      })),
    };
  } catch {
    return mockProductData;
  }
}

/**
 * Fetch product detail — combines /api/products/:slug (features) + /api/products (listing data)
 * Returns unified ProductDetailData with price, tag, specs, and features (icon-resolved).
 */
export async function getProductDetail(slug: string): Promise<ProductDetailData | null> {
  try {
    const [rawDetail, listing] = await Promise.all([
      fetchAPI<RawProductData>(`/api/products/${slug}`),
      fetchAPI<ProductListingItem[]>("/api/products"),
    ]);
    const listingItem = listing.find((p) => p.slug === slug);
    if (!listingItem) return null;

    // Parse "1.590.000₫" → 1590000
    const priceNumeric = parseInt(listingItem.price.replace(/[.\s₫]/g, ""), 10) || 0;

    return {
      slug: listingItem.slug,
      name: listingItem.name,
      tag: listingItem.tag,
      subtitle: rawDetail.subtitle,
      description: listingItem.description,
      image: listingItem.image,
      price: listingItem.price,
      priceNumeric,
      specs: listingItem.specs,
      features: rawDetail.features.map((f) => ({
        ...f,
        icon: resolveIcon(f.icon),
      })),
    };
  } catch {
    // Fallback: combine mock data
    const listing = mockProductListing.find((p) => p.slug === slug);
    if (!listing) return null;
    const priceNumeric = parseInt(listing.price.replace(/[.\s₫]/g, ""), 10) || 0;
    return {
      slug: listing.slug,
      name: listing.name,
      tag: listing.tag,
      subtitle: slug === "x4" ? mockProductData.subtitle : "Ultra Compact",
      description: listing.description,
      image: listing.image,
      price: listing.price,
      priceNumeric,
      specs: listing.specs,
      features: slug === "x4" ? mockProductData.features : [],
    };
  }
}

/**
 * Fetch features grid data
 * GET /api/features
 */
export async function getFeatures(): Promise<Feature[]> {
  try {
    return await fetchAPI<Feature[]>("/api/features");
  } catch {
    return mockFeatures;
  }
}

/**
 * Fetch pricing data (includes product, bundles, accessories)
 * GET /api/pricing
 */
export async function getPricingData(): Promise<PricingData> {
  try {
    const raw = await fetchAPI<RawPricingData>("/api/pricing");
    return {
      ...raw,
      trustBadges: raw.trustBadges.map((b) => ({
        ...b,
        icon: resolveIcon(b.icon),
      })),
    };
  } catch {
    return mockPricingData;
  }
}

/**
 * Fetch testimonials
 * GET /api/testimonials
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await fetchAPI<Testimonial[]>("/api/testimonials");
  } catch {
    return mockTestimonials;
  }
}

/**
 * Fetch lifestyle moments gallery
 * GET /api/lifestyle-moments
 */
export async function getLifestyleMoments(): Promise<LifestyleMoment[]> {
  try {
    return await fetchAPI<LifestyleMoment[]>("/api/lifestyle-moments");
  } catch {
    return mockLifestyleMoments;
  }
}

/**
 * Fetch navigation links
 * GET /api/navigation
 */
export async function getNavLinks(): Promise<NavLink[]> {
  try {
    return await fetchAPI<NavLink[]>("/api/navigation");
  } catch {
    return mockNavLinks;
  }
}

/**
 * Fetch footer data
 * GET /api/footer
 */
export async function getFooterData(): Promise<FooterData> {
  try {
    return await fetchAPI<FooterData>("/api/footer");
  } catch {
    return mockFooterData;
  }
}

/**
 * Fetch Snap, Flip, Read steps (USP)
 * GET /api/snap-flip-read
 */
export async function getSnapFlipReadSteps(): Promise<SnapFlipReadStep[]> {
  try {
    const raw = await fetchAPI<RawSnapFlipReadStep[]>("/api/snap-flip-read");
    return raw.map((s) => ({
      ...s,
      icon: resolveIcon(s.icon),
    }));
  } catch {
    return mockSnapFlipReadSteps;
  }
}

/**
 * Fetch product comparison data (X4 vs X3)
 * GET /api/product-comparison
 */
export async function getProductComparison(): Promise<ProductComparisonData> {
  try {
    return await fetchAPI<ProductComparisonData>("/api/product-comparison");
  } catch {
    return mockProductComparison;
  }
}

/**
 * Fetch accessories (standalone, not bundled with pricing)
 * GET /api/accessories
 */
export async function getAccessories(): Promise<Accessory[]> {
  try {
    return await fetchAPI<Accessory[]>("/api/accessories");
  } catch {
    return mockAccessories;
  }
}

/**
 * Fetch purchase info (payment, shipping, warranty, bundle)
 * GET /api/purchase-info
 */
export async function getPurchaseInfoData(): Promise<PurchaseInfoData> {
  try {
    const raw = await fetchAPI<RawPurchaseInfoData>("/api/purchase-info");
    return {
      paymentMethods: raw.paymentMethods.map((m) => ({
        ...m,
        icon: resolveIcon(m.icon),
      })),
      shippingInfo: raw.shippingInfo.map((s) => ({
        ...s,
        icon: resolveIcon(s.icon),
      })),
      warranty: raw.warranty.map((w) => ({
        ...w,
        icon: resolveIcon(w.icon),
      })),
      bundleItems: raw.bundleItems.map((b) => ({
        ...b,
        icon: resolveIcon(b.icon),
      })),
      freeShippingNote: raw.freeShippingNote,
    };
  } catch {
    return mockPurchaseInfoData;
  }
}

/**
 * Fetch FAQ data
 * GET /api/faq
 */
export async function getFAQData(): Promise<FAQItem[]> {
  try {
    return await fetchAPI<FAQItem[]>("/api/faq");
  } catch {
    return mockFAQData;
  }
}

/**
 * Fetch social proof data (press, YouTube, community)
 * GET /api/social-proof
 */
export async function getSocialProofData(): Promise<SocialProofData> {
  try {
    return await fetchAPI<SocialProofData>("/api/social-proof");
  } catch {
    return mockSocialProofData;
  }
}

/**
 * Fetch guides data (getting started, transfer books, firmware)
 * GET /api/guides
 */
export async function getGuidesData(): Promise<Guide[]> {
  try {
    const raw = await fetchAPI<RawGuide[]>("/api/guides");
    return raw.map((g) => ({
      ...g,
      icon: resolveIcon(g.icon),
    }));
  } catch {
    return mockGuides;
  }
}

/**
 * Fetch product listing (X4 + X3 cards)
 * GET /api/products
 */
export async function getProductListing(): Promise<ProductListingItem[]> {
  try {
    return await fetchAPI<ProductListingItem[]>("/api/products");
  } catch {
    return mockProductListing;
  }
}

// ===== Address APIs (flat cascade) =====

/**
 * Fetch provinces (flat list)
 * GET /api/addresses/provinces
 */
export async function getProvinces(): Promise<Province[]> {
  try {
    return await fetchAPI<Province[]>("/api/addresses/provinces");
  } catch {
    return mockProvinces;
  }
}

/**
 * Fetch districts for a province (flat list)
 * GET /api/addresses/provinces/:code/districts
 */
export async function getDistricts(provinceCode: string): Promise<District[]> {
  try {
    return await fetchAPI<District[]>(`/api/addresses/provinces/${provinceCode}/districts`);
  } catch {
    return mockDistrictsByProvince[provinceCode] ?? [];
  }
}

/**
 * Fetch wards for a district
 * GET /api/addresses/districts/:code/wards
 */
export async function getWards(districtCode: string): Promise<Ward[]> {
  try {
    return await fetchAPI<Ward[]>(`/api/addresses/districts/${districtCode}/wards`);
  } catch {
    return mockWardsByDistrict[districtCode] ?? [];
  }
}

// ===== Checkout Payment =====

/**
 * Fetch checkout payment methods
 * GET /api/checkout/payment-methods
 */
export async function getCheckoutPaymentMethods(): Promise<CheckoutPaymentMethod[]> {
  try {
    return await fetchAPI<CheckoutPaymentMethod[]>("/api/checkout/payment-methods");
  } catch {
    return mockCheckoutPaymentMethods;
  }
}

// ===== Order APIs (Sprint 5) =====

export async function createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Order creation failed: ${res.status}`);
  }
  return res.json();
}

export async function getOrder(orderNumber: string): Promise<OrderDetailResponse> {
  return fetchAPI<OrderDetailResponse>(`/api/orders/${orderNumber}`);
}

export async function trackOrder(
  orderNumber: string,
  phone: string
): Promise<OrderDetailResponse> {
  return fetchAPI<OrderDetailResponse>(
    `/api/orders/track?orderNumber=${encodeURIComponent(orderNumber)}&phone=${encodeURIComponent(phone)}`
  );
}

export async function getShippingFee(
  provinceCode: string,
  subtotal: number
): Promise<ShippingFeeResponse> {
  return fetchAPI<ShippingFeeResponse>(
    `/api/shipping/fee?provinceCode=${provinceCode}&subtotal=${subtotal}`
  );
}

// ===== Admin =====

export async function getAdminOrders(
  page = 1,
  limit = 20,
  status?: OrderStatus
): Promise<AdminOrderListResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (status) params.set("status", status);
  return fetchAPI<AdminOrderListResponse>(`/api/admin/orders?${params}`);
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<AdminOrderDetail> {
  const res = await fetch(
    `${API_URL}/api/admin/orders/${orderId}/status`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}`);
  }
  return res.json();
}

// ===== Auth =====

export async function authLogin(payload: LoginPayload): Promise<AuthUser> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Đăng nhập thất bại");
  }
  const data = await res.json();
  return data.user;
}

export async function authRegister(payload: RegisterPayload): Promise<AuthUser> {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Đăng ký thất bại");
  }
  const data = await res.json();
  return data.user;
}

export async function authLogout(): Promise<void> {
  await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function authMe(): Promise<AuthUser> {
  const data = await fetchAPI<{ user: AuthUser }>("/api/auth/me");
  return data.user;
}

export async function authRefresh(): Promise<void> {
  const res = await fetch(`${API_URL}/api/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Refresh failed");
}
