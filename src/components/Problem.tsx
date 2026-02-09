export default function Problem() {
  return (
    <section className="bg-mysterious-surface px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[65ch] text-center">
        <div className="scroll-reveal gold-divider mb-10">
          <span className="gold-divider-icon">✦</span>
        </div>

        <h2 className="scroll-reveal scroll-d1 text-glow font-heading text-3xl font-bold tracking-[-0.01em] text-paper md:text-[2.75rem] md:leading-[1.2]">
          Bạn đã biết cảm giác này
        </h2>

        <div className="mt-8 space-y-5 text-base text-paper/70 md:text-lg md:leading-relaxed">
          <p className="scroll-reveal scroll-d2">
            Mở điện thoại định đọc sách. Rồi thông báo. Rồi tin nhắn. Rồi lướt
            TikTok thêm &ldquo;chút nữa&rdquo;.
          </p>
          <p className="scroll-reveal scroll-d3">
            Bạn không thiếu sách — bạn thiếu một không gian{" "}
            <em className="text-gold/80 not-italic">chỉ có sách</em>.
          </p>
          <p className="scroll-reveal scroll-d4">
            Danh sách &ldquo;đọc sau&rdquo; cứ dài thêm. Những cuốn sách hay
            vẫn nằm đó, chờ một ngày mà không bao giờ đến.
          </p>
        </div>

        <p className="scroll-reveal-scale scroll-d5 mt-14 font-accent text-3xl text-gold-gradient md:text-5xl">
          Cho đến bây giờ.
        </p>
      </div>
    </section>
  );
}
