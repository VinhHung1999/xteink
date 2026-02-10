import { Accessory } from "../types";

/**
 * Mock data: Standalone Accessories
 * Reading Light, Magnetic Case (6 colors), Silicon Case (2 colors)
 */
export const mockAccessories: Accessory[] = [
  {
    name: "Reading Light",
    price: "249.000₫",
    image: "/images/products/x4/add_ons/xteink_x4_magnetic_reading_light_accessory_9_99usd.jpg",
  },
  {
    name: "Magnetic Case",
    price: "219.000₫",
    image: "/images/products/x4/add_ons/xteink_x4_magnetic_case_accessory_8_99usd.jpg",
    colors: [
      { name: "Midnight Black", hex: "#1A1A1A" },
      { name: "Charcoal Gray", hex: "#2D2D2D" },
      { name: "Warm Cream", hex: "#E8DDD3" },
      { name: "Dusty Rose", hex: "#C4A0A0" },
      { name: "Sage Green", hex: "#8B9E7E" },
      { name: "Deep Gold", hex: "#B8864A" },
    ],
  },
  {
    name: "Silicon Case",
    price: "99.000₫",
    image: "/images/products/x4/add_ons/xteink_x4_protective_case_accessory_3_99usd.jpg",
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Cream", hex: "#F5F0EB" },
    ],
  },
];
