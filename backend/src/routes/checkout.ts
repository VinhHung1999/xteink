import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// GET /api/checkout/payment-methods → CheckoutPaymentMethod[]
router.get("/checkout/payment-methods", async (_req, res, next) => {
  try {
    const methods = await prisma.checkoutPaymentMethod.findMany({
      orderBy: { sortOrder: "asc" },
      select: { methodId: true, name: true, description: true, icon: true },
    });
    // Map methodId → id to match FE type CheckoutPaymentMethod.id
    const result = methods.map(({ methodId, ...rest }) => ({
      id: methodId,
      ...rest,
    }));
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
