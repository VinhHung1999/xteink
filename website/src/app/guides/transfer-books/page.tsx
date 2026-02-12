import type { Metadata } from "next";
import GuideLayout from "@/components/GuideLayout";
import type { GuideSection } from "@/components/GuideLayout";

export const metadata: Metadata = {
  title: "Chuyển sách vào máy — Xteink X4",
  description: "Hỗ trợ EPUB, PDF, MOBI — chuyển qua USB, Wi-Fi, hoặc thẻ nhớ microSD. Không cần tài khoản, không DRM.",
};

const sections: GuideSection[] = [
  {
    id: "formats",
    title: "Định dạng hỗ trợ",
    content: (
      <>
        <p>Xteink X4 hỗ trợ các định dạng sách phổ biến:</p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {[
            { format: "EPUB", note: "Phổ biến nhất" },
            { format: "PDF", note: "Giữ nguyên layout" },
            { format: "MOBI", note: "Kindle format" },
            { format: "TXT", note: "Văn bản thuần" },
            { format: "FB2", note: "Fiction Book" },
            { format: "DJVU", note: "Tài liệu scan" },
          ].map((f) => (
            <div key={f.format} className="rounded-lg bg-paper/[0.03] border border-paper/10 p-2.5 text-center">
              <p className="text-sm font-bold text-paper">{f.format}</p>
              <p className="text-[11px] text-paper/50">{f.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg bg-gold/[0.06] border border-gold/15 p-3">
          <p className="text-xs text-gold">💡 Khuyên dùng EPUB — hiển thị đẹp nhất, tự động reflow theo cỡ chữ.</p>
        </div>
      </>
    ),
  },
  {
    id: "sd-card",
    title: "Cách 1: Qua thẻ nhớ microSD",
    content: (
      <>
        <p>Cách đơn giản và nhanh nhất:</p>
        <ol className="mt-2 list-decimal pl-5 space-y-2">
          <li>Tắt X4 và rút thẻ nhớ microSD ra khỏi máy</li>
          <li>Gắn thẻ nhớ vào đầu đọc thẻ (adapter) kết nối với máy tính</li>
          <li>Mở thẻ nhớ — bạn sẽ thấy thư mục <code className="rounded bg-paper/10 px-1.5 py-0.5 text-xs text-gold">books/</code></li>
          <li>Copy file sách (EPUB, PDF, MOBI...) vào thư mục <code className="rounded bg-paper/10 px-1.5 py-0.5 text-xs text-gold">books/</code></li>
          <li>Rút thẻ an toàn (Eject), gắn lại vào X4</li>
          <li>Bật máy — sách mới sẽ xuất hiện trong danh sách</li>
        </ol>
      </>
    ),
  },
  {
    id: "usb",
    title: "Cách 2: Qua cáp USB-C",
    content: (
      <>
        <p>Kết nối trực tiếp X4 với máy tính:</p>
        <ol className="mt-2 list-decimal pl-5 space-y-2">
          <li>Kết nối X4 với máy tính bằng cáp USB-C</li>
          <li>X4 sẽ hiện thông báo &ldquo;USB Connected&rdquo; trên màn hình</li>
          <li>Trên máy tính, X4 xuất hiện như ổ đĩa ngoài</li>
          <li>Copy file sách vào thư mục <code className="rounded bg-paper/10 px-1.5 py-0.5 text-xs text-gold">books/</code></li>
          <li>Eject ổ đĩa an toàn trước khi rút cáp</li>
        </ol>
        <div className="mt-3 rounded-lg bg-paper/[0.03] border border-paper/10 p-3">
          <p className="text-xs text-paper/60">⚠️ Trên macOS: nếu không thấy ổ đĩa, thử cáp USB-C khác hoặc kết nối trực tiếp (không qua hub).</p>
        </div>
      </>
    ),
  },
  {
    id: "sources",
    title: "Nguồn sách miễn phí",
    content: (
      <>
        <p>Các nguồn sách EPUB/PDF tiếng Việt và tiếng Anh miễn phí, hợp pháp:</p>
        <ul className="mt-2 list-disc pl-5 space-y-1.5">
          <li><strong className="text-paper">Standard Ebooks</strong> — sách kinh điển tiếng Anh, format đẹp</li>
          <li><strong className="text-paper">Project Gutenberg</strong> — 70,000+ sách miễn phí domain công cộng</li>
          <li><strong className="text-paper">Waka</strong> — nền tảng sách tiếng Việt (có phần miễn phí)</li>
          <li><strong className="text-paper">Nhà sách Tiki</strong> — mua EPUB tiếng Việt chính hãng</li>
        </ul>
        <div className="mt-3 rounded-lg bg-gold/[0.06] border border-gold/15 p-3">
          <p className="text-xs text-gold">💡 X4 là DRM-free — bạn sở hữu hoàn toàn sách của mình. Không ai có thể xóa hay thu hồi.</p>
        </div>
      </>
    ),
  },
];

export default function TransferBooksPage() {
  return (
    <GuideLayout
      title="Chuyển sách vào máy"
      subtitle="Hỗ trợ EPUB, PDF, MOBI — chuyển qua USB hoặc thẻ nhớ microSD. Không cần tài khoản, không DRM."
      sections={sections}
    />
  );
}
