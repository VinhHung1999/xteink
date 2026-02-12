import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// GET /api/pricing → PricingData (composite)
router.get("/pricing", async (_req, res, next) => {
  try {
    const [config, includedItems, trustBadges, accessories] = await Promise.all([
      prisma.pricingConfig.findFirst(),
      prisma.pricingIncludedItem.findMany({
        orderBy: { sortOrder: "asc" },
        select: { text: true },
      }),
      prisma.trustBadge.findMany({
        orderBy: { sortOrder: "asc" },
        select: { icon: true, label: true },
      }),
      prisma.accessory.findMany({
        where: { category: "pricing" },
        orderBy: { sortOrder: "asc" },
        select: { image: true, name: true, price: true },
      }),
    ]);

    if (!config) {
      res.status(404).json({ error: "NOT_FOUND", message: "Pricing config not found" });
      return;
    }

    res.json({
      label: config.label,
      price: config.price,
      originalPrice: config.originalPrice,
      included: includedItems.map((i) => i.text),
      trustBadges,
      accessories,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
