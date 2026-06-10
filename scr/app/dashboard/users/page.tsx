import { managementRows } from "@/components/dashboard/dashboard-data";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { ManagementTable } from "@/components/dashboard/ManagementTable";

export default function DashboardUsersPage() {
  return (
    <div className="dashboard-page">
      <DashboardPageHeader
        action="Mời người dùng"
        description="Quản lý tài khoản admin, phân quyền và trạng thái truy cập hệ thống."
        title="Quản lý người dùng"
      />
      <ManagementTable
        columns={["Mã", "Người dùng", "Vai trò", "Trạng thái"]}
        rows={managementRows.users}
        title="Danh sách người dùng"
      />
    </div>
  );
}
