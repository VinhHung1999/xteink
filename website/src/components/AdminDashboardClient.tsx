"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Package,
  Clock,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Loader2,
  LogOut,
  RefreshCw,
  ChevronRight,
  Plus,
} from "lucide-react";
import { AdminGuard, useAuth } from "@/contexts/AuthContext";
import { getAdminStats, getAdminChart } from "@/services/api";
import type { AdminStats, AdminChartDay } from "@/services/types";

// ===== Helpers =====

function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    return (price / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  return price.toLocaleString("vi-VN") + "\u20ab";
}

function formatPriceFull(price: number): string {
  return price.toLocaleString("vi-VN") + "\u20ab";
}

// ===== Stat Card =====

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: typeof Package;
  label: string;
  value: string;
  sub?: string;
  color: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="text-xs text-paper/50">{label}</p>
          <p className="text-xl font-bold text-paper">{value}</p>
          {sub && <p className="text-[10px] text-paper/30">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

// ===== Bar Chart (Vanilla SVG) =====

function OrdersBarChart({ data }: { data: AdminChartDay[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const maxOrders = Math.max(...data.map((d) => d.orders), 1);

  // Show last 14 days on mobile, all 30 on desktop
  const chartData = data.slice(-30);
  const barWidth = 100 / chartData.length;

  return (
    <div ref={containerRef} className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-paper">
          Đơn hàng 30 ngày
        </h2>
        <p className="text-xs text-paper/40">
          Tổng: {data.reduce((s, d) => s + d.orders, 0)} đơn
        </p>
      </div>

      <div className="mt-4 h-[200px] w-full">
        <svg
          viewBox="0 0 100 50"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((ratio) => (
            <line
              key={ratio}
              x1="0"
              y1={50 - ratio * 45}
              x2="100"
              y2={50 - ratio * 45}
              stroke="rgba(245,240,235,0.05)"
              strokeWidth="0.2"
            />
          ))}

          {/* Bars */}
          {chartData.map((day, i) => {
            const height = (day.orders / maxOrders) * 45;
            const x = i * barWidth + barWidth * 0.15;
            const w = barWidth * 0.7;
            return (
              <g key={day.date}>
                <rect
                  x={x}
                  y={50 - height}
                  width={w}
                  height={Math.max(height, 0.3)}
                  rx="0.5"
                  className={day.orders > 0 ? "fill-gold/60" : "fill-paper/5"}
                />
                <title>
                  {day.date}: {day.orders} đơn — {formatPriceFull(day.revenue)}
                </title>
              </g>
            );
          })}
        </svg>
      </div>

      {/* X-axis labels (every 7 days) */}
      <div className="mt-1 flex justify-between px-1">
        {chartData
          .filter((_, i) => i % 7 === 0 || i === chartData.length - 1)
          .map((day) => (
            <span key={day.date} className="text-[9px] text-paper/30">
              {new Date(day.date).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
              })}
            </span>
          ))}
      </div>
    </div>
  );
}

// ===== Dashboard Content =====

function DashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [chartData, setChartData] = useState<AdminChartDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [statsResult, chartResult] = await Promise.all([
        getAdminStats(),
        getAdminChart(30),
      ]);
      setStats(statsResult);
      setChartData(chartResult.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi tải dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <div className="bg-mysterious min-h-screen px-4 py-6 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-paper md:text-3xl">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-paper/50">
              Tổng quan hoạt động kinh doanh
            </p>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <span className="text-xs text-paper/40">{user.email}</span>
            )}
            <button
              onClick={fetchData}
              disabled={loading}
              className="glass-card flex h-10 items-center gap-2 rounded-xl px-4 text-sm text-paper/70 transition-colors hover:text-paper disabled:opacity-50"
            >
              <RefreshCw
                size={14}
                className={loading ? "animate-spin" : ""}
              />
              Làm mới
            </button>
            <button
              onClick={async () => {
                await logout();
                router.replace("/admin/login");
              }}
              className="flex h-10 items-center gap-2 rounded-xl border border-red-500/20 px-4 text-sm text-red-400 transition-colors hover:border-red-500/40 hover:text-red-300"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 glass-card rounded-2xl px-4 py-3 text-sm text-red-400 border border-red-500/20">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && !stats ? (
          <div className="mt-16 flex justify-center">
            <Loader2 size={32} className="animate-spin text-paper/30" />
          </div>
        ) : stats ? (
          <>
            {/* Stat Cards */}
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              <StatCard
                icon={ShoppingBag}
                label="Đơn hôm nay"
                value={String(stats.ordersToday)}
                color="bg-gold/20 text-gold"
              />
              <StatCard
                icon={Clock}
                label="Chờ xử lý"
                value={String(stats.pendingOrders)}
                color="bg-cyan-500/20 text-cyan-400"
              />
              <StatCard
                icon={Package}
                label="Tổng đơn"
                value={String(stats.totalOrders)}
                color="bg-sage/20 text-sage"
              />
              <StatCard
                icon={DollarSign}
                label="Doanh thu hôm nay"
                value={formatPrice(stats.revenueToday)}
                color="bg-gold/20 text-gold"
              />
              <StatCard
                icon={TrendingUp}
                label="Doanh thu tuần"
                value={formatPrice(stats.revenueThisWeek)}
                color="bg-sage/20 text-sage"
              />
              <StatCard
                icon={DollarSign}
                label="Tổng doanh thu"
                value={formatPrice(stats.totalRevenue)}
                sub={formatPriceFull(stats.totalRevenue)}
                color="bg-gold/20 text-gold"
              />
            </div>

            {/* Chart */}
            {chartData.length > 0 && (
              <div className="mt-6">
                <OrdersBarChart data={chartData} />
              </div>
            )}
          </>
        ) : null}

        {/* Quick Actions */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <button
            onClick={() => router.push("/admin/orders")}
            className="glass-card flex items-center justify-between rounded-2xl p-5 text-left transition-colors hover:bg-gold/[0.03]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/20 text-gold">
                <Package size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-paper">
                  Quản lý đơn hàng
                </p>
                <p className="text-xs text-paper/40">
                  Xem, tìm kiếm, cập nhật trạng thái
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-paper/30" />
          </button>

          <button
            onClick={() => router.push("/admin/orders/create")}
            className="glass-card flex items-center justify-between rounded-2xl p-5 text-left transition-colors hover:bg-gold/[0.03]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage/20 text-sage">
                <Plus size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-paper">
                  Tạo đơn thủ công
                </p>
                <p className="text-xs text-paper/40">
                  Đơn từ Zalo, Facebook DM
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-paper/30" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== Exported Component =====

export default function AdminDashboardClient() {
  return (
    <AdminGuard>
      <DashboardContent />
    </AdminGuard>
  );
}
