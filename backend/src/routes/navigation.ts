import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/navigation", async (_req, res, next) => {
  try {
    const items = await prisma.navLink.findMany({
      orderBy: { sortOrder: "asc" },
      select: { label: true, href: true },
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
});

export default router;
