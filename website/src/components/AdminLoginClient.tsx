"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLoginClient() {
  const { login, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If already admin, redirect to dashboard
  useEffect(() => {
    if (!authLoading && isAdmin) {
      router.replace("/admin");
    }
  }, [authLoading, isAdmin, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Vui lòng nhập email và mật khẩu");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login({ email: email.trim(), password });
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111]">
        <Loader2 size={32} className="animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
            <Lock size={20} className="text-gold" />
          </div>
          <h1 className="mt-4 font-heading text-2xl font-bold text-paper">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-paper/50">
            Đăng nhập để quản lý đơn hàng
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
          data-testid="admin-login-form"
        >
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-paper/60">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="admin@xteink.com"
              autoComplete="email"
              className="h-12 w-full rounded-xl border border-paper/10 bg-paper/5 px-4 text-sm text-paper placeholder:text-paper/30 focus:border-gold/40 focus:outline-none"
              data-testid="admin-login-email"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-paper/60">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="••••••••"
              autoComplete="current-password"
              className="h-12 w-full rounded-xl border border-paper/10 bg-paper/5 px-4 text-sm text-paper placeholder:text-paper/30 focus:border-gold/40 focus:outline-none"
              data-testid="admin-login-password"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400" data-testid="admin-login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold font-semibold text-[#1A1A1A] text-sm transition-colors hover:bg-gold/90 disabled:opacity-50"
            data-testid="admin-login-submit"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
