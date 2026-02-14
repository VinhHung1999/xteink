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
  color?: string;     // e.g. "Đen", "Nâu"
  colorHex?: string;  // e.g. "#2D2D2D"
  availableColors?: { name: string; hex: string }[];
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

// ========== Order (API payloads + responses) ==========

export interface CreateOrderPayload {
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  shipping: {
    provinceCode: string;
    districtCode: string;
    wardCode: string;
    addressDetail: string;
  };
  paymentMethodId: string;
  notes?: string;
  items: {
    slug: string;
    name: string;
    image: string;
    unitPrice: number;
    quantity: number;
    type: "product" | "accessory";
  }[];
}

export interface PaymentInfo {
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  amount?: number;
  transferContent?: string;
  qrDataUrl?: string;
  redirectUrl?: string;
  message?: string;
}

export interface CreateOrderResponse {
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  paymentInfo?: PaymentInfo;
}

export interface OrderDetailResponse {
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  paymentMethodName: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  shippingAddress: string;
  notes?: string;
  items: {
    productName: string;
    productImage: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
  }[];
  subtotal: number;
  shippingFee: number;
  total: number;
  createdAt: string;
  paymentInfo?: PaymentInfo;
}

export interface ShippingFeeResponse {
  fee: number;
  freeShippingThreshold: number;
  estimatedDays: string;
}

// ========== Admin ==========
export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPING" | "DELIVERED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

export interface OrderTransitions {
  forward: OrderStatus[];
  reverse: OrderStatus[];
}

export interface AdminOrderSummary {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  customerName: string;
  customerPhone: string;
  total: number;
  itemCount: number;
  createdAt: string;
  transitions?: OrderTransitions;
}

export interface AdminOrderListResponse {
  orders: AdminOrderSummary[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminOrderDetail {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  provinceName: string;
  districtName: string;
  wardName: string;
  addressDetail: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  notes: string | null;
  items: {
    id: string;
    productSlug: string;
    productName: string;
    productImage: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
    itemType: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

// ========== Auth ==========
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
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
