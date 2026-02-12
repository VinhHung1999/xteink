import type { Metadata } from "next";
import { Suspense } from "react";
import { Playfair_Display, Be_Vietnam_Pro, Great_Vibes } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZaloWidget from "@/components/ZaloWidget";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair-display",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin", "vietnamese"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

const SITE_URL = "https://xteink.hungphu.work";
const OG_IMAGE = `${SITE_URL}/images/home/hero_banner/redefining_portable_reading_hero_banner.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Xteink X4 — Đọc sách, theo cách của bạn",
    template: "%s | Xteink",
  },
  description:
    "Thư viện bỏ túi nhẹ hơn một bộ bài. Máy đọc sách e-ink 4.3 inch, 74g, gắn nam châm lên điện thoại. Chỉ 1.590.000₫.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Xteink",
    title: "Xteink X4 — Đọc sách, theo cách của bạn",
    description:
      "Thư viện bỏ túi nhẹ hơn một bộ bài. Máy đọc sách e-ink 4.3 inch, 74g, gắn nam châm lên điện thoại.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Xteink X4 eReader" }],
  },
  alternates: {
    languages: { "vi-VN": SITE_URL },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${playfairDisplay.variable} ${beVietnam.variable} ${greatVibes.variable} antialiased`}
      >
        <CartProvider>
          <Suspense>
            <Navbar />
          </Suspense>
          {children}
          <Suspense>
            <Footer />
          </Suspense>
          <Suspense>
            <ZaloWidget />
          </Suspense>
          <ScrollRevealProvider />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
