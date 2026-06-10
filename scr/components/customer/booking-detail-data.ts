export type BookingTimelineState = "done" | "current" | "upcoming";

export type BookingDetail = {
  clientLine: string;
  code: string;
  description: string;
  gallery: string[];
  id: string;
  packageLabel: string;
  price: {
    deposit: string;
    total: string;
  };
  service: {
    name: string;
    summary: string;
  };
  session: {
    date: string;
    location: string;
    note: string;
    time: string;
  };
  timeline: {
    date: string;
    label: string;
    state: BookingTimelineState;
  }[];
  title: string;
};

export const bookingDetails: BookingDetail[] = [
  {
    clientLine: "Linh & Hoang - 24 Tháng 12, 2026",
    code: "#BK-8802",
    description:
      "Urban Minimalist tập trung vào đường nét gọn gàng, ánh sáng tự nhiên và bối cảnh studio tinh giản. Buổi chụp phù hợp cho editorial cá nhân, hồ sơ thương hiệu và các bộ ảnh thời trang tối giản.",
    gallery: [
      "/images/studio.png",
      "/images/fashion.png",
      "/images/service-gallery-table.png",
      "/images/studio-camera.png",
    ],
    id: "bk-8802",
    packageLabel: "Fashion Editorial",
    price: {
      deposit: "Đã thanh toán cọc 2.000.000đ (10 Tháng 12)",
      total: "10.000.000đ",
    },
    service: {
      name: "Editorial Fashion",
      summary: "3 giờ chụp studio, 2 concept ánh sáng, 25 ảnh chỉnh sửa.",
    },
    session: {
      date: "24 Tháng 12, 2026",
      location: "Studio A, Quận 1",
      note: "Không gian ánh sáng tự nhiên",
      time: "09:00 - 12:00",
    },
    timeline: [
      { date: "08 Tháng 12 - 10:00", label: "Đã tạo booking", state: "done" },
      { date: "10 Tháng 12 - 15:30", label: "Đã nhận đặt cọc", state: "done" },
      { date: "Dự kiến 24 Tháng 12", label: "Sẵn sàng chụp", state: "current" },
      { date: "Dự kiến 30 Tháng 12", label: "Chỉnh sửa ảnh", state: "upcoming" },
      { date: "Dự kiến 05 Tháng 01, 2027", label: "Bàn giao", state: "upcoming" },
    ],
    title: "Urban Minimalist",
  },
  {
    clientLine: "Sophia & Alexander - 15 Tháng 01, 2027",
    code: "#BK-9124",
    description:
      "Gói Signature Wedding được thiết kế cho những cặp đôi muốn một trải nghiệm trọn vẹn từ concept, ánh sáng, bối cảnh đến album thành phẩm. Đội ngũ sẽ chuẩn bị moodboard, lịch trình chụp và danh sách khoảnh khắc quan trọng trước ngày thực hiện.",
    gallery: [
      "/images/service-hero.png",
      "/images/wedding.png",
      "/images/service-gallery-rings.png",
      "/images/service-gallery-bouquet.png",
    ],
    id: "bk-9124",
    packageLabel: "Signature Package",
    price: {
      deposit: "Đã thanh toán cọc 1.000.000đ (12 Tháng 10)",
      total: "25.000.000đ",
    },
    service: {
      name: "Signature Wedding",
      summary: "8 giờ chụp, 2 nhiếp ảnh gia, album photobook cao cấp.",
    },
    session: {
      date: "15 Tháng 01, 2027",
      location: "Đà Lạt Palace",
      note: "Khu vực sảnh hoa và cổng chính",
      time: "16:30 - 18:30",
    },
    timeline: [
      { date: "10 Tháng 10 - 09:15", label: "Đã tạo booking", state: "done" },
      { date: "12 Tháng 10 - 14:20", label: "Đã nhận đặt cọc", state: "done" },
      { date: "Dự kiến 15 Tháng 01", label: "Sẵn sàng chụp", state: "current" },
      { date: "Dự kiến 05 Tháng 02, 2027", label: "Chỉnh sửa ảnh", state: "upcoming" },
      { date: "Dự kiến 15 Tháng 02, 2027", label: "Bàn giao", state: "upcoming" },
    ],
    title: "Signature Wedding Session",
  },
  {
    clientLine: "Minh Anh - 05 Tháng 11, 2026",
    code: "#BK-7721",
    description:
      "Silent Spaces là phiên chụp kiến trúc tinh gọn dành cho studio, showroom hoặc không gian sống cần hình ảnh sạch, sáng và dễ dùng cho hồ sơ thương mại.",
    gallery: [
      "/images/gallery-wall.png",
      "/images/studio.png",
      "/images/service-gallery-table.png",
      "/images/lens.png",
    ],
    id: "bk-7721",
    packageLabel: "Architecture",
    price: {
      deposit: "Chưa thanh toán cọc",
      total: "7.500.000đ",
    },
    service: {
      name: "Interior Architecture",
      summary: "4 giờ chụp không gian, cân chỉnh màu sắc, 20 ảnh hoàn thiện.",
    },
    session: {
      date: "05 Tháng 11, 2026",
      location: "Silent Studio",
      note: "Khu vực phòng trắng và gallery wall",
      time: "10:00 - 14:00",
    },
    timeline: [
      { date: "01 Tháng 11 - 08:30", label: "Đã tạo bản nháp", state: "done" },
      { date: "Đang chờ", label: "Xác nhận đặt lịch", state: "current" },
      { date: "Sau xác nhận", label: "Nhận đặt cọc", state: "upcoming" },
      { date: "Sau buổi chụp", label: "Chỉnh sửa ảnh", state: "upcoming" },
    ],
    title: "Silent Spaces",
  },
  {
    clientLine: "An Nhiên - 28 Tháng 12, 2026",
    code: "#BK-8850",
    description:
      "The Studio Collection dành cho chân dung cao cấp với định hướng ánh sáng editorial, hỗ trợ tạo dáng và lựa chọn khung hình phù hợp cho portfolio cá nhân.",
    gallery: [
      "/images/portrait.png",
      "/images/service-gallery-portrait.png",
      "/images/album.png",
      "/images/tunnel.png",
    ],
    id: "bk-8850",
    packageLabel: "Portrait Series",
    price: {
      deposit: "Đã thanh toán cọc 1.500.000đ (18 Tháng 12)",
      total: "5.000.000đ",
    },
    service: {
      name: "Premium Portrait",
      summary: "2 giờ chụp, 1 concept studio, 15 ảnh chỉnh sửa.",
    },
    session: {
      date: "28 Tháng 12, 2026",
      location: "Main Stage, Studio A",
      note: "Nhiếp ảnh gia: Alex Trần",
      time: "13:00 - 17:00",
    },
    timeline: [
      { date: "18 Tháng 12 - 11:00", label: "Đã tạo booking", state: "done" },
      { date: "18 Tháng 12 - 11:20", label: "Đã nhận đặt cọc", state: "done" },
      { date: "Dự kiến 28 Tháng 12", label: "Sẵn sàng chụp", state: "current" },
      { date: "Dự kiến 02 Tháng 01, 2027", label: "Chỉnh sửa ảnh", state: "upcoming" },
      { date: "Dự kiến 06 Tháng 01, 2027", label: "Bàn giao", state: "upcoming" },
    ],
    title: "The Studio Collection",
  },
];

export function getBookingDetail(bookId: string) {
  return bookingDetails.find((booking) => booking.id === bookId);
}
