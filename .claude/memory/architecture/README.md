# Architecture

System structure, module boundaries, and key patterns.

## Project Evolution

- **Phase 1 (current)**: Brand strategy + design system (soul/, design-guidelines/, raw-data/)
- **Phase 2 (in progress)**: Full e-commerce website FE (website/ — Next.js 16 + React 19 + Tailwind v4)
- **Phase 3 (future)**: Backend API

## Key Architectural Decisions

### FE-First with Mock API Layer
- **Decision**: Build entire FE/UI first, BE comes later
- **Pattern**: FE creates `services/` layer with mock data + typed API contracts (request/response types)
- **Reason**: When BE is ready, only swap mock → real endpoints. Zero FE code changes.
- **Rule**: Every feature that needs data MUST go through the mock API layer, never hardcode data in components

### Multi-Page Structure (Sprint 3+)
- **Updated:** Restructured from single landing page → 5-page website
- Routes: `/` (Home), `/products`, `/guides`, `/community`, `/faq`
- Shared layout: Navbar (active state via `usePathname`), Footer, ZaloWidget in `layout.tsx`
- Each page reuses existing components — no component changes needed

### Tech Stack
- Next.js 16 + React 19 + TypeScript strict + Tailwind CSS v4
- Working directory: `website/`
- Known issue: useEffect, framer-motion, react-intersection-observer fail silently with Turbopack. Use vanilla JS via `<script dangerouslySetInnerHTML>` + `[data-sr-ready]` CSS guard.
- Dark mode: Use hardcoded Tailwind arbitrary values for absolute colors

## E-Commerce Website Structure (12 Sprints)

| Sprint | Focus | Priority |
|--------|-------|----------|
| 1 | Foundation + Landing (setup, hero, nav, footer) | P0 |
| 2 | Product & Bundles (detail page, specs, comparison, bundles) | P0 |
| 3 | Brand Story & Content (about, FAQ, unboxing) | P0 |
| 4 | Cart & Checkout (giỏ hàng, checkout, VN address) | P0 |
| 5 | Payment Integration (MoMo, ZaloPay, VNPay, COD) | P0 |
| 6 | Shipping & Orders (GHN/GHTK/Viettel Post, tracking) | P1 |
| 7 | User Accounts (auth, profile, order history) | P1 |
| 8 | Reviews & Social Proof (ratings, testimonials, press) | P1 |
| 9 | SEO & Marketing (GA4, Pixel, schema, referral) | P1 |
| 10 | Admin Panel (orders, inventory, CMS) | P1 |
| 11 | Vietnam Legal & Trust (MOIT, policies, badges) | P2 |
| 12 | Community & Polish (blog, UGC, PWA, perf) | P2 |

## Vietnam E-Commerce Context

### Payment Methods
MoMo (31M+ users) | ZaloPay | VNPay/VietQR | COD (72% prefer) | Bank transfer | Visa/MC | Installment 0%

### Shipping Providers
GHN | GHTK | Viettel Post — API-based, COD support, same-day in HCM/HN

### Bundle Pricing (VND)
- Starter: 1,690,000₫ (X4 + Case + SD + Guide)
- Night Reader: 1,890,000₫ (X4 + Case + Magnetic Light)
- Gift Set: 2,190,000₫ (X4 + Case + Light + Premium Box)
- Full Set: 2,390,000₫ (X4 + Case + Light + Screen protector + SD 64GB)

### Target Audience
- 18-35, urban VN (HCM, HN, DN), 5-15M VND/month
- BookTok-influenced, digital detox motivated
- Impulse-buy price point (~1.5M VND)

## Brand Design System

### Colors
Paper White #F5F0EB | Charcoal #2D2D2D | Warm Gold #D4A574 | Deep Gold #B8864A | Sage #8B9E7E | Dusty Rose #C4A0A0 | Ink #1A1A1A | Surface #FAF7F3

### Typography
Cormorant Garamond (headings) | Be Vietnam Pro (body/UI) | Caveat (accent only)

### Four Pillars
Quiet · Return · Warmth · Becoming

## Team Workflow Rules

### Sprint Retrospective (mandatory after every sprint)
1. PO facilitates retro with FE → what went well / wrong / improve
2. PO updates role prompts (PO_PROMPT.md, FE_PROMPT.md) with lessons learned
3. PO updates project memory (.claude/memory/) with reusable patterns/bugs
4. PO reports retro summary to Boss
- **Why**: Agents lose context between sessions. Prompts + memory = persistent improvement.
