# Motion & Interaction Design

> *"The X4 is a slow device in a fast world. E-Ink takes a moment to change. The page doesn't snap — it transitions. The buttons have resistance. Each page turn is a deliberate act."*
> — Soul of the Brand, Current 1: The Slow Movement

---

## Soul Connection

Motion in Xteink design mirrors the E-Ink screen itself: **deliberate, calm, with clear transitions**. No motion blur. No bouncy springs. No attention-grabbing animations. Every movement should feel like turning a page — a conscious, satisfying, unhurried act.

The brand lives in the **Slow Movement**. The design must respect this by treating motion as punctuation, not decoration.

---

## Motion Principles

### 1. Deliberate, Not Decorative
Every animation must serve a purpose: guide attention, confirm an action, or ease a transition. If an animation exists only to "look cool" → remove it.

### 2. Sharp, Not Blurred
E-Ink screens don't fade — they refresh with a distinct transition. Digital interfaces should mirror this: prefer opacity + transform over blur effects for transitions.

### 3. Warm, Not Mechanical
Avoid linear easing (feels robotic). Use ease-out for elements entering and ease-in for elements leaving. This creates a natural, organic feel — like an object settling into place.

### 4. Respect the User's Quiet
Always honor `prefers-reduced-motion`. Some users need stillness. The X4 itself is a stillness device.

---

## Timing Scale

| Token | Duration | Easing | Use Case |
|-------|----------|--------|----------|
| `instant` | 0ms | — | Immediate feedback (checkbox, radio) |
| `quick` | 100ms | ease-out | Micro-feedback (button press, focus ring) |
| `standard` | 200ms | ease-out | Default transitions (hover, color change) |
| `moderate` | 300ms | ease-out | Component transitions (accordion, tab switch) |
| `slow` | 400ms | ease-out | Layout transitions (drawer, modal enter) |
| `deliberate` | 500ms | ease-in-out | Page transitions, scroll-triggered reveals |

### Easing Functions

| Name | CSS Value | When to Use |
|------|-----------|-------------|
| **Enter** | `cubic-bezier(0.0, 0.0, 0.2, 1.0)` (ease-out) | Elements appearing, entering viewport |
| **Exit** | `cubic-bezier(0.4, 0.0, 1.0, 1.0)` (ease-in) | Elements disappearing, leaving viewport |
| **Standard** | `cubic-bezier(0.4, 0.0, 0.2, 1.0)` (ease-in-out) | Elements moving position, resizing |
| **Overshoot** | `cubic-bezier(0.34, 1.56, 0.64, 1.0)` | NEVER for Xteink — too playful, too bouncy |
| **Linear** | `linear` | ONLY for progress bars and loading spinners |

---

## Interaction Patterns

### Hover States

**Purpose:** Indicate interactivity. Provide warmth on engagement — like sunlight touching what you reach for.

| Element | Hover Effect | Duration | Easing |
|---------|-------------|----------|--------|
| **Button (primary)** | Background darkens to Deep Gold #B8864A + subtle shadow | 200ms | ease-out |
| **Button (secondary)** | Border shifts to Warm Gold, faint gold background | 200ms | ease-out |
| **Card** | translateY(-2px) + shadow increase | 200ms | ease-out |
| **Image in card** | scale(1.03) — image only, overflow hidden | 300ms | ease-out |
| **Link** | Color shifts to Deep Gold, underline appears | 150ms | ease-out |
| **Nav item** | Background rgba(212,165,116,0.08) | 150ms | ease-out |
| **Icon button** | Background rgba(45,45,45,0.06) | 150ms | ease-out |

**Critical rules:**
- **Never scale the card itself** — it shifts layout and disturbs neighboring elements
- **Only scale the image inside the card** — use `overflow: hidden` on container
- **Always add `cursor: pointer`** to hoverable/clickable elements
- **Hover effects should feel like warmth arriving**, not an element jumping

### Click/Press States

**Purpose:** Confirm the action was received. Like the click of the X4's physical button.

| Element | Press Effect | Duration |
|---------|-------------|----------|
| **Button** | translateY(1px) + slightly darker bg + no shadow | 100ms |
| **Card** | translateY(0) + shadow returns to resting | 100ms |
| **Icon button** | Background rgba(45,45,45,0.10) | 100ms |

### Focus States

**Purpose:** Accessibility. Show keyboard users where they are.

```css
/* Global focus style */
:focus-visible {
  outline: 2px solid #D4A574;
  outline-offset: 2px;
  border-radius: inherit;
}

/* Remove outline for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

---

## Page Transitions

### Scroll-Triggered Reveals

Content sections should gently reveal as the user scrolls — like pages being turned in a book. Not dramatic entrances. Gentle arrivals.

```css
/* Element starts slightly below and transparent */
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 500ms ease-out, transform 500ms ease-out;
}

/* When scrolled into view */
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Rules for scroll reveals:**
- Vertical translate only (16-24px) — never horizontal slide
- Stagger children by 80-100ms each (max 5 items, then all at once)
- Trigger when element is 20% visible in viewport
- **Each element reveals only once** — no re-animation on scroll back up
- Disable entirely when `prefers-reduced-motion: reduce`

### Page Load

```
Navbar:     Immediate (no animation)
Hero:       Fade in over 300ms, delay 100ms
Body:       Content fades in over 400ms, delay 200ms
Images:     Lazy load with fade-in 300ms on load complete
```

### Route Transition (if SPA)

```
Exit:       Opacity 1 → 0 over 200ms (ease-in)
Enter:      Opacity 0 → 1 over 300ms (ease-out), delay 100ms
```

No slide. No scale. Just a quiet fade — like closing one book and opening another.

---

## Component Animations

### Modal
```
Overlay enter:    opacity 0 → 1, 200ms ease-out
Modal enter:      scale(0.95) + opacity 0 → scale(1) + opacity 1, 250ms ease-out
Modal exit:       scale(1) + opacity 1 → scale(0.98) + opacity 0, 200ms ease-in
Overlay exit:     opacity 1 → 0, 200ms ease-in
```

### Drawer (Mobile Nav)
```
Overlay enter:    opacity 0 → 1, 200ms ease-out
Drawer enter:     translateX(-100%) → translateX(0), 300ms ease-out
Drawer exit:      translateX(0) → translateX(-100%), 250ms ease-in
Overlay exit:     opacity 1 → 0, 200ms ease-in
```

### Accordion/Expandable
```
Expand:           height 0 → auto, 300ms ease-out (use max-height or grid technique)
Content:          opacity 0 → 1, fade in after height animation starts (100ms delay)
Collapse:         opacity 1 → 0 (100ms), then height auto → 0 (200ms)
Icon rotation:    rotate(0) → rotate(180deg), 200ms ease-in-out
```

### Toast Notification
```
Enter:            translateY(16px) + opacity 0 → translateY(0) + opacity 1, 300ms ease-out
Idle:             5 seconds
Exit:             opacity 1 → 0, 200ms ease-in
```

### Skeleton Loading
```
Background:       linear-gradient shimmer
Animation:        translateX(-100%) → translateX(100%) on background-position
Duration:         1.5s
Easing:           ease-in-out
Iteration:        infinite (this is the ONE exception to "no continuous animation")
```

### Tooltip
```
Enter:            opacity 0 + translateY(4px) → opacity 1 + translateY(0), 150ms ease-out
Exit:             opacity 1 → 0, 100ms ease-in
Delay before show: 500ms (don't show immediately — reduce visual noise)
```

---

## The Magnetic Snap — Signature Interaction

The physical magnetic snap of the X4 to a phone is the brand's most recognizable sensory moment. If ever represented digitally (marketing page, tutorial, interactive demo):

```
Concept:    Two elements approaching each other, then snapping into alignment
Phase 1:    Elements move slowly toward each other (400ms, ease-in)
Phase 2:    At threshold distance, they "snap" quickly (100ms, ease-out)
Phase 3:    Subtle settle bounce (50ms, ease-out) — very subtle, 1-2px

Sound:      Optional subtle click sound (user-initiated only, never autoplay)
Haptic:     On mobile, trigger haptic feedback on snap (if supported)
```

---

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .reveal {
    opacity: 1;
    transform: none;
  }
}
```

**This is non-negotiable.** The brand is about giving users control. Respecting their motion preferences is a direct expression of the brand soul.

---

## Motion Dos and Don'ts

| Do | Don't |
|----|-------|
| Use ease-out for elements entering view | Use linear easing for UI transitions |
| Keep transitions 150-400ms | Use animations longer than 500ms (feels sluggish) |
| Use translateY for scroll reveals (small, 16-24px) | Use horizontal slides, rotations, or scale for content |
| Stagger list items by 80-100ms | Stagger more than 5 items (too slow) |
| Reveal elements once on scroll | Re-animate elements when user scrolls back up |
| Honor `prefers-reduced-motion: reduce` | Ignore accessibility motion preferences |
| Use skeleton shimmer for loading | Use spinners everywhere |
| Keep hover effects as color/shadow changes | Use scale transforms that shift layout |
| Animate the image inside the card container | Animate the card container itself with scale |
| Let the user initiate video/audio playback | Auto-play video or audio on page load |
| Use subtle micro-interactions (1-2px movement) | Use bouncy, springy, or elastic animations |
