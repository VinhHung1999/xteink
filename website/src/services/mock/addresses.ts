import type { Province, District, Ward } from "../types";

export const mockProvinces: Province[] = [
  { code: "hcm", name: "TP. Hồ Chí Minh" },
  { code: "hn", name: "Hà Nội" },
  { code: "dn", name: "Đà Nẵng" },
];

export const mockDistrictsByProvince: Record<string, District[]> = {
  hcm: [
    { code: "q1", name: "Quận 1" },
    { code: "q3", name: "Quận 3" },
    { code: "q7", name: "Quận 7" },
    { code: "bthanh", name: "Quận Bình Thạnh" },
    { code: "tduc", name: "TP. Thủ Đức" },
  ],
  hn: [
    { code: "hk", name: "Quận Hoàn Kiếm" },
    { code: "cg", name: "Quận Cầu Giấy" },
    { code: "dd", name: "Quận Đống Đa" },
    { code: "ty", name: "Quận Tây Hồ" },
  ],
  dn: [
    { code: "hc", name: "Quận Hải Châu" },
    { code: "st", name: "Quận Sơn Trà" },
    { code: "nhs", name: "Quận Ngũ Hành Sơn" },
  ],
};

export const mockWardsByDistrict: Record<string, Ward[]> = {
  q1: [
    { code: "bn", name: "Phường Bến Nghé" },
    { code: "bt", name: "Phường Bến Thành" },
    { code: "dc", name: "Phường Đa Kao" },
    { code: "nt", name: "Phường Nguyễn Thái Bình" },
  ],
  q3: [
    { code: "p1", name: "Phường 1" },
    { code: "p2", name: "Phường 2" },
    { code: "p3", name: "Phường 3" },
    { code: "vch", name: "Phường Võ Thị Sáu" },
  ],
  q7: [
    { code: "tml", name: "Phường Tân Mỹ" },
    { code: "tp", name: "Phường Tân Phú" },
    { code: "tk", name: "Phường Tân Kiểng" },
    { code: "pmh", name: "Phường Phú Mỹ Hưng" },
  ],
  bthanh: [
    { code: "p1", name: "Phường 1" },
    { code: "p2", name: "Phường 2" },
    { code: "p11", name: "Phường 11" },
    { code: "p25", name: "Phường 25" },
  ],
  tduc: [
    { code: "lc", name: "Phường Linh Chiểu" },
    { code: "hbc", name: "Phường Hiệp Bình Chánh" },
    { code: "bt", name: "Phường Bình Thọ" },
    { code: "tc", name: "Phường Trường Thọ" },
  ],
  hk: [
    { code: "hg", name: "Phường Hàng Gai" },
    { code: "hb", name: "Phường Hàng Bạc" },
    { code: "hd", name: "Phường Hàng Đào" },
    { code: "ct", name: "Phường Cửa Đông" },
  ],
  cg: [
    { code: "dc", name: "Phường Dịch Vọng" },
    { code: "mt", name: "Phường Mai Dịch" },
    { code: "nt", name: "Phường Nghĩa Tân" },
    { code: "qh", name: "Phường Quan Hoa" },
  ],
  dd: [
    { code: "vh", name: "Phường Văn Hương" },
    { code: "th", name: "Phường Trung Liệt" },
    { code: "kh", name: "Phường Khương Thượng" },
    { code: "lh", name: "Phường Láng Hạ" },
  ],
  ty: [
    { code: "bk", name: "Phường Bưởi" },
    { code: "th", name: "Phường Tứ Liên" },
    { code: "qan", name: "Phường Quảng An" },
  ],
  hc: [
    { code: "th", name: "Phường Thanh Bình" },
    { code: "hc1", name: "Phường Hải Châu 1" },
    { code: "hc2", name: "Phường Hải Châu 2" },
    { code: "nb", name: "Phường Nam Dương" },
  ],
  st: [
    { code: "mk", name: "Phường Mỹ Khê" },
    { code: "pk", name: "Phường Phước Mỹ" },
    { code: "ad", name: "Phường An Hải Đông" },
  ],
  nhs: [
    { code: "mk", name: "Phường Mỹ An" },
    { code: "hh", name: "Phường Hòa Hải" },
    { code: "hq", name: "Phường Hòa Quý" },
  ],
};
