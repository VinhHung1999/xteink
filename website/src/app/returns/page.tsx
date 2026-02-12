import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Chính sách đổi trả — Xteink",
  description: "7 ngày đổi trả miễn phí. 30 ngày đổi mới nếu lỗi nhà sản xuất.",
};

export default function ReturnsPage() {
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
            Chính sách đổi trả
          </h1>
          <p className="mt-2 text-sm text-paper/50">Cập nhật: Tháng 2, 2026</p>
        </div>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-paper/70">
          <div className="scroll-reveal scroll-d2">
            <h2 className="font-heading text-lg font-semibold text-paper mb-3">
              1. Đổi trả trong 7 ngày
            </h2>
            <p>
              Bạn có quyền đổi trả sản phẩm trong vòng <strong className="text-paper">7 ngày</strong> kể từ ngày nhận hàng
              nếu đáp ứng các điều kiện sau:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Sản phẩm còn nguyên hộp, đầy đủ phụ kiện</li>
              <li>Máy không có dấu hiệu trầy xước, hư hỏng do người dùng</li>
              <li>Tem seal chưa bị rách (nếu có)</li>
              <li>Có hóa đơn/đơn hàng kèm theo</li>
            </ul>
          </div>

          <div className="scroll-reveal scroll-d3">
            <h2 className="font-heading text-lg font-semibold text-paper mb-3">
              2. Đổi mới trong 30 ngày
            </h2>
            <p>
              Trong vòng <strong className="text-paper">30 ngày</strong> kể từ ngày nhận hàng,
              nếu sản phẩm gặp lỗi phần cứng từ nhà sản xuất, bạn được
              đổi máy mới hoàn toàn (không phải sửa chữa).
            </p>
            <p className="mt-2">
              Lỗi phần cứng bao gồm: lỗi màn hình, lỗi nút bấm, lỗi sạc, lỗi pin,
              lỗi khe thẻ nhớ. Xem chi tiết tại{" "}
              <Link href="/warranty" className="text-gold hover:text-deep-gold transition-colors">
                Chính sách bảo hành
              </Link>
              .
            </p>
          </div>

          <div className="scroll-reveal scroll-d4">
            <h2 className="font-heading text-lg font-semibold text-paper mb-3">
              3. Hoàn tiền
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-paper">Đổi trả 7 ngày:</strong> Hoàn 100% giá trị đơn hàng
                qua hình thức thanh toán ban đầu, trong vòng 3-5 ngày làm việc.
              </li>
              <li>
                <strong className="text-paper">Đổi mới 30 ngày:</strong> Đổi máy mới cùng model,
                không hoàn tiền (trừ trường hợp hết hàng — hoàn 100%).
              </li>
            </ul>
          </div>

          <div className="scroll-reveal scroll-d5">
            <h2 className="font-heading text-lg font-semibold text-paper mb-3">
              4. Không áp dụng đổi trả
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Quá thời hạn 7 ngày (đổi trả) hoặc 30 ngày (đổi mới)</li>
              <li>Sản phẩm hư hỏng do va đập, ngấm nước, hoặc sử dụng sai cách</li>
              <li>Tự ý tháo lắp, sửa chữa bởi bên không được ủy quyền</li>
              <li>Phụ kiện đã qua sử dụng (miếng dán màn hình đã dán)</li>
            </ul>
          </div>

          <div className="scroll-reveal">
            <h2 className="font-heading text-lg font-semibold text-paper mb-3">
              5. Quy trình đổi trả
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Liên hệ qua Zalo: mô tả lý do + gửi ảnh sản phẩm</li>
              <li>Nhận xác nhận đổi trả trong vòng 24h</li>
              <li>Đóng gói sản phẩm cẩn thận, gửi theo hướng dẫn</li>
              <li>Chúng tôi chịu phí ship chiều về (đổi trả do lỗi nhà sản xuất)</li>
              <li>Kiểm tra và xử lý trong 2-3 ngày làm việc sau khi nhận hàng</li>
            </ol>
          </div>

          <div className="scroll-reveal">
            <div className="rounded-lg bg-gold/[0.06] border border-gold/15 p-4">
              <p className="text-gold font-medium text-sm">
                Cần hỗ trợ đổi trả?
              </p>
              <p className="text-gold/70 text-xs mt-1">
                Liên hệ{" "}
                <Link href="/community" className="underline hover:text-gold transition-colors">
                  nhóm Zalo cộng đồng Xteink
                </Link>
                {" "}— phản hồi trong 5 phút.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
