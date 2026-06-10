import { managementRows } from "@/components/dashboard/dashboard-data";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { ManagementTable } from "@/components/dashboard/ManagementTable";

export default function DashboardContractsPage() {
  return (
    <div className="dashboard-page">
      <DashboardPageHeader
        action="Tạo hợp đồng"
        description="Theo dõi hợp đồng, trạng thái ký, giá trị dịch vụ và các mốc cần xử lý."
        title="Quản lý hợp đồng"
      />
      <ManagementTable
        columns={["Mã HĐ", "Khách hàng", "Trạng thái", "Giá trị"]}
        rows={managementRows.contracts}
        title="Danh sách hợp đồng"
      />
    </div>
  );
}
