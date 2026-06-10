import { managementRows } from "@/components/dashboard/dashboard-data";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { ManagementTable } from "@/components/dashboard/ManagementTable";

export default function DashboardCustomersPage() {
  return (
    <div className="dashboard-page">
      <DashboardPageHeader
        action="Thêm khách hàng"
        description="Quản lý hồ sơ khách hàng, lịch sử booking và nhóm chăm sóc tương ứng."
        title="Quản lý khách hàng"
      />
      <ManagementTable
        columns={["Mã KH", "Khách hàng", "Booking", "Phân nhóm"]}
        rows={managementRows.customers}
        title="Danh sách khách hàng"
      />
    </div>
  );
}
