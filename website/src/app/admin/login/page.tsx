import type { Metadata } from "next";
import AdminLoginClient from "@/components/AdminLoginClient";

export const metadata: Metadata = {
  title: "Đăng nhập Admin — Xteink",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}
