import type { Metadata } from "next";
import AdminOrderCreateClient from "@/components/AdminOrderCreateClient";

export const metadata: Metadata = {
  title: "Tao don hang — Admin",
  robots: { index: false, follow: false },
};

export default function AdminOrderCreatePage() {
  return <AdminOrderCreateClient />;
}
