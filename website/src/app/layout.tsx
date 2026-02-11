import type { Metadata } from "next";
import { Suspense } from "react";
import { Playfair_Display, Be_Vietnam_Pro, Great_Vibes } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZaloWidget from "@/components/ZaloWidget";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";

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

export const metadata: Metadata = {
  title: "Xteink X4 — Đọc sách, theo cách của bạn",
  description:
    "Thư viện bỏ túi nhẹ hơn một bộ bài. Máy đọc sách e-ink 4.3 inch, 74g, gắn nam châm lên điện thoại. Chỉ 1.590.000₫.",
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
      </body>
    </html>
  );
}
