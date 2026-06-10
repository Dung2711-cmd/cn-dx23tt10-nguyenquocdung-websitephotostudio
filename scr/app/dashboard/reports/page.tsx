import { BookingChart } from "@/components/dashboard/BookingChart";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { RevenueChart } from "@/components/dashboard/RevenueChart";

export default function DashboardReportsPage() {
  return (
    <div className="dashboard-page">
      <DashboardPageHeader
        action="Xuất báo cáo"
        description="Tổng hợp doanh thu, phân bổ booking và hiệu suất vận hành theo từng giai đoạn."
        title="Báo cáo thống kê"
      />
      <div className="dashboard-chart-grid">
        <RevenueChart />
        <BookingChart />
      </div>
      <section className="dashboard-card report-summary">
        <h2>Nhận định nhanh</h2>
        <p>
          Doanh thu tăng mạnh ở tháng 12 nhờ nhóm dịch vụ cưới và chân dung cao cấp.
          Các booking cần xác nhận nên được xử lý trong ngày để giảm tỷ lệ rời lịch.
        </p>
      </section>
    </div>
  );
}
