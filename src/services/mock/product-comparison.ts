import { ProductComparisonData } from "../types";

/**
 * Mock data: X4 vs X3 Product Comparison
 * Highlights differences and advantages per model
 */
export const mockProductComparison: ProductComparisonData = {
  x4: {
    name: "Xteink X4",
    tag: "Bestseller",
    image: "/images/products/x4/gallery/xteink_x4_product_gallery_variant_2.jpg",
    specs: {
      screen: "4.3\"",
      ppi: "220 PPI",
      weight: "74g",
      thickness: "4.9mm",
      price: "1.490.000₫",
      priceNumeric: 1490000,
    },
    advantages: ["screen", "price", "thickness"], // X4 is bigger screen, cheaper, thinner
  },
  x3: {
    name: "Xteink X3",
    tag: "2026 New",
    image: "/images/products/x3/xteink_x3_product_image.jpg",
    specs: {
      screen: "3.7\"",
      ppi: "250 PPI",
      weight: "60g",
      thickness: "TBD",
      price: "1.790.000₫",
      priceNumeric: 1790000,
    },
    advantages: ["ppi", "weight"], // X3 is higher PPI, lighter
  },
};
