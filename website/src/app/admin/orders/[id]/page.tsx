import type { Metadata } from "next";
import AdminOrderDetailClient from "@/components/AdminOrderDetailClient";

export const metadata: Metadata = {
  title: "Chi tiet don hang — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminOrderDetailClient orderId={id} />;
}
