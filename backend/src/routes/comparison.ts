import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

function buildComparisonModel(product: {
  name: string;
  tag: string | null;
  image: string;
  screenSpec: string | null;
  ppiSpec: string | null;
  weightSpec: string | null;
  thicknessSpec: string | null;
  price: string;
  priceNumeric: number;
  advantages: string[];
}) {
  return {
    name: product.name,
    tag: product.tag,
    image: product.image,
    specs: {
      screen: product.screenSpec || "",
      ppi: product.ppiSpec || "",
      weight: product.weightSpec || "",
      thickness: product.thicknessSpec || "",
      price: product.price,
      priceNumeric: product.priceNumeric,
    },
    advantages: product.advantages,
  };
}

// GET /api/product-comparison → ProductComparisonData
router.get("/product-comparison", async (_req, res, next) => {
  try {
    const selectFields = {
      name: true,
      tag: true,
      image: true,
      screenSpec: true,
      ppiSpec: true,
      weightSpec: true,
      thicknessSpec: true,
      price: true,
      priceNumeric: true,
      advantages: true,
    } as const;

    const [x4, x3] = await Promise.all([
      prisma.product.findUnique({ where: { slug: "x4" }, select: selectFields }),
      prisma.product.findUnique({ where: { slug: "x3" }, select: selectFields }),
    ]);

    if (!x4 || !x3) {
      res.status(404).json({ error: "NOT_FOUND", message: "Products for comparison not found" });
      return;
    }

    res.json({
      x4: buildComparisonModel(x4),
      x3: buildComparisonModel(x3),
    });
  } catch (error) {
    next(error);
  }
});

export default router;
