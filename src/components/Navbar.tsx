"use client";

import { useState, useEffect, use } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
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
      <nav
        className={`animate-slide-down fixed top-0 md:top-4 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-[1320px] z-50 glass-nav transition-all duration-200 ease-out ${
          scrolled ? "glass-nav-scrolled" : ""
        } md:rounded-2xl`}
      >
        <div className="mx-auto flex h-14 max-w-[1320px] items-center justify-between px-4 md:px-6">
          {/* Mobile: hamburger */}
          <button
            className="flex h-11 w-11 items-center justify-center md:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="Mở menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <a
            href="#"
            className="font-heading text-xl font-semibold tracking-tight text-paper"
          >
            Xteink
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-paper/70 transition-colors duration-200 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#price"
              className="btn-glass-primary inline-flex h-11 items-center rounded-xl px-5 text-sm font-semibold text-[#1A1A1A]"
            >
              Bắt đầu đọc
            </a>
          </div>

          {/* Mobile: cart */}
          <a
            href="#price"
            className="flex h-11 w-11 items-center justify-center md:hidden"
            aria-label="Giỏ hàng"
          >
            <ShoppingBag size={20} />
          </a>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-[60] bg-[#1A1A1A]/50 backdrop-blur-sm md:hidden"
          style={{ animation: "fade-in 0.2s ease-out" }}
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 left-0 z-[70] h-full w-72 md:hidden ${
          drawerOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } transition-transform duration-300 ease-out`}
        style={{ background: 'rgba(26,26,26,0.92)', backdropFilter: 'blur(24px) saturate(1.4)', WebkitBackdropFilter: 'blur(24px) saturate(1.4)', boxShadow: '4px 0 32px rgba(0,0,0,0.2)', borderRight: '1px solid rgba(232,224,214,0.03)' }}
      >
        <div className="flex h-14 items-center justify-between px-4">
          <span className="font-heading text-xl font-semibold tracking-tight">
            Xteink
          </span>
          <button
            className="flex h-11 w-11 items-center justify-center"
            onClick={() => setDrawerOpen(false)}
            aria-label="Đóng menu"
          >
            <X size={22} />
          </button>
        </div>
        <div className="flex flex-col gap-1 px-4 pt-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className="rounded-lg px-4 py-3 text-base font-medium text-paper transition-colors hover:bg-[rgba(212,165,116,0.08)] hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#price"
            onClick={() => setDrawerOpen(false)}
            className="mt-4 btn-glass-primary inline-flex h-12 items-center justify-center rounded-xl px-5 text-base font-medium text-[#1A1A1A]"
          >
            Bắt đầu đọc
          </a>
        </div>
      </div>
    </>
  );
}
