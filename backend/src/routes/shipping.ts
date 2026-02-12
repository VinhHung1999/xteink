import { Router, Request, Response } from "express";
import { calculateShippingFee } from "../lib/shipping";

const router = Router();

// GET /api/shipping/fee?provinceCode=79&subtotal=500000
router.get("/shipping/fee", (req: Request, res: Response) => {
  const { provinceCode, subtotal } = req.query;

  if (!provinceCode || typeof provinceCode !== "string") {
    return res.status(400).json({ error: "VALIDATION_ERROR", message: "provinceCode là bắt buộc" });
  }

  const subtotalNum = Number(subtotal);
  if (isNaN(subtotalNum) || subtotalNum < 0) {
    return res.status(400).json({ error: "VALIDATION_ERROR", message: "subtotal không hợp lệ" });
  }

  const result = calculateShippingFee(provinceCode, subtotalNum);
  res.json(result);
});

export default router;
