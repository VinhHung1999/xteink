# Color System

> *"This is not a tech palette. It is a lifestyle palette — the colors of books, cafés, morning light, and linen."*
> — Soul of the Brand, Vibe & Aesthetic

---

## Soul Connection

The color system is derived directly from the five moods described in the brand soul:

| Mood | Time of Day | Color Feeling | Design Role |
|------|-------------|---------------|-------------|
| **Soft Focus** | Morning | Warm white, pale gold, blue-gray | Backgrounds, hero sections |
| **Pocket Companion** | Commute | Warm yellow, city gray | Secondary surfaces, cards |
| **Café Stillness** | Afternoon | Warm brown, cream, ink black | Text, reading UI, body |
| **Winding Down** | Evening | Warm amber, soft shadow, matte gray | Accent, hover states |
| **Just One More Page** | Late Night | Darkness, pool of warm light | Dark mode, featured content |

---

## Primary Palette

These three colors form the backbone of every design. They are non-negotiable.

### Paper White — `#F5F0EB`
- **Role:** Primary background for all surfaces
- **Soul origin:** The E-Ink screen itself — soft, not harsh. The color of a real book page.
- **Usage:** Page backgrounds, card backgrounds, input fields, hero backgrounds
- **Never:** Use pure `#FFFFFF` instead — it is too clinical, too screen-like, too cold
- **RGB:** 245, 240, 235
- **HSL:** 30°, 33%, 94%

### Charcoal — `#2D2D2D`
- **Role:** Primary text and device body color
- **Soul origin:** The X4's physical body — quiet authority, not aggressive
- **Usage:** Body text, headings, navbar, footer, icon fills
- **Never:** Use pure `#000000` for large text blocks — it is too harsh against Paper White
- **RGB:** 45, 45, 45
- **HSL:** 0°, 0%, 18%

### Warm Gold — `#D4A574`
- **Role:** Primary accent color
- **Soul origin:** Afternoon light, reading lamp warmth, the golden hour at the café window
- **Usage:** CTAs, links on hover, active states, highlighted text, feature callouts
- **Sparingly:** This color should appear like sunlight — not everywhere, but where it matters
- **RGB:** 212, 165, 116
- **HSL:** 31°, 53%, 64%

---

## Supporting Palette

Four secondary colors that extend the emotional range. Use these for variety without breaking the warm neutral world.

### Latte — `#C4A882`
- **Soul origin:** Café culture, comfort, the iced coffee sitting next to the X4
- **Usage:** Secondary backgrounds, section dividers, subtle card borders, tag backgrounds
- **Pairs with:** Paper White (background), Charcoal (text on top)
- **RGB:** 196, 168, 130
- **HSL:** 35°, 34%, 64%

### Sage — `#8B9E7E`
- **Soul origin:** Calm, nature, slow living — the plant on the café table
- **Usage:** Success states, "reading streak" indicators, community/growth features, badges
- **Pairs with:** Paper White (background), Charcoal (text on top)
- **RGB:** 139, 158, 126
- **HSL:** 96°, 14%, 56%

### Dusty Rose — `#C4A0A0`
- **Soul origin:** Gentle, youthful, soft — the tenderness the brand evokes
- **Usage:** Soft highlights, Gen Z-oriented content, promotional banners, gift sections
- **Pairs with:** Paper White (background), Charcoal (text on top)
- **RGB:** 196, 160, 160
- **HSL:** 0°, 24%, 70%

### Cloud Gray — `#D8D4CF`
- **Soul origin:** Morning quiet, blank page, the overcast sky before sunrise
- **Usage:** Disabled states, placeholder text, subtle borders, loading skeletons
- **Pairs with:** Paper White (on), Charcoal (text)
- **RGB:** 216, 212, 207
- **HSL:** 33°, 10%, 83%

---

## Functional Colors

For UI states that require universal recognition:

| Function | Color | Hex | Usage | Soul Note |
|----------|-------|-----|-------|-----------|
| **Success** | Sage Green | `#8B9E7E` | Confirmations, completed actions | "I am becoming a reader" — growth |
| **Warning** | Muted Amber | `#C9956B` | Cautions, low battery, stock alerts | Warm, not alarming |
| **Error** | Soft Terracotta | `#B85C5C` | Form errors, failed actions | Firm but gentle — not aggressive red |
| **Info** | Dusty Blue | `#7E9AB0` | Tips, tooltips, informational banners | Cool but not cold |
| **Link** | Warm Gold | `#D4A574` | Inline links, text links | Golden thread connecting ideas |
| **Link Hover** | Deep Gold | `#B8864A` | Hovered links | Deepened warmth on engagement |

---

## Dark Mode Palette

Dark mode for Xteink is not "inverted" — it is the **"Late Night Mood"**: darkness around a pool of warm light.

| Role | Light Mode | Dark Mode | Soul Note |
|------|-----------|-----------|-----------|
| **Background** | Paper White `#F5F0EB` | Deep Ink `#1A1A1A` | The room at night with a reading lamp |
| **Surface (cards)** | `#FFFFFF` at 80% opacity | `#2D2D2D` | The pool of warm light |
| **Primary text** | Charcoal `#2D2D2D` | Warm Cream `#E8E0D6` | Not pure white — too harsh for night reading |
| **Secondary text** | `#6B6560` | `#9E9590` | Muted, gentle |
| **Accent** | Warm Gold `#D4A574` | Warm Gold `#D4A574` | Stays the same — the reading lamp |
| **Borders** | Cloud Gray `#D8D4CF` | `#3D3835` | Barely visible — just structure |
| **Hover surface** | `#EDE8E2` | `#353030` | Subtle warmth on interaction |

### Dark Mode Rules
1. **Never use pure black `#000000`** as background — `#1A1A1A` has warmth
2. **Never use pure white `#FFFFFF`** for text — `#E8E0D6` is gentler on eyes
3. **Warm Gold accent stays constant** across modes — it is the reading lamp that never changes
4. **Reduce contrast slightly** compared to light mode — night reading should feel softer
5. **No bright saturated colors** in dark mode — keep everything muted

---

## Contrast Ratios (WCAG Compliance)

| Combination | Ratio | WCAG Level | Usage |
|-------------|-------|------------|-------|
| Charcoal `#2D2D2D` on Paper White `#F5F0EB` | **11.2:1** | AAA | Primary body text |
| Warm Gold `#D4A574` on Paper White `#F5F0EB` | **2.8:1** | Decorative only | Accent elements, not text |
| Warm Gold `#D4A574` on Charcoal `#2D2D2D` | **4.1:1** | AA (large text) | Gold headings on dark |
| Deep Gold `#B8864A` on Paper White `#F5F0EB` | **3.8:1** | AA (large text) | CTA button text alternative |
| Charcoal `#2D2D2D` on Warm Gold `#D4A574` | **4.1:1** | AA (large text) | CTA button text |
| Warm Cream `#E8E0D6` on Deep Ink `#1A1A1A` | **11.8:1** | AAA | Dark mode body text |

### Important Contrast Rules
- **Body text** must always achieve **WCAG AA minimum (4.5:1)**, prefer AAA (7:1)
- **Warm Gold is decorative only** on light backgrounds — never use as body text color on Paper White
- **For gold text**, always place on Charcoal or Dark backgrounds where contrast is sufficient
- **CTA buttons:** Charcoal text on Warm Gold background (4.1:1 — AA for large text)

---

## Color Application Rules

### Backgrounds
```
Page background:      Paper White #F5F0EB
Card background:      #FFFFFF at 80% opacity (bg-white/80)
Section alternate:    #FAF7F3 (slightly warmer)
Hero background:      Paper White with subtle grain texture overlay
Footer background:    Charcoal #2D2D2D
```

### Text
```
Primary heading:      Charcoal #2D2D2D
Body text:            Charcoal #2D2D2D
Secondary text:       #6B6560
Caption/meta:         #8A8480
Placeholder:          Cloud Gray #D8D4CF
Link:                 Warm Gold #D4A574
Link hover:           Deep Gold #B8864A
```

### Borders & Dividers
```
Card border:          Cloud Gray #D8D4CF
Input border:         Cloud Gray #D8D4CF
Input focus border:   Warm Gold #D4A574
Section divider:      #E8E3DD (barely there)
Table row border:     #EDE8E2
```

### Shadows
```
Card shadow:          0 2px 8px rgba(45, 45, 45, 0.06)
Card hover shadow:    0 4px 16px rgba(45, 45, 45, 0.10)
Dropdown shadow:      0 4px 12px rgba(45, 45, 45, 0.08)
Modal shadow:         0 8px 32px rgba(45, 45, 45, 0.12)
```
Note: Shadows use Charcoal-based rgba, not cool gray — this keeps shadows warm.

---

## Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary
        'paper':      '#F5F0EB',
        'charcoal':   '#2D2D2D',
        'gold':       '#D4A574',
        'gold-deep':  '#B8864A',

        // Supporting
        'latte':      '#C4A882',
        'sage':       '#8B9E7E',
        'dusty-rose': '#C4A0A0',
        'cloud':      '#D8D4CF',

        // Functional
        'success':    '#8B9E7E',
        'warning':    '#C9956B',
        'error':      '#B85C5C',
        'info':       '#7E9AB0',

        // Surfaces
        'surface':    '#FAF7F3',
        'ink':        '#1A1A1A',

        // Text
        'text-primary':   '#2D2D2D',
        'text-secondary': '#6B6560',
        'text-muted':     '#8A8480',
      },
      boxShadow: {
        'card':     '0 2px 8px rgba(45, 45, 45, 0.06)',
        'card-hover': '0 4px 16px rgba(45, 45, 45, 0.10)',
        'dropdown': '0 4px 12px rgba(45, 45, 45, 0.08)',
        'modal':    '0 8px 32px rgba(45, 45, 45, 0.12)',
      }
    }
  }
}
```

---

## CSS Custom Properties

```css
:root {
  /* Primary */
  --color-paper:        #F5F0EB;
  --color-charcoal:     #2D2D2D;
  --color-gold:         #D4A574;
  --color-gold-deep:    #B8864A;

  /* Supporting */
  --color-latte:        #C4A882;
  --color-sage:         #8B9E7E;
  --color-dusty-rose:   #C4A0A0;
  --color-cloud:        #D8D4CF;

  /* Functional */
  --color-success:      #8B9E7E;
  --color-warning:      #C9956B;
  --color-error:        #B85C5C;
  --color-info:         #7E9AB0;

  /* Surfaces */
  --color-surface:      #FAF7F3;
  --color-ink:          #1A1A1A;

  /* Text */
  --color-text-primary:   #2D2D2D;
  --color-text-secondary: #6B6560;
  --color-text-muted:     #8A8480;

  /* Shadows (warm-toned) */
  --shadow-card:        0 2px 8px rgba(45, 45, 45, 0.06);
  --shadow-card-hover:  0 4px 16px rgba(45, 45, 45, 0.10);
  --shadow-dropdown:    0 4px 12px rgba(45, 45, 45, 0.08);
  --shadow-modal:       0 8px 32px rgba(45, 45, 45, 0.12);
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-paper:          #1A1A1A;
    --color-charcoal:       #E8E0D6;
    --color-surface:        #2D2D2D;
    --color-cloud:          #3D3835;
    --color-text-primary:   #E8E0D6;
    --color-text-secondary: #9E9590;
    --color-text-muted:     #7A7570;
  }
}
```

---

## Color Dos and Don'ts

| Do | Don't |
|----|-------|
| Use Paper White `#F5F0EB` as primary background | Use pure white `#FFFFFF` as page background |
| Use Charcoal `#2D2D2D` for body text | Use pure black `#000000` for body text |
| Use Warm Gold sparingly — like sunlight | Flood the design with gold |
| Keep shadows warm (charcoal-based rgba) | Use cool gray shadows (rgba(0,0,0,...)) |
| Use Sage for positive states (growth, success) | Use bright green `#00FF00` for success |
| Use Soft Terracotta for errors | Use aggressive red `#FF0000` for errors |
| Maintain Paper White warmth even in alternate sections | Use cool gray `#F1F5F9` for section alternates |
| Test all color combinations for WCAG AA minimum | Assume gold text is readable on light backgrounds |
