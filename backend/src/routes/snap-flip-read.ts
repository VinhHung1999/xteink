import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/snap-flip-read", async (_req, res, next) => {
  try {
    const items = await prisma.snapFlipReadStep.findMany({
      orderBy: { sortOrder: "asc" },
      select: { icon: true, title: true, description: true, step: true },
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
});

export default router;
