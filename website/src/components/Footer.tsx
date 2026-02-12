import Link from "next/link";
import { Mail } from "lucide-react";
import { use } from "react";
import { getFooterData } from "@/services/api";

export default function Footer() {
  const footer = use(getFooterData());
  return (
    <footer id="footer" className="px-6 py-16 md:py-20" style={{ background: 'rgba(45,45,45,0.8)', borderTop: '1px solid rgba(212,165,116,0.15)' }}>
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-10 md:grid-cols-4 md:gap-8">
          {/* Brand */}
          <div className="scroll-reveal scroll-d1">
            <Link
              href="/"
              className="font-heading text-xl font-semibold tracking-tight text-paper"
            >
              Xteink
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-warm-cream/70">
              Permission to be quiet.
              <br />
              Máy đọc sách cho người Việt yêu sách.
            </p>
          </div>

          {/* Products */}
          <div className="scroll-reveal scroll-d2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-warm-cream/50">
              Sản phẩm
            </h4>
            <ul className="mt-4 space-y-3">
              {footer.productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-cream/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="scroll-reveal scroll-d3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-warm-cream/50">
              Hỗ trợ
            </h4>
            <ul className="mt-4 space-y-3">
              {footer.supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-cream/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="scroll-reveal scroll-d4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-warm-cream/50">
              Tham gia hội đọc sách
            </h4>
            <p className="mt-4 text-sm text-warm-cream/60">
              Nhận tin về sách hay và ưu đãi đặc biệt.
            </p>
            <form
              className="mt-4 flex gap-2"
              action="#"
            >
              <input
                type="email"
                placeholder="email@example.com"
                className="glass-input h-11 flex-1 rounded-lg px-3 text-sm text-paper placeholder:text-warm-cream/30 focus:outline-none"
              />
              <button
                type="submit"
                className="btn-glass-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#1A1A1A]"
                aria-label="Đăng ký"
              >
                <Mail size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="scroll-reveal scroll-d5 mt-12 flex flex-col items-center gap-4 border-t border-[rgba(232,224,214,0.06)] pt-8 md:flex-row md:justify-between">
          <p className="text-xs text-warm-cream/40">
            &copy; 2025 Xteink. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-warm-cream/40">
              Thanh toán:
            </span>
            {footer.paymentMethods.map((method) => (
              <span
                key={method}
                className="glass-badge rounded-md px-2 py-1 text-xs text-warm-cream/60"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
