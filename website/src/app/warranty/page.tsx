import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Chính sách bảo hành — Xteink",
  description: "Bảo hành 12 tháng hardware, 30 ngày đổi mới. Hỗ trợ nhanh qua Zalo.",
};

export default function WarrantyPage() {
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
            Chính sách bảo hành
          </h1>
          <p className="mt-2 text-sm text-paper/50">Cập nhật: Tháng 2, 2026</p>
        </div>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-paper/70">
          <div className="scroll-reveal scroll-d2">
            <h2 className="font-heading text-lg font-semibold text-paper mb-3">
              1. Thời gian bảo hành
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-paper">30 ngày đổi mới:</strong> Trong 30 ngày đầu kể từ ngày nhận hàng,
                nếu máy gặp lỗi phần cứng từ nhà sản xuất, bạn được đổi máy mới hoàn toàn.
              </li>
              <li>
                <strong className="text-paper">12 tháng bảo hành:</strong> Bảo hành miễn phí cho các lỗi phần cứng
                trong 12 tháng kể từ ngày mua.
              </li>
            </ul>
          </div>

          <div className="scroll-reveal scroll-d3">
            <h2 className="font-heading text-lg font-semibold text-paper mb-3">
              2. Phạm vi bảo hành
            </h2>
            <p>Bảo hành áp dụng cho:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Lỗi màn hình E-Ink (điểm chết, vạch sọc, không hiển thị)</li>
              <li>Lỗi nút bấm vật lý (không nhận, kẹt nút)</li>
              <li>Lỗi cổng USB-C (không sạc, không nhận kết nối)</li>
              <li>Lỗi pin (không giữ pin, không sạc được)</li>
              <li>Lỗi khe thẻ nhớ microSD</li>
            </ul>
          </div>

          <div className="scroll-reveal scroll-d4">
            <h2 className="font-heading text-lg font-semibold text-paper mb-3">
              3. Không bảo hành
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Hư hỏng do va đập, rơi, ngấm nước, hoặc tác động ngoại lực</li>
              <li>Tự ý tháo lắp, sửa chữa bởi bên thứ ba không được ủy quyền</li>
              <li>Hư hỏng do sử dụng nguồn sạc không phù hợp (quá 5V/2A)</li>
              <li>Trầy xước bề mặt do sử dụng thông thường</li>
              <li>Phụ kiện đi kèm (cáp sạc, vòng MagSafe, thẻ nhớ)</li>
            </ul>
          </div>

          <div className="scroll-reveal scroll-d5">
            <h2 className="font-heading text-lg font-semibold text-paper mb-3">
              4. Quy trình bảo hành
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Liên hệ qua Zalo: mô tả lỗi + gửi ảnh/video minh họa</li>
              <li>Nhân viên xác nhận lỗi trong vòng 24h</li>
              <li>Gửi máy về theo hướng dẫn (chúng tôi chịu phí ship chiều về)</li>
              <li>Kiểm tra và sửa chữa/đổi mới trong 3-5 ngày làm việc</li>
              <li>Gửi trả máy (miễn phí ship)</li>
            </ol>
          </div>

          <div className="scroll-reveal">
            <h2 className="font-heading text-lg font-semibold text-paper mb-3">
              5. Liên hệ hỗ trợ
            </h2>
            <p>
              Mọi yêu cầu bảo hành vui lòng liên hệ qua{" "}
              <Link href="/community" className="text-gold hover:text-deep-gold transition-colors">
                nhóm Zalo cộng đồng Xteink
              </Link>
              . Chúng tôi cam kết phản hồi trong vòng 5 phút trong giờ hành chính.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
