import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // =============================================
  // CLEAR ALL TABLES (idempotent re-runs)
  // Delete in reverse dependency order
  // =============================================

  await prisma.ward.deleteMany();
  await prisma.district.deleteMany();
  await prisma.province.deleteMany();
  await prisma.checkoutPaymentMethod.deleteMany();
  await prisma.communityTestimonial.deleteMany();
  await prisma.youTubeReview.deleteMany();
  await prisma.pressReview.deleteMany();
  await prisma.bundleItem.deleteMany();
  await prisma.warrantyInfo.deleteMany();
  await prisma.shippingInfo.deleteMany();
  await prisma.purchasePaymentMethod.deleteMany();
  await prisma.trustBadge.deleteMany();
  await prisma.pricingIncludedItem.deleteMany();
  await prisma.pricingConfig.deleteMany();
  await prisma.footerPaymentMethod.deleteMany();
  await prisma.footerLink.deleteMany();
  await prisma.navLink.deleteMany();
  await prisma.guide.deleteMany();
  await prisma.fAQItem.deleteMany();
  await prisma.lifestyleMoment.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.snapFlipReadStep.deleteMany();
  await prisma.feature.deleteMany();
  await prisma.accessoryColor.deleteMany();
  await prisma.accessory.deleteMany();
  await prisma.productFeature.deleteMany();
  await prisma.product.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.siteConfig.deleteMany();

  console.log("All tables cleared");

  // =============================================
  // PRODUCTS (X4 + X3)
  // =============================================

  const x4 = await prisma.product.upsert({
    where: { slug: "x4" },
    update: {},
    create: {
      slug: "x4",
      name: "Xteink X4",
      tag: "Bestseller",
      subtitle: "Rethink Reading",
      description:
        'Màn hình e-ink 4.3", mỏng 5.9mm, nút bấm vật lý, nam châm gắn điện thoại. Đọc sách chưa bao giờ dễ đến thế.',
      image:
        "/images/products/x4/gallery/xteink_x4_ultra_thin_magnetic_back_ereader_main_product_photo_69usd.jpg",
      price: "1.590.000₫",
      priceNumeric: 1590000,
      originalPrice: "1.890.000₫",
      screenSpec: '4.3"',
      ppiSpec: "220 PPI",
      weightSpec: "74g",
      thicknessSpec: "4.9mm",
      advantages: ["screen", "price", "thickness"],
      specsList: ['4.3" E-Ink', "220 PPI", "74g", "4.9mm", "Pin 2 tuần"],
      sortOrder: 0,
      features: {
        create: [
          {
            icon: "feather",
            title: "Nhẹ như không",
            description: "74g — nhẹ hơn một bộ bài. Bỏ túi quần, quên luôn đang mang.",
            sortOrder: 0,
          },
          {
            icon: "volume-x",
            title: "Chỉ có đọc sách",
            description:
              "Không app, không thông báo, không quảng cáo. Chỉ bạn và cuốn sách.",
            sortOrder: 1,
          },
          {
            icon: "hard-drive",
            title: "Sách của bạn, mãi mãi",
            description:
              "Thẻ SD mở rộng, không DRM. Sách bạn mua là sách bạn sở hữu.",
            sortOrder: 2,
          },
        ],
      },
    },
  });

  const x3 = await prisma.product.upsert({
    where: { slug: "x3" },
    update: {},
    create: {
      slug: "x3",
      name: "Xteink X3",
      tag: "2026 New",
      subtitle: "Ultra Compact",
      description:
        "Phiên bản ultra-compact — 3.7 inch, 60g, siêu nhẹ siêu sắc nét với 250 PPI.",
      image:
        "/images/products/x3/gallery/xteink_x3_ultra_compact_magnetic_ereader_space_black_72_99usd.jpg",
      price: "1.790.000₫",
      priceNumeric: 1790000,
      screenSpec: '3.7"',
      ppiSpec: "250 PPI",
      weightSpec: "60g",
      thicknessSpec: "TBD",
      advantages: ["ppi", "weight"],
      specsList: ['3.7" E-Ink', "250 PPI", "60g", "Ultra-compact", "Pin 2 tuần"],
      sortOrder: 1,
    },
  });

  console.log(`Products seeded: ${x4.slug}, ${x3.slug}`);

  // =============================================
  // ACCESSORIES — Standalone (category: "standalone")
  // =============================================

  const standaloneAccessories = [
    {
      name: "Reading Light",
      price: "249.000₫",
      image: "/images/products/x4/add_ons/xteink_x4_magnetic_reading_light_accessory_9_99usd.jpg",
      category: "standalone",
      sortOrder: 0,
      colors: [] as { name: string; hex: string; sortOrder: number }[],
    },
    {
      name: "Magnetic Case",
      price: "219.000₫",
      image: "/images/products/x4/add_ons/xteink_x4_magnetic_case_accessory_8_99usd.jpg",
      category: "standalone",
      sortOrder: 1,
      colors: [
        { name: "Midnight Black", hex: "#1A1A1A", sortOrder: 0 },
        { name: "Charcoal Gray", hex: "#2D2D2D", sortOrder: 1 },
        { name: "Warm Cream", hex: "#E8DDD3", sortOrder: 2 },
        { name: "Dusty Rose", hex: "#C4A0A0", sortOrder: 3 },
        { name: "Sage Green", hex: "#8B9E7E", sortOrder: 4 },
        { name: "Deep Gold", hex: "#B8864A", sortOrder: 5 },
      ],
    },
    {
      name: "Silicon Case",
      price: "99.000₫",
      image: "/images/products/x4/add_ons/xteink_x4_protective_case_accessory_3_99usd.jpg",
      category: "standalone",
      sortOrder: 2,
      colors: [
        { name: "Black", hex: "#1A1A1A", sortOrder: 0 },
        { name: "Cream", hex: "#F5F0EB", sortOrder: 1 },
      ],
    },
  ];

  for (const acc of standaloneAccessories) {
    const { colors, ...accData } = acc;
    await prisma.accessory.create({
      data: {
        ...accData,
        colors: colors.length > 0 ? { create: colors } : undefined,
      },
    });
  }

  // =============================================
  // ACCESSORIES — Pricing (category: "pricing")
  // =============================================

  const pricingAccessories = [
    {
      name: "Ốp nam châm",
      price: "210.000₫",
      image: "/images/products/x4/add_ons/xteink_x4_magnetic_case_accessory_8_99usd.jpg",
      category: "pricing",
      sortOrder: 0,
    },
    {
      name: "Đèn đọc sách",
      price: "230.000₫",
      image: "/images/products/x4/add_ons/xteink_x4_magnetic_reading_light_accessory_9_99usd.jpg",
      category: "pricing",
      sortOrder: 1,
    },
    {
      name: "Nhẫn giữ nam châm",
      price: "115.000₫",
      image: "/images/products/x4/add_ons/xteink_x4_magnetic_stick_on_ring_accessory_4_99usd.jpg",
      category: "pricing",
      sortOrder: 2,
    },
    {
      name: "Ốp bảo vệ",
      price: "90.000₫",
      image: "/images/products/x4/add_ons/xteink_x4_protective_case_accessory_3_99usd.jpg",
      category: "pricing",
      sortOrder: 3,
    },
    {
      name: "Miếng dán màn hình",
      price: "90.000₫",
      image: "/images/products/x4/add_ons/xteink_x4_clear_screen_protector_accessory_3_99usd.png",
      category: "pricing",
      sortOrder: 4,
    },
  ];

  for (const acc of pricingAccessories) {
    await prisma.accessory.create({ data: acc });
  }

  console.log("Accessories seeded");

  // =============================================
  // FEATURES GRID
  // =============================================

  const features = [
    {
      image: "/images/home/scrolling_features/paper_like_comfort_gentle_on_the_eyes_eink_display.jpg",
      title: "E-Ink êm mắt",
      description: "Đọc hàng giờ không mỏi — như đọc giấy thật",
      sortOrder: 0,
    },
    {
      image: "/images/home/scrolling_features/physical_keys_precise_distraction_free_reading.jpg",
      title: "Nút bấm vật lý",
      description: "Lật trang chính xác, một tay cầm thoải mái",
      sortOrder: 1,
    },
    {
      image: "/images/home/scrolling_features/no_subscriptions_your_books_your_way.jpg",
      title: "Không đăng ký",
      description: "Không subscription, không ràng buộc. Sách của bạn, cách của bạn",
      sortOrder: 2,
    },
    {
      image: "/images/home/scrolling_features/commutes_and_breaks_lasts_a_week_battery.jpg",
      title: "Pin cả tuần",
      description: "Đi làm, đi học, đi chơi — sạc một lần, đọc cả tuần",
      sortOrder: 3,
    },
  ];

  for (const f of features) {
    await prisma.feature.create({ data: f });
  }

  console.log("Features seeded");

  // =============================================
  // SNAP FLIP READ
  // =============================================

  const snapFlipReadSteps = [
    {
      step: "Snap",
      icon: "magnet",
      title: "Gắn lên điện thoại",
      description: "Nam châm siêu mạnh",
      sortOrder: 0,
    },
    {
      step: "Flip",
      icon: "book-open",
      title: "Lật ra là đọc",
      description: "Màn hình E-Ink sẵn sàng",
      sortOrder: 1,
    },
    {
      step: "Read",
      icon: "sparkles",
      title: "Đọc mọi lúc mọi nơi",
      description: "74g nhẹ hơn bộ bài, 2 tuần pin",
      sortOrder: 2,
    },
  ];

  for (const s of snapFlipReadSteps) {
    await prisma.snapFlipReadStep.create({ data: s });
  }

  console.log("Snap Flip Read seeded");

  // =============================================
  // TESTIMONIALS
  // =============================================

  const testimonials = [
    {
      quote:
        "Tôi mua X4 cho con gái. Bây giờ cháu đọc sách thay vì xem TikTok mỗi tối. Đó là món quà đáng giá nhất.",
      name: "Chị Hương",
      location: "Hà Nội",
      sortOrder: 0,
    },
    {
      quote:
        "Nhỏ gọn, nhẹ, gắn vào điện thoại là có thư viện bỏ túi. Đúng thứ tôi cần cho chuyến xe buýt mỗi sáng.",
      name: "Anh Minh",
      location: "TP. Hồ Chí Minh",
      sortOrder: 1,
    },
    {
      quote:
        "Đọc sách trên X4 mỗi trưa — không quảng cáo, không thông báo. Chỉ 15 phút nhưng tâm trí yên tĩnh hẳn.",
      name: "Bạn Linh",
      location: "Đà Nẵng",
      sortOrder: 2,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  console.log("Testimonials seeded");

  // =============================================
  // LIFESTYLE MOMENTS
  // =============================================

  const lifestyleMoments = [
    {
      image: "/images/home/media_grid/commutes_turn_into_chapters_lifestyle.jpg",
      caption: "Chuyến đi thành chương sách",
      sortOrder: 0,
    },
    {
      image: "/images/home/media_grid/a_pause_becomes_a_page_lifestyle.jpg",
      caption: "Khoảng lặng thành trang sách",
      sortOrder: 1,
    },
    {
      image: "/images/home/media_grid/lightweight_freedom_for_every_adventure_lifestyle.jpg",
      caption: "Tự do với mọi chuyến đi",
      sortOrder: 2,
    },
    {
      image: "/images/home/media_grid/stories_end_the_day_with_ease_at_home.jpg",
      caption: "Kết thúc ngày với câu chuyện",
      sortOrder: 3,
    },
  ];

  for (const l of lifestyleMoments) {
    await prisma.lifestyleMoment.create({ data: l });
  }

  console.log("Lifestyle Moments seeded");

  // =============================================
  // FAQ
  // =============================================

  const faqItems = [
    {
      question: "E-Ink là gì? Có giống màn hình điện thoại không?",
      answer:
        "E-Ink (mực điện tử) là công nghệ hiển thị giống trang giấy thật — không phát sáng xanh, không gây mỏi mắt. Khác hoàn toàn với LCD/OLED trên điện thoại, bạn có thể đọc hàng giờ mà mắt vẫn thoải mái, kể cả dưới ánh nắng mạnh.",
      sortOrder: 0,
    },
    {
      question: "Pin dùng được bao lâu?",
      answer:
        "Xteink X4 trang bị pin 650mAh, cho phép đọc liên tục khoảng 2 tuần với mức sử dụng trung bình (30 phút/ngày). E-Ink chỉ tiêu thụ năng lượng khi lật trang, nên pin rất bền. Sạc đầy qua USB-C chỉ mất khoảng 1.5 giờ.",
      sortOrder: 1,
    },
    {
      question: "Có hỗ trợ tiếng Việt không?",
      answer:
        "Có! Xteink X4 với firmware Crosspoint hỗ trợ đầy đủ tiếng Việt — giao diện, font chữ, và đọc sách tiếng Việt hoàn hảo. Thư viện tích hợp sẵn 70.000+ cuốn sách tiếng Việt đa thể loại.",
      sortOrder: 2,
    },
    {
      question: "Cách đặt hàng như thế nào?",
      answer:
        'Bạn có thể đặt hàng trực tiếp trên website bằng cách nhấn "Đặt hàng ngay", sau đó chọn phương thức thanh toán: chuyển khoản QR, MoMo, VNPay, hoặc COD (thanh toán khi nhận hàng). Sau khi xác nhận, đơn hàng sẽ được xử lý trong 24h.',
      sortOrder: 3,
    },
    {
      question: "Giao hàng mất bao lâu?",
      answer:
        "Nội thành HCM: giao trong 24h. Các tỉnh thành khác: 2–4 ngày làm việc. Miễn phí vận chuyển cho đơn hàng trên 1.000.000₫. Bạn sẽ nhận được mã tracking sau khi đơn hàng được gửi đi.",
      sortOrder: 4,
    },
    {
      question: "Làm sao chuyển sách vào máy?",
      answer:
        "Rất đơn giản! Kết nối X4 với máy tính qua USB-C, sau đó kéo thả file sách (EPUB, PDF, TXT, MOBI) vào bộ nhớ máy. Hoặc dùng thẻ SD — copy sách vào thẻ rồi gắn vào máy. Thư viện 70K+ sách cũng đã được cài sẵn trên firmware Crosspoint.",
      sortOrder: 5,
    },
    {
      question: "Chính sách bảo hành như thế nào?",
      answer:
        "Xteink X4 được bảo hành 12 tháng cho lỗi phần cứng từ nhà sản xuất. Trong 30 ngày đầu, nếu máy gặp lỗi, bạn được đổi máy mới hoàn toàn. Liên hệ hỗ trợ qua Zalo để được xử lý nhanh nhất.",
      sortOrder: 6,
    },
  ];

  for (const f of faqItems) {
    await prisma.fAQItem.create({ data: f });
  }

  console.log("FAQ seeded");

  // =============================================
  // GUIDES
  // =============================================

  const guides = [
    {
      icon: "book-open",
      title: "Bắt đầu sử dụng",
      description:
        "Hướng dẫn thiết lập Xteink X4 từ A–Z: sạc, bật máy, kết nối MagSafe, và đọc cuốn sách đầu tiên.",
      href: "/guides/getting-started",
      sortOrder: 0,
    },
    {
      icon: "folder-sync",
      title: "Chuyển sách vào máy",
      description:
        "Hỗ trợ EPUB, PDF, MOBI — chuyển qua USB, Wi-Fi, hoặc thẻ nhớ microSD. Không cần tài khoản, không DRM.",
      href: "/guides/transfer-books",
      sortOrder: 1,
    },
    {
      icon: "cpu",
      title: "Firmware Crosspoint",
      description:
        "Cài đặt firmware Crosspoint hỗ trợ tiếng Việt, font chữ đẹp, và tùy chỉnh giao diện đọc sách.",
      href: "/guides/crosspoint-firmware",
      sortOrder: 2,
    },
  ];

  for (const g of guides) {
    await prisma.guide.create({ data: g });
  }

  console.log("Guides seeded");

  // =============================================
  // NAVIGATION
  // =============================================

  const navLinks = [
    { label: "Trang chủ", href: "/", sortOrder: 0 },
    { label: "Sản phẩm", href: "/products", sortOrder: 1 },
    { label: "Hướng dẫn", href: "/guides", sortOrder: 2 },
    { label: "Cộng đồng", href: "/community", sortOrder: 3 },
    { label: "FAQ", href: "/faq", sortOrder: 4 },
    { label: "Về Xteink", href: "/about", sortOrder: 5 },
  ];

  for (const n of navLinks) {
    await prisma.navLink.create({ data: n });
  }

  console.log("Navigation seeded");

  // =============================================
  // FOOTER
  // =============================================

  const footerProductLinks = [
    { section: "product", label: "Xteink X4", href: "/products", sortOrder: 0 },
    { section: "product", label: "Phụ kiện", href: "/products#accessories", sortOrder: 1 },
    { section: "product", label: "So sánh", href: "/products#comparison", sortOrder: 2 },
  ];

  const footerSupportLinks = [
    { section: "support", label: "Hướng dẫn sử dụng", href: "/guides", sortOrder: 0 },
    { section: "support", label: "Câu hỏi thường gặp", href: "/faq", sortOrder: 1 },
    { section: "support", label: "Cộng đồng", href: "/community", sortOrder: 2 },
    { section: "support", label: "Chính sách đổi trả", href: "/faq", sortOrder: 3 },
  ];

  for (const l of [...footerProductLinks, ...footerSupportLinks]) {
    await prisma.footerLink.create({ data: l });
  }

  const footerPaymentMethods = ["MoMo", "ZaloPay", "VNPay", "COD"];
  for (let i = 0; i < footerPaymentMethods.length; i++) {
    await prisma.footerPaymentMethod.create({
      data: { name: footerPaymentMethods[i], sortOrder: i },
    });
  }

  console.log("Footer seeded");

  // =============================================
  // PRICING CONFIG
  // =============================================

  await prisma.pricingConfig.create({
    data: {
      label: "Xteink X4",
      price: "1.590.000₫",
      originalPrice: "1.890.000₫",
    },
  });

  const pricingIncluded = [
    "Màn hình E-Ink 4.3 inch, 220 PPI",
    "Nút bấm vật lý lật trang",
    "Nam châm gắn điện thoại (MagSafe)",
    "Bộ nhớ 32GB, hỗ trợ thẻ SD",
    "Pin 650mAh — đọc cả tuần",
    "Cáp USB-C sạc nhanh",
    "Hỗ trợ EPUB, TXT, BMP, JPG",
  ];

  for (let i = 0; i < pricingIncluded.length; i++) {
    await prisma.pricingIncludedItem.create({
      data: { text: pricingIncluded[i], sortOrder: i },
    });
  }

  const trustBadges = [
    { icon: "truck", label: "Miễn phí ship nội thành HCM", sortOrder: 0 },
    { icon: "refresh-cw", label: "7 ngày đổi trả miễn phí", sortOrder: 1 },
    { icon: "message-circle", label: "Hỗ trợ Zalo 24/7", sortOrder: 2 },
  ];

  for (const tb of trustBadges) {
    await prisma.trustBadge.create({ data: tb });
  }

  console.log("Pricing seeded");

  // =============================================
  // PURCHASE INFO
  // =============================================

  const purchasePaymentMethods = [
    {
      icon: "qr-code",
      name: "Chuyển khoản QR",
      description: "Quét mã QR — nhận hàng nhanh nhất",
      sortOrder: 0,
    },
    {
      icon: "wallet",
      name: "Ví MoMo",
      description: "Thanh toán qua ví MoMo",
      sortOrder: 1,
    },
    {
      icon: "credit-card",
      name: "VNPay",
      description: "Thẻ ATM / Visa / Mastercard",
      sortOrder: 2,
    },
    {
      icon: "banknote",
      name: "COD",
      description: "Thanh toán khi nhận hàng",
      sortOrder: 3,
    },
  ];

  for (const pm of purchasePaymentMethods) {
    await prisma.purchasePaymentMethod.create({ data: pm });
  }

  const shippingInfos = [
    {
      icon: "truck",
      region: "Nội thành HCM",
      time: "Giao trong 24h",
      note: "Giao nhanh trong ngày",
      sortOrder: 0,
    },
    {
      icon: "map-pin",
      region: "Tỉnh thành khác",
      time: "2–4 ngày làm việc",
      sortOrder: 1,
    },
    {
      icon: "package",
      region: "Miễn phí vận chuyển",
      time: "Đơn hàng trên 1.000.000₫",
      note: "Áp dụng toàn quốc",
      sortOrder: 2,
    },
  ];

  for (const si of shippingInfos) {
    await prisma.shippingInfo.create({ data: si });
  }

  const warrantyInfos = [
    {
      icon: "refresh-cw",
      title: "30 ngày đổi mới",
      description: "Đổi máy mới nếu lỗi nhà sản xuất",
      sortOrder: 0,
    },
    {
      icon: "shield-check",
      title: "12 tháng bảo hành",
      description: "Bảo hành hardware chính hãng",
      sortOrder: 1,
    },
  ];

  for (const w of warrantyInfos) {
    await prisma.warrantyInfo.create({ data: w });
  }

  const bundleItems = [
    { icon: "smartphone", name: "Xteink X4 eReader", sortOrder: 0 },
    { icon: "hard-drive", name: "Thẻ nhớ 32GB", sortOrder: 1 },
    { icon: "cpu", name: "Crosspoint firmware", sortOrder: 2 },
    { icon: "book-open", name: "70.000+ sách miễn phí", sortOrder: 3 },
    { icon: "film", name: "Miếng dán màn hình", sortOrder: 4 },
    { icon: "circle", name: "Vòng nam châm MagSafe", sortOrder: 5 },
  ];

  for (const bi of bundleItems) {
    await prisma.bundleItem.create({ data: bi });
  }

  console.log("Purchase Info seeded");

  // =============================================
  // SOCIAL PROOF
  // =============================================

  const pressReviews = [
    {
      name: "Lifehacker",
      rating: 3.5,
      maxRating: 5,
      quote: "A surprisingly capable little e-reader",
      sortOrder: 0,
    },
    {
      name: "Pocket-lint",
      rating: 4,
      maxRating: 5,
      quote: "The perfect companion for phone-addicted readers",
      sortOrder: 1,
    },
  ];

  for (const pr of pressReviews) {
    await prisma.pressReview.create({ data: pr });
  }

  await prisma.youTubeReview.create({
    data: {
      channel: "jvscholz",
      subscribers: "348K",
      title: "This Tiny E-Reader Changed How I Read",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  });

  const communityTestimonials = [
    {
      quote:
        "Mua về cho con đọc sách, bé rất thích vì nhẹ và không có quảng cáo. Giao hàng nhanh, đóng gói cẩn thận.",
      name: "Nguyễn Thị Mai",
      source: "Facebook",
      sortOrder: 0,
    },
    {
      quote:
        "Dùng được 2 tuần rồi, pin trâu thật sự. Gắn lên điện thoại đi cafe đọc sách rất tiện, ai hỏi cũng khen.",
      name: "Trần Văn Đức",
      source: "Facebook",
      sortOrder: 1,
    },
    {
      quote:
        "Firmware Crosspoint hỗ trợ tiếng Việt rất tốt. Thư viện 70K sách phong phú, có cả sách kinh doanh lẫn văn học.",
      name: "Lê Phương Anh",
      source: "Facebook",
      sortOrder: 2,
    },
    {
      quote:
        "Mình order COD, 2 ngày là nhận. Máy nhỏ xinh, nhẹ hơn tưởng tượng. Nút bấm vật lý lật trang rất thích.",
      name: "Phạm Hoàng Long",
      source: "Facebook",
      sortOrder: 3,
    },
  ];

  for (const ct of communityTestimonials) {
    await prisma.communityTestimonial.create({ data: ct });
  }

  console.log("Social Proof seeded");

  // =============================================
  // CHECKOUT PAYMENT METHODS
  // =============================================

  const checkoutPaymentMethods = [
    {
      methodId: "cod",
      name: "Thanh toán khi nhận hàng (COD)",
      description: "Thanh toán bằng tiền mặt khi nhận hàng",
      icon: "📦",
      sortOrder: 0,
    },
    {
      methodId: "momo",
      name: "MoMo",
      description: "Thanh toán qua ví MoMo",
      icon: "💜",
      sortOrder: 1,
    },
    {
      methodId: "zalopay",
      name: "ZaloPay",
      description: "Thanh toán qua ví ZaloPay",
      icon: "💙",
      sortOrder: 2,
    },
    {
      methodId: "vnpay",
      name: "VNPay / QR",
      description: "Thanh toán qua VNPay hoặc quét mã QR",
      icon: "📱",
      sortOrder: 3,
    },
    {
      methodId: "bank",
      name: "Chuyển khoản ngân hàng",
      description: "Chuyển khoản trực tiếp vào tài khoản ngân hàng",
      icon: "🏦",
      sortOrder: 4,
    },
  ];

  for (const cpm of checkoutPaymentMethods) {
    await prisma.checkoutPaymentMethod.create({ data: cpm });
  }

  console.log("Checkout Payment Methods seeded");

  // =============================================
  // SITE CONFIG
  // =============================================

  const siteConfigs = [
    { key: "freeShippingNote", value: "Miễn phí ship cho đơn trên 1.000.000₫" },
    { key: "communityStat", value: "150+ người dùng Việt Nam" },
    { key: "bankTransfer.bankName", value: "Techcombank" },
    { key: "bankTransfer.accountNumber", value: "19038XXXXX" },
    { key: "bankTransfer.accountName", value: "CONG TY TNHH XTEINK" },
    { key: "bankTransfer.qrDataUrl", value: "" },
  ];

  for (const sc of siteConfigs) {
    await prisma.siteConfig.upsert({
      where: { key: sc.key },
      update: { value: sc.value },
      create: sc,
    });
  }

  console.log("Site Config seeded");

  // =============================================
  // MOCK ADDRESSES (3 cities for dev)
  // Full VN addresses in seed-addresses.ts
  // =============================================

  const provinces = [
    {
      code: "hcm",
      name: "TP. Hồ Chí Minh",
      sortOrder: 0,
      districts: [
        {
          code: "q1",
          name: "Quận 1",
          sortOrder: 0,
          wards: [
            { code: "bn", name: "Phường Bến Nghé", sortOrder: 0 },
            { code: "bt", name: "Phường Bến Thành", sortOrder: 1 },
            { code: "dc", name: "Phường Đa Kao", sortOrder: 2 },
            { code: "nt", name: "Phường Nguyễn Thái Bình", sortOrder: 3 },
          ],
        },
        {
          code: "q3",
          name: "Quận 3",
          sortOrder: 1,
          wards: [
            { code: "p1", name: "Phường 1", sortOrder: 0 },
            { code: "p2", name: "Phường 2", sortOrder: 1 },
            { code: "p3", name: "Phường 3", sortOrder: 2 },
            { code: "vch", name: "Phường Võ Thị Sáu", sortOrder: 3 },
          ],
        },
        {
          code: "q7",
          name: "Quận 7",
          sortOrder: 2,
          wards: [
            { code: "tml", name: "Phường Tân Mỹ", sortOrder: 0 },
            { code: "tp", name: "Phường Tân Phú", sortOrder: 1 },
            { code: "tk", name: "Phường Tân Kiểng", sortOrder: 2 },
            { code: "pmh", name: "Phường Phú Mỹ Hưng", sortOrder: 3 },
          ],
        },
        {
          code: "bthanh",
          name: "Quận Bình Thạnh",
          sortOrder: 3,
          wards: [
            { code: "p1bt", name: "Phường 1", sortOrder: 0 },
            { code: "p2bt", name: "Phường 2", sortOrder: 1 },
            { code: "p11", name: "Phường 11", sortOrder: 2 },
            { code: "p25", name: "Phường 25", sortOrder: 3 },
          ],
        },
        {
          code: "tduc",
          name: "TP. Thủ Đức",
          sortOrder: 4,
          wards: [
            { code: "lc", name: "Phường Linh Chiểu", sortOrder: 0 },
            { code: "hbc", name: "Phường Hiệp Bình Chánh", sortOrder: 1 },
            { code: "btho", name: "Phường Bình Thọ", sortOrder: 2 },
            { code: "tc", name: "Phường Trường Thọ", sortOrder: 3 },
          ],
        },
      ],
    },
    {
      code: "hn",
      name: "Hà Nội",
      sortOrder: 1,
      districts: [
        {
          code: "hk",
          name: "Quận Hoàn Kiếm",
          sortOrder: 0,
          wards: [
            { code: "hg", name: "Phường Hàng Gai", sortOrder: 0 },
            { code: "hb", name: "Phường Hàng Bạc", sortOrder: 1 },
            { code: "hd", name: "Phường Hàng Đào", sortOrder: 2 },
            { code: "ct", name: "Phường Cửa Đông", sortOrder: 3 },
          ],
        },
        {
          code: "cg",
          name: "Quận Cầu Giấy",
          sortOrder: 1,
          wards: [
            { code: "dcv", name: "Phường Dịch Vọng", sortOrder: 0 },
            { code: "mt", name: "Phường Mai Dịch", sortOrder: 1 },
            { code: "ntcg", name: "Phường Nghĩa Tân", sortOrder: 2 },
            { code: "qh", name: "Phường Quan Hoa", sortOrder: 3 },
          ],
        },
        {
          code: "dd",
          name: "Quận Đống Đa",
          sortOrder: 2,
          wards: [
            { code: "vh", name: "Phường Văn Hương", sortOrder: 0 },
            { code: "tl", name: "Phường Trung Liệt", sortOrder: 1 },
            { code: "kh", name: "Phường Khương Thượng", sortOrder: 2 },
            { code: "lh", name: "Phường Láng Hạ", sortOrder: 3 },
          ],
        },
        {
          code: "ty",
          name: "Quận Tây Hồ",
          sortOrder: 3,
          wards: [
            { code: "bk", name: "Phường Bưởi", sortOrder: 0 },
            { code: "tlien", name: "Phường Tứ Liên", sortOrder: 1 },
            { code: "qan", name: "Phường Quảng An", sortOrder: 2 },
          ],
        },
      ],
    },
    {
      code: "dn",
      name: "Đà Nẵng",
      sortOrder: 2,
      districts: [
        {
          code: "hc",
          name: "Quận Hải Châu",
          sortOrder: 0,
          wards: [
            { code: "thb", name: "Phường Thanh Bình", sortOrder: 0 },
            { code: "hc1", name: "Phường Hải Châu 1", sortOrder: 1 },
            { code: "hc2", name: "Phường Hải Châu 2", sortOrder: 2 },
            { code: "nd", name: "Phường Nam Dương", sortOrder: 3 },
          ],
        },
        {
          code: "st",
          name: "Quận Sơn Trà",
          sortOrder: 1,
          wards: [
            { code: "mk", name: "Phường Mỹ Khê", sortOrder: 0 },
            { code: "pm", name: "Phường Phước Mỹ", sortOrder: 1 },
            { code: "ahd", name: "Phường An Hải Đông", sortOrder: 2 },
          ],
        },
        {
          code: "nhs",
          name: "Quận Ngũ Hành Sơn",
          sortOrder: 2,
          wards: [
            { code: "ma", name: "Phường Mỹ An", sortOrder: 0 },
            { code: "hh", name: "Phường Hòa Hải", sortOrder: 1 },
            { code: "hq", name: "Phường Hòa Quý", sortOrder: 2 },
          ],
        },
      ],
    },
  ];

  for (const prov of provinces) {
    const { districts, ...provData } = prov;
    const createdProv = await prisma.province.create({ data: provData });

    for (const dist of districts) {
      const { wards, ...distData } = dist;
      const createdDist = await prisma.district.create({
        data: { ...distData, provinceId: createdProv.id },
      });

      for (const ward of wards) {
        await prisma.ward.create({
          data: { ...ward, districtId: createdDist.id },
        });
      }
    }
  }

  console.log("Addresses seeded (3 cities for dev)");

  console.log("Database seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
