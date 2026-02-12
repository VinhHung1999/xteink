"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return; // bot trap

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Vui lòng nhập email hợp lệ");
      return;
    }

    // Mock submit — in production, POST to API
    setSubmitted(true);
    setError("");
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 mt-4 animate-fade-up">
        <CheckCircle size={16} className="text-green-400 shrink-0" />
        <p className="text-sm text-green-400/80">Đăng ký thành công!</p>
      </div>
    );
  }

  return (
    <form className="mt-4" onSubmit={handleSubmit} noValidate>
      {/* Honeypot — hidden from humans, visible to bots */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] opacity-0 h-0 w-0"
        aria-hidden="true"
      />
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder="email@example.com"
          aria-label="Địa chỉ email"
          className="glass-input h-11 flex-1 rounded-lg px-3 text-sm text-paper placeholder:text-warm-cream/40 focus:outline-none"
        />
        <button
          type="submit"
          className="btn-glass-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#1A1A1A]"
          aria-label="Đăng ký nhận tin"
        >
          <Mail size={16} />
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </form>
  );
}
