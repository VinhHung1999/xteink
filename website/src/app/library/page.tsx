import type { Metadata } from "next";
import Link from "next/link";
import { Search, BookOpen, Briefcase, Lightbulb, FlaskConical, Baby, Globe, Heart, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Thư viện sách — Xteink",
  description:
    "70.000+ cuốn sách EPUB, PDF — từ văn học kinh điển đến self-help, khoa học, kinh doanh. Sắp ra mắt.",
};

const categories = [
  { icon: BookOpen, name: "Văn học", count: "18.000+", color: "text-amber-400" },
  { icon: Briefcase, name: "Kinh doanh", count: "12.000+", color: "text-blue-400" },
  { icon: Lightbulb, name: "Self-help", count: "9.500+", color: "text-yellow-400" },
  { icon: FlaskConical, name: "Khoa học", count: "8.200+", color: "text-green-400" },
  { icon: Baby, name: "Thiếu nhi", count: "6.800+", color: "text-pink-400" },
  { icon: Globe, name: "Lịch sử", count: "5.400+", color: "text-indigo-400" },
  { icon: Heart, name: "Tâm lý", count: "4.600+", color: "text-rose-400" },
  { icon: Sparkles, name: "Tiểu thuyết", count: "5.500+", color: "text-purple-400" },
];

const sampleBooks = [
  { title: "Sapiens", author: "Yuval Noah Harari", accent: "from-amber-600 to-amber-800" },
  { title: "Atomic Habits", author: "James Clear", accent: "from-yellow-500 to-orange-600" },
  { title: "Dế Mèn Phiêu Lưu Ký", author: "Tô Hoài", accent: "from-green-600 to-emerald-800" },
  { title: "Nhà Giả Kim", author: "Paulo Coelho", accent: "from-blue-500 to-indigo-700" },
  { title: "Đắc Nhân Tâm", author: "Dale Carnegie", accent: "from-red-600 to-rose-800" },
  { title: "Tư Duy Nhanh và Chậm", author: "Daniel Kahneman", accent: "from-purple-500 to-violet-700" },
  { title: "Tuổi Trẻ Đáng Giá Bao Nhiêu", author: "Rosie Nguyễn", accent: "from-teal-500 to-cyan-700" },
  { title: "Chiến Binh Cầu Vồng", author: "Andrea Hirata", accent: "from-orange-500 to-red-700" },
  { title: "Số Đỏ", author: "Vũ Trọng Phụng", accent: "from-slate-500 to-slate-700" },
  { title: "1984", author: "George Orwell", accent: "from-gray-600 to-gray-800" },
  { title: "Bố Già", author: "Mario Puzo", accent: "from-stone-600 to-stone-800" },
  { title: "Rừng Na-uy", author: "Murakami", accent: "from-emerald-500 to-green-700" },
];

export default function LibraryPage() {
  return (
    <section className="px-6 pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-[1100px]">
        {/* Hero */}
        <div className="text-center scroll-reveal">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.06] px-4 py-1.5">
            <Sparkles size={14} className="text-gold" />
            <span className="text-xs font-medium text-gold">Sắp ra mắt</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-paper">
            70.000+ cuốn sách
          </h1>
          <p className="mt-3 text-paper/60 text-base md:text-lg max-w-lg mx-auto">
            Thư viện EPUB & PDF — từ văn học kinh điển đến self-help, khoa học, kinh doanh.
            Tất cả DRM-free, sở hữu vĩnh viễn.
          </p>
        </div>

        {/* Search bar (UI only) */}
        <div className="mt-10 scroll-reveal scroll-d1">
          <div className="mx-auto max-w-lg">
            <div className="glass-card flex items-center gap-3 rounded-xl px-4 py-3">
              <Search size={18} className="text-paper/40 shrink-0" />
              <input
                type="text"
                placeholder="Tìm sách theo tên, tác giả, thể loại..."
                className="flex-1 bg-transparent text-sm text-paper placeholder:text-paper/30 outline-none"
                disabled
              />
              <span className="shrink-0 rounded-lg bg-gold/10 px-3 py-1 text-xs font-medium text-gold/60">
                Coming soon
              </span>
            </div>
          </div>
        </div>

        {/* Category grid */}
        <div className="mt-16">
          <h2 className="scroll-reveal font-heading text-2xl font-semibold text-paper mb-6 text-center">
            Thể loại
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  className={`glass-card group rounded-xl p-4 text-center transition-all hover:scale-[1.02] scroll-reveal scroll-d${Math.min(i + 1, 7)}`}
                >
                  <Icon size={24} className={`mx-auto mb-2 ${cat.color}`} />
                  <p className="font-heading text-sm font-semibold text-paper">
                    {cat.name}
                  </p>
                  <p className="text-xs text-paper/40 mt-0.5">{cat.count}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sample book covers */}
        <div className="mt-16">
          <h2 className="scroll-reveal font-heading text-2xl font-semibold text-paper mb-6 text-center">
            Sách nổi bật
          </h2>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
            {sampleBooks.map((book, i) => (
              <div
                key={book.title}
                className={`group cursor-default scroll-reveal scroll-d${Math.min(i + 1, 7)}`}
              >
                {/* CSS-only book cover */}
                <div
                  className={`relative aspect-[2/3] rounded-lg bg-gradient-to-br ${book.accent} p-3 flex flex-col justify-end shadow-lg transition-transform group-hover:scale-105 group-hover:-translate-y-1`}
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="relative">
                    <p className="text-[10px] font-bold text-white/90 leading-tight line-clamp-2">
                      {book.title}
                    </p>
                    <p className="text-[9px] text-white/60 mt-0.5 line-clamp-1">
                      {book.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA — Zalo notification */}
        <div className="mt-16 scroll-reveal scroll-d4">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-heading text-2xl font-semibold text-paper">
              Nhận thông báo khi ra mắt
            </h2>
            <p className="mt-2 text-sm text-paper/60 max-w-md mx-auto">
              Thư viện sách đang được xây dựng. Tham gia nhóm Zalo để nhận thông báo
              khi tính năng chính thức ra mắt — cùng nhiều sách miễn phí.
            </p>
            <Link
              href="/community"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-deep-gold"
            >
              Tham gia cộng đồng Zalo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
