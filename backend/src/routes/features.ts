import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/features", async (_req, res, next) => {
  try {
    const items = await prisma.feature.findMany({
      orderBy: { sortOrder: "asc" },
      select: { image: true, title: true, description: true },
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
});

export default router;
