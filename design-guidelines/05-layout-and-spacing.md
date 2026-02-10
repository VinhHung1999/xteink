# Layout & Spacing System

> *"The absence is not empty. The absence IS the product."*
> — Soul of the Brand, Tension 1: Less Is More

---

## Soul Connection

Whitespace in Xteink design is not empty space — it is **quiet**. The same way the X4 gives you back your attention by removing distractions, the layout gives your eyes rest by providing generous breathing room.

Every spacing decision answers: *"Is there enough silence between these elements for each one to be heard?"*

---

## Spacing Scale

Based on a **4px base unit** with a scale that feels natural and unhurried:

| Token | Value | Rem | Usage |
|-------|-------|-----|-------|
| `space-0` | 0px | 0 | No gap — elements touching |
| `space-1` | 4px | 0.25rem | Tight: icon to badge, inline elements |
| `space-2` | 8px | 0.5rem | Compact: icon to text, input padding inline |
| `space-3` | 12px | 0.75rem | Default: button padding, small gaps |
| `space-4` | 16px | 1rem | Standard: card padding, form gaps |
| `space-5` | 20px | 1.25rem | Comfortable: between related elements |
| `space-6` | 24px | 1.5rem | Generous: paragraph spacing, card gap |
| `space-8` | 32px | 2rem | Section content spacing |
| `space-10` | 40px | 2.5rem | Between content blocks |
| `space-12` | 48px | 3rem | Section padding (mobile) |
| `space-16` | 64px | 4rem | Section padding (tablet) |
| `space-20` | 80px | 5rem | Section padding (desktop) |
| `space-24` | 96px | 6rem | Major section breaks |
| `space-32` | 128px | 8rem | Hero sections, page-level spacing |

### Spacing Philosophy
- **Tight spacing** (4-12px): For elements that belong together — icon + label, input + helper text
- **Standard spacing** (16-24px): For elements that are related — cards in a grid, form fields
- **Generous spacing** (32-64px): For elements that are separate sections — between content blocks
- **Expansive spacing** (80-128px): For major visual breaks — between page sections, hero areas

> **Rule of thumb:** When in doubt, add more space. Xteink design should feel airy, not cramped. The X4 is about less, not more — the layout should reflect this.

---

## Grid System

### Container Widths

| Breakpoint | Container Max-Width | Side Padding | Content Width |
|------------|-------------------|--------------|---------------|
| **Mobile** (< 640px) | 100% | 16px each side | 100% - 32px |
| **Tablet** (640-1023px) | 100% | 32px each side | 100% - 64px |
| **Desktop** (1024-1279px) | 1024px | 32px each side | 960px |
| **Wide** (1280-1535px) | 1200px | auto (centered) | 1200px |
| **Ultra-wide** (1536+) | 1320px | auto (centered) | 1320px |

**Never exceed 1320px content width.** Wider layouts lose the intimate, focused feel of the brand.

### Column Grid

```
Desktop: 12-column grid, 24px gutter
Tablet:  8-column grid, 20px gutter
Mobile:  4-column grid, 16px gutter
```

### Common Layout Patterns

**Full-width hero + centered content:**
```
┌──────────────────────────────────────┐
│         HERO (full viewport)          │
│     max-width: 100vw, padding: 80px  │
└──────────────────────────────────────┘

     ┌──────────────────────────┐
     │  CONTENT (centered)      │
     │  max-width: 1200px       │
     │  padding: 0 32px         │
     └──────────────────────────┘
```

**Two-column content (desktop):**
```
┌──────────────────────────────────┐
│  ┌──────────────┐ ┌───────────┐ │
│  │  Main content │ │  Sidebar  │ │
│  │  8 columns    │ │ 4 columns │ │
│  │  (66%)        │ │ (33%)     │ │
│  └──────────────┘ └───────────┘ │
└──────────────────────────────────┘
Gap: 32px between columns
On mobile: stack vertically, sidebar below
```

**Card grid:**
```
Desktop:  3 columns, 24px gap
Tablet:   2 columns, 20px gap
Mobile:   1 column, 16px gap
```

---

## Section Spacing

The vertical rhythm between major page sections:

| Section Transition | Spacing (Desktop) | Spacing (Mobile) | Visual Treatment |
|-------------------|-------------------|-------------------|------------------|
| Hero → First section | 80px | 48px | Clean break |
| Section → Section (same topic) | 64px | 40px | Subtle divider or color shift |
| Section → Section (new topic) | 96px | 56px | Stronger break, possible bg color change |
| Content → Footer | 96px | 56px | Charcoal background begins |
| Inside section: heading → content | 24px | 20px | — |
| Inside section: content block → content block | 32px | 24px | — |

---

## Component Spacing

### Cards
```
Card padding:           24px (space-6)
Card padding (mobile):  16px (space-4)
Card border-radius:     12px
Card gap (in grid):     24px
Card shadow:            var(--shadow-card)
Card hover shadow:      var(--shadow-card-hover)
```

### Buttons
```
Button padding (default):    12px 24px (space-3 space-6)
Button padding (small):      8px 16px (space-2 space-4)
Button padding (large):      16px 32px (space-4 space-8)
Button border-radius:        8px
Button gap (icon + text):    8px (space-2)
Button min-height:           44px (accessibility touch target)
```

### Form Elements
```
Input padding:              12px 16px (space-3 space-4)
Input border-radius:        8px
Input height:               44px (min touch target)
Label → Input gap:          6px (space-1.5)
Input → Helper text gap:    4px (space-1)
Field → Field gap:          20px (space-5)
Form group → Form group:    32px (space-8)
```

### Navigation
```
Navbar height:              64px (desktop), 56px (mobile)
Navbar padding:             0 32px (desktop), 0 16px (mobile)
Navbar top offset:          16px (floating navbar — see note)
Nav item gap:               24px (desktop)
Nav item padding:           8px 16px
```

**Floating navbar note:** Per UI/UX Pro Max guidelines, use `top-4 left-4 right-4` for floating effect. Account for navbar height in content padding.

### Lists
```
List item padding:          12px 16px
List item gap:              0 (items touch, separated by 1px border)
List icon → text gap:       12px (space-3)
```

---

## Responsive Breakpoints

```css
/* Mobile first approach */
/* Default:   Mobile (< 640px) */
/* sm:        ≥ 640px  (large phones, small tablets) */
/* md:        ≥ 768px  (tablets) */
/* lg:        ≥ 1024px (laptops, desktops) */
/* xl:        ≥ 1280px (large desktops) */
/* 2xl:       ≥ 1536px (ultra-wide) */
```

### What Changes at Each Breakpoint

| Element | Mobile | Tablet (md) | Desktop (lg) |
|---------|--------|-------------|--------------|
| **Grid columns** | 4 | 8 | 12 |
| **Container padding** | 16px | 32px | 32px |
| **Section spacing** | 48px | 64px | 80-96px |
| **Card grid** | 1 column | 2 columns | 3 columns |
| **Navbar** | Hamburger + drawer | Full nav or hamburger | Full nav |
| **Hero heading** | 32px (H1 mobile) | 40px | 48px (H1 desktop) |
| **Body text** | 16px | 16px | 16px (never changes) |

---

## The Whitespace Manifesto

Specific areas where generous whitespace is non-negotiable:

1. **Above and below hero text:** At least 80px (desktop), 48px (mobile)
2. **Around blockquotes:** 32px vertical margin, 24px left padding
3. **Between feature cards:** 24px gap minimum
4. **Before CTAs:** 32px breathing room above any call-to-action
5. **Footer top margin:** 96px from last content section
6. **Image to caption:** 8px (tight — caption belongs to image)
7. **Between unrelated sections:** 96px (a full deep breath)

---

## Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm':  '640px',
      'md':  '768px',
      'lg':  '1024px',
      'xl':  '1280px',
      '2xl': '1536px',
    },
    extend: {
      maxWidth: {
        'content': '1200px',
        'wide':    '1320px',
        'prose':   '65ch',
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '30': '7.5rem',   // 120px
      },
      borderRadius: {
        'card':   '12px',
        'button': '8px',
        'input':  '8px',
        'badge':  '6px',
      }
    }
  }
}
```

---

## Layout Dos and Don'ts

| Do | Don't |
|----|-------|
| Use consistent spacing tokens from the scale | Use arbitrary values like 13px or 37px |
| Start mobile-first, expand for larger screens | Design desktop-first and squeeze for mobile |
| Give sections generous vertical breathing room | Cram sections together to reduce scroll length |
| Keep content within 1320px max-width | Let content span full width on ultra-wide screens |
| Use 65ch max-width for body text columns | Let text run 100+ characters per line |
| Keep card grids at 3 columns max on desktop | Use 4+ column card grids (too dense, too noisy) |
| Use floating navbar with top-4 spacing | Stick navbar flush to top-0 edge |
| Account for fixed navbar height in content offset | Let content hide behind fixed navigation |
| Use consistent gutter widths within a grid | Mix 16px and 32px gutters in the same grid |
| Ensure 44px minimum touch targets for all interactive elements | Make buttons or links smaller than 44×44px |
