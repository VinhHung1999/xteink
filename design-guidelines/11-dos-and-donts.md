# Master Dos and Don'ts

> *"The message is not 'despite its limitations.' The message is 'because of its limitations.'"*
> — Soul of the User, The Paradox of Desires

---

## Purpose

This document is the single-page reference for anyone creating anything for Xteink — a designer, a developer, a content writer, a social media manager. When in doubt, check here first.

Every rule below traces to a specific soul document. The reference is cited so you can read the deeper reasoning.

---

## The Three Questions (Ultimate Filter)

Before publishing ANY design, content, or communication:

1. **"Is it quiet?"** → If it needs to shout for attention → revise
2. **"Is it warm?"** → If it feels cold, techy, or corporate → revise
3. **"Does it help someone see themselves as a reader?"** → If it only sells specs → revise

---

## Visual Design

### Colors

| DO | DON'T | Soul Reference |
|----|-------|----------------|
| Use Paper White `#F5F0EB` as primary background | Use pure white `#FFFFFF` as page/card background | Vibe: "soft not harsh" |
| Use Charcoal `#2D2D2D` for text | Use pure black `#000000` for body text | Vibe: "quiet authority" |
| Use Warm Gold `#D4A574` sparingly — like sunlight | Flood the design with gold everywhere | Vibe: "afternoon light" |
| Keep shadows warm (charcoal-based rgba) | Use cool gray shadows | Aesthetic: "warm neutral" |
| Use Sage `#8B9E7E` for success/growth | Use bright green `#00FF00` for success states | Emotional: "becoming" |
| Use Soft Terracotta `#B85C5C` for errors | Use aggressive red `#FF0000` | Brand: "gentle, not aggressive" |
| Maintain warm tint even in alternate sections | Use cool slate/gray for section backgrounds | Vibe: "colors of cafés and morning light" |
| Test all color combinations for WCAG AA (4.5:1) | Assume any color combination is accessible | Accessibility first |

### Typography

| DO | DON'T | Soul Reference |
|----|-------|----------------|
| Use Cormorant Garamond serif for headings & quotes | Use geometric/tech fonts (Futura, Montserrat) | Vibe: "serif for soul" |
| Use Be Vietnam Pro for body text and UI | Use serif for small UI text (buttons, labels) | Vibe: "clean sans for clarity" |
| Keep body text at 16px minimum | Go below 14px for any readable content | Accessibility |
| Keep line length at 65ch max | Let text run full viewport width (100+ chars) | Typography: readability |
| Use negative letter-spacing for large headings | Use negative letter-spacing for body text | Typography: intimacy at display size |
| Use `font-display: swap` for web fonts | Allow invisible text during font load | Performance |

### Layout & Spacing

| DO | DON'T | Soul Reference |
|----|-------|----------------|
| Use generous whitespace between sections (80-96px desktop) | Cram sections together to reduce scroll | Philosophy: "absence IS the product" |
| Keep content within 1320px max-width | Let content span full ultra-wide viewport | Intimate, focused feel |
| Use 44px minimum touch targets for interactive elements | Make buttons smaller than 44×44px | Accessibility |
| Use floating navbar with top-4 spacing | Stick navbar flush to top edge | UI/UX Pro Max guideline |
| Use 3 column max for card grids on desktop | Use 4+ columns (too dense, too noisy) | Subtraction philosophy |
| Use single-column for body text content | Use multi-column text for reading content | Book-like reading experience |

### Photography

| DO | DON'T | Soul Reference |
|----|-------|----------------|
| Show hands holding the device | Show the device floating in abstract space | Vibe: "the human element is essential" |
| Use natural light (golden hour, window light) | Use flash, ring lights, or studio strobes | Vibe: "morning light through sheer curtains" |
| Include warm textures (wood, linen, ceramic) | Photograph on cold surfaces (metal, marble) | Vibe: "warm textures" |
| Show real reading moments (bus, bed, café) | Stage fake "reading" poses (smile at camera) | Vibe: "she is not performing" |
| Lift shadows, keep blacks warm | Crush blacks for dramatic contrast | Post-processing: "shadows slightly lifted" |
| Show Vietnamese settings naturally | Use exclusively Western aesthetics | Vietnam Soul |
| Include the "phone face-down" shot | Only show the product without context | Vibe: "the universal gesture" |

### Icons

| DO | DON'T | Soul Reference |
|----|-------|----------------|
| Use Lucide outline icons consistently | Mix icon libraries randomly | Design: consistency |
| Use 1.5-2px stroke weight | Use filled/solid heavy icons | E-Ink / Paper: light, not heavy |
| Use Charcoal as default icon color | Use colored icons by default | Quiet, not noisy |
| Use `aria-label` on icon-only buttons | Leave icon buttons without labels | Accessibility |
| Use `<ShoppingBag>` for cart (lifestyle) | Use `<ShoppingCart>` (transactional) | Brand voice: warm, not commercial |

### Motion

| DO | DON'T | Soul Reference |
|----|-------|----------------|
| Use ease-out for entering elements | Use linear easing for UI transitions | Motion: "warm, not mechanical" |
| Keep transitions 150-400ms | Use animations longer than 500ms | Motion: deliberate, not sluggish |
| Use subtle translateY (16-24px) for scroll reveals | Use horizontal slides, scale, or rotation | E-Ink: "sharp transitions, not blurred" |
| Reveal elements once on scroll | Re-animate on scroll back up | Quiet: don't repeat |
| Honor `prefers-reduced-motion: reduce` | Ignore motion accessibility preferences | Soul: giving users control |
| Use skeleton screens for loading states | Show blank white space while loading | UX: feedback |

---

## Brand Voice & Copy

### Tone

| DO | DON'T | Soul Reference |
|----|-------|----------------|
| Write as if talking to one person at a café | Write for "users" or "customers" | Voice: speak to one person |
| Invite: "Start reading" | Command: "Buy now" | Archetype: "Innocent Rebel invites" |
| Translate features into feelings | List specs without emotional context | Soul of Product: permission slip |
| Be honest about limitations | Hide flaws or oversell | Paradox: "Flawed Yet Beloved" |
| Use "you" and "your" | Use "our customers" or "consumers" | Voice: personal |
| Keep headlines short (5-8 words) | Write long, complex headlines | Voice: typography whispers |

### Language

| DO | DON'T | Soul Reference |
|----|-------|----------------|
| Use: quiet, still, slow, gentle, warm | Use: optimize, hack, crush, hustle, grind | Brand is anti-hustle |
| Use: read, story, page, chapter, book | Use: content, consume, engage, interact | Brand is about books, not "content" |
| Use: discover, become, begin, choose | Use: unlock, maximize, 10x, level up | Slow Movement, not productivity culture |
| Use: "your" and "yours" (ownership) | Use: "access" or "subscribe" (rental) | Current 5: Ownership Rebellion |
| Use: honest language about imperfections | Use: marketing-speak that oversells | Paradox 1: Flawed Yet Beloved |

### CTAs

| DO | DON'T | Soul Reference |
|----|-------|----------------|
| "Start Reading" | "Buy Now" | Invitation, not command |
| "Add to Bag" | "Add to Cart" | Personal, not transactional |
| "Join the Quiet" | "Subscribe Now" | Community, not transaction |
| "Get Yours" | "Order Today — Limited Stock!" | No urgency tactics |
| "Discover More" | "Click Here" | Brand verb, not generic action |

---

## Product Presentation

| DO | DON'T | Soul Reference |
|----|-------|----------------|
| Lead with the feeling, then the feature | Lead with specs | Soul: "permission slip, not eReader" |
| Show the X4 in someone's hand (scale) | Show the X4 in a vacuum | Physical Truth: "hold it and feel surprise" |
| Compare to everyday objects (deck of cards) | Compare to competitor specs | Paradox 2: "Tiny Yet Infinite" |
| Show the transformation journey (scroll→read) | Show only the "after" state | Character Arc: 5 acts |
| Position as "permission to read" | Position as "cheap Kindle alternative" | One Truth: "permission slip" |
| Highlight the $69 value gap (cheap → precious) | Compete on price (cheapest eReader) | Paradox 6: surprise is the mechanism |

---

## Community & Social

| DO | DON'T | Soul Reference |
|----|-------|----------------|
| Reshare user content with attribution | Ignore user-generated content | Community: "the brand's soul made social" |
| Build the community as a "hội" (club/family) | Treat community as customer support | Vietnam Soul: "hội đọc sách" |
| Celebrate imperfection and tinkering | Only show polished/perfect outcomes | Paradox 1 & 7: Flawed Yet Beloved |
| Respond to messages within 30 minutes (Zalo) | Leave messages unanswered for 24h | Vietnam Soul: Day 1 experience |
| Create content for BookTok culture | Create traditional "product demo" content | Current 2: BookTok Revolution |
| Use real user quotes (with permission) | Fabricate testimonials | Brand: honesty |

---

## Email

| DO | DON'T | Soul Reference |
|----|-------|----------------|
| Write like a personal letter | Write like a corporate announcement | Voice: café conversation |
| One primary CTA per email | Multiple competing CTAs | Subtraction philosophy |
| Send max 1x/week | Send daily promotional emails | Quiet, not noisy |
| Include unsubscribe link prominently | Hide unsubscribe | Soul: respect user's choice |
| Use "Reply to this — we read every message" | Use no-reply email addresses | Solitary Yet Communal |

---

## Packaging & Print

| DO | DON'T | Soul Reference |
|----|-------|----------------|
| Use uncoated, matte materials | Use glossy, high-sheen finishes | Vibe: "matte, paper-like" |
| Make unboxing a narrative sequence | Cram everything without order | Moments of Magic: Unboxing Gasp |
| Include handwritten touch (note/name) | Only include legal inserts | Vietnam Soul: personalization |
| Keep box as small as product allows | Oversize for "premium" feel | Subtraction: less, held closer |
| Use QR codes to bridge physical→digital | Print long URLs | Practical |
| Include Vietnamese quick-start for VN market | Assume English-only | Vietnam Soul |

---

## Technical / Web

| DO | DON'T | Soul Reference |
|----|-------|----------------|
| Optimize for < 2.5s LCP | Ship heavy unoptimized pages | E-Ink / Paper: excellent performance |
| Use WebP with JPG fallback | Use uncompressed PNG for photos | Performance |
| Lazy load below-fold images | Load all images upfront | Performance |
| Define z-index scale (10, 20, 30, 50) | Use arbitrary z-index: 9999 | UX guideline |
| Test at 320px, 768px, 1024px, 1440px | Only test on your own screen size | Responsive |
| Ensure no horizontal scroll on mobile | Let wide elements overflow | UX |
