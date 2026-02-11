import { Guide } from "../types";
import { BookOpen, FolderSync, Cpu } from "lucide-react";

export const mockGuides: Guide[] = [
  {
    icon: BookOpen,
    title: "Bắt đầu sử dụng",
    description:
      "Hướng dẫn thiết lập Xteink X4 từ A–Z: sạc, bật máy, kết nối MagSafe, và đọc cuốn sách đầu tiên.",
    href: "/guides/getting-started",
  },
  {
    icon: FolderSync,
    title: "Chuyển sách vào máy",
    description:
      "Hỗ trợ EPUB, PDF, MOBI — chuyển qua USB, Wi-Fi, hoặc thẻ nhớ microSD. Không cần tài khoản, không DRM.",
    href: "/guides/transfer-books",
  },
  {
    icon: Cpu,
    title: "Firmware Crosspoint",
    description:
      "Cài đặt firmware Crosspoint hỗ trợ tiếng Việt, font chữ đẹp, và tùy chỉnh giao diện đọc sách.",
    href: "/guides/crosspoint-firmware",
  },
];
