import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-vignette relative flex min-h-[600px] items-center overflow-hidden pt-14 md:min-h-screen"
    >
      <Image
        src="/images/home/hero_banner/redefining_portable_reading_hero_banner.jpg"
        alt="Xteink X4 — máy đọc sách bỏ túi"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/85 via-[#1A1A1A]/55 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 py-20">
        <h1 className="animate-fade-up max-w-xl font-heading text-[2.5rem] font-bold leading-[1.15] tracking-[-0.02em] text-gold-gradient md:text-[4.5rem] md:leading-[1.08]">
          Đọc sách, theo cách
          <br />
          của bạn.
        </h1>
        <p className="animate-fade-up-d1 mt-6 max-w-md text-base text-[#E8E0D6]/75 md:text-lg md:leading-relaxed">
          Thư viện bỏ túi nhẹ hơn một bộ bài.
          <br className="hidden md:block" /> Gắn lên điện thoại. Đọc ở mọi
          nơi.
        </p>
        <div className="animate-fade-up-d2 mt-10 flex flex-wrap gap-4">
          <a
            href="#price"
            className="btn-glass-primary inline-flex h-13 items-center rounded-xl px-8 text-base font-semibold text-[#1A1A1A]"
          >
            Bắt đầu đọc
          </a>
          <a
            href="#product"
            className="btn-glass-secondary inline-flex h-13 items-center rounded-xl px-7 text-base font-medium text-[#E8E0D6]/90"
          >
            Tìm hiểu thêm
          </a>
        </div>
      </div>
    </section>
  );
}
