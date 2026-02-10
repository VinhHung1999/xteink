import { FooterData, FooterLink } from "../types";

const productLinks: FooterLink[] = [
  { label: "Xteink X4", href: "#product" },
  { label: "Phụ kiện", href: "#accessories" },
  { label: "So sánh", href: "#" },
];

const supportLinks: FooterLink[] = [
  { label: "Hướng dẫn sử dụng", href: "#" },
  { label: "Câu hỏi thường gặp", href: "#" },
  { label: "Liên hệ", href: "#" },
  { label: "Chính sách đổi trả", href: "#" },
];

const paymentMethods: string[] = ["MoMo", "ZaloPay", "VNPay", "COD"];

export const mockFooterData: FooterData = {
  productLinks,
  supportLinks,
  paymentMethods,
};
