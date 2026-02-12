import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/faq", async (_req, res, next) => {
  try {
    const items = await prisma.fAQItem.findMany({
      orderBy: { sortOrder: "asc" },
      select: { question: true, answer: true },
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
});

export default router;
