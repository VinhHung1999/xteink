import { SocialProofData } from "../types";

export const mockSocialProofData: SocialProofData = {
  pressReviews: [
    {
      name: "Lifehacker",
      rating: 3.5,
      maxRating: 5,
      quote: "A surprisingly capable little e-reader",
    },
    {
      name: "Pocket-lint",
      rating: 4,
      maxRating: 5,
      quote: "The perfect companion for phone-addicted readers",
    },
  ],
  youtubeReview: {
    channel: "jvscholz",
    subscribers: "348K",
    title: "This Tiny E-Reader Changed How I Read",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  communityStat: "150+ người dùng Việt Nam",
  testimonials: [
    {
      quote:
        "Mua về cho con đọc sách, bé rất thích vì nhẹ và không có quảng cáo. Giao hàng nhanh, đóng gói cẩn thận.",
      name: "Nguyễn Thị Mai",
      source: "Facebook",
    },
    {
      quote:
        "Dùng được 2 tuần rồi, pin trâu thật sự. Gắn lên điện thoại đi cafe đọc sách rất tiện, ai hỏi cũng khen.",
      name: "Trần Văn Đức",
      source: "Facebook",
    },
    {
      quote:
        "Firmware Crosspoint hỗ trợ tiếng Việt rất tốt. Thư viện 70K sách phong phú, có cả sách kinh doanh lẫn văn học.",
      name: "Lê Phương Anh",
      source: "Facebook",
    },
    {
      quote:
        "Mình order COD, 2 ngày là nhận. Máy nhỏ xinh, nhẹ hơn tưởng tượng. Nút bấm vật lý lật trang rất thích.",
      name: "Phạm Hoàng Long",
      source: "Facebook",
    },
  ],
};
