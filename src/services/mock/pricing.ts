import { Truck, RefreshCw, MessageCircle } from "lucide-react";
import { PricingData, Accessory, TrustBadge } from "../types";

export const mockIncluded: string[] = [
  "Màn hình E-Ink 4.3 inch, 220 PPI",
  "Nút bấm vật lý lật trang",
  "Nam châm gắn điện thoại (MagSafe)",
  "Bộ nhớ 32GB, hỗ trợ thẻ SD",
  "Pin 650mAh — đọc cả tuần",
  "Cáp USB-C sạc nhanh",
  "Hỗ trợ EPUB, TXT, BMP, JPG",
];

export const mockTrustBadges: TrustBadge[] = [
  { icon: Truck, label: "Miễn phí ship nội thành HCM" },
  { icon: RefreshCw, label: "7 ngày đổi trả miễn phí" },
  { icon: MessageCircle, label: "Hỗ trợ Zalo 24/7" },
];

export const mockAccessories: Accessory[] = [
  {
    image: "/images/products/x4/add_ons/xteink_x4_magnetic_case_accessory_8_99usd.jpg",
    name: "Ốp nam châm",
    price: "210.000₫",
  },
  {
    image: "/images/products/x4/add_ons/xteink_x4_magnetic_reading_light_accessory_9_99usd.jpg",
    name: "Đèn đọc sách",
    price: "230.000₫",
  },
  {
    image: "/images/products/x4/add_ons/xteink_x4_magnetic_stick_on_ring_accessory_4_99usd.jpg",
    name: "Nhẫn giữ nam châm",
    price: "115.000₫",
  },
  {
    image: "/images/products/x4/add_ons/xteink_x4_protective_case_accessory_3_99usd.jpg",
    name: "Ốp bảo vệ",
    price: "90.000₫",
  },
  {
    image: "/images/products/x4/add_ons/xteink_x4_clear_screen_protector_accessory_3_99usd.png",
    name: "Miếng dán màn hình",
    price: "90.000₫",
  },
];

export const mockPricingData: PricingData = {
  label: "Xteink X4",
  price: "1.590.000₫",
  originalPrice: "1.890.000₫",
  included: mockIncluded,
  trustBadges: mockTrustBadges,
  accessories: mockAccessories,
};
