import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Chính sách vận chuyển — Xteink",
  description: "Giao hàng toàn quốc. HCM 24h, tỉnh khác 2-4 ngày. Miễn phí đơn trên 1 triệu.",
};

export default function ShippingPage() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[720px]">
        <Link
          href="/"
          className="scroll-reveal inline-flex items-center gap-1.5 text-sm text-paper/50 transition-colors hover:text-gold"
        >
          <ArrowLeft size={14} />
          Trang chủ
        </Link>

        <div className="scroll-reveal scroll-d1 mt-6">
          <h1 className="font-heading text-3xl font-bold text-paper md:text-4xl">
            Chính sách vận chuyển
          </h1>
          <p className="mt-2 text-sm text-paper/50">Cập nhật: Tháng 2, 2026</p>
        </div>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-paper/70">
          <div className="scroll-reveal scroll-d2">
            <h2 className="font-heading text-lg font-semibold text-paper mb-3">
              1. Phạm vi giao hàng
            </h2>
            <p>
              Xteink giao hàng toàn quốc — 63 tỉnh thành trên cả nước Việt Nam.
              Đơn hàng được xử lý và gửi đi trong vòng 24h kể từ khi xác nhận thanh toán.
            </p>
          </div>

          <div className="scroll-reveal scroll-d3">
            <h2 className="font-heading text-lg font-semibold text-paper mb-3">
              2. Thời gian giao hàng
            </h2>
            <div className="glass-card rounded-xl overflow-hidden">
              {[
                { region: "Nội thành TP.HCM", time: "Trong ngày — 24h", fee: "25.000₫" },
                { region: "Nội thành Hà Nội", time: "1-2 ngày làm việc", fee: "25.000₫" },
                { region: "Các tỉnh thành khác", time: "3-5 ngày làm việc", fee: "35.000₫" },
              ].map((row, i, arr) => (
                <div
                  key={row.region}
                  className={`flex items-center justify-between gap-4 px-5 py-3 ${
                    i < arr.length - 1 ? "border-b border-paper/5" : ""
                  }`}
                >
                  <span className="text-paper font-medium">{row.region}</span>
                  <span className="text-right">
                    <span className="block text-paper/60">{row.time}</span>
                    <span className="text-xs text-paper/40">{row.fee}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-reveal scroll-d4">
            <div className="rounded-lg bg-gold/[0.06] border border-gold/15 p-4">
              <p className="text-gold font-medium text-sm">
                Miễn phí vận chuyển cho đơn hàng từ 1.000.000₫
              </p>
              <p className="text-gold/70 text-xs mt-1">
                Áp dụng toàn quốc, không giới hạn số lần.
              </p>
            </div>
          </div>

          <div className="scroll-reveal scroll-d5">
            <h2 className="font-heading text-lg font-semibold text-paper mb-3">
              3. Đơn vị vận chuyển
            </h2>
            <p>
              Chúng tôi sử dụng các đối tác vận chuyển uy tín: GHN (Giao Hàng Nhanh),
              GHTK (Giao Hàng Tiết Kiệm), và J&T Express. Mã tracking sẽ được gửi
              qua Zalo/SMS ngay sau khi đơn hàng được gửi đi.
            </p>
          </div>

          <div className="scroll-reveal">
            <h2 className="font-heading text-lg font-semibold text-paper mb-3">
              4. Kiểm tra đơn hàng
            </h2>
            <p>
              Khi nhận hàng, vui lòng kiểm tra:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Hộp sản phẩm còn nguyên seal, không bị móp méo</li>
              <li>Đầy đủ phụ kiện bên trong (máy, cáp, vòng MagSafe, thẻ nhớ, hướng dẫn)</li>
              <li>Bật máy kiểm tra màn hình và các nút bấm</li>
            </ul>
            <p className="mt-3">
              Nếu phát hiện vấn đề, liên hệ ngay qua{" "}
              <Link href="/community" className="text-gold hover:text-deep-gold transition-colors">
                Zalo cộng đồng Xteink
              </Link>{" "}
              trong vòng 24h để được hỗ trợ nhanh nhất.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
