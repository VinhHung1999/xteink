"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR =
  ".scroll-reveal,.scroll-reveal-left,.scroll-reveal-right,.scroll-reveal-scale";

export default function ScrollRevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.setAttribute("data-sr-ready", "");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe all current elements
    const observe = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (!el.classList.contains("is-visible")) {
          io.observe(el);
        }
      });
    };

    observe();

    // Watch for new elements added by client-side navigation
    const mo = new MutationObserver((mutations) => {
      let hasNew = false;
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.matches?.(SELECTOR) || node.querySelector?.(SELECTOR)) {
              hasNew = true;
              break;
            }
          }
        }
        if (hasNew) break;
      }
      if (hasNew) observe();
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]); // Re-run when route changes

  return null;
}
