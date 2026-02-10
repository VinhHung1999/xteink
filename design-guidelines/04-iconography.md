# Iconography

> *"Two buttons. Left. Right. Back. Forward. That is all the vocabulary this device speaks. And in that poverty of language, it achieves eloquence."*
> — Soul of the Product

---

## Soul Connection

The X4 is a device that communicates through subtraction. Its iconography must do the same: say as much as possible with as little as possible. Every icon should feel like a quiet symbol in a book margin — functional, clear, never decorative for decoration's sake.

---

## Icon System: Lucide Icons

**Primary icon library:** [Lucide](https://lucide.dev) — an open-source icon library that is clean, consistent, and minimal. Chosen because:

- Stroke-based (not filled) — lighter visual weight, matches the E-Ink / Paper aesthetic
- Consistent 24x24 grid with 2px stroke width
- Extensive library covering all UI needs
- Open source, MIT licensed
- Available as SVG, React, Vue components

**Alternative:** [Heroicons](https://heroicons.com) outline variant — acceptable substitute if Lucide is unavailable.

**Never use:** Emoji as icons, Font Awesome (too heavy, too varied in style), filled/solid icon sets (too visually heavy for this brand).

---

## Icon Style Rules

### Visual Properties

| Property | Value | Reason |
|----------|-------|--------|
| **Grid size** | 24 × 24px | Standard touchable area basis |
| **Stroke width** | 1.5px - 2px | Light, not heavy — matches brand weight |
| **Corner radius** | Match Lucide defaults (rounded caps and joins) | Soft, organic, warm |
| **Color** | Charcoal `#2D2D2D` (default) | Quiet authority |
| **Color (muted)** | `#8A8480` | Secondary/metadata icons |
| **Color (active)** | Warm Gold `#D4A574` | Selected state, active navigation |
| **Color (on dark)** | Warm Cream `#E8E0D6` | Dark mode / dark surfaces |

### Sizing Scale

| Context | Size | Usage |
|---------|------|-------|
| **Inline** | 16px (w-4 h-4) | Inside buttons, alongside text, metadata |
| **Standard** | 20px (w-5 h-5) | Navigation items, form icons, list icons |
| **Feature** | 24px (w-6 h-6) | Feature cards, category icons, section markers |
| **Hero** | 32px (w-8 h-8) | Feature highlights, empty states, large callouts |
| **Illustration** | 48-64px | Onboarding, empty states, hero sections |

### Spacing
- **Icon + text:** 8px gap (space-x-2) — enough breath, not too far
- **Icon button padding:** 8px all sides (p-2) for 24px icon = 40px touch target
- **Icon in input field:** 12px from edge

---

## Core Icon Set

These icons are the brand vocabulary. Map them consistently across all touchpoints.

### Navigation & Actions

| Concept | Lucide Icon | Name | Notes |
|---------|-------------|------|-------|
| Home | `<Home />` | home | Simple house outline |
| Search | `<Search />` | search | Magnifying glass |
| Menu | `<Menu />` | menu | Three horizontal lines |
| Close | `<X />` | x | Subtle, not aggressive |
| Back | `<ArrowLeft />` | arrow-left | Simple arrow, not chevron |
| Forward | `<ArrowRight />` | arrow-right | Matches back arrow |
| External link | `<ExternalLink />` | external-link | Arrow leaving box |
| Share | `<Share2 />` | share-2 | Network nodes — community |
| Settings | `<Settings />` | settings | Gear — simple |

### Product & Reading

| Concept | Lucide Icon | Name | Notes |
|---------|-------------|------|-------|
| Book/Read | `<BookOpen />` | book-open | THE brand icon |
| Library | `<Library />` | library | Book collection |
| Bookmark | `<Bookmark />` | bookmark | Save for later |
| Page turn | `<ChevronRight />` | chevron-right | The click — the core interaction |
| Text/Content | `<Type />` | type | Typography, formatting |
| Download | `<Download />` | download | Books, firmware |
| Upload | `<Upload />` | upload | Sideloading books |
| File | `<FileText />` | file-text | EPUB, TXT files |
| SD Card | `<HardDrive />` | hard-drive | Storage concept |
| Battery | `<Battery />` | battery | Week-long battery life |

### Brand Concepts

| Concept | Lucide Icon | Name | Notes |
|---------|-------------|------|-------|
| Quiet/Silence | `<Volume />` or `<VolumeX />` | volume-x | No notifications |
| Magnet/Attach | `<Paperclip />` | paperclip | Magnetic attachment concept |
| Small/Pocket | `<Pocket />` | pocket | Pocket-sized |
| Light/Feather | `<Feather />` | feather | 74g featherlight |
| Time/Slow | `<Clock />` | clock | Slow reading, found time |
| Community | `<Users />` | users | The tribe |
| Heart/Love | `<Heart />` | heart | Tenderness — the bass note |
| Star/Review | `<Star />` | star | Ratings, favorites |
| Gift | `<Gift />` | gift | Gift-giving moments |

### E-commerce

| Concept | Lucide Icon | Name | Notes |
|---------|-------------|------|-------|
| Cart | `<ShoppingBag />` | shopping-bag | Bag, not cart — more lifestyle |
| Price | `<Tag />` | tag | Price tags |
| Shipping | `<Truck />` | truck | Delivery |
| Package | `<Package />` | package | Order, unboxing |
| Check/Success | `<Check />` | check | Confirmation |
| Info | `<Info />` | info | Tooltips, help |
| Warning | `<AlertTriangle />` | alert-triangle | Cautions |
| Error | `<AlertCircle />` | alert-circle | Errors |

---

## Custom Brand Icons

For concepts unique to Xteink that Lucide doesn't cover, create custom SVG icons following these rules:

### Custom Icon Grid

```
┌──────────────────────┐
│  2px padding          │
│  ┌──────────────────┐│
│  │                  ││
│  │    20×20px       ││
│  │    live area     ││
│  │                  ││
│  └──────────────────┘│
│  24×24px total        │
└──────────────────────┘
```

### Custom Icon Rules
1. **Stroke width:** 1.5px — matches Lucide
2. **Stroke caps:** Round — matches Lucide
3. **Stroke joins:** Round — matches Lucide
4. **Corner radius:** 2px minimum on any sharp corners
5. **Color:** Single color, no gradients, no fills (outline only)
6. **Simplicity:** If you need more than 8 paths, simplify
7. **Test at 16px:** Must remain recognizable at smallest size

### Potential Custom Icons Needed
- **MagSafe ring** — circular magnetic attachment symbol
- **E-Ink screen** — screen with paper-like texture indication
- **Physical button** — tactile button press symbol
- **CrossPoint** — community firmware icon (if applicable)

---

## Icon Animation

Icons should be **static by default**. Animation only when:

1. **State change:** Icon transitions when toggling (bookmark → bookmarked)
2. **Loading:** Subtle pulse or spin for async operations
3. **Micro-feedback:** Slight scale on click (1.0 → 0.95 → 1.0, 150ms)

### Animation Rules
- **Duration:** 150-200ms for state changes
- **Easing:** ease-out for appearing, ease-in for disappearing
- **Scale:** Never exceed 1.1x — subtle, not bouncy
- **Rotation:** Only for loading spinner — never decorative
- **Respect `prefers-reduced-motion`:** Disable all icon animations when user prefers reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .icon-animated {
    animation: none;
    transition: none;
  }
}
```

---

## Icon Dos and Don'ts

| Do | Don't |
|----|-------|
| Use Lucide outline icons consistently | Mix icon libraries (Lucide + FontAwesome + random SVGs) |
| Keep icons at 1.5-2px stroke weight | Use filled/solid icons (too heavy for this brand) |
| Use Charcoal `#2D2D2D` as default icon color | Use black `#000000` or colored icons by default |
| Use Warm Gold `#D4A574` for active/selected states only | Color multiple icons in different colors simultaneously |
| Size icons consistently within context | Mix 16px and 24px icons in the same row |
| Add 8px gap between icon and text | Let icons touch text with no spacing |
| Ensure 40px minimum touch target for icon buttons | Make icon-only buttons smaller than 40×40px |
| Use `aria-label` for icon-only buttons | Leave icon buttons without accessible labels |
| Use `<ShoppingBag>` for cart (lifestyle feel) | Use `<ShoppingCart>` (too transactional) |
