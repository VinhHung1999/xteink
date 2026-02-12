import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/lifestyle-moments", async (_req, res, next) => {
  try {
    const items = await prisma.lifestyleMoment.findMany({
      orderBy: { sortOrder: "asc" },
      select: { image: true, caption: true },
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
});

export default router;
