import Link from "next/link";

export function BookingDetailCta() {
  return (
    <aside className="booking-detail-cta">
      <Link className="solid-button" href="/customer/payment">
        Tải hóa đơn
      </Link>
      <Link className="outline-button" href="/customer/booking">
        Đổi lịch chụp
      </Link>
      <Link href="/contact">Liên hệ quản lý</Link>
    </aside>
  );
}
