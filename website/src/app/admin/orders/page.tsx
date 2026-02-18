import type { Metadata } from "next";
import AdminPageClient from "@/components/AdminPageClient";

export const metadata: Metadata = {
  title: "Quản lý đơn hàng — Admin",
  robots: { index: false, follow: false },
};

export default function AdminOrdersPage() {
  return <AdminPageClient />;
}
