/**
 * API Service Layer
 *
 * Fetches data from the backend API (port 3001).
 * Maps BE icon strings → LucideIcon components via resolveIcon().
 * Function signatures unchanged — zero component changes needed.
 *
 * Phase 1: 15 content APIs → real fetch
 * Phase 2 (pending): getProvinces, getCheckoutPaymentMethods → real fetch
 */

import {
  ProductData,
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
  CheckoutPaymentMethod,
} from "./types";
import { resolveIcon } from "../utils/icon-map";

// Phase 2 mocks (checkout — kept until BE1.3-1.4 integration)
import { mockProvinces } from "./mock/addresses";
import { mockCheckoutPaymentMethods } from "./mock/checkout-payment";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`);
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

// ===== 15 Content APIs (real fetch) =====

/**
 * Fetch product data (Xteink X4)
 * GET /api/products/x4
 */
export async function getProductData(): Promise<ProductData> {
  const raw = await fetchAPI<RawProductData>("/api/products/x4");
  return {
    ...raw,
    features: raw.features.map((f) => ({
      ...f,
      icon: resolveIcon(f.icon),
    })),
  };
}

/**
 * Fetch features grid data
 * GET /api/features
 */
export async function getFeatures(): Promise<Feature[]> {
  return fetchAPI<Feature[]>("/api/features");
}

/**
 * Fetch pricing data (includes product, bundles, accessories)
 * GET /api/pricing
 */
export async function getPricingData(): Promise<PricingData> {
  const raw = await fetchAPI<RawPricingData>("/api/pricing");
  return {
    ...raw,
    trustBadges: raw.trustBadges.map((b) => ({
      ...b,
      icon: resolveIcon(b.icon),
    })),
  };
}

/**
 * Fetch testimonials
 * GET /api/testimonials
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  return fetchAPI<Testimonial[]>("/api/testimonials");
}

/**
 * Fetch lifestyle moments gallery
 * GET /api/lifestyle-moments
 */
export async function getLifestyleMoments(): Promise<LifestyleMoment[]> {
  return fetchAPI<LifestyleMoment[]>("/api/lifestyle-moments");
}

/**
 * Fetch navigation links
 * GET /api/navigation
 */
export async function getNavLinks(): Promise<NavLink[]> {
  return fetchAPI<NavLink[]>("/api/navigation");
}

/**
 * Fetch footer data
 * GET /api/footer
 */
export async function getFooterData(): Promise<FooterData> {
  return fetchAPI<FooterData>("/api/footer");
}

/**
 * Fetch Snap, Flip, Read steps (USP)
 * GET /api/snap-flip-read
 */
export async function getSnapFlipReadSteps(): Promise<SnapFlipReadStep[]> {
  const raw = await fetchAPI<RawSnapFlipReadStep[]>("/api/snap-flip-read");
  return raw.map((s) => ({
    ...s,
    icon: resolveIcon(s.icon),
  }));
}

/**
 * Fetch product comparison data (X4 vs X3)
 * GET /api/product-comparison
 */
export async function getProductComparison(): Promise<ProductComparisonData> {
  return fetchAPI<ProductComparisonData>("/api/product-comparison");
}

/**
 * Fetch accessories (standalone, not bundled with pricing)
 * GET /api/accessories
 */
export async function getAccessories(): Promise<Accessory[]> {
  return fetchAPI<Accessory[]>("/api/accessories");
}

/**
 * Fetch purchase info (payment, shipping, warranty, bundle)
 * GET /api/purchase-info
 */
export async function getPurchaseInfoData(): Promise<PurchaseInfoData> {
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
}

/**
 * Fetch FAQ data
 * GET /api/faq
 */
export async function getFAQData(): Promise<FAQItem[]> {
  return fetchAPI<FAQItem[]>("/api/faq");
}

/**
 * Fetch social proof data (press, YouTube, community)
 * GET /api/social-proof
 */
export async function getSocialProofData(): Promise<SocialProofData> {
  return fetchAPI<SocialProofData>("/api/social-proof");
}

/**
 * Fetch guides data (getting started, transfer books, firmware)
 * GET /api/guides
 */
export async function getGuidesData(): Promise<Guide[]> {
  const raw = await fetchAPI<RawGuide[]>("/api/guides");
  return raw.map((g) => ({
    ...g,
    icon: resolveIcon(g.icon),
  }));
}

/**
 * Fetch product listing (X4 + X3 cards)
 * GET /api/products
 */
export async function getProductListing(): Promise<ProductListingItem[]> {
  return fetchAPI<ProductListingItem[]>("/api/products");
}

// ===== Phase 2: Checkout APIs (still mock — swap after BE1.3-1.4) =====

// Simulate API latency (remove when swapped to real API)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch provinces for checkout address
 * TODO Phase 2: GET /api/addresses/provinces
 */
export async function getProvinces(): Promise<Province[]> {
  await delay(50);
  return mockProvinces;
}

/**
 * Fetch checkout payment methods
 * TODO Phase 2: GET /api/checkout/payment-methods
 */
export async function getCheckoutPaymentMethods(): Promise<CheckoutPaymentMethod[]> {
  await delay(50);
  return mockCheckoutPaymentMethods;
}
