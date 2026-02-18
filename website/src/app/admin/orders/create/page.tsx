import type { Metadata } from "next";
import AdminOrderCreateClient from "@/components/AdminOrderCreateClient";

export const metadata: Metadata = {
  title: "Tạo đơn hàng — Admin",
  robots: { index: false, follow: false },
};

export default function AdminOrderCreatePage() {
  return <AdminOrderCreateClient />;
}
