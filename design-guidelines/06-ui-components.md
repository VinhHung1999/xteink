# UI Components

> *"Simple Yet Deep — Easy to start. Infinite to master. The X4 gives you a floor you can stand on immediately, and a ceiling you may never reach."*
> — Soul of the Brand, Paradox 3

---

## Soul Connection

Every UI component should embody the brand paradox: **simple on the surface, rich underneath**. A button is just a button — until you hover and feel the warm gold rise like afternoon light. A card is just a card — until the content inside transforms how you see yourself.

Components should feel like they belong in a well-designed book — functional, beautiful, never calling attention to themselves.

---

## Design Tokens Reference

Before defining components, reference these tokens from previous guidelines:

```
Colors:     See 01-color-system.md
Typography: See 02-typography.md
Spacing:    See 05-layout-and-spacing.md
Icons:      See 04-iconography.md
```

---

## Buttons

### Primary Button (CTA)
The quiet invitation. Not "BUY NOW" — more "Begin your story."

```
Background:       Warm Gold #D4A574
Text:             Charcoal #2D2D2D
Font:             Be Vietnam Pro 600 (SemiBold)
Font size:        16px
Padding:          12px 24px
Border-radius:    8px
Min-height:       44px
Cursor:           pointer
Transition:       background-color 200ms ease-out, box-shadow 200ms ease-out

Hover:
  Background:     Deep Gold #B8864A
  Shadow:         0 2px 8px rgba(184, 134, 74, 0.3)

Active/Pressed:
  Background:     #A67840
  Shadow:         none
  Transform:      translateY(1px)

Disabled:
  Background:     Cloud Gray #D8D4CF
  Text:           #8A8480
  Cursor:         not-allowed
  Opacity:        0.7

Focus-visible:
  Outline:        2px solid Warm Gold #D4A574
  Outline-offset: 2px
```

### Secondary Button
For secondary actions — less prominent, but still warm.

```
Background:       transparent
Border:           1.5px solid Cloud Gray #D8D4CF
Text:             Charcoal #2D2D2D
Font:             Be Vietnam Pro 500
Padding:          12px 24px
Border-radius:    8px

Hover:
  Border-color:   Warm Gold #D4A574
  Background:     rgba(212, 165, 116, 0.06)

Active:
  Background:     rgba(212, 165, 116, 0.12)
```

### Ghost Button
For tertiary actions or within content areas.

```
Background:       transparent
Border:           none
Text:             Warm Gold #D4A574
Font:             Be Vietnam Pro 500
Padding:          8px 16px

Hover:
  Background:     rgba(212, 165, 116, 0.08)
  Text:           Deep Gold #B8864A
```

### Icon Button
For icon-only actions (close, menu, settings).

```
Background:       transparent
Size:             40px × 40px (44px touch target with padding)
Icon size:        20px
Icon color:       Charcoal #2D2D2D
Border-radius:    8px
Cursor:           pointer

Hover:
  Background:     rgba(45, 45, 45, 0.06)

Active:
  Background:     rgba(45, 45, 45, 0.10)

Accessibility:
  aria-label:     REQUIRED — describe the action
```

### Button Sizes

| Size | Padding | Font Size | Min Height | Use Case |
|------|---------|-----------|------------|----------|
| **Small** | 8px 16px | 14px | 36px | Inline actions, card actions |
| **Default** | 12px 24px | 16px | 44px | Primary CTAs, forms |
| **Large** | 16px 32px | 18px | 52px | Hero CTAs, standalone actions |

---

## Cards

### Product Card
The primary container for showcasing the X4 and accessories.

```
Background:       #FFFFFF at 80% opacity
Border:           1px solid #EDE8E2
Border-radius:    12px
Padding:          0 (image flush to edges, content padded)
Shadow:           var(--shadow-card)
Overflow:         hidden
Cursor:           pointer
Transition:       box-shadow 200ms ease-out, transform 200ms ease-out

Inner structure:
  Image container: aspect-ratio 4/3, overflow hidden
  Content area:    padding 20px
  Title:           Cormorant Garamond 500, 18px, Charcoal
  Description:     Be Vietnam Pro 400, 14px, #6B6560
  Price:           Cormorant Garamond 700, 20px, Charcoal
  CTA:             Ghost button or text link

Hover:
  Shadow:         var(--shadow-card-hover)
  Transform:      translateY(-2px)
  Image:          scale(1.03) over 300ms — subtle zoom

Image hover note:
  Scale the IMAGE inside the card, not the card itself.
  This prevents layout shift while adding visual interest.
```

### Content Card
For blog posts, reading recommendations, community content.

```
Background:       Paper White #F5F0EB or white/80
Border:           1px solid #EDE8E2
Border-radius:    12px
Padding:          24px
Shadow:           none (flat) or var(--shadow-card) (elevated)

Inner structure:
  Overline:       Be Vietnam Pro 600 uppercase, 12px, #8A8480, tracking 0.08em
  Title:          Cormorant Garamond 600, 22px, Charcoal
  Excerpt:        Be Vietnam Pro 400, 16px, #6B6560, max 3 lines
  Meta:           Be Vietnam Pro 400, 14px, #8A8480 (date, read time)
```

### Feature Card
For highlighting product features and soul-level benefits.

```
Background:       Paper White #F5F0EB
Border:           none
Border-radius:    12px
Padding:          32px
Text-align:       left (never center — center feels cold)

Inner structure:
  Icon:           24px Lucide icon, Warm Gold #D4A574
  Title:          Cormorant Garamond 600, 20px, Charcoal
  Description:    Be Vietnam Pro 400, 16px, #6B6560
  Gap:            icon → title: 16px, title → description: 8px
```

### Testimonial Card
For user quotes — the "love letters" people write about the X4.

```
Background:       white
Border:           none
Border-left:      3px solid Warm Gold #D4A574
Border-radius:    0 12px 12px 0
Padding:          24px 24px 24px 28px
Shadow:           var(--shadow-card)

Inner structure:
  Quote:          Cormorant Garamond 400 italic, 18px, Charcoal, line-height 1.6
  Attribution:    Be Vietnam Pro 500, 14px, #6B6560
  Source:         Be Vietnam Pro 400, 12px, #8A8480 (e.g., "Reddit r/eink")
```

---

## Navigation

### Desktop Navbar (Floating)

```
Position:         fixed
Top:              16px
Left:             16px
Right:            16px
Height:           64px
Background:       rgba(255, 255, 255, 0.85)
Backdrop-filter:  blur(12px)
Border:           1px solid rgba(237, 232, 226, 0.6)
Border-radius:    12px
Padding:          0 32px
Shadow:           0 2px 12px rgba(45, 45, 45, 0.06)
Z-index:          50

Logo:             Left-aligned
Nav links:        Center or right, Be Vietnam Pro 500, 16px
Active link:      Warm Gold #D4A574
CTA button:       Right-aligned, Primary Button (small)
```

### Mobile Navbar

```
Position:         fixed
Top:              0 (flush on mobile — saves space)
Left:             0
Right:            0
Height:           56px
Background:       rgba(255, 255, 255, 0.90)
Backdrop-filter:  blur(12px)

Left:             Menu hamburger icon (20px)
Center:           Logo
Right:            Cart icon (20px)
```

### Mobile Drawer

```
Position:         fixed, full screen overlay
Background overlay: rgba(26, 26, 26, 0.4)
Drawer:           slide from left, width 80% max 320px
Background:       Paper White #F5F0EB
Padding:          24px
Animation:        slide-in 250ms ease-out

Nav items:        Be Vietnam Pro 500, 18px, padding 16px 0
Active item:      Warm Gold #D4A574, left border 3px
Close button:     Top-right, X icon
```

---

## Forms

### Text Input

```
Height:           44px
Padding:          12px 16px
Background:       white
Border:           1.5px solid Cloud Gray #D8D4CF
Border-radius:    8px
Font:             Be Vietnam Pro 400, 16px
Color:            Charcoal #2D2D2D
Transition:       border-color 200ms ease-out, box-shadow 200ms ease-out

Placeholder:
  Color:          #8A8480
  Font-style:     normal (not italic)

Focus:
  Border-color:   Warm Gold #D4A574
  Shadow:         0 0 0 3px rgba(212, 165, 116, 0.15)
  Outline:        none

Error:
  Border-color:   Terracotta #B85C5C
  Shadow:         0 0 0 3px rgba(184, 92, 92, 0.10)

Error message:
  Color:          #B85C5C
  Font:           Be Vietnam Pro 400, 14px
  Margin-top:     4px
  Role:           alert (for screen readers)

Disabled:
  Background:     #F5F2EF
  Border-color:   #E8E3DD
  Color:          #8A8480
  Cursor:         not-allowed
```

### Label

```
Font:             Be Vietnam Pro 500, 14px
Color:            Charcoal #2D2D2D
Margin-bottom:    6px
```

### Select / Dropdown

```
Same as text input, plus:
Right icon:       ChevronDown (16px), #8A8480
Dropdown menu:    Shadow var(--shadow-dropdown), border-radius 8px
Option hover:     Background rgba(212, 165, 116, 0.08)
Selected option:  Warm Gold color, check icon
```

### Checkbox / Radio

```
Size:             20px × 20px
Border:           1.5px solid Cloud Gray #D8D4CF
Border-radius:    4px (checkbox) / 50% (radio)
Transition:       all 150ms ease-out

Checked:
  Background:     Warm Gold #D4A574
  Border-color:   Warm Gold #D4A574
  Check mark:     white, 2px stroke

Focus-visible:
  Outline:        2px solid Warm Gold
  Outline-offset: 2px
```

---

## Badges & Tags

```
Padding:          4px 10px
Font:             Be Vietnam Pro 500, 12px
Border-radius:    6px
Text-transform:   none (natural case)

Variants:
  Default:        bg #F5F2EF, text #6B6560
  Gold:           bg rgba(212,165,116,0.15), text #B8864A
  Sage:           bg rgba(139,158,126,0.15), text #6B8460
  Rose:           bg rgba(196,160,160,0.15), text #9E6B6B
```

---

## Dividers

```
Horizontal rule:
  Height:         1px
  Background:     #EDE8E2
  Margin:         32px 0

Section divider:
  Height:         1px
  Background:     linear-gradient(to right, transparent, #D8D4CF, transparent)
  Margin:         64px 0
  Max-width:      200px
  Margin-inline:  auto
```

---

## Toast / Notification

```
Position:         bottom-right (desktop), bottom-center (mobile)
Background:       Charcoal #2D2D2D
Text:             Warm Cream #E8E0D6
Font:             Be Vietnam Pro 400, 14px
Padding:          12px 20px
Border-radius:    8px
Shadow:           var(--shadow-modal)
Max-width:        400px
Animation:        slide-up + fade-in 250ms ease-out
Auto-dismiss:     5 seconds
Close button:     X icon, #8A8480 → #E8E0D6 on hover

Variants:
  Success:        Left border 3px Sage #8B9E7E
  Error:          Left border 3px Terracotta #B85C5C
  Info:           Left border 3px Dusty Blue #7E9AB0
```

---

## Modal / Dialog

```
Overlay:          rgba(26, 26, 26, 0.4), backdrop-filter blur(4px)
Modal container:
  Background:     white
  Border-radius:  16px
  Padding:        32px
  Shadow:         var(--shadow-modal)
  Max-width:      520px
  Width:          90% (mobile)
  Animation:      scale(0.95) → scale(1) + fade-in 200ms ease-out

Header:           Cormorant Garamond 600, 22px, Charcoal
Close:            Icon button, top-right, inside padding
Body:             Be Vietnam Pro 400, 16px
Footer:           Right-aligned buttons, 12px gap
```

---

## Loading States

### Skeleton Screen
Preferred over spinners — matches the E-Ink / Paper aesthetic.

```
Background:       linear-gradient(90deg, #EDE8E2 25%, #F5F0EB 50%, #EDE8E2 75%)
Background-size:  200% 100%
Animation:        shimmer 1.5s ease-in-out infinite
Border-radius:    match the element being loaded

Text skeleton:    height 16px, width 80% / 60% / 90% (varied)
Image skeleton:   aspect-ratio matching final image
Card skeleton:    full card shape with inner text blocks
```

### Spinner
Only when skeleton doesn't make sense (e.g., form submission).

```
Size:             24px
Stroke:           2px
Color:            Warm Gold #D4A574
Animation:        rotate 1s linear infinite
```

---

## Component Dos and Don'ts

| Do | Don't |
|----|-------|
| Use warm gold for primary CTAs | Use red, bright blue, or neon for CTAs |
| Keep card hover effects subtle (2px translateY) | Use scale transforms that shift layout |
| Add `cursor-pointer` to all clickable elements | Leave default cursor on interactive elements |
| Use skeleton screens for loading content | Show blank white space while loading |
| Use `aria-label` on icon-only buttons | Leave icon buttons without accessibility labels |
| Keep modal overlays warm-toned | Use pure black `rgba(0,0,0,0.5)` overlays |
| Make all interactive elements 44px min touch target | Create tiny buttons or links |
| Use `transition-colors duration-200` for hover states | Use instant state changes |
| Use backdrop-blur for floating navbar | Use opaque solid-color navbar |
| Respect `prefers-reduced-motion` for all animations | Ignore accessibility motion preferences |
