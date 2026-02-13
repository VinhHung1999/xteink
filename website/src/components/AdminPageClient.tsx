"use client";

import { AdminGuard } from "@/contexts/AuthContext";
import AdminOrdersClient from "./AdminOrdersClient";

export default function AdminPageClient() {
  return (
    <AdminGuard>
      <AdminOrdersClient />
    </AdminGuard>
  );
}
