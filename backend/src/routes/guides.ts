import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/guides", async (_req, res, next) => {
  try {
    const items = await prisma.guide.findMany({
      orderBy: { sortOrder: "asc" },
      select: { icon: true, title: true, description: true, href: true },
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
});

export default router;
