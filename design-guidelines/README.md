# Xteink Design Guidelines

> *"The best design for Xteink is the design you forget you are looking at — and start wanting to read a book."*

---

## What This Is

A comprehensive design system for the Xteink brand — every decision traced back to the brand soul documents in `/soul/`. This is not a generic style guide. It is the visual and interactive translation of what Xteink believes, who it serves, and how it wants the world to feel.

---

## How to Use This

**Before designing anything**, read `00-design-philosophy.md`. It contains the four pillars and three questions that filter every design decision.

**For quick reference**, use `11-dos-and-donts.md`. Every rule is cited with its soul origin.

**For specific work**, go to the relevant file:

---

## File Index

| # | File | Contents | Read When... |
|---|------|----------|-------------|
| 00 | [Design Philosophy](00-design-philosophy.md) | Four pillars (Quiet, Return, Warmth, Becoming), E-Ink/Paper style reference, seven paradoxes, anti-patterns | Starting any design work |
| 01 | [Color System](01-color-system.md) | Primary palette (Paper White, Charcoal, Warm Gold), supporting colors, dark mode, WCAG contrast, Tailwind config, CSS variables | Choosing or implementing colors |
| 02 | [Typography](02-typography.md) | Cormorant Garamond + Be Vietnam Pro pairing, type scale, line height, Vietnamese support, Tailwind config | Working with text |
| 03 | [Photography Style](03-photography-style.md) | Five moods, composition rules, product shots, lifestyle guidelines, post-processing style, shot list template | Directing photography or choosing images |
| 04 | [Iconography](04-iconography.md) | Lucide icons, core icon set mapped to brand concepts, sizing, animation rules, custom icon guidelines | Adding icons to any design |
| 05 | [Layout & Spacing](05-layout-and-spacing.md) | 4px base spacing scale, grid system, containers, section spacing, responsive breakpoints | Building layouts |
| 06 | [UI Components](06-ui-components.md) | Buttons, cards, navigation, forms, badges, modals, toasts, loading states — all with exact specs | Building interface elements |
| 07 | [Motion & Interaction](07-motion-and-interaction.md) | Timing scale, easing, hover/click/focus states, scroll reveals, page transitions, reduced motion | Adding animation or interaction |
| 08 | [Brand Voice in Design](08-brand-voice-in-design.md) | Innocent Rebel archetype, microcopy guide, CTAs, error messages, headline formulas, words we love/avoid | Writing any text in the design |
| 09 | [Digital Applications](09-digital-applications.md) | Website structure, social media, email design, Shopify specifics, performance standards | Building digital touchpoints |
| 10 | [Print & Packaging](10-print-and-packaging.md) | Box design, unboxing sequence, quick-start card, thank-you card, business card, CMYK/Pantone specs | Creating physical materials |
| 11 | [Dos and Don'ts](11-dos-and-donts.md) | Master reference of every rule across all files, organized by category, with soul citations | Quick reference before publishing |
| 12 | [Vietnam Localization](12-vietnam-localization.md) | Vietnamese typography, cultural color meanings, copywriting, social media, payment, Zalo community, Tết seasonal, UX considerations | Any work targeting Vietnam market |

---

## The Soul Documents (Source of Truth)

These design guidelines are derived from the brand soul files in `/soul/`:

| Soul File | Design Files It Informs |
|-----------|------------------------|
| `00-start-here.md` | 00 (Philosophy) — the "permission slip" concept |
| `01-soul-of-the-product.md` | 00, 03, 06 — subtraction philosophy, physical truth |
| `02-soul-of-the-brand.md` | 00, 01, 08 — four tensions, five currents, brand archetype |
| `03-soul-of-the-user.md` | 03, 08, 09 — five visions, seven hooks, identity transformation |
| `04-emotional-landscape.md` | 01, 07 — six feelings, emotional arc |
| `05-vibe-mood-aesthetic.md` | 01, 02, 03 — mood palette, color language, typography spirit |
| `06-paradoxes-and-currents.md` | 00, 08, 11 — seven paradoxes mapped to design decisions |
| `07-moments-of-magic.md` | 03, 10 — twelve moments, unboxing gasp, magnetic snap |
| `08-the-vietnam-soul.md` | 12 — all Vietnam-specific adaptations |

---

## Quick Start for New Team Members

1. Read `/soul/00-start-here.md` — understand the three souls (10 min)
2. Read `00-design-philosophy.md` — understand the four pillars (10 min)
3. Read `11-dos-and-donts.md` — memorize the rules (15 min)
4. Read the specific file for your task
5. Before publishing: apply the three questions filter

---

## Design Tools & Resources

### Fonts
- [Cormorant Garamond on Google Fonts](https://fonts.google.com/specimen/Cormorant Garamond)
- [Be Vietnam Pro on Google Fonts](https://fonts.google.com/specimen/DM+Sans)
- [Caveat on Google Fonts](https://fonts.google.com/specimen/Caveat) (accent only)

### Icons
- [Lucide Icons](https://lucide.dev) — primary icon library
- [Heroicons](https://heroicons.com) — acceptable alternative (outline variant only)

### Colors (Copy-Paste)
```
Paper White:    #F5F0EB
Charcoal:       #2D2D2D
Warm Gold:      #D4A574
Deep Gold:      #B8864A
Latte:          #C4A882
Sage:           #8B9E7E
Dusty Rose:     #C4A0A0
Cloud Gray:     #D8D4CF
Ink (dark bg):  #1A1A1A
Surface:        #FAF7F3
```

---

*These guidelines are alive. As the brand evolves, update them — but always check against the soul documents. The soul doesn't change. Only its expression does.*
