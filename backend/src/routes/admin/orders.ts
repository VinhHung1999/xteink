import { Router, Request, Response } from "express";
import prisma from "../../lib/prisma";
import { isValidTransition } from "../../lib/order-status";

const router = Router();

// GET /api/admin/orders — List orders (paginated)
router.get("/orders", async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(String(req.query.page || "1"), 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(String(req.query.limit || "20"), 10) || 20));

    // Normalize status filter: accept lowercase, validate against enum
    const validStatuses = ["PENDING", "CONFIRMED", "SHIPPING", "DELIVERED", "CANCELLED"];
    const rawStatus = typeof req.query.status === "string" ? req.query.status.toUpperCase() : undefined;

    if (rawStatus && !validStatuses.includes(rawStatus)) {
      return res.status(400).json({ error: "VALIDATION_ERROR", message: `Trạng thái không hợp lệ. Hợp lệ: ${validStatuses.join(", ")}` });
    }

    const where = rawStatus ? { status: rawStatus as "PENDING" | "CONFIRMED" | "SHIPPING" | "DELIVERED" | "CANCELLED" } : {};

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: { _count: { select: { items: true } } },
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      orders: orders.map((o) => ({
        id: o.id,
        orderNumber: o.orderNumber,
        status: o.status,
        paymentStatus: o.paymentStatus,
        paymentMethod: o.paymentMethod,
        customerName: o.customerName,
        customerPhone: o.customerPhone,
        total: o.total,
        itemCount: o._count.items,
        createdAt: o.createdAt.toISOString(),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Admin list orders error:", err);
    res.status(500).json({ error: "SERVER_ERROR", message: "Lỗi lấy danh sách đơn hàng" });
  }
});

// PATCH /api/admin/orders/:id/status — Update order status
router.patch("/orders/:id/status", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const newStatus = req.body.status as string | undefined;

    if (!newStatus) {
      return res.status(400).json({ error: "VALIDATION_ERROR", message: "status là bắt buộc" });
    }

    const validStatuses = ["PENDING", "CONFIRMED", "SHIPPING", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({ error: "VALIDATION_ERROR", message: "Trạng thái không hợp lệ" });
    }

    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
      return res.status(404).json({ error: "NOT_FOUND", message: "Đơn hàng không tồn tại" });
    }

    if (!isValidTransition(order.status, newStatus)) {
      return res.status(400).json({
        error: "INVALID_TRANSITION",
        message: `Không thể chuyển trạng thái từ ${order.status} sang ${newStatus}`,
      });
    }

    // Side effect: if confirming a bank transfer, mark as PAID
    const shouldMarkPaid = newStatus === "CONFIRMED" && order.paymentMethod === "bank";

    const updated = await prisma.order.update({
      where: { id },
      data: {
        status: newStatus as "PENDING" | "CONFIRMED" | "SHIPPING" | "DELIVERED" | "CANCELLED",
        ...(shouldMarkPaid ? { paymentStatus: "PAID" as const } : {}),
      },
      include: { items: true },
    });

    res.json(updated);
  } catch (err) {
    console.error("Admin update order status error:", err);
    res.status(500).json({ error: "SERVER_ERROR", message: "Lỗi cập nhật trạng thái đơn hàng" });
  }
});

export default router;
