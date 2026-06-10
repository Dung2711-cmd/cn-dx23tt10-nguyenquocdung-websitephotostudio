import { managementRows } from "@/components/dashboard/dashboard-data";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { ManagementTable } from "@/components/dashboard/ManagementTable";

export default function DashboardBookingsPage() {
  return (
    <div className="dashboard-page">
      <DashboardPageHeader
        action="Thêm booking"
        description="Theo dõi lịch chụp, trạng thái xác nhận và điều phối nhân sự cho từng buổi."
        title="Quản lý booking"
      />
      <ManagementTable
        actionHref="/dashboard/bookings"
        columns={["Mã", "Khách hàng", "Ngày chụp", "Trạng thái"]}
        rows={managementRows.bookings}
        title="Danh sách booking"
      />
    </div>
  );
}
