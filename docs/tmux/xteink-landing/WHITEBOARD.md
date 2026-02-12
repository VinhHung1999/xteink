# Team Whiteboard

**Sprint:** 6 (FE)
**Goal:** Subpages + Product Deep Content — About, Guides, Policy, Library, Product pages
**Branch:** sprint_6_fe

---

## Current Status

| Role | Status | Current Task | Last Update |
|------|--------|--------------|-------------|
| PO   | 🔄 Active | Sprint 6 kickoff — assigning FE | 2026-02-12 19:35 |
| TL   | ✅ Done | ALL 6 SPRINT 6 STORIES APPROVED! S5.2 (8e6f789) | 2026-02-12 20:12 |
| BE   | ⏳ Standby | No BE work this sprint | 2026-02-12 19:35 |
| FE   | ✅ Done | ALL 6 SPRINT 6 STORIES CODED! 19 routes total | 2026-02-12 20:13 |
| SM   | ✅ Done | Sprint 6 RETRO COMPLETE — ready for merge to main | 2026-02-12 20:25 |
| QA   | 🔄 Active | S5.2 testing (FINAL STORY!) | 5 stories verified ✅ | 2026-02-12 20:15 |

---

## Sprint 6 (FE) Stories

| ID | Story | Priority | Size | Assignee | Status |
|----|-------|----------|------|----------|--------|
| S4.1 | About Page | P1 | L | FE + TL | ✅ DONE (659790c → TL ✅ → QA 4/4 → PO ✅) |
| S4.2 | Guides | P1 | M | FE + TL | ✅ DONE (9e1a2d8 → TL ✅ → QA 12/12 → PO ✅) |
| S4.3 | Policy Pages | P2 | S | FE + TL | ✅ DONE (479e8c0 → TL ✅ → QA 12/18 → PO ✅) |
| S5.1 | Library Preview | P1 | L | FE + TL | ✅ DONE (da26217 → TL ✅ → QA 6/7 → PO ✅) |
| S5.2 | Format Checker | P2 | S | FE + TL | ✅ DONE (8e6f789 → TL ✅ → QA 6/6 → PO ✅) |
| S5.3 | Product Deep Content X4+X3 | P1 | M | FE + TL | ✅ DONE (b58396e → TL ✅ → QA 10/10 → PO ✅) |

---

## Sprint 5 (BE) Archive ✅ BOSS ACCEPTED (2026-02-12)

| ID | Story | Priority | Size | Assignee | Status |
|----|-------|----------|------|----------|--------|
| BE2.1 | Order Schema + Create API | P0 | L | BE + TL | ✅ Done (Steps 1+3: coded ecf2605 → TL ✅ → PO ✅) |
| BE2.2 | Payment Flow (COD + Bank Transfer + MoMo/VNPay stubs) | P0 | L | BE + TL | ✅ Done (Step 4: coded ecf2605 → TL ✅ → PO ✅) |
| BE2.3 | Shipping Fee Calculation | P1 | M | BE + TL | ✅ Done (Step 2: coded ecf2605 → TL ✅ → PO ✅) |
| BE2.4 | FE Integration — Checkout → POST /api/orders | P0 | M | FE + QA | ✅ Done (Step 6: coded 69d0eb1 → TL ✅ → QA ✅ 4/4 tests → PO ✅) |
| BE2.5 | Admin Order Management (list + update status) | P1 | M | BE + TL | ✅ Done (Step 5: coded ecf2605 → TL ✅ → PO ✅) |

---

## Sprint 4 Retrospective Summary

**Cycle Time:** ~70 minutes (kickoff → Boss acceptance)
**Stories:** 5/5 complete | **Bugs:** 0 production bugs | **Blockers:** 1 (server freeze, resolved in 2 min)

### What Went Well
- Architecture-first approach (TL doc before coding) saved integration time
- Type contracts matched 1:1 — zero mismatches between BE responses and FE types
- Mock fallback pattern in api.ts ensured FE never breaks if BE is down
- Icon-map.ts resolved LucideIcon→string mapping cleanly
- Fast feedback loops: issues caught and resolved in minutes
- Zero production bugs across all 19 endpoints

### What Went Wrong
- FE dev server froze after major api.ts changes — required manual restart
- X4 price discrepancy (1.49M vs 1.59M) caught late in sprint
- QA tested checkout with empty cart → false positive blocker
- SM prematurely declared sprint complete before BE1.4 was QA-tested (DoD gap)
- FE skipped SM reporting after BE1.5 (communication protocol gap)

### Action Items for Sprint 5
1. **Restart dev server after major FE changes** — add to DoD checklist
2. **QA test preconditions** — document which pages require state (checkout needs cart items)
3. **Data consistency audit before seeding** — verify prices/specs match across all sources
4. **SM DoD verification checklist** — verify ALL criteria (coded + reviewed + tested + accepted) before declaring complete
5. **Reinforce two-step protocol** — every task: (a) acknowledge start → (b) report completion to SM
6. **Add structured specs to BE** — label-value pairs for product detail (FE workaround request)
7. **Health check step in DoD** — quick server health check before integration testing

---

## Technical Decisions (Ongoing)

- **Stack:** Node.js + Express + TypeScript + Prisma ORM + PostgreSQL
- **Directory:** `backend/`
- **BE Port:** 3001 | **FE Port:** 2002
- **Public URLs:** FE → xteink.hungphu.work | BE → api-xteink.hungphu.work
- **API Contract:** Must match `website/src/services/types/index.ts` exactly
- **Seed data:** From FE mock files in `website/src/services/mock/`
- **CORS:** Multi-origin support (localhost + public URL)

---

## Sprint 4 (BE) Archive ✅ BOSS ACCEPTED (2026-02-12)

| ID | Story | Status | Notes |
|----|-------|--------|-------|
| BE1.1 | Project Setup + DB Schema | ✅ Done | 28 Prisma models, PostgreSQL seeded |
| BE1.2 | Content APIs (15 GET endpoints) | ✅ Done | 15/15 QA tested, all match FE types |
| BE1.3 | Address API (Full Vietnam) | ✅ Done | 63 provinces, 713 districts, 11,160 wards |
| BE1.4 | Checkout Payment Methods API | ✅ Done | 5 payment methods |
| BE1.5 | FE Integration (mock→real) | ✅ Done | All 19 api.ts functions, try/catch fallback |

**Key Deliverables:**
- 19 GET endpoints live on port 3001 (public: api-xteink.hungphu.work)
- 12,028 DB records across 28 tables
- FE api.ts: all functions fetch real BE with mock fallback
- icon-map.ts: 21 Lucide icon mappings
- Cloudflare tunnel: api-xteink.hungphu.work → localhost:3001

---

## Sprint 3 Archive

| ID | Story | Status | Commit |
|----|-------|--------|--------|
| S3.1 | Purchase Info Section | ✅ Done | 6433a76 |
| S3.2 | FAQ Section | ✅ Done | 6840b4d |
| S3.3 | Social Proof — Press + Community | ✅ Done | 6dc996f |
| S3.4 | Zalo Support Widget | ✅ Done | 398e323 |

---

## Sprint 2 Archive

| ID | Story | Status | Commit |
|----|-------|--------|--------|
| S2.1 | Content Visibility Polish | ✅ Done | c3c9298 |
| S2.2 | "Snap, Flip, Read" Section | ✅ Done | 63853b8 |
| S2.3 | X3 Product + Comparison | ✅ Done | 82f4492 |
| S2.4 | Accessories Section | ✅ Done | e4abdce |
| — | Real product images integration | ✅ Done | 47a404b |

---

## Notes

- Boss directive: Shift to BE-first — build backend to support existing FE
- FE-only for now uses mock API layer → BE Sprint 4 replaces with real data
- Fonts: Playfair Display (heading) + Be Vietnam Pro (body) + Great Vibes (accent)
- Dev ports: FE 2002, BE 3001
- Public URL: https://xteink.hungphu.work
