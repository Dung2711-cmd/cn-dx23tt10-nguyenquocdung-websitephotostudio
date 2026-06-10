export type ServiceCategory = "all" | "wedding" | "portrait" | "fashion";

export const serviceCategories: { label: string; value: ServiceCategory }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Cưới", value: "wedding" },
  { label: "Chân dung", value: "portrait" },
  { label: "Thời trang", value: "fashion" },
];

export const services = [
  {
    category: "wedding",
    categoryLabel: "Cưới",
    description:
      "Ghi lại câu chuyện tình yêu của bạn qua những thước phim đậm chất điện ảnh và tinh tế.",
    image: "/images/wedding.png",
    price: "Từ 15.000.000đ",
    title: "Bộ Sưu Tập Lễ Cưới",
  },
  {
    category: "portrait",
    categoryLabel: "Chân dung",
    description:
      "Tôn vinh vẻ đẹp cá nhân thông qua những góc máy nghệ thuật và xử lý hậu kỳ tỉ mỉ.",
    image: "/images/portrait.png",
    price: "Từ 5.000.000đ",
    title: "Chân Dung Cao Cấp",
  },
  {
    category: "fashion",
    categoryLabel: "Thời trang",
    description:
      "Dịch vụ chụp ảnh lookbook và editorial dành cho các thương hiệu và cá nhân.",
    image: "/images/fashion.png",
    price: "Từ 10.000.000đ",
    title: "Editorial Fashion",
  },
] satisfies {
  category: Exclude<ServiceCategory, "all">;
  categoryLabel: string;
  description: string;
  image: string;
  price: string;
  title: string;
}[];

export const pricingPackages = [
  {
    cost: "5.000.000đ",
    deliverables: "15 ảnh chỉnh sửa",
    description: "Chụp tại studio, 1 outfit",
    duration: "2 giờ",
    name: "Standard Portrait",
  },
  {
    cost: "25.000.000đ",
    deliverables: "50 ảnh chỉnh sửa + Album",
    description: "Ngoại cảnh & Studio, 3 outfit",
    duration: "Toàn ngày",
    name: "Premium Wedding",
  },
  {
    cost: "12.000.000đ",
    deliverables: "30 ảnh chỉnh sửa",
    description: "Dành cho Brand thời trang",
    duration: "4 giờ",
    name: "Commercial Lookbook",
  },
];
