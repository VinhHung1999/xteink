# Frontend

Patterns, conventions, and lessons for the website frontend (`website/`).

## Tech Stack

- Next.js 16 + React 19 + TypeScript strict + Tailwind CSS v4
- Dev: `npm run dev` (port 2002), uses `--webpack` flag (Turbopack disabled)
- Public URL: https://xteink.hungphu.work

## Project Structure

```
website/
├── src/app/           # Pages (/, /products, /guides, /community, /faq)
├── src/components/    # Shared UI components
├── src/services/      # Mock API layer (types + mock data)
├── public/            # Static assets, product images
└── next.config.ts     # Next.js config
```

## Key Patterns

### Mock API Layer
- Every feature MUST go through `services/` layer — never hardcode data in components
- Pattern: typed contracts (request/response types) + mock implementations
- When BE is ready, swap mock → real endpoints with zero FE code changes

### Scroll Reveal
- Uses `ScrollRevealProvider` client component (NOT inline `<script>`)
- `useEffect` with `usePathname()` dependency + `MutationObserver`
- CSS guard: `[data-sr-ready]` ensures content visible if JS fails

### Dark Theme
- Hardcoded Tailwind arbitrary values for absolute colors (e.g., `text-[#1A1A1A]`)
- Never use pure white (#FFFFFF) or pure black (#000000)
- Brand palette: Paper White #F5F0EB, Charcoal #2D2D2D, Ink #1A1A1A, Surface #FAF7F3

### Typography
- Playfair Display (headings) + Be Vietnam Pro (body/UI) + Great Vibes (accent)
- Fonts loaded via next/font or CDN

## Known Issues

- `useEffect`, `framer-motion`, `react-intersection-observer` fail silently with Turbopack → use `--webpack` flag
- React 19 `use()` in "use client" breaks hydration → split async server + client components
- React strict mode double `useEffect` breaks sessionStorage read-then-delete → use `useRef` guard

## API Integration (Sprint 4+)

- All 19 api.ts functions now fetch from real BE (`NEXT_PUBLIC_API_URL`)
- Try/catch fallback: every function falls back to mock data if BE unavailable
- `icon-map.ts`: resolves kebab-case icon names from BE → Lucide React components (21 mappings)
- Address cascade: flat fetches per level (`getProvinces()` → `getDistricts(code)` → `getWards(code)`)
- Dev server may freeze after major api.ts changes — restart manually if unresponsive

## Form Validation Checklist (Sprint 5 lesson)

For EVERY form field (required AND optional):
- [ ] `name` attribute (for scroll-to-error targeting)
- [ ] Format validation (email regex, phone regex, etc.)
- [ ] Error message display (`{errors.field && <p>...</p>}`)
- [ ] `clearError("field")` on onChange
- [ ] Scroll-to-error coverage on submit fail
- [ ] Mirror BE validation rules client-side (don't rely on BE error responses for UX)

## Component Conventions

_(Add patterns as they emerge)_
