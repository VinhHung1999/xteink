import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// GET /api/addresses/provinces → Province[] (flat, no nested districts)
router.get("/addresses/provinces", async (_req, res, next) => {
  try {
    const provinces = await prisma.province.findMany({
      orderBy: { sortOrder: "asc" },
      select: { code: true, name: true },
    });
    res.json(provinces);
  } catch (error) {
    next(error);
  }
});

// GET /api/addresses/provinces/:code/districts → District[] (flat, no nested wards)
router.get("/addresses/provinces/:code/districts", async (req, res, next) => {
  try {
    const province = await prisma.province.findUnique({
      where: { code: req.params.code },
      select: { id: true },
    });

    if (!province) {
      res.status(404).json({
        error: "NOT_FOUND",
        message: `Province with code '${req.params.code}' not found`,
      });
      return;
    }

    const districts = await prisma.district.findMany({
      where: { provinceId: province.id },
      orderBy: { sortOrder: "asc" },
      select: { code: true, name: true },
    });
    res.json(districts);
  } catch (error) {
    next(error);
  }
});

// GET /api/addresses/districts/:code/wards → Ward[]
router.get("/addresses/districts/:code/wards", async (req, res, next) => {
  try {
    const district = await prisma.district.findUnique({
      where: { code: req.params.code },
      select: { id: true },
    });

    if (!district) {
      res.status(404).json({
        error: "NOT_FOUND",
        message: `District with code '${req.params.code}' not found`,
      });
      return;
    }

    const wards = await prisma.ward.findMany({
      where: { districtId: district.id },
      orderBy: { sortOrder: "asc" },
      select: { code: true, name: true },
    });
    res.json(wards);
  } catch (error) {
    next(error);
  }
});

export default router;
