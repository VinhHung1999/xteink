import { FooterData, FooterLink } from "../types";

const productLinks: FooterLink[] = [
  { label: "Xteink X4", href: "/products" },
  { label: "Phụ kiện", href: "/products#accessories" },
  { label: "So sánh", href: "/products#comparison" },
];

const supportLinks: FooterLink[] = [
  { label: "Hướng dẫn sử dụng", href: "/guides" },
  { label: "Câu hỏi thường gặp", href: "/faq" },
  { label: "Cộng đồng", href: "/community" },
  { label: "Chính sách bảo hành", href: "/warranty" },
  { label: "Vận chuyển", href: "/shipping" },
  { label: "Đổi trả", href: "/returns" },
];

const paymentMethods: string[] = ["MoMo", "ZaloPay", "VNPay", "COD"];

export const mockFooterData: FooterData = {
  productLinks,
  supportLinks,
  paymentMethods,
};
