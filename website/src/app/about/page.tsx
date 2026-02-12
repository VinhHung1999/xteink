import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Về Xteink — Câu chuyện thương hiệu",
  description:
    "Xteink tin vào sự giản lược. Trong thế giới ngập tràn thông báo, chúng tôi tạo ra thiết bị chỉ làm một việc — giúp bạn đọc sách.",
};

// ========== Values data ==========

const values = [
  {
    pillar: "Quiet",
    vi: "Yên lặng",
    description:
      "Trong thế giới ồn ào của thông báo và lướt không ngừng, sự yên lặng là một đặc quyền. X4 tạo ra không gian tĩnh lặng — chỉ có bạn và trang sách.",
    quote: "Sự yên lặng không phải là trống rỗng. Nó là nơi ý nghĩa sinh sống.",
  },
  {
    pillar: "Return",
    vi: "Trở về",
    description:
      "Nút bấm vật lý thay vì màn hình cảm ứng. Sách bạn tự chọn thay vì thuật toán gợi ý. X4 là hành trình trở về với cách đọc nguyên bản — chậm rãi, chủ đích, trọn vẹn.",
    quote: "Đọc sách không cần thay đổi. Chỉ thế giới xung quanh thay đổi.",
  },
  {
    pillar: "Warmth",
    vi: "Ấm áp",
    description:
      "Màn hình E-Ink không phát sáng xanh — nó hiện chữ bằng ánh sáng tự nhiên quanh bạn. Đọc trong nắng sớm, bên đèn bàn, hay trong quán cà phê. Thiết bị không cạnh tranh với thực tại — nó tồn tại trong thực tại.",
    quote: "Công nghệ tốt nhất là công nghệ biến mất khi bạn dùng nó.",
  },
  {
    pillar: "Becoming",
    vi: "Trở thành",
    description:
      "Mỗi trang sách là một bước tiến. X4 không chỉ là thiết bị đọc — nó là lời nhắc rằng bạn đang trở thành phiên bản tốt hơn của chính mình. Mỗi ngày, một chút.",
    quote: "Bạn không mua máy đọc sách. Bạn mua phiên bản tốt hơn của chính mình.",
  },
];

// ========== Page component ==========

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="px-6 py-20 md:py-32">
        <div className="mx-auto max-w-[800px] text-center">
          <p className="scroll-reveal text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
            Về Xteink
          </p>
          <h1 className="scroll-reveal scroll-d1 mt-4 font-heading text-4xl font-bold tracking-[-0.01em] text-paper md:text-6xl md:leading-[1.1]">
            Không phải máy đọc sách.
            <br />
            <span className="text-gold-shimmer">Là tấm vé cho phép.</span>
          </h1>
          <p className="scroll-reveal scroll-d2 mt-6 text-base leading-relaxed text-paper/70 md:text-lg">
            Cho phép bạn yên lặng trong thế giới ồn ào. Cho phép bạn chậm lại khi mọi thứ đang vội.
            Cho phép bạn cầm một thứ nhỏ bé, tĩnh lặng, đầy ắp con chữ — và biến mất vào trong đó.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-mysterious-surface px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[960px]">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="scroll-reveal">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
                Sứ mệnh
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-paper md:text-4xl">
                Triết lý của sự giản lược
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-paper/70 md:text-base">
                Mọi công ty công nghệ đều cố thêm tính năng để biện minh cho giá.
                Xteink bỏ bớt tính năng để biện minh cho sự tồn tại.
              </p>
            </div>
            <div className="scroll-reveal scroll-d1 space-y-4">
              {[
                { label: "Không màn hình cảm ứng", detail: "Ngón tay không lướt — chúng bấm nút. Trang sách lật bằng tiếng click." },
                { label: "Không kho ứng dụng", detail: "Không email, không video, không hố thỏ. Chỉ có đọc." },
                { label: "Không đèn nền", detail: "Bạn đọc bằng ánh sáng tự nhiên — nắng qua cửa sổ, đèn bàn, ánh đèn quán cà phê." },
                { label: "Không thuê bao", detail: "Sách của bạn, trên thẻ nhớ của bạn. Không ai xóa được. Không gì hết hạn." },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass-card rounded-xl p-4"
                >
                  <p className="text-sm font-semibold text-paper">{item.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-paper/60">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values — Four Pillars */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="scroll-reveal text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
              Bốn giá trị cốt lõi
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-paper md:text-4xl">
              Bốn linh hồn của Xteink
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {values.map((v, i) => (
              <div
                key={v.pillar}
                className={`scroll-reveal scroll-d${i + 1} glass-card rounded-2xl p-6`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-2xl font-bold text-gold-shimmer">
                    {v.pillar}
                  </span>
                  <span className="text-sm text-paper/50">— {v.vi}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">
                  {v.description}
                </p>
                <blockquote className="mt-4 border-l-2 border-gold/30 pl-4 text-sm italic text-paper/50">
                  &ldquo;{v.quote}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vietnam Soul — closing */}
      <section className="bg-mysterious-surface px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[700px] text-center">
          <div className="scroll-reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
              Tại sao Việt Nam
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-paper md:text-4xl">
              Dành cho người trẻ Việt Nam
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-paper/70 md:text-base">
              Một bạn trẻ ở Sài Gòn, mệt mỏi vì lướt điện thoại cả ngày, mua một thiết bị nhỏ xíu
              giá 1.5 triệu. Mỗi lần cầm điện thoại lên định lướt TikTok, bạn ấy thấy cuốn sách.
              Bạn ấy đọc. Mỗi ngày, một chút. Hai tuần sau, bạn ấy nhận ra: mình đã đọc nhiều hơn
              cả năm qua.
            </p>
            <p className="mt-4 font-heading text-lg font-semibold text-gold-shimmer md:text-xl">
              Đó không phải là công nghệ. Đó là trở thành.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
