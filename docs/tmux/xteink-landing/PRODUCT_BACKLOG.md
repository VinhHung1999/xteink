# Product Backlog

**Owner:** PO (Product Owner)
**Last Updated:** 2026-02-12

---

## Backlog Overview

| Sprint | Goal | Stories | Status |
|--------|------|---------|--------|
| 1 | Mock API + Dark theme + Fonts + Responsive | S1.1–S1.4 | ✅ Done |
| 2 | Content hoàn thiện + "Snap Flip Read" + X3 product | S2.1–S2.4 | ✅ Done |
| 3 | Purchase flow + FAQ + Social proof | S3.1–S3.4 | ✅ Done |
| 4 (BE) | BE Foundation + Content APIs | BE1.1–BE1.5 | ✅ Done |
| 5 (BE) | Order + Payment Integration | BE2.1–BE2.4 | Planned |
| 6 (FE) | Subpages: About + Guides | S4.1–S4.3 | Planned |
| 7 (FE) | Library preview + Search/Filter | S5.1–S5.3 | Planned |
| 8 (FE) | Animations + Performance + SEO | S6.1–S6.4 | Planned |
| 9 | Engagement + Growth | S7.1–S7.3 | Planned |

---

## Sprint 1: Mock API + Dark Theme + Fonts + Responsive ✅ DONE

**Sprint Goal:** Mock API layer, dark warm theme, font system, responsive polish.

| ID | Story | Size | Status | Notes |
|----|-------|------|--------|-------|
| S1.1 | Mock API Layer Setup | M | ✅ Done | services/types/mock |
| S1.2 | Navbar Liquid Glass | L | ❌ Reverted | Boss rejected |
| S1.3 | Light Mode Conversion | M | ❌ Reverted | Boss rejected |
| S1.4 | Responsive Polish | S | ✅ Done | Touch targets, mobile CTA |
| — | Dark theme + gradients | M | ✅ Done | Boss feedback fix |
| — | Font system update | S | ✅ Done | Playfair Display + Great Vibes |
| — | Navbar fixes (sticky, width) | S | ✅ Done | Boss feedback fix |
| — | Footer dark bg | S | ✅ Done | Boss feedback fix |

---

## Sprint 2: Content Polish + "Snap Flip Read" + X3 Product ✅ DONE

**Sprint Goal:** Hoàn thiện content hiển thị trên dark theme, thêm USP section "Snap, Flip, Read", thêm sản phẩm X3 với so sánh X4 vs X3.

---

### S2.1: Content Visibility Polish ✅ (c3c9298)
**Priority:** P0
**Estimate:** L

**Description:** Hiện tại text trên dark theme vẫn mờ ở nhiều sections. Review toàn bộ page — đảm bảo mọi heading, body text, card content đều đọc rõ. Images phải hiển thị đúng (không bị washed out trên dark bg).

**Acceptance Criteria:**
- [x] Mọi heading visible: Paper White hoặc gold-gradient, font-bold
- [x] Body text readable: rgba(245,240,235,0.85) minimum opacity
- [x] Cards có subtle border + background khác biệt với section bg
- [x] Images có proper contrast trên dark background
- [x] Test trên mobile + desktop

---

### S2.2: "Snap, Flip, Read" Section ✅ (63853b8)
**Priority:** P0
**Estimate:** M

**Description:** USP chính của Xteink — quy trình 3 bước gắn MagSafe lên điện thoại. Section phải trực quan, animated, dễ hiểu.

**Brand Alignment:** Pillar: **Return** (tactile, physical) + **Quiet** (simple, 3 steps only)

**Acceptance Criteria:**
- [x] 3-step layout: Snap (gắn nam châm) → Flip (lật mở) → Read (đọc)
- [x] Mỗi step có icon/illustration + title + short description
- [x] Scroll-triggered animation: steps reveal lần lượt
- [x] Mobile: vertical stack, Desktop: horizontal layout
- [x] Mock data trong services layer

**Content:**
1. **Snap** — "Gắn lên điện thoại" — Nam châm siêu mạnh, gắn chắc chắn
2. **Flip** — "Lật ra là đọc" — Mở nắp, màn hình E-Ink sẵn sàng
3. **Read** — "Đọc mọi lúc mọi nơi" — 74g nhẹ hơn bộ bài, 2 tuần pin

---

### S2.3: X3 Product + So sánh X4 vs X3 ✅ (82f4492)
**Priority:** P1
**Estimate:** L

**Description:** Thêm sản phẩm X3 (2026 mới, 1,790,000đ). Tạo comparison section giúp user chọn đúng model.

**Acceptance Criteria:**
- [x] X3 product card (3.7", 250ppi, 60g, ultra-rare)
- [x] X4 product card update (4.3", 220ppi, 74g, bestseller tag)
- [x] Interactive comparison table: X4 vs X3 side-by-side
- [x] Highlight khác biệt: screen size, PPI, weight, price
- [x] CTA cho mỗi model: "Chọn X4" / "Chọn X3"
- [x] Mock data trong services layer (types: ProductComparison)
- [x] Responsive: cards stack trên mobile

**Data:**
| Spec | X4 | X3 |
|------|----|----|
| Giá | 1,490,000đ | 1,790,000đ |
| Màn hình | 4.3" E-Ink | 3.7" E-Ink |
| PPI | 220 | 250 |
| Trọng lượng | 74g | 60g |
| Độ mỏng | 4.9mm | TBD |
| Tag | Bestseller | 2026 New |

---

### S2.4: Accessories Section ✅ (e4abdce)
**Priority:** P1
**Estimate:** S

**Description:** Hiển thị phụ kiện riêng: Reading Light, Magnetic Case (6 màu), Silicon Case (2 màu).

**Acceptance Criteria:**
- [x] 3 accessory cards với image, name, price
- [x] Magnetic Case hiển thị color swatches (6 màu)
- [x] Link "Mua kèm" cho mỗi phụ kiện
- [x] Mock data trong services layer
- [x] Responsive grid

---

## Sprint 3: Purchase Flow + FAQ + Social Proof

**Sprint Goal:** Hoàn thiện purchase experience — payment info, shipping, FAQ, social proof từ press + community.

---

### S3.1: Purchase Info Section
**Priority:** P0
**Estimate:** M

**Description:** Thông tin mua hàng rõ ràng: payment methods, shipping, warranty.

**Acceptance Criteria:**
- [ ] Payment methods: QR transfer, Momo, VNPay, COD — với icons
- [ ] Shipping info: HCM 24h, tỉnh 2-4 ngày, free trên 1M VND
- [ ] Warranty: 30 ngày đổi mới, 12 tháng hardware
- [ ] Trust badges (icons + labels)
- [ ] Bundle includes: Device + 32GB SD + Crosspoint firmware + 70K sách + screen protector + magnetic ring

---

### S3.2: FAQ Section
**Priority:** P0
**Estimate:** M

**Description:** 7+ câu hỏi thường gặp, accordion UI.

**Acceptance Criteria:**
- [ ] Accordion expand/collapse (vanilla JS, không dùng library)
- [ ] 7 câu hỏi: E-Ink là gì?, Pin bao lâu?, Hỗ trợ tiếng Việt?, Cách đặt hàng?, Giao hàng?, Chuyển sách?, Bảo hành?
- [ ] Smooth animation open/close
- [ ] Schema markup cho SEO (FAQ structured data)
- [ ] Mock data trong services layer

---

### S3.3: Social Proof — Press + Community
**Priority:** P1
**Estimate:** M

**Description:** Press mentions + community testimonials tăng trust.

**Acceptance Criteria:**
- [ ] Press logos + ratings: Lifehacker (3.5/5), Pocket-lint (4/5)
- [ ] YouTube review embed hoặc link: jvscholz (348K subs)
- [ ] Community stats: "150+ người dùng Việt Nam"
- [ ] Facebook testimonials (3-5 real quotes)
- [ ] Carousel hoặc grid layout

---

### S3.4: Zalo Support Widget
**Priority:** P1
**Estimate:** S

**Description:** Floating Zalo chat button cho support nhanh.

**Acceptance Criteria:**
- [ ] Floating button góc phải dưới
- [ ] Link to Zalo OA chat
- [ ] Subtle animation (pulse hoặc bounce nhẹ)
- [ ] Mobile-friendly (không che MobileStickyCTA)
- [ ] "Hỗ trợ 5 phút qua Zalo" tooltip

---

## Sprint 4: Backend Foundation + Content APIs (BE)

**Sprint Goal:** Dựng hệ thống BE (Node + Express + PostgreSQL) phục vụ toàn bộ FE hiện tại. Thay thế mock data bằng real API.

**Stack:** Node.js + Express + TypeScript + PostgreSQL + Prisma ORM
**Directory:** `backend/`
**Port:** 3001

---

### BE1.1: Project Setup + Database Schema
**Priority:** P0
**Estimate:** M
**Assignee:** BE (with TL architecture review)

**Description:** Khởi tạo project Node + Express + TypeScript. Setup PostgreSQL + Prisma ORM. Thiết kế database schema cover toàn bộ data FE đang dùng.

**Acceptance Criteria:**
- [ ] `backend/` directory với Express + TypeScript + Prisma
- [ ] PostgreSQL database `xteink` created
- [ ] Prisma schema covering: Products, Accessories, Features, FAQ, Testimonials, SocialProof, Guides, Navigation, Footer, PurchaseInfo, Addresses (Province/District/Ward)
- [ ] `npm run dev` starts server on port 3001
- [ ] `npm run db:seed` seeds all mock data from FE into DB
- [ ] Basic error handling middleware + CORS config (allow localhost:2002)
- [ ] Health check endpoint: `GET /api/health`
- [ ] ESLint + Prettier configured

---

### BE1.2: Content APIs (14 GET endpoints)
**Priority:** P0
**Estimate:** L
**Assignee:** BE

**Description:** Implement tất cả 14 read-only endpoints matching FE type contracts trong `website/src/services/types/index.ts`. Response shape PHẢI match 1:1 với mock data hiện tại.

**Acceptance Criteria:**
- [ ] `GET /api/products/x4` → ProductData
- [ ] `GET /api/products` → ProductListingItem[]
- [ ] `GET /api/features` → Feature[]
- [ ] `GET /api/pricing` → PricingData
- [ ] `GET /api/testimonials` → Testimonial[]
- [ ] `GET /api/lifestyle-moments` → LifestyleMoment[]
- [ ] `GET /api/navigation` → NavLink[]
- [ ] `GET /api/footer` → FooterData
- [ ] `GET /api/snap-flip-read` → SnapFlipReadStep[]
- [ ] `GET /api/product-comparison` → ProductComparisonData
- [ ] `GET /api/accessories` → Accessory[]
- [ ] `GET /api/purchase-info` → PurchaseInfoData
- [ ] `GET /api/faq` → FAQItem[]
- [ ] `GET /api/social-proof` → SocialProofData
- [ ] `GET /api/guides` → Guide[]
- [ ] All responses match FE types exactly (validate against `types/index.ts`)

---

### BE1.3: Address API (Full Vietnam)
**Priority:** P0
**Estimate:** M
**Assignee:** BE

**Description:** API địa chỉ Việt Nam đầy đủ — 63 tỉnh/thành, quận/huyện, phường/xã. Hỗ trợ cascade select trong checkout form.

**Acceptance Criteria:**
- [ ] `GET /api/addresses/provinces` → Province[] (63 tỉnh/thành)
- [ ] `GET /api/addresses/provinces/:code/districts` → District[]
- [ ] `GET /api/addresses/districts/:code/wards` → Ward[]
- [ ] Data source: Vietnam government open data hoặc reliable npm package
- [ ] Response format match FE types: Province { code, name, districts: District[] }
- [ ] Performance: < 100ms response time

---

### BE1.4: Checkout Payment Methods API
**Priority:** P0
**Estimate:** S
**Assignee:** BE

**Description:** API trả về payment methods cho checkout form.

**Acceptance Criteria:**
- [ ] `GET /api/checkout/payment-methods` → CheckoutPaymentMethod[]
- [ ] 5 methods: COD, MoMo, ZaloPay, VNPay, Bank transfer
- [ ] Response match FE type exactly

---

### BE1.5: FE Integration — Swap Mock → Real API
**Priority:** P0
**Estimate:** M
**Assignee:** FE

**Description:** Update `website/src/services/api.ts` — thay mock imports bằng fetch() calls tới BE. Zero component changes.

**Acceptance Criteria:**
- [ ] All 17 functions in `api.ts` call real BE endpoints
- [ ] Environment variable `NEXT_PUBLIC_API_URL` for BE URL
- [ ] Error handling: fallback to mock data if BE unavailable
- [ ] All existing pages render correctly with real API data
- [ ] Build passes, no TypeScript errors

---

## Sprint 5 (BE): Order + Payment (Active)

**Sprint Goal:** Real checkout flow — order creation, payment processing, shipping fee, admin management. FE checkout submits to real API.

**Stack:** Same as Sprint 4 (Express + Prisma + PostgreSQL)

---

### BE2.1: Order Schema + Create API
**Priority:** P0
**Estimate:** L
**Assignee:** BE (with TL architecture review)

**Description:** Prisma models for Order system + POST endpoint to create orders from checkout. GET endpoint to retrieve order by ID (for success page).

**Acceptance Criteria:**
- [ ] Prisma models: Order, OrderItem, ShippingAddress (or embed in Order)
- [ ] Order fields: id, orderNumber (auto-generate), status, customerName, customerPhone, customerEmail, shippingAddress, paymentMethod, subtotal, shippingFee, total, notes, createdAt
- [ ] OrderItem fields: productId, productName, quantity, unitPrice, totalPrice
- [ ] `POST /api/orders` — create order from checkout payload (cart items + customer info + address + payment method)
- [ ] `GET /api/orders/:id` — retrieve order details (for success/confirmation page)
- [ ] Order status enum: PENDING → CONFIRMED → SHIPPING → DELIVERED → CANCELLED
- [ ] Auto-generate orderNumber (format: XT-YYYYMMDD-XXXX)
- [ ] Validate: cart not empty, required fields present, valid payment method
- [ ] Return created order with ID + orderNumber in response

---

### BE2.2: Payment Flow
**Priority:** P0
**Estimate:** L
**Assignee:** BE

**Description:** Payment processing per method. COD = auto-confirm. Bank Transfer = return QR/account info. MoMo/VNPay/ZaloPay = webhook stubs (real integration khi có merchant account).

**Acceptance Criteria:**
- [ ] COD: Order status → CONFIRMED immediately
- [ ] Bank Transfer: Return bank account info + QR code data (static for now)
- [ ] MoMo/VNPay/ZaloPay: Stub endpoints that return "redirect URL" placeholder — ready for real integration later
- [ ] `POST /api/payments/webhook` — stub endpoint for payment gateway callbacks
- [ ] Payment status tracking on Order: paymentStatus (PENDING, PAID, FAILED)
- [ ] Update Order when payment confirmed

---

### BE2.3: Shipping Fee Calculation
**Priority:** P1
**Estimate:** M
**Assignee:** BE

**Description:** Calculate shipping fee based on destination province. Simple tier-based: HCM/HN = giá thấp, tỉnh khác = giá cao hơn. Free shipping trên 1M VND.

**Acceptance Criteria:**
- [ ] `GET /api/shipping/fee?provinceCode=XX&subtotal=YY` — return shipping fee
- [ ] Tier: HCM (79) + HN (01) = 25,000₫, other provinces = 35,000₫
- [ ] Free shipping if subtotal >= 1,000,000₫
- [ ] Return: { fee, freeShippingThreshold, estimatedDays }
- [ ] Estimated days: HCM/HN = 1-2 ngày, other = 3-5 ngày

---

### BE2.4: FE Integration — Checkout → Real API
**Priority:** P0
**Estimate:** M
**Assignee:** FE

**Description:** Update CheckoutClient.tsx to POST real order to BE instead of sessionStorage. Success page fetches order from API.

**Acceptance Criteria:**
- [ ] Checkout form submits to `POST /api/orders` with full payload
- [ ] Shipping fee fetched dynamically from `GET /api/shipping/fee` on province select
- [ ] Success page: fetch order details from `GET /api/orders/:id`
- [ ] Error handling: show user-friendly error if order creation fails
- [ ] Remove sessionStorage workaround
- [ ] Loading states during API calls

---

### BE2.5: Admin Order Management
**Priority:** P1
**Estimate:** M
**Assignee:** BE

**Description:** Basic admin endpoints to list and manage orders. No auth for now (internal use).

**Acceptance Criteria:**
- [ ] `GET /api/admin/orders` — list all orders (paginated, sorted by createdAt desc)
- [ ] `GET /api/admin/orders?status=PENDING` — filter by status
- [ ] `PATCH /api/admin/orders/:id/status` — update order status
- [ ] Return order with items + shipping address in list
- [ ] Pagination: page + limit query params (default: page=1, limit=20)

---

## Sprint 6 (FE): Subpages — About + Guides (was Sprint 4)

**Sprint Goal:** Tạo subpages cho brand story và hướng dẫn sử dụng.

---

### S4.1: About Page — Brand Story
**Priority:** P1
**Estimate:** L

**Description:** Trang giới thiệu: "Technology should serve life, not invade it." Kể câu chuyện thương hiệu, mission, team.

**Acceptance Criteria:**
- [ ] Route: `/about`
- [ ] Hero: brand statement + atmospheric image
- [ ] Mission section: tại sao tạo Xteink
- [ ] Values: Quiet, Return, Warmth, Becoming — visual representation
- [ ] Brand pillar: "Permission slip" positioning
- [ ] Responsive, consistent dark theme

---

### S4.2: Guides — Getting Started + Transfer Books
**Priority:** P1
**Estimate:** M

**Description:** 3 hướng dẫn: Getting Started, Transfer Books, Crosspoint Firmware.

**Acceptance Criteria:**
- [ ] Route: `/guides`, `/guides/getting-started`, `/guides/transfer-books`, `/guides/firmware`
- [ ] Step-by-step layout với numbered steps
- [ ] Images/screenshots minh họa
- [ ] Table of contents sidebar (desktop)
- [ ] Mobile: collapsible sections

---

### S4.3: Policy Pages
**Priority:** P2
**Estimate:** S

**Description:** Warranty, Shipping, Returns policy pages.

**Acceptance Criteria:**
- [ ] Routes: `/warranty`, `/shipping`, `/returns`
- [ ] Clean text layout, consistent typography
- [ ] Link từ Footer

---

## Sprint 7 (FE): Library Preview + Search (was Sprint 5)

**Sprint Goal:** Preview library 70K sách + tính năng search/filter.

---

### S5.1: Library Preview Page
**Priority:** P1
**Estimate:** L

**Description:** Showcase library 70K+ sách. Coming soon nhưng hiển thị categories + sample covers.

**Acceptance Criteria:**
- [ ] Route: `/library`
- [ ] Hero: "70.000+ cuốn sách" stats
- [ ] Category grid: Văn học, Kinh doanh, Self-help, Khoa học, Thiếu nhi...
- [ ] Sample book covers (8-12) với hover effect
- [ ] "Sắp ra mắt" badge + Zalo notification signup
- [ ] Search bar (UI only, mock results)

---

### S5.2: Book Format Compatibility Checker
**Priority:** P2
**Estimate:** S

**Description:** Tool check format sách: EPUB, PDF, MOBI, TXT, DOCX.

**Acceptance Criteria:**
- [ ] Drag & drop hoặc select file
- [ ] Check extension → hiển thị compatible/not
- [ ] Supported: EPUB, PDF, MOBI, TXT, DOCX
- [ ] Simple UI, không cần backend

---

### S5.3: Product Page Deep Content (X4 + X3)
**Priority:** P1
**Estimate:** M

**Description:** Trang chi tiết sản phẩm riêng cho X4 và X3.

**Acceptance Criteria:**
- [ ] Routes: `/x4`, `/x3`
- [ ] Full specs table
- [ ] Gallery (multiple product images)
- [ ] "Trong hộp có gì" section
- [ ] Related accessories
- [ ] CTA mua hàng

---

## Sprint 8 (FE): Animations + Performance + SEO (was Sprint 6)

**Sprint Goal:** Polish animations, optimize performance, SEO foundation.

---

### S6.1: Scroll Animations Polish
**Priority:** P1
**Estimate:** M

**Description:** Verify và polish scroll reveal animations toàn site.

**Acceptance Criteria:**
- [ ] Mọi section có scroll-reveal animation
- [ ] Stagger timing cho lists/grids
- [ ] No jank, 60fps on mobile
- [ ] Fallback: content visible nếu JS fail ([data-sr-ready] guard)

---

### S6.2: Image Optimization
**Priority:** P1
**Estimate:** M

**Description:** Optimize tất cả images cho performance.

**Acceptance Criteria:**
- [ ] Tất cả images dùng Next.js Image component
- [ ] WebP format với fallback
- [ ] Proper sizes attribute cho responsive
- [ ] Blur placeholder cho LCP images
- [ ] Lighthouse Performance >= 90 mobile

---

### S6.3: SEO Foundation
**Priority:** P1
**Estimate:** M

**Description:** Meta tags, structured data, sitemap.

**Acceptance Criteria:**
- [ ] Meta title + description cho mọi page
- [ ] Open Graph tags (Facebook, Zalo share)
- [ ] Product structured data (JSON-LD)
- [ ] FAQ structured data
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Vietnamese hreflang

---

### S6.4: Lighthouse Audit + Fixes
**Priority:** P1
**Estimate:** S

**Description:** Full Lighthouse audit và fix issues.

**Acceptance Criteria:**
- [ ] Performance >= 90 (mobile + desktop)
- [ ] Accessibility >= 90
- [ ] Best Practices >= 90
- [ ] SEO >= 90
- [ ] Fix all critical issues

---

## Sprint 9: Engagement + Growth (was Sprint 7)

**Sprint Goal:** Tính năng tăng engagement: live chat, referral, newsletter.

---

### S7.1: Newsletter + Email Capture
**Priority:** P1
**Estimate:** M

**Description:** Tối ưu email capture flow trong Footer + dedicated popup/section.

**Acceptance Criteria:**
- [ ] Footer newsletter form hoạt động (mock submission)
- [ ] Exit-intent popup (desktop only)
- [ ] "Nhận tin sách hay" value proposition
- [ ] Success state animation
- [ ] Anti-spam: honeypot field

---

### S7.2: Referral Program UI
**Priority:** P2
**Estimate:** M

**Description:** UI cho chương trình giới thiệu — leverage 150+ user base.

**Acceptance Criteria:**
- [ ] "Giới thiệu bạn bè" section
- [ ] Share link generation (UI, mock)
- [ ] Reward tiers display
- [ ] Social share buttons (Zalo, Facebook, Copy link)

---

### S7.3: Analytics + Tracking Setup
**Priority:** P2
**Estimate:** S

**Description:** GA4 + Facebook Pixel + event tracking.

**Acceptance Criteria:**
- [ ] Google Analytics 4 integration
- [ ] Facebook Pixel
- [ ] Event tracking: CTA clicks, scroll depth, time on page
- [ ] Conversion tracking: "Bắt đầu đọc" click, newsletter signup

---

## Completed / Archive

### Sprint 1 ✅ (2026-02-09)
- S1.1 Mock API Layer (8b790f4) ✅
- S1.2 Navbar Liquid Glass ❌ Reverted
- S1.3 Light Mode ❌ Reverted
- S1.4 Responsive Polish (b75bd6e) ✅
- Dark theme + gradients (64ff6f2, 41cff24) ✅
- Font system: Playfair Display + Great Vibes (19352ab, f1bbd2a) ✅
- Navbar + Footer fixes (c8d50f3, 1d13272) ✅

### Sprint 2 ✅ (2026-02-09)
- S2.1 Content Visibility Polish (c3c9298) ✅
- S2.2 "Snap, Flip, Read" Section (63853b8) ✅
- S2.3 X3 Product + Comparison (82f4492) ✅
- S2.4 Accessories Section (e4abdce) ✅
- Real product images integration (47a404b) ✅
