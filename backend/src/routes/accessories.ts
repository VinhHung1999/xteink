import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// GET /api/accessories → Accessory[] (standalone only, with colors)
router.get("/accessories", async (_req, res, next) => {
  try {
    const items = await prisma.accessory.findMany({
      where: { category: "standalone" },
      orderBy: { sortOrder: "asc" },
      select: {
        image: true,
        name: true,
        price: true,
        colors: {
          orderBy: { sortOrder: "asc" },
          select: { name: true, hex: true },
        },
      },
    });
    // Return colors only if non-empty, otherwise omit
    const result = items.map((item) => ({
      ...item,
      colors: item.colors.length > 0 ? item.colors : undefined,
    }));
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
