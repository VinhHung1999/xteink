import type { Metadata } from "next";
import GuideLayout from "@/components/GuideLayout";
import type { GuideSection } from "@/components/GuideLayout";

export const metadata: Metadata = {
  title: "Firmware Crosspoint — Xteink X4",
  description: "Cài đặt firmware Crosspoint hỗ trợ tiếng Việt, font chữ đẹp, và tùy chỉnh giao diện đọc sách.",
};

const sections: GuideSection[] = [
  {
    id: "what-is",
    title: "Crosspoint firmware là gì?",
    content: (
      <>
        <p>
          Crosspoint là firmware thay thế cho Xteink X4, được phát triển bởi cộng đồng.
          So với firmware gốc, Crosspoint mang lại:
        </p>
        <ul className="mt-2 list-disc pl-5 space-y-1.5">
          <li><strong className="text-paper">Hỗ trợ tiếng Việt</strong> — hiển thị dấu tiếng Việt hoàn chỉnh</li>
          <li><strong className="text-paper">Font chữ đẹp hơn</strong> — thêm nhiều font serif và sans-serif</li>
          <li><strong className="text-paper">Tùy chỉnh giao diện</strong> — cỡ chữ, lề trang, khoảng cách dòng</li>
          <li><strong className="text-paper">Bookmark & ghi chú</strong> — đánh dấu trang yêu thích</li>
          <li><strong className="text-paper">Hiển thị PDF tốt hơn</strong> — crop margin, zoom, reflow</li>
        </ul>
        <div className="mt-3 rounded-lg bg-gold/[0.06] border border-gold/15 p-3">
          <p className="text-xs text-gold">
            ✨ Tất cả máy Xteink bán tại Việt Nam đã được cài sẵn Crosspoint — bạn không cần tự cài!
          </p>
        </div>
      </>
    ),
  },
  {
    id: "check-version",
    title: "Kiểm tra phiên bản firmware",
    content: (
      <>
        <p>Để kiểm tra firmware hiện tại trên X4:</p>
        <ol className="mt-2 list-decimal pl-5 space-y-2">
          <li>Bấm nút giữa để mở menu chính</li>
          <li>Chọn <strong className="text-paper">Settings</strong> (Cài đặt)</li>
          <li>Chọn <strong className="text-paper">About</strong> (Thông tin)</li>
          <li>Phiên bản sẽ hiện dạng: <code className="rounded bg-paper/10 px-1.5 py-0.5 text-xs text-gold">CrossPoint v2.x.x</code></li>
        </ol>
        <p className="mt-3">
          Nếu hiện &ldquo;Stock Firmware&rdquo; thay vì CrossPoint, bạn cần cài firmware theo hướng dẫn bên dưới.
        </p>
      </>
    ),
  },
  {
    id: "install",
    title: "Cài đặt Crosspoint",
    content: (
      <>
        <p>Nếu máy chưa có Crosspoint:</p>
        <ol className="mt-2 list-decimal pl-5 space-y-2">
          <li>
            Tải file firmware Crosspoint mới nhất từ cộng đồng
            (liên hệ nhóm Zalo Xteink Việt Nam để nhận link)
          </li>
          <li>Copy file <code className="rounded bg-paper/10 px-1.5 py-0.5 text-xs text-gold">.bin</code> vào thư mục gốc của thẻ nhớ</li>
          <li>Gắn thẻ nhớ vào X4 và bật máy</li>
          <li>Máy sẽ tự phát hiện firmware mới và hỏi xác nhận cập nhật</li>
          <li>Chọn <strong className="text-paper">Yes</strong> — quá trình cài đặt mất khoảng 1-2 phút</li>
          <li>Máy tự khởi động lại khi hoàn tất</li>
        </ol>
        <div className="mt-3 rounded-lg bg-red-500/10 border border-red-500/20 p-3">
          <p className="text-xs text-red-400">⚠️ Không tắt máy hoặc rút thẻ nhớ trong quá trình cập nhật firmware!</p>
        </div>
      </>
    ),
  },
  {
    id: "vietnamese",
    title: "Cài đặt tiếng Việt",
    content: (
      <>
        <p>Sau khi cài Crosspoint, bật hỗ trợ tiếng Việt:</p>
        <ol className="mt-2 list-decimal pl-5 space-y-2">
          <li>Mở <strong className="text-paper">Settings → Language</strong></li>
          <li>Chọn <strong className="text-paper">Vietnamese</strong> (hoặc giữ English nếu thích)</li>
          <li>Mở <strong className="text-paper">Settings → Font</strong></li>
          <li>Chọn font hỗ trợ tiếng Việt: <strong className="text-paper">Noto Serif</strong> hoặc <strong className="text-paper">Be Vietnam Pro</strong></li>
        </ol>
        <p className="mt-3">
          Bây giờ bạn có thể đọc sách tiếng Việt với dấu hiển thị đẹp và đầy đủ.
        </p>
      </>
    ),
  },
  {
    id: "customize",
    title: "Tùy chỉnh giao diện đọc",
    content: (
      <>
        <p>Crosspoint cho phép tùy chỉnh nhiều thông số khi đọc sách:</p>
        <div className="mt-3 space-y-2">
          {[
            { label: "Cỡ chữ", detail: "5 cấp: nhỏ, vừa, lớn, rất lớn, tối đa" },
            { label: "Font chữ", detail: "10+ font bao gồm serif, sans-serif, monospace" },
            { label: "Khoảng cách dòng", detail: "3 cấp: sát, bình thường, rộng" },
            { label: "Lề trang", detail: "3 cấp: hẹp, bình thường, rộng" },
            { label: "Orientation", detail: "Dọc (portrait) hoặc ngang (landscape)" },
          ].map((item) => (
            <div key={item.label} className="flex gap-3 text-sm">
              <span className="shrink-0 font-medium text-paper w-32">{item.label}</span>
              <span className="text-paper/60">{item.detail}</span>
            </div>
          ))}
        </div>
        <p className="mt-3">
          Truy cập trong khi đọc: bấm nút giữa → <strong className="text-paper">Reading Settings</strong>.
        </p>
      </>
    ),
  },
];

export default function CrosspointFirmwarePage() {
  return (
    <GuideLayout
      title="Firmware Crosspoint"
      subtitle="Cài đặt firmware Crosspoint hỗ trợ tiếng Việt, font chữ đẹp, và tùy chỉnh giao diện đọc sách."
      sections={sections}
    />
  );
}
