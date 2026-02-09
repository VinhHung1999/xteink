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
export interface Accessory {
  image: string;
  name: string;
  price: string;
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
