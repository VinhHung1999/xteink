import type { Metadata } from "next";
import GuideLayout from "@/components/GuideLayout";
import type { GuideSection } from "@/components/GuideLayout";

export const metadata: Metadata = {
  title: "Bắt đầu sử dụng — Xteink X4",
  description: "Hướng dẫn thiết lập Xteink X4 từ A–Z: sạc, bật máy, kết nối MagSafe, và đọc cuốn sách đầu tiên.",
};

const sections: GuideSection[] = [
  {
    id: "unboxing",
    title: "Mở hộp & kiểm tra",
    content: (
      <>
        <p>Trong hộp Xteink X4 bao gồm:</p>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>Máy đọc sách Xteink X4</li>
          <li>Cáp sạc USB-C</li>
          <li>Vòng nam châm MagSafe</li>
          <li>Thẻ nhớ microSD (đã cài sẵn sách)</li>
          <li>Hướng dẫn sử dụng nhanh</li>
        </ul>
        <p className="mt-3">
          Kiểm tra thiết bị có bị trầy xước hoặc hư hỏng trong quá trình vận chuyển không.
          Nếu có vấn đề, liên hệ chúng tôi ngay qua Zalo.
        </p>
      </>
    ),
  },
  {
    id: "charge",
    title: "Sạc pin lần đầu",
    content: (
      <>
        <p>
          Kết nối cáp USB-C vào cổng sạc ở cạnh dưới máy. Sạc đầy lần đầu mất khoảng <strong className="text-paper">1-2 giờ</strong>.
        </p>
        <p className="mt-2">
          Đèn LED nhỏ sẽ sáng đỏ khi đang sạc và chuyển sang xanh khi đầy pin.
          Pin X4 cho phép đọc liên tục <strong className="text-paper">khoảng 150 lần lật trang</strong> trước khi cần sạc lại.
        </p>
        <div className="mt-3 rounded-lg bg-gold/[0.06] border border-gold/15 p-3">
          <p className="text-xs text-gold">💡 Mẹo: Bạn có thể sử dụng máy ngay khi đang sạc.</p>
        </div>
      </>
    ),
  },
  {
    id: "magsafe",
    title: "Gắn vòng MagSafe",
    content: (
      <>
        <p>
          Dán vòng nam châm MagSafe lên mặt sau điện thoại (hoặc ốp lưng).
          X4 sẽ bám chặt bằng nam châm — không cần kẹp hay keo dán.
        </p>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>Lau sạch bề mặt trước khi dán</li>
          <li>Dán chính giữa mặt sau điện thoại</li>
          <li>Ấn mạnh và giữ 10 giây để keo dính chắc</li>
          <li>Chờ 2 giờ trước khi gắn X4 lần đầu</li>
        </ul>
      </>
    ),
  },
  {
    id: "first-read",
    title: "Đọc cuốn sách đầu tiên",
    content: (
      <>
        <p>
          Bấm nút nguồn ở cạnh máy để bật. Màn hình E-Ink sẽ hiện danh sách sách trên thẻ nhớ.
        </p>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li><strong className="text-paper">Nút trái/phải:</strong> Lật trang trước/sau</li>
          <li><strong className="text-paper">Nút giữa:</strong> Mở menu (danh sách sách, font chữ, bookmark)</li>
          <li><strong className="text-paper">Giữ nút nguồn 3 giây:</strong> Tắt máy</li>
        </ul>
        <p className="mt-3">
          Chúng tôi đã cài sẵn một số sách tiếng Việt và tiếng Anh trên thẻ nhớ.
          Chọn một cuốn và bắt đầu đọc — không cần đăng nhập, không cần kết nối internet.
        </p>
      </>
    ),
  },
  {
    id: "tips",
    title: "Mẹo sử dụng",
    content: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-paper">Đọc ngoài trời:</strong> E-Ink càng sáng dưới ánh nắng — hoàn hảo cho quán cà phê ngoài trời.
          </li>
          <li>
            <strong className="text-paper">Bảo quản:</strong> Tránh để máy trong môi trường nóng ẩm quá lâu. Cất trong túi vải hoặc bao da khi không dùng.
          </li>
          <li>
            <strong className="text-paper">Thẻ nhớ:</strong> X4 hỗ trợ microSD tối đa 32GB — đủ cho hàng nghìn cuốn sách.
          </li>
          <li>
            <strong className="text-paper">Cộng đồng:</strong> Tham gia nhóm Zalo Xteink Việt Nam để nhận sách mới, mẹo sử dụng, và hỗ trợ kỹ thuật.
          </li>
        </ul>
      </>
    ),
  },
];

export default function GettingStartedPage() {
  return (
    <GuideLayout
      title="Bắt đầu sử dụng"
      subtitle="Thiết lập Xteink X4 từ A–Z: sạc, bật máy, kết nối MagSafe, và đọc cuốn sách đầu tiên."
      sections={sections}
    />
  );
}
