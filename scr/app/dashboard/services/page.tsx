import { managementRows } from "@/components/dashboard/dashboard-data";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { ManagementTable } from "@/components/dashboard/ManagementTable";

export default function DashboardServicesPage() {
  return (
    <div className="dashboard-page">
      <DashboardPageHeader
        action="Thêm dịch vụ"
        description="Quản lý gói dịch vụ, giá niêm yết, trạng thái hiển thị và nội dung tư vấn."
        title="Quản lý dịch vụ"
      />
      <ManagementTable
        columns={["Mã", "Dịch vụ", "Trạng thái", "Giá"]}
        rows={managementRows.services}
        title="Danh sách dịch vụ"
      />
    </div>
  );
}
