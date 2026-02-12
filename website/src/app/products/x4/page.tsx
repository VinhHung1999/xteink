import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";
import { getProductDetail } from "@/services/api";

export const metadata: Metadata = {
  title: "Xteink X4 — Máy đọc sách e-ink 4.3 inch",
  description:
    "Xteink X4: màn hình E-Ink 4.3 inch, 220 PPI, 74g, gắn nam châm lên điện thoại.",
  openGraph: {
    title: "Xteink X4 — Máy đọc sách e-ink 4.3 inch",
    description: "Màn hình E-Ink 4.3\", 220 PPI, 74g. Gắn nam châm lên điện thoại. Chỉ 1.590.000₫.",
    images: [{ url: "/images/products/x4/gallery/xteink_x4_ultra_thin_magnetic_back_ereader_main_product_photo_69usd.jpg" }],
  },
};

const x4JsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Xteink X4",
  description: "Máy đọc sách e-ink 4.3 inch, 220 PPI, 74g — gắn nam châm lên điện thoại, đọc mọi lúc mọi nơi.",
  image: "https://xteink.hungphu.work/images/products/x4/gallery/xteink_x4_ultra_thin_magnetic_back_ereader_main_product_photo_69usd.jpg",
  brand: { "@type": "Brand", name: "Xteink" },
  offers: {
    "@type": "Offer",
    price: "1590000",
    priceCurrency: "VND",
    availability: "https://schema.org/InStock",
    url: "https://xteink.hungphu.work/products/x4",
  },
};

const gallery = [
  "/images/products/x4/gallery/xteink_x4_ultra_thin_magnetic_back_ereader_main_product_photo_69usd.jpg",
  "/images/products/x4/gallery/xteink_x4_product_gallery_variant_2.jpg",
  "/images/products/x4/gallery/xteink_x4_product_gallery_variant_3.jpg",
  "/images/products/x4/gallery/xteink_x4_product_gallery_variant_4.jpg",
  "/images/products/x4/gallery/xteink_x4_product_gallery_variant_5.jpg",
  "/images/products/x4/gallery/xteink_x4_product_gallery_variant_6.jpg",
];

const detailedSpecs: { label: string; value: string }[] = [
  { label: "Màn hình", value: "4.3\" E-Ink (đen trắng)" },
  { label: "Độ phân giải", value: "800 × 480 — 220 PPI" },
  { label: "Trọng lượng", value: "74g" },
  { label: "Độ dày", value: "5.9mm" },
  { label: "Nút bấm", value: "3 nút vật lý (lật trang trái/phải + menu)" },
  { label: "Kết nối", value: "USB-C (sạc + truyền dữ liệu)" },
  { label: "Lưu trữ", value: "microSD lên đến 32GB" },
  { label: "Pin", value: "650mAh — đọc liên tục ~2 tuần" },
  { label: "Định dạng", value: "EPUB, PDF, MOBI, TXT, FB2, DJVU" },
  { label: "Gắn kết", value: "Nam châm MagSafe — snap vào điện thoại" },
];

export default async function X4Page() {
  const product = await getProductDetail("x4");
  if (!product) return notFound();

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(x4JsonLd) }}
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
        {product.features.length > 0 && (
          <div className="mt-16 scroll-reveal scroll-d3">
            <h2 className="font-heading text-2xl font-semibold text-paper mb-6">
              Tại sao chọn X4?
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {product.features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className={`glass-card rounded-2xl p-6 scroll-reveal scroll-d${Math.min(i + 1, 7)}`}
                  >
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
        )}

        {/* Lifestyle banner */}
        <div className="mt-16 scroll-reveal scroll-d4">
          <div className="glass-card relative overflow-hidden rounded-2xl">
            <div className="relative aspect-[21/9] md:aspect-[3/1]">
              <Image
                src="/images/products/x4/media_banner/ready_to_read_anywhere_super_slim_ultra_light_banner.jpg"
                alt="Xteink X4 — đọc sách mọi nơi"
                fill
                sizes="(max-width: 960px) 100vw, 960px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 max-w-md">
                <p className="font-heading text-xl md:text-2xl font-semibold text-paper leading-snug">
                  Đọc sách mọi nơi, mọi lúc
                </p>
                <p className="mt-2 text-sm text-paper/70 leading-relaxed">
                  Siêu mỏng 5.9mm. Siêu nhẹ 74g. Bỏ túi quần và quên luôn đang mang.
                  Gắn nam châm snap lên điện thoại — đọc sách chỉ trong 1 giây.
                </p>
              </div>
            </div>
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

        {/* What's in the box */}
        <div className="mt-16 scroll-reveal">
          <h2 className="font-heading text-2xl font-semibold text-paper mb-6">
            Trong hộp có gì?
          </h2>
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="glass-card relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/products/x4/specifications/box_contents_x4_ereader_and_accessories_whats_in_the_box.jpg"
                alt="Xteink X4 — trong hộp"
                fill
                sizes="(max-width: 768px) 100vw, 460px"
                className="object-cover"
              />
            </div>
            <ul className="space-y-3">
              {[
                "Máy đọc sách Xteink X4",
                "Cáp sạc USB-C",
                "Vòng nam châm MagSafe",
                "Thẻ nhớ microSD 8GB (đã cài sẵn sách)",
                "Hướng dẫn sử dụng nhanh",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-paper/70">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
