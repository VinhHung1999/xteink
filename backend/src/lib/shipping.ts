// Shipping fee calculation — single source of truth
// Used by GET /api/shipping/fee AND POST /api/orders

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
