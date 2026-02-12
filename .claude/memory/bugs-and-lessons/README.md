# Bugs & Lessons Learned

## Resolved Bugs

### FE dev server freeze after major api.ts changes (Sprint 4)
- **Cause:** Next.js dev server froze after extensive changes to `website/src/services/api.ts` (swapping 19 mock functions to real BE calls). Server became unresponsive (5s timeout, no response).
- **Symptom:** All requests hang, QA testing blocked
- **Fix:** Kill and restart dev server: `pkill -f "next dev"` then `cd website && pnpm dev`
- **Prevention:** Add "restart dev server after major api.ts changes" to FE DoD checklist
- **Resolution time:** 2 minutes (detected 11:58, resolved 12:00)

### X4 price discrepancy across data sources (Sprint 4)
- **Cause:** Product price inconsistency — some files had 1.49M, others had 1.59M for X4 eReader
- **Impact:** User confusion, incorrect pricing display
- **Fix:** Data consistency audit — verified correct price (1.59M) across all sources and updated inconsistent files
- **Prevention:** TL/BE must verify data consistency across ALL sources (mock files, specs, marketing) before seeding database

### QA checkout test with empty cart = false positive blocker (Sprint 4)
- **Cause:** QA tested `/checkout` page with empty cart. CheckoutClient has guard that redirects to `/` when cart is empty (by design). QA saw blank page and reported "address cascade not found"
- **Symptom:** QA reported address selects (province/district/ward) missing, flagged as blocker
- **Fix:** QA retested with cart items → all 3 address selects found, test passed
- **Root cause:** Test methodology — checkout requires cart items as precondition
- **Prevention:** QA must document test preconditions for each page (checkout needs cart, success needs order ID, etc.)

## Lessons Learned

### React 19 `use()` in "use client" breaks hydration → no event handlers on mobile
- **Cause:** `use(getNavLinks())` in a `"use client"` component creates a new Promise every render → suspends during hydration → without `<Suspense>` boundary, entire React tree fails to hydrate → DOM is visible but onClick handlers never attach
- **Symptom:** Desktop links work (native `<a href>`), but mobile `<button onClick>` completely dead
- **Fix:** Split into async server component (`await getData()`) + client component (receives data via props). Wrap async server components in `<Suspense>` in layout.tsx

### JS execution broken in Next.js 16 + React 19 + Turbopack
- `framer-motion`, `react-intersection-observer`, `useEffect` hooks, and `next/script` ALL fail silently — animations/effects never fire
- `useState` + click handlers DO work (Navbar drawer), but `useEffect` does not run in client components
- **Fix:** Use `<script dangerouslySetInnerHTML>` with `DOMContentLoaded` for vanilla JS. Use `[data-sr-ready]` CSS guard so content stays visible if JS fails

### Turbopack wrong workspace root — "Can't resolve 'tailwindcss'"
- **Cause:** Ancestor directory (e.g. `~/`) has `package-lock.json`, so Turbopack infers it as workspace root and resolves modules from there instead of the actual project
- **Fix:** `turbopack.root` in next.config.ts did NOT work. `TURBOPACK=0` env var did NOT work. Use `next dev --webpack` flag to disable Turbopack

### Git revert on CSS-heavy commits loses styles
- **Cause:** `git revert` on commits with extensive CSS changes creates conflicts; resolution often drops styles silently
- **Fix:** Use `git checkout <good-commit> -- <files>` to restore exact file state, then re-apply only the changes you want

### DOMContentLoaded scroll-reveal breaks on Next.js client-side navigation
- **Cause:** Inline `<script>` with `DOMContentLoaded` only fires once on initial page load. Client-side `<Link>` navigation doesn't re-fire it → IntersectionObserver never observes new page elements → all `scroll-reveal` elements stuck at `opacity:0` (blank pages)
- **Fix:** Replace inline script with a `ScrollRevealProvider` client component using `useEffect` with `usePathname()` dependency + `MutationObserver` to detect new DOM elements from async rendering. Proper cleanup on unmount.

### React strict mode double useEffect breaks sessionStorage read-then-delete
- **Cause:** useEffect reads sessionStorage → sets state → deletes item. Strict mode re-runs useEffect → item already deleted → redirect fires
- **Fix:** Use `useRef` guard to prevent double execution, move `sessionStorage.removeItem` to user action (button click) instead of useEffect

### Always stage ALL modified files before committing
- **Cause:** After multipage restructure (12 files changed), only committed 1 file (Footer.tsx) — forgot to `git add` the other 11 modified/untracked files
- **Fix:** Always run `git status` and verify staged file count matches expected changes before committing

### Nodemon doesn't detect .env file changes — must hard restart
- **Cause:** nodemon watches `src/**/*.ts` only, not `.env` files
- **Fix:** `pkill -f nodemon && pkill -f ts-node` then restart. Don't rely on auto-reload for env changes.

### Checkout form validation must include format checks, not just required (Sprint 5)
- **Cause:** Checkout form only checked required fields but not format — email "fdfd" accepted, phone "abc" accepted. Backend rejected on submit with generic "dữ liệu không hợp lệ" error, no indication which field was wrong
- **Fix:** Add format validation: email regex, phone 10-11 digits regex. Show specific error under each field. scrollIntoView + focus on first error field on submit fail. clearError on onChange.
- **Prevention:** Form validation checklist before QA: (1) required fields (2) format validation (email, phone, postal) (3) scroll-to-error on submit fail (4) error clears on edit (5) specific error messages per field

### Sprint retro must happen BEFORE merge to main (Sprint 5)
- **Cause:** PO merged sprint_5_be to main before retro. Boss flagged this as process violation.
- **Fix:** Updated workflow.md — retro is MANDATORY BLOCKING step before merge. Phase 4 (retro) → Phase 5 (merge) → Phase 6 (next sprint)
- **Prevention:** SM enforces retro before PO can close sprint. No merge without retro complete.

### PO is authority for task assignments, SM tracks but doesn't override (Sprint 5)
- **Cause:** SM told QA to wait for TL review, PO told QA to start now (parallel). QA confused by conflicting directives.
- **Fix:** PO decides task assignments and execution order. SM tracks progress and enforces process but does NOT override PO directives on who does what and when.

### Dark mode token inversion breaks "absolute" color uses
- Swapping `paper`↔`ink` for dark mode breaks: image overlays (`from-ink/70`), CTA text on gold (`text-ink`), hero text on images (`text-paper`), footer `bg-charcoal`
- **Fix:** Use hardcoded Tailwind arbitrary values (`text-[#1A1A1A]`, `from-[#1A1A1A]/70`, `text-[#E8E0D6]`) for colors that must stay "absolutely" dark or light regardless of theme
