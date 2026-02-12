# Sprint 5 Test Plan - Order + Payment

**Sprint Goal:** Order API + Payment Processing + Shipping + Admin Management
**QA Lead:** QA (Quality Assurance)
**Date:** 2026-02-12

---

## Test Strategy

### Pre-Test Requirements (Sprint 4 Retro Action)

**Health Check Protocol:**
1. ✅ Backend server health: `GET /api/health` → 200 OK
2. ✅ Frontend server health: `curl http://localhost:2002` → 200 OK
3. ✅ Database connectivity: Backend logs show DB connection
4. ✅ Test environment: All services running

**Test Preconditions Documentation:**
- Each test case will document required preconditions
- State setup (cart items, user data) documented explicitly
- No assumptions - clear requirements stated upfront

---

## BE2.1: POST /api/orders (Order Creation API)

**Endpoint:** `POST /api/orders`
**Priority:** P0 (Critical)
**Preconditions:** Backend running on port 3001, database seeded

### Test Cases

#### TC2.1.1: Valid Order Creation ✅
**Preconditions:**
- Cart has items (at least 1 product)
- Valid customer information provided
- Valid shipping address (province/district/ward)
- Valid payment method selected

**Test Data:**
```json
{
  "customerInfo": {
    "name": "Nguyễn Văn A",
    "email": "test@example.com",
    "phone": "0912345678"
  },
  "shippingAddress": {
    "province": "79",
    "district": "760",
    "ward": "26734",
    "street": "123 Đường Test"
  },
  "paymentMethod": "cod",
  "items": [
    {"productId": "x4", "quantity": 1, "price": 1590000}
  ]
}
```

**Expected:**
- HTTP 201 Created
- Order ID returned
- Order status: "pending"
- Total calculated correctly

**Assertions:**
- Response contains `orderId`
- Response contains `orderNumber` (readable format)
- Response contains `status`: "pending"
- Response contains `total` matching cart calculation
- Database has new order record

---

#### TC2.1.2: Empty Cart Order ❌
**Preconditions:** None

**Test Data:**
```json
{
  "customerInfo": {...},
  "shippingAddress": {...},
  "paymentMethod": "cod",
  "items": []
}
```

**Expected:**
- HTTP 400 Bad Request
- Error message: "Cart is empty" or similar
- No order created in database

---

#### TC2.1.3: Missing Required Fields ❌
**Preconditions:** None

**Test Scenarios:**
- Missing `customerInfo.name` → 400
- Missing `customerInfo.email` → 400
- Missing `customerInfo.phone` → 400
- Missing `shippingAddress.province` → 400
- Missing `paymentMethod` → 400
- Missing `items` → 400

**Expected for all:**
- HTTP 400 Bad Request
- Error message specifying missing field
- No order created

---

#### TC2.1.4: Invalid Payment Method ❌
**Test Data:**
```json
{
  ...
  "paymentMethod": "invalid_method"
}
```

**Expected:**
- HTTP 400 Bad Request
- Error message: "Invalid payment method"
- Valid methods: cod, momo, zalopay, vnpay, bank

---

#### TC2.1.5: Invalid Address Codes ❌
**Test Data:**
```json
{
  ...
  "shippingAddress": {
    "province": "999",
    "district": "invalid",
    "ward": "999999"
  }
}
```

**Expected:**
- HTTP 400 Bad Request
- Error message: "Invalid address codes"

---

#### TC2.1.6: Duplicate Order Prevention
**Test:** Submit same order twice quickly (within 1 second)

**Expected:**
- First request: 201 Created
- Second request: 409 Conflict OR 201 with same order ID (idempotency)

---

## BE2.2: Payment Flow

**Priority:** P0 (Critical)
**Preconditions:** Order created via BE2.1

### Test Cases

#### TC2.2.1: COD Auto-Confirmation ✅
**Test:** Create order with `paymentMethod: "cod"`

**Expected:**
- Order status immediately: "confirmed" (no payment verification needed)
- No payment webhook required
- Order ready for fulfillment

---

#### TC2.2.2: Bank Transfer Response
**Test:** Create order with `paymentMethod: "bank"`

**Expected:**
- Order status: "pending_payment"
- Response includes bank account details for transfer
- Response includes QR code URL (optional)
- Response includes transfer reference code

**Response Format:**
```json
{
  "orderId": "...",
  "status": "pending_payment",
  "paymentInstructions": {
    "method": "bank",
    "bankName": "...",
    "accountNumber": "...",
    "accountName": "...",
    "amount": 1590000,
    "transferContent": "XTEINK ORDER12345",
    "qrCodeUrl": "..."
  }
}
```

---

#### TC2.2.3: MoMo/ZaloPay/VNPay Webhook Stub
**Test:** Simulate payment gateway webhook

**Webhook Endpoint:** `POST /api/webhooks/payment`

**Test Data:**
```json
{
  "orderId": "...",
  "paymentMethod": "momo",
  "transactionId": "MOMO123456",
  "status": "success",
  "amount": 1590000,
  "signature": "..."
}
```

**Expected:**
- HTTP 200 OK
- Order status updated to "confirmed"
- Payment record created
- Transaction ID stored

**Edge Cases:**
- Invalid signature → 401 Unauthorized
- Order not found → 404 Not Found
- Amount mismatch → 400 Bad Request

---

## BE2.3: Shipping Fee Calculation

**Priority:** P0 (Critical)
**Preconditions:** Address API working (BE1.3)

### Test Cases

#### TC2.3.1: HCM/HN Tier (Tier 1) 🏙️
**Test Data:**
- Province: "79" (HCM) OR "01" (Hanoi)
- Order total: 500,000đ

**Expected:**
- Shipping fee: 30,000đ (Tier 1 rate)
- Final total: 530,000đ

---

#### TC2.3.2: Other Provinces (Tier 2) 🏞️
**Test Data:**
- Province: "48" (Da Nang) OR any province not HCM/HN
- Order total: 500,000đ

**Expected:**
- Shipping fee: 50,000đ (Tier 2 rate)
- Final total: 550,000đ

---

#### TC2.3.3: Free Shipping Threshold 🎁
**Test Data:**
- Any province
- Order total: 1,000,000đ or more

**Expected:**
- Shipping fee: 0đ
- Final total: Order total (no shipping added)
- Response includes: `freeShipping: true`

---

#### TC2.3.4: Calculation API
**Endpoint:** `POST /api/shipping/calculate`

**Test Data:**
```json
{
  "provinceCode": "79",
  "orderTotal": 500000
}
```

**Expected:**
```json
{
  "shippingFee": 30000,
  "freeShipping": false,
  "tier": "tier1"
}
```

---

## BE2.4: FE Checkout → Real API (End-to-End)

**Priority:** P0 (Critical)
**Preconditions:** Cart has items, all backend APIs working

### Test Flow

1. **Add items to cart** (via frontend UI)
   - Navigate to `/products`
   - Click "Thêm vào giỏ" on X4 product
   - Verify cart shows 1 item

2. **Navigate to checkout** (`/checkout`)
   - Verify checkout form renders
   - Verify address cascade (province → district → ward)
   - Verify payment methods (5 options)

3. **Fill checkout form**
   - Customer info: Name, Email, Phone
   - Address: Select province → district → ward
   - Street address
   - Payment method: COD

4. **Submit order**
   - Click "Đặt hàng" button
   - Wait for API response

5. **Verify success**
   - Redirect to `/checkout/success`
   - Order number displayed
   - Order confirmation message
   - Backend: Order created in database

### Test Cases

#### TC2.4.1: Complete Checkout Flow (COD) ✅
**Expected:**
- All steps complete successfully
- Order created in backend
- Frontend shows success page
- No console errors
- API calls: POST /api/orders → 201

---

#### TC2.4.2: Complete Checkout Flow (Bank Transfer)
**Expected:**
- Order created
- Success page shows bank account details
- Transfer instructions displayed
- QR code shown (if available)

---

#### TC2.4.3: Form Validation
**Test:** Submit with missing fields

**Expected:**
- Form shows validation errors
- No API call made
- User stays on checkout page

---

#### TC2.4.4: Network Error Handling
**Test:** Stop backend before submitting

**Expected:**
- Error message shown to user
- User stays on checkout page
- Can retry after backend restored

---

## BE2.5: Admin Order Management

**Priority:** P1 (High)
**Preconditions:** Admin logged in, orders exist in database

### Test Cases

#### TC2.5.1: List All Orders
**Endpoint:** `GET /api/admin/orders`

**Expected:**
- HTTP 200 OK
- Array of orders
- Each order includes: orderId, orderNumber, customerName, total, status, createdAt

**Pagination:**
- Query params: `?page=1&limit=20`
- Response includes: total count, current page, total pages

---

#### TC2.5.2: Filter Orders by Status
**Endpoint:** `GET /api/admin/orders?status=pending`

**Statuses to test:**
- pending
- confirmed
- shipped
- delivered
- cancelled

**Expected:**
- Only orders with matching status returned

---

#### TC2.5.3: Filter Orders by Date Range
**Endpoint:** `GET /api/admin/orders?startDate=2026-01-01&endDate=2026-12-31`

**Expected:**
- Only orders within date range returned
- Orders sorted by date (newest first)

---

#### TC2.5.4: Search Orders by Customer
**Endpoint:** `GET /api/admin/orders?search=Nguyen`

**Expected:**
- Orders where customer name or email matches search term
- Case-insensitive search

---

#### TC2.5.5: Update Order Status
**Endpoint:** `PATCH /api/admin/orders/:orderId`

**Test Data:**
```json
{
  "status": "shipped",
  "trackingNumber": "GHN123456"
}
```

**Expected:**
- HTTP 200 OK
- Order status updated
- Tracking number stored
- Updated timestamp recorded

**Invalid transitions:**
- delivered → pending (should fail)
- cancelled → shipped (should fail)

---

#### TC2.5.6: Get Order Details
**Endpoint:** `GET /api/admin/orders/:orderId`

**Expected:**
- HTTP 200 OK
- Full order details including:
  - Customer info
  - Shipping address (resolved province/district/ward names)
  - Order items
  - Payment method
  - Shipping fee
  - Total
  - Status history
  - Timestamps

---

## Test Execution Order

1. **BE2.1** - Order Creation API (core functionality)
2. **BE2.3** - Shipping Fee Calculation (needed for BE2.1 total)
3. **BE2.2** - Payment Flow (order status transitions)
4. **BE2.4** - FE Integration (end-to-end validation)
5. **BE2.5** - Admin Management (requires orders from BE2.1)

---

## Success Criteria

**All Stories Must:**
- ✅ Pass all test cases (happy path + edge cases)
- ✅ Return correct HTTP status codes
- ✅ Match response schemas
- ✅ Handle errors gracefully
- ✅ No console errors
- ✅ Vietnamese text encoding correct
- ✅ Performance < 500ms per API call

**Sprint 5 Quality Bar:**
- Zero production bugs (maintain Sprint 4 standard)
- All edge cases covered
- Error messages clear and actionable
- Database integrity maintained

---

## Risks & Mitigations

**Risk:** Payment gateway integration complexity
**Mitigation:** Start with webhook stubs, validate signature handling

**Risk:** Order state transitions (status changes)
**Mitigation:** Test invalid transitions explicitly

**Risk:** Concurrent orders (race conditions)
**Mitigation:** Test duplicate order prevention (TC2.1.6)

**Risk:** Shipping fee calculation edge cases
**Mitigation:** Test all tiers + free shipping threshold

---

## Ready for Testing

✅ Test plan complete
✅ Test cases documented
✅ Preconditions specified
✅ Health check protocol defined

**Standing by for story-ready notifications from PO/TL.**
