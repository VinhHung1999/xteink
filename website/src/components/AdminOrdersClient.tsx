"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Loader2, LogOut, RefreshCw } from "lucide-react";
import { getAdminOrders, updateOrderStatus } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import type { AdminOrderSummary, AdminOrderListResponse, OrderStatus } from "@/services/types";

const STATUS_OPTIONS: OrderStatus[] = ["PENDING", "CONFIRMED", "SHIPPING", "DELIVERED", "CANCELLED"];

const STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "Chờ xử lý",
  CONFIRMED: "Đã xác nhận",
  SHIPPING: "Đang giao",
  DELIVERED: "Đã giao",
  CANCELLED: "Đã hủy",
};

const STATUS_COLOR: Record<OrderStatus, string> = {
  PENDING: "bg-amber-500/20 text-amber-400",
  CONFIRMED: "bg-blue-500/20 text-blue-400",
  SHIPPING: "bg-cyan-500/20 text-cyan-400",
  DELIVERED: "bg-green-500/20 text-green-400",
  CANCELLED: "bg-red-500/20 text-red-400",
};

const PAYMENT_STATUS_COLOR: Record<string, string> = {
  PENDING: "text-amber-400",
  PAID: "text-green-400",
  FAILED: "text-red-400",
};

const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["SHIPPING", "CANCELLED"],
  SHIPPING: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "₫";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminOrdersClient() {
  const [data, setData] = useState<AdminOrderListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "">("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const router = useRouter();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getAdminOrders(
        page,
        20,
        filterStatus || undefined
      );
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  }, [page, filterStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  async function handleStatusUpdate(order: AdminOrderSummary, newStatus: OrderStatus) {
    setUpdatingId(order.id);
    try {
      await updateOrderStatus(order.id, newStatus);
      await fetchOrders();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Lỗi cập nhật trạng thái");
    } finally {
      setUpdatingId(null);
    }
  }

  const pagination = data?.pagination;
  const orders = data?.orders ?? [];

  return (
    <div className="min-h-screen bg-[#111] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-paper md:text-3xl">
              Quản lý đơn hàng
            </h1>
            {pagination && (
              <p className="mt-1 text-sm text-paper/50">
                {pagination.total} đơn hàng
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <span className="text-xs text-paper/40">{user.email}</span>
            )}
            <button
              onClick={fetchOrders}
              disabled={loading}
              className="flex h-10 items-center gap-2 rounded-lg border border-paper/10 px-4 text-sm text-paper/70 transition-colors hover:border-gold/30 hover:text-paper disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Làm mới
            </button>
            <button
              onClick={async () => { await logout(); router.replace("/admin/login"); }}
              className="flex h-10 items-center gap-2 rounded-lg border border-red-500/20 px-4 text-sm text-red-400 transition-colors hover:border-red-500/40 hover:text-red-300"
              data-testid="admin-logout"
            >
              <LogOut size={14} />
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => { setFilterStatus(""); setPage(1); }}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              filterStatus === ""
                ? "bg-gold/20 text-gold"
                : "bg-paper/5 text-paper/50 hover:text-paper/80"
            }`}
          >
            Tất cả
          </button>
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => { setFilterStatus(s); setPage(1); }}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                filterStatus === s
                  ? "bg-gold/20 text-gold"
                  : "bg-paper/5 text-paper/50 hover:text-paper/80"
              }`}
            >
              {STATUS_LABEL[s]}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-paper/5">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-paper/5 bg-paper/[0.02]">
                <th className="px-4 py-3 font-medium text-paper/50">Mã đơn</th>
                <th className="px-4 py-3 font-medium text-paper/50">Khách hàng</th>
                <th className="px-4 py-3 font-medium text-paper/50">Trạng thái</th>
                <th className="px-4 py-3 font-medium text-paper/50">Thanh toán</th>
                <th className="px-4 py-3 font-medium text-paper/50 text-right">Tổng tiền</th>
                <th className="px-4 py-3 font-medium text-paper/50">Ngày đặt</th>
                <th className="px-4 py-3 font-medium text-paper/50">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loading && orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center">
                    <Loader2 size={24} className="mx-auto animate-spin text-paper/30" />
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center text-paper/40">
                    Không có đơn hàng nào.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const transitions = VALID_TRANSITIONS[order.status];
                  const isUpdating = updatingId === order.id;
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-paper/5 transition-colors hover:bg-paper/[0.02]"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-gold">
                        {order.orderNumber}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-paper">{order.customerName}</p>
                        <p className="text-xs text-paper/40">{order.customerPhone}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            STATUS_COLOR[order.status]
                          }`}
                        >
                          {STATUS_LABEL[order.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium ${PAYMENT_STATUS_COLOR[order.paymentStatus] || "text-paper/50"}`}>
                          {order.paymentStatus}
                        </span>
                        <p className="text-xs text-paper/40">{order.paymentMethod.toUpperCase()}</p>
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-medium text-paper">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-4 py-3 text-xs text-paper/50">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        {isUpdating ? (
                          <Loader2 size={16} className="animate-spin text-gold" />
                        ) : transitions.length > 0 ? (
                          <div className="flex gap-1.5">
                            {transitions.map((t) => (
                              <button
                                key={t}
                                onClick={() => handleStatusUpdate(order, t)}
                                className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                                  t === "CANCELLED"
                                    ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                                    : "bg-gold/10 text-gold hover:bg-gold/20"
                                }`}
                                data-testid={`status-${order.id}-${t.toLowerCase()}`}
                              >
                                {STATUS_LABEL[t]}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-paper/30">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-paper/40">
              Trang {pagination.page} / {pagination.totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-paper/10 text-paper/60 transition-colors hover:border-gold/30 disabled:opacity-30"
                aria-label="Trang trước"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page >= pagination.totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-paper/10 text-paper/60 transition-colors hover:border-gold/30 disabled:opacity-30"
                aria-label="Trang sau"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
