import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";

const router = Router();

// GET /api/orders/track?orderNumber=XT-XXXXXXXX-XXXX&phone=0XXXXXXXXX
router.get("/orders/track", async (req: Request, res: Response) => {
  try {
    const orderNumber = typeof req.query.orderNumber === "string" ? req.query.orderNumber : "";
    const phone = typeof req.query.phone === "string" ? req.query.phone : "";

    // Validation
    if (!orderNumber || !/^XT-\d{8}-\d{4}$/.test(orderNumber)) {
      return res.status(400).json({ error: "VALIDATION_ERROR", message: "Mã đơn hàng không hợp lệ" });
    }
    if (!phone || !/^0\d{9}$/.test(phone.replace(/[\s-]/g, ""))) {
      return res.status(400).json({ error: "VALIDATION_ERROR", message: "Số điện thoại không hợp lệ" });
    }

    const cleanPhone = phone.replace(/[\s-]/g, "");

    // Lookup by orderNumber + phone (phone acts as verification)
    const order = await prisma.order.findFirst({
      where: { orderNumber, customerPhone: cleanPhone },
      include: { items: true },
    });

    if (!order) {
      return res.status(404).json({ error: "NOT_FOUND", message: "Không tìm thấy đơn hàng" });
    }

    // Reuse same response shape as GET /api/orders/:orderNumber
    const paymentMethod = await prisma.checkoutPaymentMethod.findUnique({
      where: { methodId: order.paymentMethod },
    });

    const shippingAddress = `${order.addressDetail}, ${order.wardName}, ${order.districtName}, ${order.provinceName}`;

    const response: Record<string, unknown> = {
      orderNumber: order.orderNumber,
      status: order.status,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      paymentMethodName: paymentMethod?.name || order.paymentMethod,
      customer: {
        name: order.customerName,
        phone: order.customerPhone,
        email: order.customerEmail || undefined,
      },
      shippingAddress,
      notes: order.notes || undefined,
      items: order.items.map((item: { productName: string; productImage: string; unitPrice: number; quantity: number; totalPrice: number }) => ({
        productName: item.productName,
        productImage: item.productImage,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      })),
      subtotal: order.subtotal,
      shippingFee: order.shippingFee,
      total: order.total,
      createdAt: order.createdAt.toISOString(),
    };

    // Include bank info for bank orders
    if (order.paymentMethod === "bank") {
      const bankConfigs = await prisma.siteConfig.findMany({
        where: { key: { startsWith: "bankTransfer." } },
      });
      const bankInfo: Record<string, string> = {};
      for (const c of bankConfigs) {
        bankInfo[c.key.replace("bankTransfer.", "")] = c.value;
      }
      response.paymentInfo = {
        bankName: bankInfo.bankName || "",
        accountNumber: bankInfo.accountNumber || "",
        accountName: bankInfo.accountName || "",
        amount: order.total,
        transferContent: order.orderNumber,
        qrDataUrl: bankInfo.qrDataUrl || null,
      };
    }

    res.json(response);
  } catch (err) {
    console.error("Order tracking error:", err);
    res.status(500).json({ error: "SERVER_ERROR", message: "Lỗi tra cứu đơn hàng" });
  }
});

export default router;
