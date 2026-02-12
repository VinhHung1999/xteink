/**
 * API Data Types for Xteink Landing Page
 *
 * All data contracts for components consuming the services layer.
 * When backend is ready, these types should match API response schemas.
 */

import { LucideIcon } from "lucide-react";

// ========== Product ==========
export interface ProductFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProductData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: ProductFeature[];
}

export interface ProductDetailData {
  slug: string;
  name: string;
  tag?: string;
  subtitle: string;
  description: string;
  image: string;
  price: string;
  priceNumeric: number;
  specs: string[];
  features: ProductFeature[];
}

// ========== Features Grid ==========
export interface Feature {
  image: string;
  title: string;
  description: string;
}

// ========== Snap Flip Read (USP) ==========
export interface SnapFlipReadStep {
  icon: LucideIcon;
  title: string;
  description: string;
  step: string; // "Snap", "Flip", "Read"
}

// ========== Product Comparison (X4 vs X3) ==========
export interface ProductSpec {
  screen: string;
  ppi: string;
  weight: string;
  thickness: string;
  price: string;
  priceNumeric: number; // for comparison
}

export interface ProductComparisonModel {
  name: string;
  tag?: string; // "Bestseller", "2026 New", etc.
  image: string;
  specs: ProductSpec;
  advantages: string[]; // list of spec keys where this model is better
}

export interface ProductComparisonData {
  x4: ProductComparisonModel;
  x3: ProductComparisonModel;
}

// ========== Pricing & Bundles ==========
export interface AccessoryColor {
  name: string;
  hex: string;
}

export interface Accessory {
  image: string;
  name: string;
  price: string;
  colors?: AccessoryColor[]; // Optional: for accessories with color variants
}

export interface TrustBadge {
  icon: LucideIcon;
  label: string;
}

export interface PricingData {
  label: string;
  price: string;
  originalPrice: string;
  included: string[];
  trustBadges: TrustBadge[];
  accessories: Accessory[];
}

// ========== Testimonials ==========
export interface Testimonial {
  quote: string;
  name: string;
  location: string;
}

// ========== Lifestyle Moments ==========
export interface LifestyleMoment {
  image: string;
  caption: string;
}

// ========== Navigation ==========
export interface NavLink {
  label: string;
  href: string;
}

// ========== Product Listing ==========
export interface ProductListingItem {
  slug: string;
  name: string;
  tag?: string;
  image: string;
  price: string;
  description: string;
  specs: string[];
}

// ========== Purchase Info ==========
export interface PaymentMethod {
  icon: LucideIcon;
  name: string;
  description: string;
}

export interface ShippingInfo {
  icon: LucideIcon;
  region: string;
  time: string;
  note?: string;
}

export interface WarrantyInfo {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface BundleItem {
  icon: LucideIcon;
  name: string;
}

export interface PurchaseInfoData {
  paymentMethods: PaymentMethod[];
  shippingInfo: ShippingInfo[];
  warranty: WarrantyInfo[];
  bundleItems: BundleItem[];
  freeShippingNote: string;
}

// ========== Social Proof ==========
export interface PressReview {
  name: string;
  rating: number;
  maxRating: number;
  quote?: string;
}

export interface YouTubeReview {
  channel: string;
  subscribers: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
}

export interface CommunityTestimonial {
  quote: string;
  name: string;
  source: string;
}

export interface SocialProofData {
  pressReviews: PressReview[];
  youtubeReview: YouTubeReview;
  communityStat: string;
  testimonials: CommunityTestimonial[];
}

// ========== Cart ==========
export interface CartItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number; // numeric, in VND
  quantity: number;
  type: "product" | "accessory";
}

// ========== Checkout: Addresses (flat — fetched per cascade level) ==========
export interface Ward {
  code: string;
  name: string;
}

export interface District {
  code: string;
  name: string;
}

export interface Province {
  code: string;
  name: string;
}

// ========== Checkout: Payment Methods ==========
export interface CheckoutPaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji or text icon (no LucideIcon — used in client form)
}

// ========== FAQ ==========
export interface FAQItem {
  question: string;
  answer: string;
}

// ========== Guides ==========
export interface Guide {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

// ========== Footer ==========
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterData {
  productLinks: FooterLink[];
  supportLinks: FooterLink[];
  paymentMethods: string[];
}
