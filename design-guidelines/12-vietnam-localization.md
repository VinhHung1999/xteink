# Vietnam Localization Guide

> *"A young person in Saigon, tired of scrolling all day, buys a tiny device for 1.5 triệu. Two weeks later, they feel like the person they always wanted to become."*
> — Soul of the Vietnam Soul

---

## Soul Connection

The universal brand soul takes on specific Vietnamese textures. This guide ensures that every design touchpoint for the Vietnam market feels **locally native** — not translated, but born here.

The target: a 22-year-old in HCMC. University student or recent graduate. 5-10 million VND/month. 5.9 hours/day on phone. BookTok list of 10 unread books. Tired of scrolling. Ready to become a reader.

---

## Vietnamese Typography

### Font Support

Both primary fonts (Cormorant Garamond + Be Vietnam Pro) fully support Vietnamese diacritics. Be Vietnam Pro was designed specifically for Vietnamese from the ground up. However, Vietnamese requires special attention:

**Diacritics coverage required:**
- Tone marks: à, á, ả, ã, ạ
- Modified vowels: ă, â, ê, ô, ơ, ư
- Combined: ằ, ắ, ẳ, ẵ, ặ, ầ, ấ, ẩ, ẫ, ậ, ồ, ố, ổ, ỗ, ộ, ờ, ớ, ở, ỡ, ợ, ừ, ứ, ử, ữ, ự, ề, ế, ể, ễ, ệ

### Line Height Adjustment

Vietnamese diacritics stack vertically (e.g., ễ has both a circumflex and a tilde). **Increase line height by 10%** for Vietnamese text:

```css
/* English default */
body { line-height: 1.7; }

/* Vietnamese override */
html[lang="vi"] body { line-height: 1.85; }
html[lang="vi"] h1,
html[lang="vi"] h2,
html[lang="vi"] h3 { line-height: 1.35; }
```

### Vietnamese-Specific Typography Rules

| Rule | Value | Reason |
|------|-------|--------|
| **Minimum body font size** | 16px (same as English) | Vietnamese diacritics need vertical clarity |
| **Minimum caption font size** | 13px (vs 12px English) | Small diacritics clip below 13px |
| **Line height (body)** | 1.85 (vs 1.7 English) | Stacked diacritics need breathing room |
| **Line height (headings)** | 1.35 (vs 1.2 English) | Prevent diacritic clipping on large text |
| **Paragraph spacing** | Same as English (1.5em) | Vietnamese text is denser — same spacing balances |
| **Letter spacing** | Default (0) for body | Vietnamese words are shorter — no need for tracking |

### Testing Checklist

Test these Vietnamese strings at all font sizes and weights:

```
"Rethink Reading — Đổi mới cách đọc sách"
"Xteink X4 — Máy đọc sách bỏ túi"
"Chào mừng bạn đến với sự yên lặng"
"Bạn không bán máy đọc sách. Bạn bán phiên bản tốt hơn của chính họ."
"Nhẹ hơn một bộ bài — Nặng chỉ 74g"
"Đọc ở mọi nơi, mọi lúc"
"Tham gia hội đọc sách"
```

Check for:
- [ ] Diacritics not clipping against line above
- [ ] Bold text with diacritics remains legible
- [ ] Italic Vietnamese renders correctly
- [ ] 13px caption text is readable with all diacritics
- [ ] No character overlap in headings

---

## Vietnamese Color & Visual Adaptations

The core palette stays the same. However, certain Vietnamese cultural associations enhance the design:

### Color Meaning in Vietnamese Context

| Color | Vietnamese Association | Design Application |
|-------|----------------------|-------------------|
| **Gold/Vàng** | Prosperity, fortune, warmth | Warm Gold accent works perfectly — aligns with both brand and cultural meaning |
| **Red/Đỏ** | Luck, celebration, Tết | Use ONLY for Tết seasonal campaigns — never for errors or urgency |
| **Green/Xanh lá** | Growth, nature, freshness | Sage green aligns — use for "reading streak" and progress features |
| **White/Trắng** | Purity, but also mourning | Paper White is fine (it's warm, not pure white) — avoid large pure white blocks |
| **Black/Đen** | Solemnity, authority | Charcoal is fine — it has warmth. Avoid aggressive black-heavy designs |

### Tết (Lunar New Year) Seasonal Palette

For Tết campaigns only — a limited-edition overlay:

```
Tết Red:          #C44040 (muted, not aggressive — soft terracotta-red)
Tết Gold:         #D4A574 (same as brand Warm Gold — no change needed)
Tết Background:   #FFF5F0 (warm blush — subtle, not overwhelming)
Tết Accent:       #8B6E4E (deep warm brown — plum blossom branches)
```

**Rule:** Tết elements should feel like the brand wearing a soft ao dai — not a complete costume change. Layer Tết touches over the existing brand, don't replace it.

---

## Vietnamese Copywriting Guide

### Tone Adaptation

The brand voice (Innocent Rebel) translates to Vietnamese as:

**Vietnamese voice characteristics:**
- **Nhẹ nhàng (gentle)** — not giật tít (clickbait) or quảng cáo (salesy)
- **Thân thiện (friendly)** — like talking to a close friend (bạn), not formal (quý khách)
- **Chân thực (authentic)** — acknowledge limitations honestly
- **Trẻ trung nhưng không trẻ con (youthful but not childish)** — no excessive slang or emoji spam

### Pronoun Usage

| Context | Pronoun | Notes |
|---------|---------|-------|
| **Brand → Customer (general)** | "bạn" | Friendly, age-neutral |
| **Brand → Customer (warm)** | "mình" (inclusive) | Creates intimacy, community feel |
| **Brand self-reference** | "mình" or "Xteink" | Never "chúng tôi" (too corporate) |
| **Community member → community** | "mọi người" or "anh chị em" | Family-like |
| **Never use** | "quý khách" | Too formal, too corporate, too cold |

### Key Phrases — Vietnamese Brand Vocabulary

| English | Vietnamese | Notes |
|---------|-----------|-------|
| "Rethink Reading" | "Đổi mới cách đọc sách" | Tagline — keep consistent |
| "Start reading" | "Bắt đầu đọc" | Primary CTA |
| "Your pocket-sized library" | "Thư viện bỏ túi của bạn" | Key benefit |
| "Join the quiet" | "Tham gia sự yên lặng" or "Tham gia hội đọc sách" | Community CTA |
| "Add to Bag" | "Thêm vào giỏ" | Cart action |
| "Free shipping" | "Miễn phí vận chuyển" | Trust badge |
| "Welcome to the quiet" | "Chào mừng bạn đến với sự yên lặng" | Welcome message |
| "Read anywhere, anytime" | "Đọc ở mọi nơi, mọi lúc" | Feature headline |
| "Permission to be quiet" | "Được phép yên lặng" | Brand soul phrase |
| "All this, for just 1.5 triệu" | "Tất cả chỉ với 1.5 triệu" | Price callout |
| "Thank you for choosing the quiet" | "Cảm ơn bạn đã chọn sự yên lặng" | Thank-you card |

### Price Display

**Always display Vietnamese prices in VND with triệu notation for amounts over 1 million:**

```
Correct:    1.590.000₫  or  1.59 triệu  or  ~1.5 triệu
Incorrect:  1590000 VND  or  $69 USD (not relatable)
```

For the X4: "1.5 triệu" is the magic number — use it in all casual copy. Use "1.590.000₫" for formal pricing.

### Vietnamese Error Messages

| Error | Vietnamese |
|-------|-----------|
| Invalid email | "Email chưa đúng — bạn kiểm tra lại nhé?" |
| Required field | "Mình cần thông tin này để tiếp tục" |
| Out of stock | "Hết hàng rồi — để lại email, mình sẽ báo khi có lại nhé" |
| Payment failed | "Thanh toán chưa thành công. Bạn thử lại hoặc dùng phương thức khác nhé." |
| 404 page | "Trang này không tồn tại. Mình đưa bạn về trang chủ nhé." |

---

## Vietnamese Social Media

### Platform Priority

| Platform | Priority | Audience | Content Type |
|----------|----------|----------|-------------|
| **TikTok** | #1 | 18-25, Gen Z | Short video: reading moments, unboxing, BookTok style |
| **Facebook** | #2 | 20-35, broader | Community building, reviews, long-form stories |
| **Zalo** | #3 | All ages | Customer service, community groups, direct messaging |
| **Instagram** | #4 | 18-28, aesthetic-focused | Lifestyle photos, Stories, Reels |
| **YouTube** | #5 | 20-35 | Tutorials, reviews, comparisons |

### Vietnamese TikTok/Reels Content

**BookTok format (most important):**
- Device in-hand, golden café light
- Show the magnetic snap (satisfying)
- Show the reading moment (peaceful)
- Trending audio with a "reading twist"
- Caption: short, bilingual is fine (Vietnamese + English slang)

**Template captions:**
```
"1.5 triệu thay đổi thói quen đọc sách 📖"
"Từ lướt phone → đọc sách. 2 tuần đó."
"Máy đọc sách nhỏ nhất thế giới? 74 gram thôi."
"POV: bạn đọc sách trên xe buýt thay vì lướt TikTok"
"Snap. Flip. Read. ✨"
```

### Zalo Community Guidelines

The Zalo group is the Vietnamese equivalent of Reddit community. It should feel like a **hội đọc sách** (reading club), not a customer support channel.

**Group rules (tone: warm, inviting):**
```
1. Đây là hội đọc sách, không phải nhóm bán hàng
2. Chia sẻ sách hay, ảnh đọc sách, tips sử dụng X4
3. Hỏi gì cũng được — cộng đồng sẽ giúp
4. Tôn trọng mọi người — mỗi người đọc ở tốc độ riêng
5. Có lỗi? Báo admin — mình sẽ hỗ trợ trong 30 phút
```

**Weekly content calendar for Zalo group:**

| Day | Content |
|-----|---------|
| Monday | "Tuần này bạn đọc gì?" — Reading share thread |
| Wednesday | Tip / Tutorial (firmware, formatting, book sources) |
| Friday | "Ảnh đọc sách đẹp nhất tuần" — Community photo feature |
| Sunday | Book recommendation — one book, why it matters |

---

## Vietnamese-Specific Design Elements

### Café Aesthetic

Vietnamese café culture is the most powerful visual context for the brand. Design should incorporate:

- **Cà phê sữa đá** (iced milk coffee) — the iconic Vietnamese drink
- **Phin filter** — traditional coffee drip filter
- **Wooden/formica tables** — not polished marble
- **Plastic stools** — real Vietnamese café life, not aspirational
- **Hanging plants** — common in Saigon cafés
- **Sidewalk setting** — outdoor café culture is default

### Gift-Giving Occasions

Design seasonal promotions around Vietnamese gift-giving moments:

| Occasion | Timing | Gift Message | Visual Treatment |
|----------|--------|--------------|-----------------|
| **Tết** | Jan-Feb | "Tặng sách, tặng tri thức" | Tết palette overlay, soft plum blossom accents |
| **Teacher's Day (20/11)** | November | "Tri ân thầy cô — món quà ý nghĩa" | Warm, respectful tone |
| **Women's Day (8/3)** | March | "Dành cho người phụ nữ yêu sách" | Dusty Rose palette emphasis |
| **Back to School (Sep)** | August-September | "Năm học mới, thói quen đọc sách mới" | Sage green, fresh energy |
| **Valentine's Day (14/2)** | February | "Tặng người ấy quyển sách đầu tiên" | Warm Gold + Dusty Rose |
| **Birthday** | Year-round | "Sinh nhật vui — bắt đầu đọc nào" | Standard brand palette |

---

## Vietnamese UX Considerations

### Mobile-First is Non-Negotiable

Vietnamese internet users are overwhelmingly mobile:
- 79.8 million internet users
- 95%+ access via smartphone
- Design must be excellent at 360-414px width (common Vietnamese phone sizes)

### Payment Methods

Design checkout to support Vietnamese payment methods prominently:

| Method | Priority | Icon/Logo |
|--------|----------|-----------|
| **MoMo** | #1 | Pink MoMo logo |
| **ZaloPay** | #2 | Blue ZaloPay logo |
| **VNPay** | #3 | VNPay QR |
| **Bank transfer** | #4 | Bank icon |
| **COD (Cash on Delivery)** | #5 | Truck + cash icon |
| **Credit/Debit card** | #6 | Visa/Mastercard |

**Note:** COD (thanh toán khi nhận hàng) is still significant in Vietnam. Always offer it as an option.

### Shipping Display

Vietnamese users expect:
- **Free shipping threshold** clearly displayed
- **Delivery time** in days (e.g., "Giao trong 2-3 ngày nội thành HCM")
- **Tracking via Zalo** (preferred over email)
- **GHTK / GHN / Viettel Post** logos for trust

### Trust Signals (Vietnamese-specific)

```
"Miễn phí giao hàng nội thành HCM"      (Free shipping HCMC)
"Đổi trả trong 7 ngày"                   (7-day return)
"Hỗ trợ qua Zalo 24/7"                   (Zalo support 24/7)
"Đã bán [X] máy cho bạn đọc Việt Nam"    (Sold X units to Vietnamese readers)
"Cộng đồng [X]+ người đọc"               (Community of X+ readers)
```

---

## Localization Checklist

Before launching any design for the Vietnam market:

- [ ] All text in Vietnamese (no English-only critical paths)
- [ ] Prices displayed in VND (₫) and/or "triệu" notation
- [ ] Vietnamese diacritics render correctly at all sizes
- [ ] Line height increased for Vietnamese text (1.85 body, 1.35 heading)
- [ ] Minimum 13px for smallest Vietnamese text
- [ ] Vietnamese payment methods displayed and functional
- [ ] Zalo support link/button visible
- [ ] Vietnamese community group link included
- [ ] Shipping times displayed for Vietnamese cities
- [ ] Quick-start guide in Vietnamese included (physical or digital)
- [ ] Photography includes Vietnamese settings (café, bus, apartment)
- [ ] Seasonal content planned for Vietnamese calendar (Tết, 20/11, etc.)
- [ ] Pronoun usage checked: "bạn" / "mình", never "quý khách"
- [ ] Brand voice is nhẹ nhàng (gentle), not giật tít (clickbait)
- [ ] Mobile experience tested on common Vietnamese phone sizes (360-414px)
