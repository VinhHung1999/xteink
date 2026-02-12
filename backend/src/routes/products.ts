import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// GET /api/products → ProductListingItem[]
router.get("/products", async (_req, res, next) => {
  try {
    const items = await prisma.product.findMany({
      orderBy: { sortOrder: "asc" },
      select: {
        slug: true,
        name: true,
        tag: true,
        image: true,
        price: true,
        description: true,
        specsList: true,
      },
    });
    // Map specsList → specs to match FE type ProductListingItem
    const result = items.map(({ specsList, ...rest }) => ({
      ...rest,
      specs: specsList,
    }));
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:slug → ProductData
router.get("/products/:slug", async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      select: {
        name: true,
        subtitle: true,
        description: true,
        image: true,
        features: {
          orderBy: { sortOrder: "asc" },
          select: { icon: true, title: true, description: true },
        },
      },
    });

    if (!product) {
      res.status(404).json({
        error: "NOT_FOUND",
        message: `Product with slug '${req.params.slug}' not found`,
      });
      return;
    }

    // Map to FE ProductData shape: title (name), subtitle, description, image, features
    res.json({
      title: product.name,
      subtitle: product.subtitle,
      description: product.description,
      image: product.image,
      features: product.features,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
