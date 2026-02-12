import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/testimonials", async (_req, res, next) => {
  try {
    const items = await prisma.testimonial.findMany({
      orderBy: { sortOrder: "asc" },
      select: { quote: true, name: true, location: true },
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
});

export default router;
