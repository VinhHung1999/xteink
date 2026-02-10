import { Feather, VolumeX, HardDrive } from "lucide-react";
import { ProductData, ProductFeature } from "../types";

export const mockProductFeatures: ProductFeature[] = [
  {
    icon: Feather,
    title: "Nhẹ như không",
    description: "74g — nhẹ hơn một bộ bài. Bỏ túi quần, quên luôn đang mang.",
  },
  {
    icon: VolumeX,
    title: "Chỉ có đọc sách",
    description:
      "Không app, không thông báo, không quảng cáo. Chỉ bạn và cuốn sách.",
  },
  {
    icon: HardDrive,
    title: "Sách của bạn, mãi mãi",
    description:
      "Thẻ SD mở rộng, không DRM. Sách bạn mua là sách bạn sở hữu.",
  },
];

export const mockProductData: ProductData = {
  title: "Xteink X4",
  subtitle: "Rethink Reading",
  description:
    'Màn hình e-ink 4.3", mỏng 5.9mm, nút bấm vật lý, nam châm gắn điện thoại. Đọc sách chưa bao giờ dễ đến thế.',
  image: "/images/products/x4/gallery/xteink_x4_ultra_thin_magnetic_back_ereader_main_product_photo_69usd.jpg",
  features: mockProductFeatures,
};
