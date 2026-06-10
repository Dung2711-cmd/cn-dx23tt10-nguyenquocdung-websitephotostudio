export const dashboardKpis = [
  { label: "Doanh thu tháng", value: "1.2B", detail: "+18% so với tháng trước" },
  { label: "Booking mới", value: "84", detail: "12 lịch cần xác nhận" },
  { label: "Khách hàng", value: "342", detail: "+26 hồ sơ mới" },
  { label: "Thanh toán chờ", value: "2.5M", detail: "4 hóa đơn cần xử lý" },
];

export const operationsKpis = [
  { label: "Lịch hôm nay", value: "06", detail: "2 buổi ngoài studio" },
  { label: "Đang xử lý", value: "18", detail: "5 bộ ảnh cần duyệt" },
  { label: "Tin nhắn mới", value: "11", detail: "Ưu tiên phản hồi hôm nay" },
];

export const revenueSeries = [
  { label: "T7", value: 42 },
  { label: "T8", value: 56 },
  { label: "T9", value: 49 },
  { label: "T10", value: 72 },
  { label: "T11", value: 64 },
  { label: "T12", value: 88 },
];

export const bookingSeries = [
  { label: "Cưới", value: 38 },
  { label: "Chân dung", value: 24 },
  { label: "Thời trang", value: 18 },
  { label: "Concept", value: 15 },
];

export const todaySchedules = [
  { time: "09:00", title: "Urban Minimalist", location: "Studio A", owner: "Admin Studio" },
  { time: "13:30", title: "The Studio Collection", location: "Main Stage", owner: "Admin Studio" },
  { time: "16:00", title: "Golden Hour Prep", location: "Đà Lạt Palace", owner: "Admin Studio" },
];

export const recentBookings = [
  { id: "BK-9124", customer: "Sophia & Alexander", service: "Wedding Session", status: "Đang chờ" },
  { id: "BK-8850", customer: "Nguyễn Lan Anh", service: "Portrait Series", status: "Đã xác nhận" },
  { id: "BK-7721", customer: "Minh Đức", service: "Architecture", status: "Đặt lại" },
];

export const managementRows = {
  bookings: [
    ["#BK-9124", "Sophia & Alexander", "20/12/2026", "Đang chờ"],
    ["#BK-8850", "Nguyễn Lan Anh", "22/12/2026", "Đã xác nhận"],
    ["#BK-7721", "Minh Đức", "24/12/2026", "Đặt lại"],
  ],
  contracts: [
    ["#CT-2026-001", "Nguyễn Lan Anh", "Đã ký", "25.000.000đ"],
    ["#CT-2026-002", "Trần Văn Tú", "Chờ ký", "12.000.000đ"],
    ["#CT-2026-003", "Hoàng Phương", "Quá hạn", "8.000.000đ"],
  ],
  customers: [
    ["KH-001", "Nguyễn Lan Anh", "3 booking", "VIP"],
    ["KH-002", "Trần Văn Tú", "1 booking", "Mới"],
    ["KH-003", "Hoàng Phương", "5 booking", "Thân thiết"],
  ],
  payments: [
    ["PAY-001", "Nguyễn Lan Anh", "Đã thanh toán", "15.000.000đ"],
    ["PAY-002", "Sophia & Alexander", "Cọc 50%", "12.500.000đ"],
    ["PAY-003", "Minh Đức", "Chờ xử lý", "5.000.000đ"],
  ],
  services: [
    ["SV-001", "Chụp cưới", "Đang bán", "15.000.000đ"],
    ["SV-002", "Chân dung", "Đang bán", "5.000.000đ"],
    ["SV-003", "Concept nghệ thuật", "Tạm ẩn", "8.000.000đ"],
  ],
  users: [
    ["USR-001", "Admin Studio", "Admin", "Hoạt động"],
    ["USR-002", "Quản trị vận hành", "Admin", "Hoạt động"],
    ["USR-003", "Quản trị tài chính", "Admin", "Tạm khóa"],
  ],
};
