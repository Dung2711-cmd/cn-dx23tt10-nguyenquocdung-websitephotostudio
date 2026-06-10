import Link from "next/link";

export function BookingCallout() {
  return (
    <section className="services-page-callout shell">
      <h2>Sẵn sàng để tạo nên tuyệt tác?</h2>
      <p>
        Hãy để chúng tôi giúp bạn lưu giữ những khoảnh khắc đẹp nhất. Đặt lịch
        tư vấn miễn phí ngay hôm nay.
      </p>
      <div>
        <Link className="solid-button" href="/customer/booking">
          Đặt lịch ngay
        </Link>
        <Link className="outline-button" href="/contact">
          Liên hệ tư vấn
        </Link>
      </div>
    </section>
  );
}
