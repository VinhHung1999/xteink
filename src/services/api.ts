/**
 * API Service Layer
 *
 * Provides async functions that components call to fetch data.
 * Currently uses mock data, but structured to easily swap to real API calls.
 *
 * When backend is ready:
 * 1. Replace mock imports with fetch/axios calls
 * 2. Update endpoint URLs in comments
 * 3. Keep function signatures identical (no FE code changes)
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
} from "./types";
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

// Simulate API latency (remove in production)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch product data (Xteink X4)
 * Future endpoint: GET /api/products/x4
 */
export async function getProductData(): Promise<ProductData> {
  await delay(50); // Simulate network latency
  return mockProductData;
}

/**
 * Fetch features grid data
 * Future endpoint: GET /api/features
 */
export async function getFeatures(): Promise<Feature[]> {
  await delay(50);
  return mockFeatures;
}

/**
 * Fetch pricing data (includes product, bundles, accessories)
 * Future endpoint: GET /api/pricing
 */
export async function getPricingData(): Promise<PricingData> {
  await delay(50);
  return mockPricingData;
}

/**
 * Fetch testimonials
 * Future endpoint: GET /api/testimonials
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  await delay(50);
  return mockTestimonials;
}

/**
 * Fetch lifestyle moments gallery
 * Future endpoint: GET /api/lifestyle-moments
 */
export async function getLifestyleMoments(): Promise<LifestyleMoment[]> {
  await delay(50);
  return mockLifestyleMoments;
}

/**
 * Fetch navigation links
 * Future endpoint: GET /api/navigation
 */
export async function getNavLinks(): Promise<NavLink[]> {
  await delay(50);
  return mockNavLinks;
}

/**
 * Fetch footer data
 * Future endpoint: GET /api/footer
 */
export async function getFooterData(): Promise<FooterData> {
  await delay(50);
  return mockFooterData;
}

/**
 * Fetch Snap, Flip, Read steps (USP)
 * Future endpoint: GET /api/snap-flip-read
 */
export async function getSnapFlipReadSteps(): Promise<SnapFlipReadStep[]> {
  await delay(50);
  return mockSnapFlipReadSteps;
}

/**
 * Fetch product comparison data (X4 vs X3)
 * Future endpoint: GET /api/product-comparison
 */
export async function getProductComparison(): Promise<ProductComparisonData> {
  await delay(50);
  return mockProductComparison;
}

/**
 * Fetch accessories (standalone, not bundled with pricing)
 * Future endpoint: GET /api/accessories
 */
export async function getAccessories(): Promise<Accessory[]> {
  await delay(50);
  return mockAccessories;
}
