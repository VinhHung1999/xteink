import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// GET /api/footer → FooterData (composite)
router.get("/footer", async (_req, res, next) => {
  try {
    const [productLinks, supportLinks, paymentMethods] = await Promise.all([
      prisma.footerLink.findMany({
        where: { section: "product" },
        orderBy: { sortOrder: "asc" },
        select: { label: true, href: true },
      }),
      prisma.footerLink.findMany({
        where: { section: "support" },
        orderBy: { sortOrder: "asc" },
        select: { label: true, href: true },
      }),
      prisma.footerPaymentMethod.findMany({
        orderBy: { sortOrder: "asc" },
        select: { name: true },
      }),
    ]);

    res.json({
      productLinks,
      supportLinks,
      paymentMethods: paymentMethods.map((m) => m.name),
    });
  } catch (error) {
    next(error);
  }
});

export default router;
