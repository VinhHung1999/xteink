import type { Metadata } from "next";
import AdminOrdersClient from "@/components/AdminOrdersClient";

export const metadata: Metadata = {
  title: "Admin — Quản lý đơn hàng",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminOrdersClient />;
}
