import type { CheckoutPaymentMethod } from "../types";

export const mockCheckoutPaymentMethods: CheckoutPaymentMethod[] = [
  {
    id: "cod",
    name: "Thanh toán khi nhận hàng (COD)",
    description: "Thanh toán bằng tiền mặt khi nhận hàng",
    icon: "📦",
  },
  {
    id: "momo",
    name: "MoMo",
    description: "Thanh toán qua ví MoMo",
    icon: "💜",
  },
  {
    id: "zalopay",
    name: "ZaloPay",
    description: "Thanh toán qua ví ZaloPay",
    icon: "💙",
  },
  {
    id: "vnpay",
    name: "VNPay / QR",
    description: "Thanh toán qua VNPay hoặc quét mã QR",
    icon: "📱",
  },
  {
    id: "bank",
    name: "Chuyển khoản ngân hàng",
    description: "Chuyển khoản trực tiếp vào tài khoản ngân hàng",
    icon: "🏦",
  },
];
