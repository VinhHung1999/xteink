import { Magnet, BookOpen, Sparkles } from "lucide-react";
import { SnapFlipReadStep } from "../types";

/**
 * Mock data: Snap, Flip, Read - USP 3-step flow
 * Brand: Return (tactile) + Quiet (simple)
 */
export const mockSnapFlipReadSteps: SnapFlipReadStep[] = [
  {
    step: "Snap",
    icon: Magnet,
    title: "Gắn lên điện thoại",
    description: "Nam châm siêu mạnh",
  },
  {
    step: "Flip",
    icon: BookOpen,
    title: "Lật ra là đọc",
    description: "Màn hình E-Ink sẵn sàng",
  },
  {
    step: "Read",
    icon: Sparkles,
    title: "Đọc mọi lúc mọi nơi",
    description: "74g nhẹ hơn bộ bài, 2 tuần pin",
  },
];
