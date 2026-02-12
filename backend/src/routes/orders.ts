import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import { validateCreateOrder } from "../middleware/validate";
import { calculateShippingFee } from "../lib/shipping";
import { formatOrderNumber } from "../lib/order-number";

const router = Router();

// POST /api/orders — Create order from checkout
router.post("/orders", validateCreateOrder, async (req: Request, res: Response) => {
  try {
    const { customer, shipping, paymentMethodId, notes, items } = req.body;

    // 1. Validate payment method exists
    const paymentMethod = await prisma.checkoutPaymentMethod.findUnique({
      where: { methodId: paymentMethodId },
    });
    if (!paymentMethod) {
      return res.status(400).json({
        error: "VALIDATION_ERROR",
        message: "Phương thức thanh toán không hợp lệ",
        fields: [{ field: "paymentMethodId", message: "Phương thức thanh toán không tồn tại" }],
      });
    }

    // 2. Validate address cascade: province → district → ward
    const province = await prisma.province.findUnique({ where: { code: shipping.provinceCode } });
    if (!province) {
      return res.status(404).json({ error: "INVALID_ADDRESS", message: "Tỉnh/thành không tồn tại" });
    }

    const district = await prisma.district.findUnique({ where: { code: shipping.districtCode } });
    if (!district || district.provinceId !== province.id) {
      return res.status(404).json({ error: "INVALID_ADDRESS", message: "Quận/huyện không thuộc tỉnh/thành đã chọn" });
    }

    const ward = await prisma.ward.findUnique({ where: { code: shipping.wardCode } });
    if (!ward || ward.districtId !== district.id) {
      return res.status(404).json({ error: "INVALID_ADDRESS", message: "Phường/xã không thuộc quận/huyện đã chọn" });
    }

    // 3. Server-side price calculation (never trust client)
    const subtotal = items.reduce(
      (sum: number, item: { unitPrice: number; quantity: number }) => sum + item.unitPrice * item.quantity,
      0
    );
    const { fee: shippingFee } = calculateShippingFee(shipping.provinceCode, subtotal);
    const total = subtotal + shippingFee;

    // 4. Determine initial status based on payment method
    const isCod = paymentMethodId === "cod";
    const initialStatus = isCod ? "CONFIRMED" : "PENDING";
    const initialPaymentStatus = "PENDING";

    // 5. Create order + items in transaction, then compute orderNumber
    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          orderNumber: "TEMP", // will be updated after we get orderSeq
          status: initialStatus,
          paymentStatus: initialPaymentStatus,
          paymentMethod: paymentMethodId,
          customerName: customer.name.trim(),
          customerPhone: customer.phone.replace(/[\s-]/g, ""),
          customerEmail: customer.email || null,
          provinceCode: shipping.provinceCode,
          provinceName: province.name,
          districtCode: shipping.districtCode,
          districtName: district.name,
          wardCode: shipping.wardCode,
          wardName: ward.name,
          addressDetail: shipping.addressDetail.trim(),
          subtotal,
          shippingFee,
          total,
          notes: notes || null,
          items: {
            create: items.map((item: {
              slug: string; name: string; image: string;
              unitPrice: number; quantity: number; type: string;
            }) => ({
              productSlug: item.slug,
              productName: item.name,
              productImage: item.image,
              unitPrice: item.unitPrice,
              quantity: item.quantity,
              totalPrice: item.unitPrice * item.quantity,
              itemType: item.type,
            })),
          },
        },
      });

      // Compute orderNumber from orderSeq + createdAt
      const orderNumber = formatOrderNumber(created.orderSeq, created.createdAt);
      const updated = await tx.order.update({
        where: { id: created.id },
        data: { orderNumber },
      });

      return updated;
    });

    // 6. Build response based on payment method
    const response: Record<string, unknown> = {
      orderNumber: order.orderNumber,
      status: order.status,
      paymentStatus: order.paymentStatus,
      total: order.total,
    };

    if (paymentMethodId === "bank") {
      // Bank transfer — include payment info
      const bankConfigs = await prisma.siteConfig.findMany({
        where: { key: { startsWith: "bankTransfer." } },
      });
      const bankInfo: Record<string, string> = {};
      for (const c of bankConfigs) {
        const shortKey = c.key.replace("bankTransfer.", "");
        bankInfo[shortKey] = c.value;
      }
      response.paymentInfo = {
        bankName: bankInfo.bankName || "",
        accountNumber: bankInfo.accountNumber || "",
        accountName: bankInfo.accountName || "",
        amount: order.total,
        transferContent: order.orderNumber,
        qrDataUrl: bankInfo.qrDataUrl || null,
      };
    } else if (["momo", "zalopay", "vnpay"].includes(paymentMethodId)) {
      // Gateway stubs
      response.paymentInfo = {
        redirectUrl: null,
        message: `Tính năng thanh toán qua ${paymentMethod.name} sẽ sớm được hỗ trợ. Vui lòng chọn COD hoặc chuyển khoản.`,
      };
    }

    res.status(201).json(response);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "SERVER_ERROR", message: "Lỗi tạo đơn hàng" });
  }
});

// GET /api/orders/:orderNumber — Get order by number (success page)
router.get("/orders/:orderNumber", async (req: Request, res: Response) => {
  try {
    const orderNumber = req.params.orderNumber as string;

    const result = await prisma.order.findUnique({
      where: { orderNumber },
      include: { items: true },
    });

    if (!result) {
      return res.status(404).json({ error: "NOT_FOUND", message: "Đơn hàng không tồn tại" });
    }

    // Look up human-readable payment method name
    const paymentMethod = await prisma.checkoutPaymentMethod.findUnique({
      where: { methodId: result.paymentMethod },
    });

    // Build shipping address string
    const shippingAddress = `${result.addressDetail}, ${result.wardName}, ${result.districtName}, ${result.provinceName}`;

    const response: Record<string, unknown> = {
      orderNumber: result.orderNumber,
      status: result.status,
      paymentStatus: result.paymentStatus,
      paymentMethod: result.paymentMethod,
      paymentMethodName: paymentMethod?.name || result.paymentMethod,
      customer: {
        name: result.customerName,
        phone: result.customerPhone,
        email: result.customerEmail || undefined,
      },
      shippingAddress,
      notes: result.notes || undefined,
      items: result.items.map((item: { productName: string; productImage: string; unitPrice: number; quantity: number; totalPrice: number }) => ({
        productName: item.productName,
        productImage: item.productImage,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      })),
      subtotal: result.subtotal,
      shippingFee: result.shippingFee,
      total: result.total,
      createdAt: result.createdAt.toISOString(),
    };

    // Include bank transfer info for bank orders
    if (result.paymentMethod === "bank") {
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
        amount: result.total,
        transferContent: result.orderNumber,
        qrDataUrl: bankInfo.qrDataUrl || null,
      };
    }

    res.json(response);
  } catch (err) {
    console.error("Order fetch error:", err);
    res.status(500).json({ error: "SERVER_ERROR", message: "Lỗi lấy thông tin đơn hàng" });
  }
});

export default router;
