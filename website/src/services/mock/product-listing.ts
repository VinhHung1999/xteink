import { ProductListingItem } from "../types";

export const mockProductListing: ProductListingItem[] = [
  {
    slug: "x4",
    name: "Xteink X4",
    tag: "Bestseller",
    image: "/images/products/x4/gallery/xteink_x4_product_gallery_variant_2.jpg",
    price: "1.590.000₫",
    description:
      "Máy đọc sách e-ink 4.3 inch, 74g — gắn nam châm lên điện thoại, đọc mọi lúc mọi nơi.",
    specs: ["4.3\" E-Ink", "220 PPI", "74g", "4.9mm", "Pin 2 tuần"],
  },
  {
    slug: "x3",
    name: "Xteink X3",
    tag: "2026 New",
    image: "/images/products/x3/gallery/xteink_x3_ultra_compact_magnetic_ereader_space_black_72_99usd.jpg",
    price: "1.790.000₫",
    description:
      "Phiên bản ultra-compact — 3.7 inch, 60g, siêu nhẹ siêu sắc nét với 250 PPI.",
    specs: ["3.7\" E-Ink", "250 PPI", "60g", "Ultra-compact", "Pin 2 tuần"],
  },
];
