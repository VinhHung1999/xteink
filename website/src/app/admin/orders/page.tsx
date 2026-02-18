import type { Metadata } from "next";
import AdminPageClient from "@/components/AdminPageClient";

export const metadata: Metadata = {
  title: "Quan ly don hang — Admin",
  robots: { index: false, follow: false },
};

export default function AdminOrdersPage() {
  return <AdminPageClient />;
}
