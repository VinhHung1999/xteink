"use client";

import { useState, useEffect } from "react";

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show CTA after scrolling past hero (600px)
      // Hide when reaching pricing section
      const pricingSection = document.getElementById("price");
      const scrollY = window.scrollY;
      const pricingTop = pricingSection?.offsetTop || 9999;

      setVisible(scrollY > 600 && scrollY < pricingTop - 100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Check initial state
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
      <a
        href="#price"
        className="btn-glass-primary flex h-14 w-full items-center justify-center rounded-xl text-base font-semibold text-[#1A1A1A] shadow-lg"
        style={{
          animation: "slide-up 0.3s ease-out",
        }}
      >
        Bắt đầu đọc — 1.590.000₫
      </a>
    </div>
  );
}
