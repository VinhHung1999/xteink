/* ─── Analytics Utilities ─── */
/* GA4 + FB Pixel event helpers. Safe to call even if scripts haven't loaded. */

// Extend window for GA4 + FB Pixel
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

/* ── GA4 ── */

export function gtagEvent(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
}

/* ── FB Pixel ── */

export function fbEvent(
  action: string,
  params?: Record<string, string | number>
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", action, params);
  }
}

/* ── Unified Event Helpers ── */

export function trackCTAClick(ctaName: string, location: string) {
  gtagEvent("cta_click", { cta_name: ctaName, location });
  fbEvent("Lead", { content_name: ctaName });
}

export function trackAddToCart(
  productName: string,
  price: number,
  currency = "VND"
) {
  gtagEvent("add_to_cart", {
    currency,
    value: price,
    items_name: productName,
  });
  fbEvent("AddToCart", { content_name: productName, value: price, currency });
}

export function trackPurchase(
  orderId: string,
  total: number,
  currency = "VND"
) {
  gtagEvent("purchase", {
    transaction_id: orderId,
    value: total,
    currency,
  });
  fbEvent("Purchase", { value: total, currency });
}

export function trackNewsletterSignup(location: string) {
  gtagEvent("newsletter_signup", { location });
  fbEvent("CompleteRegistration", { content_name: "newsletter" });
}

export function trackShare(method: string, contentType: string) {
  gtagEvent("share", { method, content_type: contentType });
}

export function trackScrollDepth(percent: number) {
  gtagEvent("scroll_depth", { percent });
}

export function trackTimeOnPage(seconds: number, page: string) {
  gtagEvent("time_on_page", { seconds, page });
}
