"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

const ZALO_OA_URL = "https://zalo.me/xteink";

export default function ZaloWidget() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-24 right-4 z-50 md:bottom-8 md:right-8">
      {/* Tooltip */}
      <div
        className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-[#1A1A1A] px-3 py-1.5 text-xs font-medium text-paper shadow-lg transition-all duration-200"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(4px)",
        }}
      >
        Hỗ trợ 5 phút qua Zalo
        <div className="absolute top-full right-4 h-0 w-0 border-x-4 border-t-4 border-x-transparent border-t-[#1A1A1A]" />
      </div>

      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full bg-[#0068FF]"
        style={{ animation: "pulse-ring 2s ease-out infinite" }}
      />

      {/* Button */}
      <a
        href={ZALO_OA_URL}
        target="_blank"
        rel="noopener noreferrer"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg transition-transform duration-200 hover:scale-110"
        aria-label="Chat qua Zalo"
      >
        <MessageCircle size={24} strokeWidth={2} />
      </a>
    </div>
  );
}
