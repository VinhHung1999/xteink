"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Gift, Users, ShoppingBag, Share2 } from "lucide-react";
import { trackShare } from "@/utils/analytics";

const MOCK_REFERRAL_LINK = "https://xteink.hungphu.work/ref/abc123";

const REWARD_TIERS = [
  {
    range: "1–3 người",
    reward: "Giảm 50.000₫",
    description: "Mỗi bạn bè mua hàng, bạn nhận voucher 50K cho lần mua tiếp.",
    icon: Gift,
    highlight: false,
  },
  {
    range: "4–10 người",
    reward: "Giảm 100.000₫",
    description: "Voucher nâng lên 100K + miễn phí giao hàng cho mỗi đơn tiếp theo.",
    icon: Users,
    highlight: true,
  },
  {
    range: "11+ người",
    reward: "Tặng X4 miễn phí",
    description: "Giới thiệu 11 người trở lên — nhận 1 Xteink X4 miễn phí!",
    icon: ShoppingBag,
    highlight: false,
  },
];

const STEPS = [
  { step: "1", title: "Chia sẻ link", desc: "Gửi link giới thiệu qua Zalo, Facebook, hoặc copy link." },
  { step: "2", title: "Bạn bè mua hàng", desc: "Khi bạn bè mua qua link của bạn, hệ thống tự ghi nhận." },
  { step: "3", title: "Nhận thưởng", desc: "Cả hai cùng nhận ưu đãi — bạn giới thiệu và người được giới thiệu." },
];

export default function ReferralClient() {
  const [copied, setCopied] = useState(false);
  const [supportsShare, setSupportsShare] = useState(false);

  useEffect(() => {
    setSupportsShare("share" in navigator);
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(MOCK_REFERRAL_LINK);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackShare("copy_link", "referral");
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = MOCK_REFERRAL_LINK;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackShare("copy_link", "referral");
    }
  }

  function shareZalo() {
    trackShare("zalo", "referral");
    window.open(
      `https://zalo.me/share?url=${encodeURIComponent(MOCK_REFERRAL_LINK)}&title=${encodeURIComponent("Mời bạn dùng Xteink X4 — máy đọc sách nhỏ gọn nhất!")}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function shareFacebook() {
    trackShare("facebook", "referral");
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(MOCK_REFERRAL_LINK)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  async function shareNative() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Xteink X4 — Máy đọc sách bỏ túi",
          text: "Mời bạn dùng thử Xteink X4! Cả hai cùng nhận ưu đãi.",
          url: MOCK_REFERRAL_LINK,
        });
        trackShare("native_share", "referral");
      } catch {
        // User cancelled share
      }
    }
  }

  return (
    <div className="bg-mysterious min-h-screen">
      {/* Hero */}
      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="scroll-reveal text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
            Giới thiệu bạn bè
          </p>
          <h1 className="scroll-reveal scroll-d1 mt-4 font-heading text-3xl font-bold tracking-[-0.01em] text-paper md:text-5xl md:leading-[1.1]">
            Mời bạn bè, cùng nhận thưởng
          </h1>
          <p className="scroll-reveal scroll-d2 mt-5 text-base text-paper/60 leading-relaxed md:text-lg">
            Chia sẻ Xteink với bạn bè. Khi họ mua hàng, cả hai cùng nhận ưu đãi.
          </p>

          {/* Share link box */}
          <div className="scroll-reveal scroll-d3 mx-auto mt-10 max-w-lg">
            <div className="glass-card rounded-2xl p-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-warm-cream/50">
                Link giới thiệu của bạn
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 overflow-hidden rounded-lg bg-white/[0.05] px-4 py-3">
                  <p className="truncate text-sm text-paper/80 font-mono">
                    {MOCK_REFERRAL_LINK}
                  </p>
                </div>
                <button
                  onClick={copyLink}
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    copied
                      ? "bg-green-500/20 text-green-400"
                      : "btn-glass-primary text-[#1A1A1A]"
                  }`}
                  aria-label={copied ? "Đã copy" : "Copy link giới thiệu"}
                  data-testid="referral-copy-btn"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>

              {/* Social share buttons */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  onClick={shareZalo}
                  className="btn-glass-secondary flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium text-paper/80"
                  data-testid="referral-share-zalo"
                >
                  Zalo
                </button>
                <button
                  onClick={shareFacebook}
                  className="btn-glass-secondary flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium text-paper/80"
                  data-testid="referral-share-facebook"
                >
                  Facebook
                </button>
                {supportsShare && (
                  <button
                    onClick={shareNative}
                    className="btn-glass-secondary flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium text-paper/80"
                  >
                    <Share2 size={14} />
                    Chia sẻ
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reward Tiers */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center">
            <p className="scroll-reveal text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
              Phần thưởng
            </p>
            <h2 className="scroll-reveal scroll-d1 mt-4 font-heading text-2xl font-bold text-paper md:text-4xl">
              Càng giới thiệu, càng nhận nhiều
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {REWARD_TIERS.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.range}
                  className={`scroll-reveal scroll-d${i + 2} glass-card rounded-2xl p-6 text-center ${
                    tier.highlight ? "border border-gold/30 ring-1 ring-gold/10" : ""
                  }`}
                >
                  {tier.highlight && (
                    <span className="mb-4 inline-block rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                      Phổ biến nhất
                    </span>
                  )}
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10">
                    <Icon size={28} className="text-gold" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-warm-cream/50">
                    {tier.range}
                  </p>
                  <p className="mt-2 font-heading text-xl font-bold text-paper">
                    {tier.reward}
                  </p>
                  <p className="mt-3 text-sm text-paper/60 leading-relaxed">
                    {tier.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-[820px]">
          <div className="text-center">
            <p className="scroll-reveal text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
              Cách thức
            </p>
            <h2 className="scroll-reveal scroll-d1 mt-4 font-heading text-2xl font-bold text-paper md:text-4xl">
              3 bước đơn giản
            </h2>
          </div>

          <div className="mt-12 space-y-6">
            {STEPS.map((s, i) => (
              <div
                key={s.step}
                className={`scroll-reveal scroll-d${i + 2} flex items-start gap-5`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 font-heading text-lg font-bold text-gold">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-paper">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-paper/60 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral FAQ */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-[820px]">
          <h2 className="scroll-reveal font-heading text-2xl font-bold text-paper md:text-3xl text-center">
            Câu hỏi về chương trình
          </h2>
          <div className="mt-10 space-y-4">
            {[
              { q: "Ai có thể tham gia?", a: "Bất kỳ ai đã mua sản phẩm Xteink đều có thể nhận link giới thiệu và chia sẻ." },
              { q: "Phần thưởng được tính thế nào?", a: "Mỗi khi bạn bè mua hàng qua link của bạn, hệ thống tự ghi nhận. Voucher sẽ gửi qua email trong 24 giờ." },
              { q: "Bạn bè tôi được gì?", a: "Người được giới thiệu cũng nhận giảm 50.000₫ cho đơn hàng đầu tiên." },
              { q: "Có giới hạn số người giới thiệu?", a: "Không giới hạn! Càng giới thiệu nhiều, phần thưởng càng lớn." },
            ].map((faq, i) => (
              <div key={i} className={`scroll-reveal scroll-d${Math.min(i + 2, 7)} glass-card rounded-xl px-6 py-5`}>
                <h3 className="font-body text-sm font-semibold text-paper md:text-base">
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm text-paper/60 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
