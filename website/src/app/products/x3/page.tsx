import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minimize2, Eye, Zap } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";
import { getProductDetail } from "@/services/api";

export const metadata: Metadata = {
  title: "Xteink X3 — Máy đọc sách e-ink ultra-compact",
  description:
    "Xteink X3: màn hình E-Ink 3.7 inch, 250 PPI, 60g, siêu nhỏ gọn.",
  openGraph: {
    title: "Xteink X3 — Máy đọc sách e-ink ultra-compact",
    description: "Màn hình E-Ink 3.7\", 250 PPI, 60g. Ultra-compact. Chỉ 1.790.000₫.",
    images: [{ url: "/images/products/x3/gallery/xteink_x3_ultra_compact_magnetic_ereader_space_black_72_99usd.jpg" }],
  },
};

const x3JsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Xteink X3",
  description: "Máy đọc sách e-ink 3.7 inch, 250 PPI, 60g — siêu nhỏ gọn, sắc nét nhất dòng Xteink.",
  image: "https://xteink.hungphu.work/images/products/x3/gallery/xteink_x3_ultra_compact_magnetic_ereader_space_black_72_99usd.jpg",
  brand: { "@type": "Brand", name: "Xteink" },
  offers: {
    "@type": "Offer",
    price: "1790000",
    priceCurrency: "VND",
    availability: "https://schema.org/InStock",
    url: "https://xteink.hungphu.work/products/x3",
  },
};

const gallery = [
  "/images/products/x3/gallery/xteink_x3_ultra_compact_magnetic_ereader_space_black_72_99usd.jpg",
  "/images/products/x3/gallery/xteink_x3_frost_white_variant_product_photo.jpg",
];

const detailedSpecs: { label: string; value: string }[] = [
  { label: "Màn hình", value: "3.7\" E-Ink (đen trắng)" },
  { label: "Độ phân giải", value: "250 PPI — sắc nét nhất dòng Xteink" },
  { label: "Trọng lượng", value: "60g" },
  { label: "Kích thước", value: "Ultra-compact — nhỏ hơn lòng bàn tay" },
  { label: "Nút bấm", value: "3 nút vật lý (lật trang trái/phải + menu)" },
  { label: "Kết nối", value: "USB-C (sạc + truyền dữ liệu)" },
  { label: "Lưu trữ", value: "microSD lên đến 32GB" },
  { label: "Pin", value: "Đọc liên tục ~2 tuần" },
  { label: "Định dạng", value: "EPUB, PDF, MOBI, TXT, FB2, DJVU" },
  { label: "Gắn kết", value: "Nam châm MagSafe — snap vào điện thoại" },
];

const x3Features = [
  {
    icon: Minimize2,
    title: "Nhỏ nhất, nhẹ nhất",
    description: "60g và vừa lòng bàn tay. Máy đọc sách nhỏ nhất thế giới.",
  },
  {
    icon: Eye,
    title: "250 PPI — sắc nét hơn",
    description: "Mật độ điểm ảnh cao nhất dòng Xteink. Chữ sắc nét đến từng chi tiết.",
  },
  {
    icon: Zap,
    title: "Hai phiên bản màu",
    description: "Space Black và Frost White — chọn phong cách phù hợp với bạn.",
  },
];

export default async function X3Page() {
  const product = await getProductDetail("x3");
  if (!product) return notFound();

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(x3JsonLd) }}
    />
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[960px]">
        <Link
          href="/products"
          className="scroll-reveal inline-flex items-center gap-2 text-sm text-gold hover:text-deep-gold transition-colors"
        >
          <ArrowLeft size={16} />
          Tất cả sản phẩm
        </Link>

        {/* Hero: Gallery + Info */}
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div className="scroll-reveal scroll-d1">
            <ProductGallery images={gallery} alt={product.name} tag={product.tag} />
          </div>

          <div className="scroll-reveal scroll-d2">
            <h1 className="font-heading text-4xl font-bold text-paper">
              {product.name}
            </h1>
            <p className="mt-1 text-sm text-paper/50">{product.subtitle}</p>
            <p className="mt-3 font-heading text-2xl font-bold text-gold-shimmer">
              {product.price}
            </p>
            <p className="mt-4 text-base leading-relaxed text-paper/70">
              {product.description}
            </p>

            <AddToCartButton
              productId={product.slug}
              slug={product.slug}
              productName={product.name}
              image={product.image}
              price={product.priceNumeric}
              type="product"
            />

            {/* Quick specs */}
            <div className="mt-6 flex flex-wrap gap-2">
              {product.specs.map((spec) => (
                <span
                  key={spec}
                  className="rounded-full border border-paper/10 bg-paper/[0.03] px-3 py-1 text-xs text-paper/60"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="mt-16 scroll-reveal scroll-d3">
          <h2 className="font-heading text-2xl font-semibold text-paper mb-6">
            Tại sao chọn X3?
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {x3Features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className={`glass-card rounded-2xl p-6 scroll-reveal scroll-d${Math.min(i + 1, 7)}`}>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-paper mb-1">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-paper/60">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Color variants highlight */}
        <div className="mt-16 scroll-reveal scroll-d4">
          <h2 className="font-heading text-2xl font-semibold text-paper mb-6">
            Hai phiên bản màu sắc
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {gallery.map((src, i) => (
              <div key={src} className="glass-card overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={src}
                    alt={i === 0 ? "Space Black" : "Frost White"}
                    fill
                    sizes="(max-width: 640px) 100vw, 460px"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="font-heading text-sm font-semibold text-paper">
                    {i === 0 ? "Space Black" : "Frost White"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed specs table */}
        <div className="mt-16 scroll-reveal scroll-d5">
          <h2 className="font-heading text-2xl font-semibold text-paper mb-6">
            Thông số kỹ thuật
          </h2>
          <div className="glass-card rounded-2xl overflow-hidden">
            {detailedSpecs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex items-start gap-4 px-6 py-3.5 ${
                  i < detailedSpecs.length - 1 ? "border-b border-paper/5" : ""
                }`}
              >
                <span className="w-28 shrink-0 text-sm font-medium text-paper/50">
                  {spec.label}
                </span>
                <span className="text-sm text-paper">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
