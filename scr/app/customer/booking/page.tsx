import {
  BookingFlow,
} from "@/components/customer";

export default function CustomerBookingPage() {
  return (
    <main className="customer-booking-page">
      <header className="booking-page-header">
        <h1>Phiếu đặt lịch mới</h1>
        <p>
          Tạo một trải nghiệm riêng cho khách hàng của bạn. Theo dõi quy trình
          biên tập để đảm bảo một lịch hẹn mới trong thư viện kỹ thuật số.
        </p>
      </header>
      <BookingFlow />
    </main>
  );
}
