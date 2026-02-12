# Backend

Patterns, conventions, and lessons for the backend API (Phase 3).

## Status

Backend is **live** (Sprint 4 complete). 19 GET endpoints on port 3001.

## Stack

Node.js + Express + TypeScript + PostgreSQL + Prisma ORM. Directory: `backend/`

## API Contracts (from FE Mock Layer)

The FE mock layer defines the data shapes the backend must eventually serve:
- Product data (X4, X3 specs, pricing, images)
- Accessories (cases, lights, bundles)
- FAQ content
- Social proof (press mentions, testimonials)
- Purchase/checkout flow
- Library/book data

## Vietnam E-Commerce Integrations (Planned)

### Payment
- MoMo (31M+ users), ZaloPay, VNPay/VietQR, COD (72% prefer), Bank transfer, Visa/MC, Installment 0%

### Shipping
- GHN, GHTK, Viettel Post — API-based, COD support, same-day in HCM/HN

### Other
- Zalo OA (customer support)
- GA4 + Facebook Pixel (analytics)

## Key Decisions

- LucideIcon fields → stored as kebab-case strings in DB, FE resolves via icon-map (BE1.5)
- Accessory dual-use: `category` field ("standalone" vs "pricing") filters different API responses
- Address API: flat responses per cascade level (not nested), uses `sub-vn` npm package (63 provinces, 713 districts, 11,160 wards)
- Seed must be idempotent: deleteMany() all tables before creates
- CheckoutPaymentMethod.icon = emoji string; PurchasePaymentMethod.icon = Lucide name string
- Architecture doc: `docs/tmux/xteink-landing/BE_ARCHITECTURE.md`

## Lessons Learned

- Prisma seed idempotency: always add deleteMany() in reverse dependency order at top of seed — using only upsert for some tables and create for others causes duplicates on re-run
- Data consistency audit BEFORE seeding: verify prices/specs match across all sources (backlog, mock data, seed). Sprint 4 had X4 price discrepancy (1.49M vs 1.59M) caught late
- Nodemon doesn't detect .env changes — must hard restart (`pkill -f nodemon && pkill -f ts-node`)
- CORS multi-origin: config.ts splits comma-separated CORS_ORIGIN into array for Express cors()
- Product detail endpoint should include price/tag/specs directly (FE had to combine 2 endpoints as workaround)
