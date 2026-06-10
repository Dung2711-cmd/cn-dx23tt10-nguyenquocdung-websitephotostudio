export type BookingStatus = "all" | "confirmed" | "pending" | "draft";

export type CustomerBooking = {
  actionLabel: string;
  category: string;
  date: string;
  detailHref?: string;
  id: string;
  image: string;
  location: string;
  photographer?: string;
  slug: string;
  status: Exclude<BookingStatus, "all">;
  time: string;
  title: string;
};

export const bookingStatusOptions: { label: string; value: BookingStatus }[] = [
  { label: "Tất cả trạng thái", value: "all" },
  { label: "Đã xác nhận", value: "confirmed" },
  { label: "Đang chờ", value: "pending" },
  { label: "Bản nháp", value: "draft" },
];

export const customerBookings = [
  {
    actionLabel: "Chi tiết",
    category: "Fashion Editorial",
    date: "24 Tháng 12, 2026",
    id: "#BK-8802",
    image: "/images/studio.png",
    location: "Studio A, Quận 1",
    slug: "bk-8802",
    status: "confirmed",
    time: "09:00 - 12:00",
    title: "Urban Minimalist",
  },
  {
    actionLabel: "Chi tiết",
    category: "Wedding Session",
    date: "15 Tháng 01, 2027",
    id: "#BK-9124",
    image: "/images/wedding.png",
    location: "Đà Lạt Palace",
    slug: "bk-9124",
    status: "pending",
    time: "16:30 - 18:30",
    title: "The Golden Hour",
  },
  {
    actionLabel: "Chi tiết",
    category: "Architecture",
    date: "05 Tháng 11, 2026",
    id: "#BK-7721",
    image: "/images/gallery-wall.png",
    location: "Silent Studio",
    slug: "bk-7721",
    status: "draft",
    time: "10:00 - 14:00",
    title: "Silent Spaces",
  },
  {
    actionLabel: "Chi tiết",
    category: "Portrait Series",
    date: "28 Tháng 12, 2026",
    id: "#BK-8850",
    image: "/images/portrait.png",
    location: "Main Stage, Studio A",
    photographer: "Alex Trần",
    slug: "bk-8850",
    status: "confirmed",
    time: "13:00 - 17:00",
    title: "The Studio Collection",
  },
] satisfies CustomerBooking[];
