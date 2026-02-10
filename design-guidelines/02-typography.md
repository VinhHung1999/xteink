# Typography System

> *"If the X4 brand had a voice in type, it would be: serif for soul, clean sans for clarity. The typography whispers. It invites. It does not demand."*
> — Soul of the Brand, Vibe & Aesthetic

---

## Soul Connection

Typography is the most direct expression of the brand paradox: **Old-Fashioned Yet Futuristic**. Books speak in serif. Modern interfaces speak in sans-serif. Xteink uses both — because it lives in both worlds.

The E-Ink / Paper style demands: high contrast, readability-first, matte visual feel, no decorative excess.

---

## The Type Pairing

### Primary Pairing: Cormorant Garamond + Be Vietnam Pro

This is the recommended pairing — chosen for soul alignment, Vietnamese language support, and web performance.

**Heading Font: Cormorant Garamond**
- **Category:** Serif
- **Why:** Designed specifically for reading on screens. Warm, not cold. Literary, not corporate. Has the feeling of a well-typeset book without being ornate.
- **Soul alignment:** "This is about *books*, and books speak in serif"
- **Vietnamese support:** Full Vietnamese diacritics (dấu) support
- **Weights used:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Fallback stack:** `'Cormorant Garamond', 'Source Serif 4', 'Lora', 'Georgia', serif`

**Body Font: Be Vietnam Pro**
- **Category:** Humanist Sans-Serif
- **Why:** Modern, friendly, not cold. Geometric enough to feel clean, humanist enough to feel warm. Excellent readability at small sizes.
- **Soul alignment:** "A humanist sans-serif — modern, friendly, not cold"
- **Vietnamese support:** Full Vietnamese diacritics support
- **Weights used:** 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Fallback stack:** `'Be Vietnam Pro', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif`

### Alternative Pairing: Source Serif 4 + Inter

For contexts requiring maximum readability (documentation, long-form, data-heavy):

- **Heading:** Source Serif 4 — professional, warm serif with excellent screen rendering
- **Body:** Inter — the gold standard for UI readability
- **When to use:** Admin dashboards, help center, technical documentation

### Accent Font: Caveat (Optional)

- **Category:** Handwritten
- **Usage:** ONLY for handwritten-feel accents — pull quotes, personal notes, annotations
- **Soul alignment:** "Handwritten margin notes in a book"
- **Rule:** Never for body text. Never for headings. Only for touches of human warmth.
- **Maximum:** 1-2 instances per page

---

## Google Fonts Import

```html
<!-- Primary Pairing -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">

<!-- Optional: Accent font -->
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
/* CSS Import alternative */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
```

**Performance note:** Use `font-display: swap` to prevent Flash of Invisible Text (FOIT). Paper White background makes FOUT less jarring than on pure white.

---

## Type Scale

Based on a **1.250 ratio (Major Third)** — gentle, not dramatic. The scale should feel like a quiet conversation, not a lecture.

| Level | Name | Size (Desktop) | Size (Mobile) | Weight | Font | Line Height | Letter Spacing |
|-------|------|---------------|---------------|--------|------|-------------|----------------|
| H1 | **Display** | 48px / 3rem | 32px / 2rem | 600 | Cormorant Garamond | 1.2 | -0.02em |
| H2 | **Title** | 36px / 2.25rem | 28px / 1.75rem | 600 | Cormorant Garamond | 1.25 | -0.015em |
| H3 | **Section** | 28px / 1.75rem | 24px / 1.5rem | 600 | Cormorant Garamond | 1.3 | -0.01em |
| H4 | **Subsection** | 22px / 1.375rem | 20px / 1.25rem | 500 | Cormorant Garamond | 1.35 | -0.005em |
| H5 | **Label** | 18px / 1.125rem | 16px / 1rem | 600 | Be Vietnam Pro | 1.4 | 0.01em |
| H6 | **Overline** | 14px / 0.875rem | 12px / 0.75rem | 600 | Be Vietnam Pro | 1.5 | 0.08em |
| — | **Body Large** | 18px / 1.125rem | 16px / 1rem | 400 | Be Vietnam Pro | 1.7 | 0 |
| — | **Body** | 16px / 1rem | 16px / 1rem | 400 | Be Vietnam Pro | 1.7 | 0 |
| — | **Body Small** | 14px / 0.875rem | 14px / 0.875rem | 400 | Be Vietnam Pro | 1.6 | 0.005em |
| — | **Caption** | 12px / 0.75rem | 12px / 0.75rem | 400 | Be Vietnam Pro | 1.5 | 0.01em |
| — | **Quote** | 24px / 1.5rem | 20px / 1.25rem | 400 italic | Cormorant Garamond | 1.5 | 0 |
| — | **Handwritten** | 20px / 1.25rem | 18px / 1.125rem | 400 | Caveat | 1.4 | 0 |

---

## Typography Rules

### Line Length (Measure)
- **Optimal:** 60-75 characters per line (including spaces)
- **Maximum:** 80 characters
- **Minimum:** 40 characters (mobile)
- **CSS:** `max-width: 65ch` for body text containers
- **Soul note:** The X4 screen shows fewer words per page, making each page feel fast. On web, control line length to create similar comfortable reading pace.

### Line Height
- **Body text:** 1.7 — generous, airy, room to breathe (like the whitespace between lines in a book)
- **Headings:** 1.2-1.35 — tighter, more compact (like a book title page)
- **Captions:** 1.5 — compact but legible

### Paragraph Spacing
- **Between paragraphs:** 1.5em (24px at body size)
- **After headings:** 0.75em
- **Before headings:** 2em (clear visual break, like a chapter heading)

### Letter Spacing
- **Headings:** Slightly negative (-0.01em to -0.02em) — creates warmth and intimacy
- **Body text:** Default (0) — natural, unhurried
- **Overlines/Labels:** Positive (0.08em) — small caps feel, structural
- **All caps:** Always add letter spacing (0.05em minimum) — prevents cramped feeling

---

## Text Color Application

| Context | Color | Font | Notes |
|---------|-------|------|-------|
| Primary heading | Charcoal `#2D2D2D` | Cormorant Garamond 600 | The most important words |
| Subheading | Charcoal `#2D2D2D` | Cormorant Garamond 500 | Supporting structure |
| Body text | Charcoal `#2D2D2D` | Be Vietnam Pro 400 | The reading voice |
| Secondary text | `#6B6560` | Be Vietnam Pro 400 | Metadata, dates, captions |
| Muted text | `#8A8480` | Be Vietnam Pro 400 | Helper text, placeholders |
| Link text | Warm Gold `#D4A574` | Be Vietnam Pro 500 | Underline on hover, not by default |
| Quote text | Charcoal `#2D2D2D` | Cormorant Garamond 400 italic | Set apart with left border |
| Overline | `#6B6560` | Be Vietnam Pro 600 uppercase | Labels above headings |
| CTA text | Charcoal `#2D2D2D` | Be Vietnam Pro 600 | On gold button background |
| Error text | Terracotta `#B85C5C` | Be Vietnam Pro 400 | Below form inputs |
| Price | Charcoal `#2D2D2D` | Cormorant Garamond 700 | Bold serif for price = premium feel |

---

## Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    fontFamily: {
      serif:    ['Cormorant Garamond', 'Source Serif 4', 'Lora', 'Georgia', 'serif'],
      sans:     ['Be Vietnam Pro', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      accent:   ['Caveat', 'cursive'],
    },
    fontSize: {
      'xs':     ['12px', { lineHeight: '1.5', letterSpacing: '0.01em' }],
      'sm':     ['14px', { lineHeight: '1.6', letterSpacing: '0.005em' }],
      'base':   ['16px', { lineHeight: '1.7', letterSpacing: '0' }],
      'lg':     ['18px', { lineHeight: '1.7', letterSpacing: '0' }],
      'xl':     ['22px', { lineHeight: '1.35', letterSpacing: '-0.005em' }],
      '2xl':    ['28px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      '3xl':    ['36px', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
      '4xl':    ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#2D2D2D',
            a: {
              color: '#D4A574',
              textDecoration: 'none',
              '&:hover': {
                color: '#B8864A',
                textDecoration: 'underline',
              },
            },
            h1: { fontFamily: 'Cormorant Garamond, serif' },
            h2: { fontFamily: 'Cormorant Garamond, serif' },
            h3: { fontFamily: 'Cormorant Garamond, serif' },
            h4: { fontFamily: 'Cormorant Garamond, serif' },
            blockquote: {
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              borderLeftColor: '#D4A574',
            },
          }
        }
      }
    }
  }
}
```

---

## Typography Dos and Don'ts

| Do | Don't |
|----|-------|
| Use Cormorant Garamond for headings, quotes, prices | Use Cormorant Garamond for UI buttons or small labels |
| Use Be Vietnam Pro for body text, UI elements, navigation | Use Be Vietnam Pro for display headings |
| Keep body text at 16px minimum | Go below 14px for any readable text |
| Use `max-width: 65ch` for text containers | Let text span full viewport width |
| Use negative letter-spacing for large headings | Use negative letter-spacing for body text |
| Use Caveat only for 1-2 handwritten accents per page | Use Caveat for navigation, buttons, or headings |
| Use italic Cormorant Garamond for quotes and emphasis | Use underline for emphasis (reserve for links) |
| Use uppercase Be Vietnam Pro with tracking for overlines | Use uppercase Cormorant Garamond (serif caps feel too formal) |
| Ensure `font-display: swap` is set | Allow invisible text during font load |
| Test Vietnamese diacritics (ă, ơ, ư, ễ) render correctly | Assume all fonts support Vietnamese |

---

## Vietnamese Typography Notes

Vietnamese requires careful font selection due to extensive diacritics (dấu). Both Cormorant Garamond and Be Vietnam Pro fully support:
- Tone marks: à, á, ả, ã, ạ
- Modified vowels: ă, â, ê, ô, ơ, ư
- Combined diacritics: ằ, ắ, ẳ, ẵ, ặ, etc.

**Testing checklist for Vietnamese:**
- [ ] Diacritics don't clip against line above
- [ ] Line height 1.7 provides enough vertical space for stacked diacritics
- [ ] Bold text with diacritics remains legible
- [ ] Italic Vietnamese text renders correctly
- [ ] Small size (14px) Vietnamese text is still readable with all diacritics
