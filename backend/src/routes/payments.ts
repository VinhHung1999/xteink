import { Router, Request, Response } from "express";

const router = Router();

// POST /api/payments/webhook — Payment gateway callback (stub)
router.post("/payments/webhook", (req: Request, res: Response) => {
  console.log("Payment webhook received:", JSON.stringify(req.body, null, 2));
  res.json({ received: true });
});

export default router;
