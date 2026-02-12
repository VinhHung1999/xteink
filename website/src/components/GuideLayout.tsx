"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";

export interface GuideSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface GuideLayoutProps {
  title: string;
  subtitle: string;
  sections: GuideSection[];
}

export default function GuideLayout({ title, subtitle, sections }: GuideLayoutProps) {
  const [openSection, setOpenSection] = useState<string | null>(sections[0]?.id ?? null);

  function toggleSection(id: string) {
    setOpenSection((prev) => (prev === id ? null : id));
  }

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        {/* Back link */}
        <Link
          href="/guides"
          className="scroll-reveal inline-flex items-center gap-1.5 text-sm text-paper/50 transition-colors hover:text-gold"
        >
          <ArrowLeft size={14} />
          Tất cả hướng dẫn
        </Link>

        {/* Header */}
        <div className="scroll-reveal scroll-d1 mt-6">
          <h1 className="font-heading text-3xl font-bold text-paper md:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-paper/60 md:text-base">{subtitle}</p>
        </div>

        {/* Desktop: sidebar TOC + content | Mobile: collapsible accordion */}
        <div className="mt-10 grid gap-8 md:grid-cols-[220px_1fr]">
          {/* TOC sidebar — desktop only */}
          <nav className="hidden md:block">
            <div className="sticky top-20 space-y-1">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-gold">
                Mục lục
              </p>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block rounded-lg px-3 py-2 text-sm text-paper/60 transition-colors hover:bg-paper/[0.04] hover:text-paper"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="space-y-4">
            {sections.map((s, i) => (
              <div
                key={s.id}
                id={s.id}
                className={`scroll-reveal scroll-d${Math.min(i + 2, 5)} glass-card rounded-2xl overflow-hidden`}
              >
                {/* Collapsible header — functional on mobile, decorative on desktop */}
                <button
                  onClick={() => toggleSection(s.id)}
                  className="flex w-full items-center justify-between p-5 text-left md:cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-bold text-gold">
                      {i + 1}
                    </span>
                    <h2 className="font-heading text-lg font-semibold text-paper">
                      {s.title}
                    </h2>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-paper/40 transition-transform md:hidden ${
                      openSection === s.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Content — always visible on desktop, collapsible on mobile */}
                <div
                  className={`overflow-hidden transition-all md:!max-h-none md:!opacity-100 ${
                    openSection === s.id
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
                  }`}
                >
                  <div className="border-t border-paper/5 px-5 pb-5 pt-4 text-sm leading-relaxed text-paper/70">
                    {s.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
