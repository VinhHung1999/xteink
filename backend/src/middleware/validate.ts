import { Request, Response, NextFunction } from "express";

interface ValidationError {
  field: string;
  message: string;
}

export function validateCreateOrder(req: Request, res: Response, next: NextFunction) {
  const errors: ValidationError[] = [];
  const { customer, shipping, paymentMethodId, items } = req.body;

  // Customer
  if (!customer?.name?.trim()) {
    errors.push({ field: "customer.name", message: "Họ tên là bắt buộc" });
  } else if (customer.name.trim().length > 100) {
    errors.push({ field: "customer.name", message: "Họ tên tối đa 100 ký tự" });
  }

  if (!customer?.phone?.trim()) {
    errors.push({ field: "customer.phone", message: "Số điện thoại là bắt buộc" });
  } else if (!/^0\d{9}$/.test(customer.phone.replace(/[\s-]/g, ""))) {
    errors.push({ field: "customer.phone", message: "Số điện thoại không hợp lệ" });
  }

  if (customer?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    errors.push({ field: "customer.email", message: "Email không hợp lệ" });
  }

  // Shipping
  if (!shipping?.provinceCode) errors.push({ field: "shipping.provinceCode", message: "Tỉnh/thành là bắt buộc" });
  if (!shipping?.districtCode) errors.push({ field: "shipping.districtCode", message: "Quận/huyện là bắt buộc" });
  if (!shipping?.wardCode) errors.push({ field: "shipping.wardCode", message: "Phường/xã là bắt buộc" });
  if (!shipping?.addressDetail?.trim()) errors.push({ field: "shipping.addressDetail", message: "Địa chỉ là bắt buộc" });

  // Payment
  if (!paymentMethodId) errors.push({ field: "paymentMethodId", message: "Phương thức thanh toán là bắt buộc" });

  // Items
  if (!Array.isArray(items) || items.length === 0) {
    errors.push({ field: "items", message: "Giỏ hàng trống" });
  } else {
    items.forEach((item: Record<string, unknown>, i: number) => {
      if (!item.slug) errors.push({ field: `items[${i}].slug`, message: "Thiếu slug" });
      if (!item.name) errors.push({ field: `items[${i}].name`, message: "Thiếu tên sản phẩm" });
      if (typeof item.unitPrice !== "number" || item.unitPrice <= 0) {
        errors.push({ field: `items[${i}].unitPrice`, message: "Giá không hợp lệ" });
      }
      if (typeof item.quantity !== "number" || item.quantity < 1) {
        errors.push({ field: `items[${i}].quantity`, message: "Số lượng không hợp lệ" });
      }
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: "VALIDATION_ERROR", message: "Dữ liệu không hợp lệ", fields: errors });
  }

  next();
}
