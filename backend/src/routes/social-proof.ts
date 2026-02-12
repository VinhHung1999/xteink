import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// GET /api/social-proof → SocialProofData (composite)
router.get("/social-proof", async (_req, res, next) => {
  try {
    const [pressReviews, youtubeReview, communityStatConfig, testimonials] = await Promise.all([
      prisma.pressReview.findMany({
        orderBy: { sortOrder: "asc" },
        select: { name: true, rating: true, maxRating: true, quote: true },
      }),
      prisma.youTubeReview.findFirst({
        select: { channel: true, subscribers: true, title: true, url: true, thumbnailUrl: true },
      }),
      prisma.siteConfig.findUnique({ where: { key: "communityStat" } }),
      prisma.communityTestimonial.findMany({
        orderBy: { sortOrder: "asc" },
        select: { quote: true, name: true, source: true },
      }),
    ]);

    res.json({
      pressReviews,
      youtubeReview: youtubeReview || null,
      communityStat: communityStatConfig?.value || "",
      testimonials,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
