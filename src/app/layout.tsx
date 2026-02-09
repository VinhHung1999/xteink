import type { Metadata } from "next";
import { Playfair_Display, Be_Vietnam_Pro, Great_Vibes } from "next/font/google";
import "./globals.css";

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

const scrollRevealScript = `
document.addEventListener('DOMContentLoaded', function() {
  document.body.setAttribute('data-sr-ready', '');
  var sel = '.scroll-reveal,.scroll-reveal-left,.scroll-reveal-right,.scroll-reveal-scale';
  var io = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('is-visible');
        io.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  var els = document.querySelectorAll(sel);
  for (var j = 0; j < els.length; j++) { io.observe(els[j]); }
});
`;

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
        {children}
        <script dangerouslySetInnerHTML={{ __html: scrollRevealScript }} />
      </body>
    </html>
  );
}
