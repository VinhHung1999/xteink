import {
  QrCode,
  Wallet,
  CreditCard,
  Banknote,
  Truck,
  MapPin,
  Package,
  ShieldCheck,
  RefreshCw,
  Smartphone,
  HardDrive,
  Cpu,
  BookOpen,
  Film,
  Circle,
} from "lucide-react";
import { PurchaseInfoData } from "../types";

export const mockPurchaseInfoData: PurchaseInfoData = {
  paymentMethods: [
    {
      icon: QrCode,
      name: "Chuyển khoản QR",
      description: "Quét mã QR — nhận hàng nhanh nhất",
    },
    {
      icon: Wallet,
      name: "Ví MoMo",
      description: "Thanh toán qua ví MoMo",
    },
    {
      icon: CreditCard,
      name: "VNPay",
      description: "Thẻ ATM / Visa / Mastercard",
    },
    {
      icon: Banknote,
      name: "COD",
      description: "Thanh toán khi nhận hàng",
    },
  ],
  shippingInfo: [
    {
      icon: Truck,
      region: "Nội thành HCM",
      time: "Giao trong 24h",
      note: "Giao nhanh trong ngày",
    },
    {
      icon: MapPin,
      region: "Tỉnh thành khác",
      time: "2–4 ngày làm việc",
    },
    {
      icon: Package,
      region: "Miễn phí vận chuyển",
      time: "Đơn hàng trên 1.000.000₫",
      note: "Áp dụng toàn quốc",
    },
  ],
  warranty: [
    {
      icon: RefreshCw,
      title: "30 ngày đổi mới",
      description: "Đổi máy mới nếu lỗi nhà sản xuất",
    },
    {
      icon: ShieldCheck,
      title: "12 tháng bảo hành",
      description: "Bảo hành hardware chính hãng",
    },
  ],
  bundleItems: [
    { icon: Smartphone, name: "Xteink X4 eReader" },
    { icon: HardDrive, name: "Thẻ nhớ 32GB" },
    { icon: Cpu, name: "Crosspoint firmware" },
    { icon: BookOpen, name: "70.000+ sách miễn phí" },
    { icon: Film, name: "Miếng dán màn hình" },
    { icon: Circle, name: "Vòng nam châm MagSafe" },
  ],
  freeShippingNote: "Miễn phí ship cho đơn trên 1.000.000₫",
};
