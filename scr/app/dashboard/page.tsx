import { BookingChart } from "@/components/dashboard/BookingChart";
import { dashboardKpis, operationsKpis } from "@/components/dashboard/dashboard-data";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { RecentBookings } from "@/components/dashboard/RecentBookings";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { TodaySchedule } from "@/components/dashboard/TodaySchedule";

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <DashboardPageHeader
        action="Tạo booking"
        description="Theo dõi vận hành studio trong một không gian quản trị dành riêng cho admin."
        title="Dashboard"
      />

      <section className="dashboard-role-section">
        <header>
          <span>Admin view</span>
          <h2>Quản trị tổng thể</h2>
        </header>
        <KpiCards items={dashboardKpis} />
        <div className="dashboard-chart-grid">
          <RevenueChart />
          <BookingChart />
        </div>
      </section>

      <section className="dashboard-role-section">
        <header>
          <span>Admin operations</span>
          <h2>Vận hành trong ngày</h2>
        </header>
        <KpiCards items={operationsKpis} />
        <div className="dashboard-chart-grid">
          <TodaySchedule />
          <RecentBookings />
        </div>
      </section>
    </div>
  );
}
