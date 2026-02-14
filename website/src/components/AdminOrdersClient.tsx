"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  LogOut,
  RefreshCw,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { getAdminOrders, updateOrderStatus } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import type {
  AdminOrderSummary,
  AdminOrderListResponse,
  OrderStatus,
  OrderTransitions,
} from "@/services/types";

// ===== Constants =====

const STATUS_OPTIONS: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "SHIPPING",
  "DELIVERED",
  "CANCELLED",
];

const STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "Chờ xử lý",
  CONFIRMED: "Đã xác nhận",
  SHIPPING: "Đang giao",
  DELIVERED: "Đã giao",
  CANCELLED: "Đã hủy",
};

const STATUS_COLOR: Record<OrderStatus, string> = {
  PENDING: "bg-gold/20 text-gold",
  CONFIRMED: "bg-sage/20 text-sage",
  SHIPPING: "bg-cyan-500/20 text-cyan-400",
  DELIVERED: "bg-sage/20 text-sage",
  CANCELLED: "bg-red-500/20 text-red-400",
};

const STATUS_FILTER_COLOR: Record<OrderStatus, string> = {
  PENDING: "bg-gold/20 text-gold border-gold/30",
  CONFIRMED: "bg-sage/20 text-sage border-sage/30",
  SHIPPING: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  DELIVERED: "bg-sage/20 text-sage border-sage/30",
  CANCELLED: "bg-red-500/20 text-red-400 border-red-500/30",
};

const PAYMENT_STATUS_COLOR: Record<string, string> = {
  PENDING: "text-gold",
  PAID: "text-sage",
  FAILED: "text-red-400",
};

// Fallback transitions when BE hasn't delivered the transitions field yet
const FALLBACK_FORWARD: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["CONFIRMED"],
  CONFIRMED: ["SHIPPING"],
  SHIPPING: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};
const FALLBACK_REVERSE: Record<OrderStatus, OrderStatus[]> = {
  PENDING: [],
  CONFIRMED: ["PENDING"],
  SHIPPING: ["CONFIRMED"],
  DELIVERED: ["SHIPPING"],
  CANCELLED: ["PENDING"],
};

function getTransitions(order: AdminOrderSummary): OrderTransitions {
  if (order.transitions) return order.transitions;
  return {
    forward: FALLBACK_FORWARD[order.status],
    reverse: FALLBACK_REVERSE[order.status],
  };
}

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

// ===== Status Badge =====

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLOR[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

// ===== Status Dropdown =====

function StatusDropdown({
  order,
  isUpdating,
  onSelect,
}: {
  order: AdminOrderSummary;
  isUpdating: boolean;
  onSelect: (order: AdminOrderSummary, newStatus: OrderStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { forward, reverse } = getTransitions(order);
  // Cancel items are forward items that equal "CANCELLED"
  const forwardNonCancel = forward.filter((s) => s !== "CANCELLED");
  const cancel = forward.filter((s) => s === "CANCELLED");
  const hasOptions =
    forwardNonCancel.length > 0 || reverse.length > 0 || cancel.length > 0;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  if (isUpdating) {
    return <Loader2 size={16} className="animate-spin text-gold" />;
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => hasOptions && setOpen(!open)}
        aria-haspopup={hasOptions ? "menu" : undefined}
        aria-expanded={hasOptions ? open : undefined}
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${STATUS_COLOR[order.status]} ${
          hasOptions ? "cursor-pointer hover:opacity-80" : "cursor-default"
        }`}
        data-testid={`status-dropdown-${order.id}`}
      >
        {STATUS_LABEL[order.status]}
        {hasOptions && (
          <ChevronDown
            size={12}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-1 min-w-[180px] glass-card rounded-xl p-1.5 shadow-xl"
        >
          {/* Forward transitions */}
          {forwardNonCancel.map((s) => (
            <button
              key={s}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onSelect(order, s);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-gold transition-colors hover:bg-gold/10"
              data-testid={`status-${order.id}-${s.toLowerCase()}`}
            >
              <ArrowRight size={14} />
              {STATUS_LABEL[s]}
            </button>
          ))}

          {/* Divider */}
          {forwardNonCancel.length > 0 &&
            (reverse.length > 0 || cancel.length > 0) && (
              <div className="my-1 border-t border-paper/5" />
            )}

          {/* Reverse transitions */}
          {reverse.map((s) => (
            <button
              key={s}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onSelect(order, s);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-paper/40 transition-colors hover:bg-paper/5 hover:text-paper/60"
              data-testid={`status-${order.id}-${s.toLowerCase()}`}
            >
              <RotateCcw size={14} />
              {STATUS_LABEL[s]}
            </button>
          ))}

          {/* Divider before cancel */}
          {reverse.length > 0 && cancel.length > 0 && (
            <div className="my-1 border-t border-paper/5" />
          )}

          {/* Cancel */}
          {cancel.map((s) => (
            <button
              key={s}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onSelect(order, s);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
              data-testid={`status-${order.id}-${s.toLowerCase()}`}
            >
              <XCircle size={14} />
              {STATUS_LABEL[s]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== Confirmation Modal =====

function ConfirmModal({
  order,
  newStatus,
  loading,
  onConfirm,
  onCancel,
}: {
  order: AdminOrderSummary;
  newStatus: OrderStatus;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { reverse } = getTransitions(order);
  const isReverse = reverse.includes(newStatus);
  const isCancel = newStatus === "CANCELLED";

  // Trap focus + Escape to close
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !loading) onCancel();

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [loading, onCancel]);

  // Auto-focus modal on mount
  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        onClick={!loading ? onCancel : undefined}
      />
      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative glass-card rounded-2xl p-6 w-full max-w-sm shadow-2xl outline-none"
      >
        <h3 className="font-heading text-lg font-semibold text-paper">
          Xác nhận đổi trạng thái
        </h3>
        <p className="mt-1 text-xs text-paper/50">
          Đơn hàng {order.orderNumber}
        </p>

        {/* Status transition visual */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <StatusBadge status={order.status} />
          <ArrowRight size={16} className="text-paper/30" />
          <StatusBadge status={newStatus} />
        </div>

        {/* Warning text */}
        {isReverse && (
          <p className="mt-4 rounded-lg bg-gold/10 px-3 py-2 text-xs text-gold">
            Đây là thao tác hoàn trạng thái. Chỉ thực hiện khi có lý do hợp
            lệ.
          </p>
        )}
        {isCancel && (
          <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">
            Hủy đơn hàng không thể hoàn tác. Vui lòng xác nhận.
          </p>
        )}

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-xl border border-paper/10 py-2.5 text-sm font-medium text-paper/60 transition-colors hover:border-paper/20 hover:text-paper disabled:opacity-50"
          >
            Hủy bỏ
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 ${
              isCancel
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                : "bg-gold/20 text-gold hover:bg-gold/30"
            }`}
            data-testid="confirm-status-change"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== Mobile Order Card =====

function OrderCard({
  order,
  isUpdating,
  onStatusSelect,
}: {
  order: AdminOrderSummary;
  isUpdating: boolean;
  onStatusSelect: (order: AdminOrderSummary, newStatus: OrderStatus) => void;
}) {
  return (
    <div className="glass-card rounded-2xl p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-xs text-gold">{order.orderNumber}</p>
          <p className="mt-1 text-sm font-medium text-paper">
            {order.customerName}
          </p>
          <p className="text-xs text-paper/40">{order.customerPhone}</p>
        </div>
        <StatusDropdown
          order={order}
          isUpdating={isUpdating}
          onSelect={onStatusSelect}
        />
      </div>

      <div className="flex items-center justify-between border-t border-paper/5 pt-3">
        <div>
          <span
            className={`text-xs font-medium ${PAYMENT_STATUS_COLOR[order.paymentStatus] || "text-paper/50"}`}
          >
            {order.paymentStatus}
          </span>
          <span className="ml-2 text-xs text-paper/40">
            {order.paymentMethod.toUpperCase()}
          </span>
        </div>
        <p className="text-sm font-semibold text-paper">
          {formatPrice(order.total)}
        </p>
      </div>

      <p className="text-[10px] text-paper/30">
        {formatDate(order.createdAt)}
      </p>
    </div>
  );
}

// ===== Main Component =====

export default function AdminOrdersClient() {
  const [data, setData] = useState<AdminOrderListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "">("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<{
    order: AdminOrderSummary;
    newStatus: OrderStatus;
  } | null>(null);
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
      setError(
        e instanceof Error ? e.message : "Lỗi tải danh sách đơn hàng"
      );
    } finally {
      setLoading(false);
    }
  }, [page, filterStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  function handleStatusSelect(
    order: AdminOrderSummary,
    newStatus: OrderStatus
  ) {
    setConfirmTarget({ order, newStatus });
  }

  async function handleConfirm() {
    if (!confirmTarget) return;
    const { order, newStatus } = confirmTarget;
    setUpdatingId(order.id);
    setConfirmTarget(null);
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
    <div className="bg-mysterious min-h-screen px-4 py-6 md:px-8">
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
              data-testid="admin-logout"
            >
              <LogOut size={14} />
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 glass-card rounded-2xl p-3 flex flex-wrap gap-2">
          <button
            onClick={() => {
              setFilterStatus("");
              setPage(1);
            }}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors border ${
              filterStatus === ""
                ? "bg-paper/10 text-paper border-paper/20"
                : "border-transparent text-paper/40 hover:text-paper/60"
            }`}
          >
            Tất cả
          </button>
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setFilterStatus(s);
                setPage(1);
              }}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors border ${
                filterStatus === s
                  ? STATUS_FILTER_COLOR[s]
                  : "border-transparent text-paper/40 hover:text-paper/60"
              }`}
            >
              {STATUS_LABEL[s]}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 glass-card rounded-2xl px-4 py-3 text-sm text-red-400 border border-red-500/20">
            {error}
          </div>
        )}

        {/* Desktop Table */}
        <div className="mt-6 hidden lg:block glass-card rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-paper/5">
                <th className="px-5 py-4 font-medium text-paper/50">
                  Mã đơn
                </th>
                <th className="px-5 py-4 font-medium text-paper/50">
                  Khách hàng
                </th>
                <th className="px-5 py-4 font-medium text-paper/50">
                  Trạng thái
                </th>
                <th className="px-5 py-4 font-medium text-paper/50">
                  Thanh toán
                </th>
                <th className="px-5 py-4 font-medium text-paper/50 text-right">
                  Tổng tiền
                </th>
                <th className="px-5 py-4 font-medium text-paper/50">
                  Ngày đặt
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <Loader2
                      size={24}
                      className="mx-auto animate-spin text-paper/30"
                    />
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-16 text-center text-paper/40"
                  >
                    Không có đơn hàng nào.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const isUpdating = updatingId === order.id;
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-paper/5 transition-colors hover:bg-gold/[0.03]"
                    >
                      <td className="px-5 py-4 font-mono text-xs text-gold">
                        {order.orderNumber}
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-paper">
                          {order.customerName}
                        </p>
                        <p className="text-xs text-paper/40">
                          {order.customerPhone}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <StatusDropdown
                          order={order}
                          isUpdating={isUpdating}
                          onSelect={handleStatusSelect}
                        />
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-xs font-medium ${PAYMENT_STATUS_COLOR[order.paymentStatus] || "text-paper/50"}`}
                        >
                          {order.paymentStatus}
                        </span>
                        <p className="text-xs text-paper/40">
                          {order.paymentMethod.toUpperCase()}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-right text-sm font-medium text-paper">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-5 py-4 text-xs text-paper/50">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="mt-6 lg:hidden space-y-3">
          {loading && orders.length === 0 ? (
            <div className="glass-card rounded-2xl py-16 text-center">
              <Loader2
                size={24}
                className="mx-auto animate-spin text-paper/30"
              />
            </div>
          ) : orders.length === 0 ? (
            <div className="glass-card rounded-2xl py-16 text-center text-paper/40">
              Không có đơn hàng nào.
            </div>
          ) : (
            orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isUpdating={updatingId === order.id}
                onStatusSelect={handleStatusSelect}
              />
            ))
          )}
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
                className="glass-card flex h-9 w-9 items-center justify-center rounded-xl text-paper/60 transition-colors hover:text-paper disabled:opacity-30"
                aria-label="Trang trước"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() =>
                  setPage((p) =>
                    Math.min(pagination.totalPages, p + 1)
                  )
                }
                disabled={page >= pagination.totalPages}
                className="glass-card flex h-9 w-9 items-center justify-center rounded-xl text-paper/60 transition-colors hover:text-paper disabled:opacity-30"
                aria-label="Trang sau"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmTarget && (
        <ConfirmModal
          order={confirmTarget.order}
          newStatus={confirmTarget.newStatus}
          loading={updatingId === confirmTarget.order.id}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmTarget(null)}
        />
      )}
    </div>
  );
}
