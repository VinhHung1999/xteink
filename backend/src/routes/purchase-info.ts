import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// GET /api/purchase-info → PurchaseInfoData (composite)
router.get("/purchase-info", async (_req, res, next) => {
  try {
    const [paymentMethods, shippingInfo, warranty, bundleItems, freeShippingConfig] =
      await Promise.all([
        prisma.purchasePaymentMethod.findMany({
          orderBy: { sortOrder: "asc" },
          select: { icon: true, name: true, description: true },
        }),
        prisma.shippingInfo.findMany({
          orderBy: { sortOrder: "asc" },
          select: { icon: true, region: true, time: true, note: true },
        }),
        prisma.warrantyInfo.findMany({
          orderBy: { sortOrder: "asc" },
          select: { icon: true, title: true, description: true },
        }),
        prisma.bundleItem.findMany({
          orderBy: { sortOrder: "asc" },
          select: { icon: true, name: true },
        }),
        prisma.siteConfig.findUnique({ where: { key: "freeShippingNote" } }),
      ]);

    res.json({
      paymentMethods,
      shippingInfo,
      warranty,
      bundleItems,
      freeShippingNote: freeShippingConfig?.value || "",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
