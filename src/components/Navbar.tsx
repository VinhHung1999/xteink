"use client";

import { useState, useEffect, use } from "react";
import { Menu, X } from "lucide-react";
import { getNavLinks } from "@/services/api";

export default function Navbar() {
  const navLinks = use(getNavLinks());
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      {/* Floating pill navbar — Apple Liquid Glass */}
      <nav
        className={`animate-slide-down fixed top-0 md:top-4 left-0 right-0 md:left-4 md:right-4 z-50 glass-nav transition-all duration-300 ease-out ${
          scrolled ? "glass-nav-scrolled" : ""
        } rounded-none md:rounded-3xl`}
      >
        <div className="mx-auto flex h-14 max-w-[1320px] items-center justify-between px-4 md:px-6">
          {/* Mobile: hamburger */}
          <button
            className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 hover:bg-white/20 md:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="Mở menu"
          >
            <Menu size={22} className="text-[#1A1A1A]" strokeWidth={2} />
          </button>

          {/* Logo — Cormorant Garamond */}
          <a
            href="#"
            className="font-heading text-xl font-semibold tracking-tight text-[#1A1A1A]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Xteink
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link-glass text-sm font-medium text-[#1A1A1A]/80 hover:text-[#1A1A1A]"
                style={{ fontWeight: 500 }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#price"
              className="btn-glass-primary ml-2 inline-flex h-10 items-center rounded-xl px-5 text-sm font-semibold text-[#1A1A1A]"
            >
              Bắt đầu đọc
            </a>
          </div>

          {/* Mobile: CTA icon */}
          <a
            href="#price"
            className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 hover:bg-white/20 md:hidden"
            aria-label="Bắt đầu đọc"
          >
            <span className="text-lg font-semibold text-[#D4A574]">→</span>
          </a>
        </div>
      </nav>

      {/* Mobile drawer overlay — with backdrop blur */}
      {drawerOpen && (
        <div
          className="drawer-backdrop fixed inset-0 z-[60] md:hidden"
          style={{ animation: "fade-in 0.2s ease-out" }}
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile drawer — Liquid Glass style */}
      <div
        className={`drawer-glass fixed top-0 left-0 z-[70] h-full w-72 md:hidden ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-out`}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-white/20">
          <span
            className="font-heading text-xl font-semibold tracking-tight text-[#1A1A1A]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Xteink
          </span>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 hover:bg-white/20"
            onClick={() => setDrawerOpen(false)}
            aria-label="Đóng menu"
          >
            <X size={22} className="text-[#1A1A1A]" strokeWidth={2} />
          </button>
        </div>
        <div className="flex flex-col gap-1 px-4 pt-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className="rounded-lg px-4 py-3 text-base font-medium text-[#1A1A1A]/80 hover:text-[#1A1A1A] transition-all duration-300 hover:bg-white/20"
              style={{ fontWeight: 500 }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#price"
            onClick={() => setDrawerOpen(false)}
            className="mt-4 btn-glass-primary inline-flex h-12 items-center justify-center rounded-xl px-5 text-base font-semibold text-[#1A1A1A]"
          >
            Bắt đầu đọc
          </a>
        </div>
      </div>
    </>
  );
}
