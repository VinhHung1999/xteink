# Backend Architecture — Sprint 5: Order + Payment System

**Author:** TL
**Date:** 2026-02-12
**Sprint:** 5 (BE)
**Depends on:** Sprint 4 BE Foundation (28 tables, 19 GET endpoints, Prisma + Express)

---

## 1. Overview

Sprint 5 adds **write operations** to the backend — order creation, payment processing, shipping fee calculation, and admin order management. This is the first time we introduce `POST` and `PATCH` endpoints.

**Key Principles:**
- Server-side validation on all writes (never trust client)
- Snapshot pattern — order captures item prices/names at creation time (immune to future price changes)
- Race-safe order number generation via PostgreSQL `autoincrement`
- Shipping fee calculated server-side (FE calls for display, BE re-validates on order create)
- Payment flow is pluggable — COD works now, gateways are stubs ready for real integration

---

## 2. New Prisma Models

Add these models to `backend/prisma/schema.prisma`:

```prisma
// =============================================
// ORDERS
// =============================================

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPING
  DELIVERED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
}

model Order {
  id         String        @id @default(cuid())
  orderSeq   Int           @default(autoincrement()) @unique
  orderNumber String       @unique    // "XT-20260212-0001" — computed from orderSeq + createdAt

  // Status
  status        OrderStatus   @default(PENDING)
  paymentStatus PaymentStatus @default(PENDING)
  paymentMethod String                        // "cod", "momo", "zalopay", "vnpay", "bank-transfer"

  // Customer
  customerName  String
  customerPhone String
  customerEmail String?

  // Shipping address (embedded snapshot — NOT a FK to Province/District/Ward)
  provinceCode    String
  provinceName    String
  districtCode    String
  districtName    String
  wardCode        String
  wardName        String
  addressDetail   String                      // "123 Nguyễn Huệ"

  // Money (all in VND, integer)
  subtotal    Int
  shippingFee Int
  total       Int

  // Optional
  notes       String?

  // Relations
  items       OrderItem[]

  // Timestamps
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("orders")
  @@index([status])
  @@index([createdAt])
}

model OrderItem {
  id          String @id @default(cuid())
  orderId     String
  order       Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)

  // Snapshot fields (captured at order time, immune to future changes)
  productSlug String                          // "x4", "reading-light", etc.
  productName String
  productImage String
  unitPrice   Int                             // VND
  quantity    Int
  totalPrice  Int                             // unitPrice × quantity
  itemType    String                          // "product" | "accessory"

  @@map("order_items")
}
```

### 2.1 Why Embedded Address (Not FK)

Shipping address is a **snapshot** — it must never change even if the Province/District/Ward table data changes. Using FKs would create coupling and potential cascading issues. We store the resolved names alongside codes for the success page display.

### 2.2 Why `orderSeq` + `orderNumber`

- `orderSeq` uses PostgreSQL `SERIAL` (autoincrement) — guaranteed unique, race-safe, no locks needed
- `orderNumber` is formatted from `orderSeq` + `createdAt` date: `XT-YYYYMMDD-XXXX`
- Two-step process: create order → compute orderNumber from returned orderSeq → update

```typescript
// Order number generation (in route handler)
function formatOrderNumber(seq: number, date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const num = String(seq).padStart(4, "0");
  return `XT-${y}${m}${d}-${num}`;
}
```

---

## 3. API Endpoints

### 3.1 Order Endpoints (BE2.1)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/orders` | Create order from checkout | Public |
| `GET` | `/api/orders/:orderNumber` | Get order by number (success page) | Public |

### 3.2 Shipping Fee (BE2.3)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/shipping/fee` | Calculate shipping fee | Public |

### 3.3 Payment (BE2.2)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/payments/webhook` | Payment gateway callback (stub) | Public* |

*In production, webhook endpoints should verify signatures from payment gateways.

### 3.4 Admin (BE2.5)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/admin/orders` | List orders (paginated) | None (MVP) |
| `PATCH` | `/api/admin/orders/:id/status` | Update order status | None (MVP) |

---

## 4. Endpoint Details

### 4.1 `POST /api/orders` — Create Order

**Request Body:**

```typescript
interface CreateOrderPayload {
  customer: {
    name: string;         // required, max 100 chars
    phone: string;        // required, /^0\d{9}$/
    email?: string;       // optional, valid email
  };
  shipping: {
    provinceCode: string; // required, must exist in Province table
    districtCode: string; // required, must exist in District table
    wardCode: string;     // required, must exist in Ward table
    addressDetail: string; // required, non-empty
  };
  paymentMethodId: string; // required: "cod" | "momo" | "zalopay" | "vnpay" | "bank-transfer"
  notes?: string;
  items: {
    slug: string;          // product/accessory slug
    name: string;          // display name (snapshot)
    image: string;         // image URL (snapshot)
    unitPrice: number;     // VND integer
    quantity: number;      // >= 1
    type: "product" | "accessory";
  }[];
}
```

**Validation Rules:**
1. `customer.name` — required, trimmed, 1–100 chars
2. `customer.phone` — required, matches `/^0\d{9}$/` after stripping spaces/dashes
3. `customer.email` — optional, valid email regex if provided
4. `shipping.provinceCode` — must exist in Province table
5. `shipping.districtCode` — must exist in District table AND belong to the specified province
6. `shipping.wardCode` — must exist in Ward table AND belong to the specified district
7. `shipping.addressDetail` — required, trimmed, non-empty
8. `paymentMethodId` — must exist in CheckoutPaymentMethod table (by methodId)
9. `items` — non-empty array, each item has valid slug, name, unitPrice > 0, quantity >= 1
10. Server recalculates `subtotal`, `shippingFee`, `total` — never trust client totals

**Server-Side Processing:**
```
1. Validate all fields
2. Look up province/district/ward names from DB
3. Calculate subtotal = sum(unitPrice × quantity)
4. Calculate shippingFee = getShippingFee(provinceCode, subtotal)
5. Calculate total = subtotal + shippingFee
6. Create Order + OrderItems in transaction
7. Read back orderSeq → compute orderNumber → update
8. Apply payment flow (see §5)
9. Return response
```

**Success Response (201):**

```typescript
interface CreateOrderResponse {
  orderNumber: string;       // "XT-20260212-0001"
  status: OrderStatus;       // "PENDING" or "CONFIRMED" (COD)
  paymentStatus: PaymentStatus;
  total: number;
  // Payment-specific info (only for bank transfer)
  paymentInfo?: {
    bankName: string;        // "Techcombank"
    accountNumber: string;   // "19038xxxxx"
    accountName: string;     // "CONG TY TNHH XTEINK"
    amount: number;          // total in VND
    transferContent: string; // orderNumber (for matching)
    qrDataUrl?: string;      // Static QR image URL (if available)
  };
}
```

**Error Responses:**
- `400` — Validation error: `{ error: "VALIDATION_ERROR", message: "...", fields: { ... } }`
- `404` — Invalid province/district/ward: `{ error: "INVALID_ADDRESS", message: "..." }`
- `500` — Server error

### 4.2 `GET /api/orders/:orderNumber` — Get Order

Used by the success page to display order confirmation.

**Response (200):**

```typescript
interface OrderDetailResponse {
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;     // "cod", "bank-transfer", etc.
  paymentMethodName: string; // "Thanh toán khi nhận hàng" (human-readable)
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  shippingAddress: string;   // "123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh"
  notes?: string;
  items: {
    productName: string;
    productImage: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
  }[];
  subtotal: number;
  shippingFee: number;
  total: number;
  createdAt: string;         // ISO 8601
  // For bank transfer — return payment info so success page can show QR
  paymentInfo?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    amount: number;
    transferContent: string;
    qrDataUrl?: string;
  };
}
```

**Error:** `404` if order not found.

### 4.3 `GET /api/shipping/fee` — Shipping Fee Calculation

**Query Params:**
- `provinceCode` (required) — Province code from address API
- `subtotal` (required) — Cart subtotal in VND (integer)

**Response (200):**

```typescript
interface ShippingFeeResponse {
  fee: number;                  // 0, 25000, or 35000
  freeShippingThreshold: number; // 1000000
  estimatedDays: string;        // "1-2 ngày" or "3-5 ngày"
}
```

**Shipping Tiers:**

| Condition | Fee | Estimated Days |
|-----------|-----|---------------|
| subtotal >= 1,000,000₫ | 0₫ (Free) | Same as province tier |
| Province = HCM (79) or HN (01) | 25,000₫ | 1-2 ngày |
| All other provinces | 35,000₫ | 3-5 ngày |

**Implementation:**

```typescript
// src/lib/shipping.ts
const FREE_THRESHOLD = 1_000_000;
const MAJOR_CITY_CODES = ["79", "01"]; // HCM, Hà Nội
const MAJOR_CITY_FEE = 25_000;
const OTHER_FEE = 35_000;

export function calculateShippingFee(provinceCode: string, subtotal: number) {
  const isMajorCity = MAJOR_CITY_CODES.includes(provinceCode);
  const baseFee = isMajorCity ? MAJOR_CITY_FEE : OTHER_FEE;
  const fee = subtotal >= FREE_THRESHOLD ? 0 : baseFee;
  const estimatedDays = isMajorCity ? "1-2 ngày" : "3-5 ngày";

  return { fee, freeShippingThreshold: FREE_THRESHOLD, estimatedDays };
}
```

**Note:** This utility is used by both the `/api/shipping/fee` endpoint (for FE display) AND the `POST /api/orders` handler (for server-side validation). Single source of truth.

### 4.4 `POST /api/payments/webhook` — Payment Webhook (Stub)

Stub endpoint for MoMo/VNPay/ZaloPay callbacks. Not functional yet — returns 200 OK and logs the payload.

**Request:** Varies by gateway (accept any JSON body for now).

**Processing (stub):**
```
1. Log the webhook payload
2. Return { received: true }
```

**Future:** Verify signature → find order → update paymentStatus → update orderStatus.

### 4.5 `GET /api/admin/orders` — List Orders

**Query Params:**
- `page` (optional, default: 1)
- `limit` (optional, default: 20, max: 100)
- `status` (optional) — Filter by OrderStatus

**Response (200):**

```typescript
interface AdminOrderListResponse {
  orders: {
    id: string;
    orderNumber: string;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    customerName: string;
    customerPhone: string;
    total: number;
    itemCount: number;         // number of line items
    createdAt: string;
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

**Query:**
```typescript
const [orders, total] = await Promise.all([
  prisma.order.findMany({
    where: status ? { status } : {},
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
    include: { _count: { select: { items: true } } },
  }),
  prisma.order.count({ where: status ? { status } : {} }),
]);
```

### 4.6 `PATCH /api/admin/orders/:id/status` — Update Order Status

**Request Body:**

```typescript
{ status: "CONFIRMED" | "SHIPPING" | "DELIVERED" | "CANCELLED" }
```

**Validation — State Machine Rules:**

```
PENDING    → CONFIRMED, CANCELLED
CONFIRMED  → SHIPPING, CANCELLED
SHIPPING   → DELIVERED
DELIVERED  → (terminal — no transitions)
CANCELLED  → (terminal — no transitions)
```

Invalid transitions return `400`:
```json
{ "error": "INVALID_TRANSITION", "message": "Cannot transition from SHIPPING to CANCELLED" }
```

**Side Effects:**
- `PENDING → CONFIRMED`: Set `paymentStatus = PAID` (if bank transfer payment confirmed)
- `CANCELLED`: No payment status change needed

**Response (200):** Updated order object.

---

## 5. Payment Flow Per Method

### 5.1 COD (Cash on Delivery)

```
Order created → status = CONFIRMED, paymentStatus = PENDING
Payment collected at delivery → admin updates paymentStatus = PAID
```

COD orders skip PENDING and go directly to CONFIRMED because no payment action is needed before shipping.

### 5.2 Bank Transfer

```
Order created → status = PENDING, paymentStatus = PENDING
Response includes bankInfo (account, QR, transfer content = orderNumber)
Customer transfers money manually
Admin verifies → PATCH status = CONFIRMED (paymentStatus = PAID)
```

**Static Bank Info (for now):**
```typescript
const BANK_INFO = {
  bankName: "Techcombank",
  accountNumber: "19038XXXXX",       // Replace with real account
  accountName: "CONG TY TNHH XTEINK",
  qrDataUrl: null,                    // Add static QR image URL later
};
```

Store in `SiteConfig` table for easy updates:
```
key: "bankTransfer.bankName"     → "Techcombank"
key: "bankTransfer.accountNumber" → "19038XXXXX"
key: "bankTransfer.accountName"   → "CONG TY TNHH XTEINK"
key: "bankTransfer.qrDataUrl"     → null
```

### 5.3 MoMo / VNPay / ZaloPay (Stubs)

```
Order created → status = PENDING, paymentStatus = PENDING
Response includes paymentUrl (placeholder)
In production: redirect user to payment gateway → gateway calls webhook → confirm
```

**Stub response:**
```typescript
// For momo/vnpay/zalopay:
{
  orderNumber: "XT-20260212-0001",
  status: "PENDING",
  paymentStatus: "PENDING",
  total: 1615000,
  paymentInfo: {
    redirectUrl: null,  // Placeholder — real URL when merchant account is ready
    message: "Tính năng thanh toán qua [MoMo/VNPay/ZaloPay] sẽ sớm được hỗ trợ. Vui lòng chọn COD hoặc chuyển khoản."
  }
}
```

---

## 6. Order Status State Machine

```
┌─────────┐     ┌───────────┐     ┌──────────┐     ┌───────────┐
│ PENDING  │────▶│ CONFIRMED │────▶│ SHIPPING │────▶│ DELIVERED │
└─────────┘     └───────────┘     └──────────┘     └───────────┘
     │                │
     ▼                ▼
┌───────────┐   ┌───────────┐
│ CANCELLED │   │ CANCELLED │
└───────────┘   └───────────┘
```

**Transition Table:**

| From | Allowed To | Triggered By |
|------|-----------|-------------|
| PENDING | CONFIRMED | Admin confirms payment / COD auto |
| PENDING | CANCELLED | Admin / customer cancels |
| CONFIRMED | SHIPPING | Admin ships order |
| CONFIRMED | CANCELLED | Admin cancels before shipping |
| SHIPPING | DELIVERED | Admin confirms delivery |
| DELIVERED | — | Terminal state |
| CANCELLED | — | Terminal state |

**Validation helper:**

```typescript
// src/lib/order-status.ts
const VALID_TRANSITIONS: Record<string, string[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["SHIPPING", "CANCELLED"],
  SHIPPING: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

export function isValidTransition(from: string, to: string): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}
```

---

## 7. Directory Structure (New Files)

```
backend/src/
├── routes/
│   ├── orders.ts           # POST /api/orders, GET /api/orders/:orderNumber
│   ├── shipping.ts         # GET /api/shipping/fee
│   ├── payments.ts         # POST /api/payments/webhook
│   └── admin/
│       └── orders.ts       # GET /api/admin/orders, PATCH /api/admin/orders/:id/status
├── lib/
│   ├── prisma.ts           # (existing)
│   ├── shipping.ts         # calculateShippingFee() utility
│   ├── order-number.ts     # formatOrderNumber() utility
│   └── order-status.ts     # isValidTransition() utility
└── middleware/
    ├── error.ts            # (existing)
    └── validate.ts         # Request body validation helpers
```

**Route mounting in `routes/index.ts`:**
```typescript
// Existing content APIs ...
router.use("/", ordersRouter);        // /api/orders, /api/orders/:orderNumber
router.use("/", shippingRouter);      // /api/shipping/fee
router.use("/", paymentsRouter);      // /api/payments/webhook
router.use("/admin", adminOrdersRouter); // /api/admin/orders
```

---

## 8. FE Changes Required (BE2.4)

### 8.1 New FE Types (`website/src/services/types/index.ts`)

```typescript
// ========== Order (API payloads + responses) ==========

export interface CreateOrderPayload {
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  shipping: {
    provinceCode: string;
    districtCode: string;
    wardCode: string;
    addressDetail: string;
  };
  paymentMethodId: string;
  notes?: string;
  items: {
    slug: string;
    name: string;
    image: string;
    unitPrice: number;
    quantity: number;
    type: "product" | "accessory";
  }[];
}

export interface CreateOrderResponse {
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  paymentInfo?: PaymentInfo;
}

export interface PaymentInfo {
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  amount?: number;
  transferContent?: string;
  qrDataUrl?: string;
  redirectUrl?: string;
  message?: string;
}

export interface OrderDetailResponse {
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  paymentMethodName: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  shippingAddress: string;
  notes?: string;
  items: {
    productName: string;
    productImage: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
  }[];
  subtotal: number;
  shippingFee: number;
  total: number;
  createdAt: string;
  paymentInfo?: PaymentInfo;
}

export interface ShippingFeeResponse {
  fee: number;
  freeShippingThreshold: number;
  estimatedDays: string;
}
```

### 8.2 New API Functions (`website/src/services/api.ts`)

```typescript
// ===== Order APIs (Sprint 5) =====

export async function createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Order creation failed: ${res.status}`);
  }
  return res.json();
}

export async function getOrder(orderNumber: string): Promise<OrderDetailResponse> {
  return fetchAPI<OrderDetailResponse>(`/api/orders/${orderNumber}`);
}

export async function getShippingFee(
  provinceCode: string,
  subtotal: number
): Promise<ShippingFeeResponse> {
  return fetchAPI<ShippingFeeResponse>(
    `/api/shipping/fee?provinceCode=${provinceCode}&subtotal=${subtotal}`
  );
}
```

**Note:** `createOrder` does NOT use the `fetchAPI` helper because it needs POST + custom error handling. No mock fallback — order creation must go through the real API.

### 8.3 CheckoutClient.tsx Changes

```diff
- const SHIPPING_FEE = 30000;
+ const [shippingFee, setShippingFee] = useState(0);
+ const [shippingEstimate, setShippingEstimate] = useState("");
+ const [loadingShipping, setLoadingShipping] = useState(false);

// In handleProvinceChange:
+ // Fetch shipping fee when province changes
+ async function fetchShippingFee(code: string) {
+   setLoadingShipping(true);
+   try {
+     const data = await getShippingFee(code, totalPrice);
+     setShippingFee(data.fee);
+     setShippingEstimate(data.estimatedDays);
+   } catch {
+     setShippingFee(35000); // fallback
+   } finally {
+     setLoadingShipping(false);
+   }
+ }

// In handleSubmit — replace sessionStorage with API call:
- sessionStorage.setItem("xteink-last-order", JSON.stringify(orderData));
- setOrderPlaced(true);
- clearCart();
- router.push("/checkout/success");
+ try {
+   const result = await createOrder({
+     customer: { name, phone, email: email || undefined },
+     shipping: { provinceCode, districtCode, wardCode, addressDetail: address },
+     paymentMethodId: paymentId,
+     notes: note || undefined,
+     items: items.map(i => ({
+       slug: i.slug, name: i.name, image: i.image,
+       unitPrice: i.price, quantity: i.quantity, type: i.type,
+     })),
+   });
+   setOrderPlaced(true);
+   clearCart();
+   router.push(`/checkout/success?order=${result.orderNumber}`);
+ } catch (err) {
+   setErrors({ submit: err.message || "Đặt hàng thất bại" });
+ } finally {
+   setSubmitting(false);
+ }
```

### 8.4 OrderSuccessClient.tsx Changes

```diff
- // Read from sessionStorage
- const raw = sessionStorage.getItem("xteink-last-order");
+ // Read orderNumber from URL, fetch from API
+ const searchParams = useSearchParams();
+ const orderNumber = searchParams.get("order");
+ useEffect(() => {
+   if (!orderNumber) { router.replace("/"); return; }
+   getOrder(orderNumber).then(setOrder).catch(() => router.replace("/"));
+ }, [orderNumber]);
```

---

## 9. Validation Middleware

Create a lightweight validation helper (no external library needed for MVP):

```typescript
// src/middleware/validate.ts
import { Request, Response, NextFunction } from "express";

interface ValidationError {
  field: string;
  message: string;
}

export function validateCreateOrder(req: Request, res: Response, next: NextFunction) {
  const errors: ValidationError[] = [];
  const { customer, shipping, paymentMethodId, items } = req.body;

  // Customer
  if (!customer?.name?.trim()) errors.push({ field: "customer.name", message: "Họ tên là bắt buộc" });
  if (!customer?.phone?.trim()) {
    errors.push({ field: "customer.phone", message: "Số điện thoại là bắt buộc" });
  } else if (!/^0\d{9}$/.test(customer.phone.replace(/[\s-]/g, ""))) {
    errors.push({ field: "customer.phone", message: "Số điện thoại không hợp lệ" });
  }
  if (customer?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    errors.push({ field: "customer.email", message: "Email không hợp lệ" });
  }

  // Shipping
  if (!shipping?.provinceCode) errors.push({ field: "shipping.provinceCode", message: "Tỉnh/thành là bắt buộc" });
  if (!shipping?.districtCode) errors.push({ field: "shipping.districtCode", message: "Quận/huyện là bắt buộc" });
  if (!shipping?.wardCode) errors.push({ field: "shipping.wardCode", message: "Phường/xã là bắt buộc" });
  if (!shipping?.addressDetail?.trim()) errors.push({ field: "shipping.addressDetail", message: "Địa chỉ là bắt buộc" });

  // Payment
  if (!paymentMethodId) errors.push({ field: "paymentMethodId", message: "Phương thức thanh toán là bắt buộc" });

  // Items
  if (!Array.isArray(items) || items.length === 0) {
    errors.push({ field: "items", message: "Giỏ hàng trống" });
  } else {
    items.forEach((item: Record<string, unknown>, i: number) => {
      if (!item.slug) errors.push({ field: `items[${i}].slug`, message: "Thiếu slug" });
      if (!item.name) errors.push({ field: `items[${i}].name`, message: "Thiếu tên sản phẩm" });
      if (typeof item.unitPrice !== "number" || item.unitPrice <= 0) {
        errors.push({ field: `items[${i}].unitPrice`, message: "Giá không hợp lệ" });
      }
      if (typeof item.quantity !== "number" || item.quantity < 1) {
        errors.push({ field: `items[${i}].quantity`, message: "Số lượng không hợp lệ" });
      }
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: "VALIDATION_ERROR", message: "Dữ liệu không hợp lệ", fields: errors });
  }

  next();
}
```

---

## 10. Implementation Order

```
Step 1: BE2.1 Phase 1 — Schema + Migration
        → Add Order, OrderItem enums to schema.prisma
        → Run prisma migrate dev --name add-orders
        → Add bank transfer SiteConfig entries to seed
        → TL REVIEW checkpoint

Step 2: BE2.3 — Shipping Fee
        → Create src/lib/shipping.ts (utility)
        → Create src/routes/shipping.ts (GET endpoint)
        → Mount in routes/index.ts
        → TL REVIEW checkpoint

Step 3: BE2.1 Phase 2 — Order Create + Get
        → Create src/lib/order-number.ts
        → Create src/lib/order-status.ts
        → Create src/middleware/validate.ts
        → Create src/routes/orders.ts (POST + GET)
        → Mount in routes/index.ts
        → TL REVIEW checkpoint

Step 4: BE2.2 — Payment Flow
        → Add payment logic to POST /api/orders (COD auto-confirm, bank transfer info, stubs)
        → Create src/routes/payments.ts (webhook stub)
        → Mount in routes/index.ts
        → TL REVIEW checkpoint

Step 5: BE2.5 — Admin Endpoints
        → Create src/routes/admin/orders.ts
        → Add state machine validation
        → Mount at /api/admin
        → TL REVIEW checkpoint

Step 6: BE2.4 — FE Integration
        → FE: Add types, api functions, update CheckoutClient + OrderSuccessClient
        → Remove sessionStorage workaround
        → Dynamic shipping fee on province change
        → QA test full flow
        → TL REVIEW checkpoint
```

---

## 11. Review Checkpoints

| After | TL Reviews |
|-------|-----------|
| Schema (Step 1) | Order + OrderItem models correct, enums defined, indexes present, migration clean |
| Shipping (Step 2) | Fee calculation correct for all tiers, free shipping threshold works |
| Order Create (Step 3) | Validation catches bad input, order number generated, items saved as snapshots |
| Payment (Step 4) | COD auto-confirms, bank transfer returns info, stubs return friendly message |
| Admin (Step 5) | Pagination works, state machine enforced, invalid transitions rejected |
| FE Integration (Step 6) | Full flow: add to cart → checkout → submit → success page shows order |

---

## 12. Gotchas & Warnings

1. **Server-side price validation:** The server MUST recalculate subtotal/shippingFee/total from item prices and quantities. Never trust client-sent totals. This prevents price manipulation attacks.

2. **Snapshot pattern is critical:** OrderItem stores `productName`, `productImage`, `unitPrice` at order time. If prices change later, old orders keep their original values. Do NOT join to Product table for display.

3. **PostgreSQL autoincrement on non-id field:** `orderSeq Int @default(autoincrement()) @unique` works on PostgreSQL but NOT on SQLite. Ensure we stay on PostgreSQL.

4. **Order number generation is two-step:** Create order → read orderSeq → update orderNumber. Use a Prisma transaction to ensure atomicity.

5. **Province codes for shipping tiers:** HCM = "79", HN = "01" — these are the `sub-vn` package codes (standard Vietnam province codes). Verify against the actual Province table data.

6. **Address validation cascade:** When validating `districtCode`, check it belongs to the given `provinceCode`. When validating `wardCode`, check it belongs to `districtCode`. This prevents mismatched addresses.

7. **No auth on admin endpoints (MVP):** For Sprint 5, admin endpoints have no authentication. This is acceptable for internal use but MUST be addressed before production deployment.

8. **POST /api/orders does not need mock fallback:** Unlike GET content APIs, order creation must go through the real backend. If BE is down, the order fails — this is correct behavior. Show user-friendly error message.

9. **Shipping fee re-fetch on cart change:** If user changes quantity after province is selected, the FE should re-fetch shipping fee (since free shipping threshold depends on subtotal). Add a `useEffect` dependency on `totalPrice`.

10. **Race condition on orderSeq:** PostgreSQL autoincrement is atomic — no race condition. But the two-step (create → update orderNumber) should be wrapped in `prisma.$transaction()` to prevent partial states.

11. **From Sprint 4 retro:** Verify data consistency (province codes "79"/"01" match DB) before approving seed. Run the shipping fee calculation against test cases.

---

## 13. Test Cases for QA

### Shipping Fee
- HCM province (79) + subtotal 500K → fee 25,000₫, "1-2 ngày"
- HN province (01) + subtotal 500K → fee 25,000₫, "1-2 ngày"
- Đà Nẵng (48) + subtotal 500K → fee 35,000₫, "3-5 ngày"
- Any province + subtotal 1,000,000₫ → fee 0₫ (free)
- Any province + subtotal 999,999₫ → fee applies

### Order Creation
- Happy path: valid payload → 201, orderNumber starts with "XT-"
- Empty cart → 400
- Missing phone → 400
- Invalid phone "abc" → 400
- Invalid province code → 404
- District not in province → 400
- COD payment → status CONFIRMED
- Bank transfer → status PENDING + paymentInfo included
- MoMo/VNPay/ZaloPay → status PENDING + stub message

### Admin
- List orders → paginated, sorted by createdAt desc
- Filter by status → only matching orders
- Valid transition PENDING→CONFIRMED → 200
- Invalid transition DELIVERED→PENDING → 400
- Non-existent order ID → 404

### FE Integration
- Province change → shipping fee updates dynamically
- Submit checkout → redirects to success page with orderNumber in URL
- Success page → shows order details fetched from API
- Bank transfer order → success page shows bank info + QR
- Empty cart → cannot access checkout page
