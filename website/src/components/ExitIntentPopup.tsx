"use client";

import { useState, useEffect, useCallback } from "react";
import { X, BookOpen } from "lucide-react";
import NewsletterForm from "./NewsletterForm";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (dismissed) return;
      // Trigger only when mouse exits top of viewport (exit intent)
      if (e.clientY <= 5) {
        setShow(true);
      }
    },
    [dismissed]
  );

  useEffect(() => {
    // Only on desktop (pointer: fine)
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    if (!isDesktop) return;

    // Don't show if already dismissed this session
    if (sessionStorage.getItem("exit-popup-dismissed")) {
      setDismissed(true);
      return;
    }

    // Delay activation — don't trigger immediately on page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  function dismiss() {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("exit-popup-dismissed", "1");
  }

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/70 backdrop-blur-sm"
      onClick={dismiss}
    >
      <div
        className="relative mx-4 w-full max-w-md animate-fade-up rounded-2xl border border-paper/10 bg-[#1E1E1E] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 rounded-lg p-1.5 text-paper/40 transition-colors hover:text-paper"
          aria-label="Đóng"
        >
          <X size={18} />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 mb-4">
          <BookOpen size={24} className="text-gold" />
        </div>

        <h3 className="font-heading text-xl font-semibold text-paper">
          Đừng bỏ lỡ sách hay
        </h3>
        <p className="mt-2 text-sm text-paper/60 leading-relaxed">
          Đăng ký nhận tin để biết khi nào có sách mới, ưu đãi đặc biệt,
          và mẹo đọc sách từ cộng đồng Xteink.
        </p>

        <NewsletterForm />
      </div>
    </div>
  );
}
