/**
 * Icon Resolver — Maps Lucide icon name strings (from BE API) to LucideIcon components.
 *
 * BE returns `icon: string` (kebab-case), FE types expect `icon: LucideIcon`.
 * This utility bridges that gap so components need zero changes.
 */

import {
  Feather,
  VolumeX,
  HardDrive,
  Truck,
  RefreshCw,
  MessageCircle,
  QrCode,
  Wallet,
  CreditCard,
  Banknote,
  MapPin,
  Package,
  ShieldCheck,
  Smartphone,
  Cpu,
  BookOpen,
  Film,
  Circle,
  Magnet,
  Sparkles,
  FolderSync,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  feather: Feather,
  "volume-x": VolumeX,
  "hard-drive": HardDrive,
  truck: Truck,
  "refresh-cw": RefreshCw,
  "message-circle": MessageCircle,
  "qr-code": QrCode,
  wallet: Wallet,
  "credit-card": CreditCard,
  banknote: Banknote,
  "map-pin": MapPin,
  package: Package,
  "shield-check": ShieldCheck,
  smartphone: Smartphone,
  cpu: Cpu,
  "book-open": BookOpen,
  film: Film,
  circle: Circle,
  magnet: Magnet,
  sparkles: Sparkles,
  "folder-sync": FolderSync,
};

export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? Circle;
}
