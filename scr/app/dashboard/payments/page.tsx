import { managementRows } from "@/components/dashboard/dashboard-data";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { ManagementTable } from "@/components/dashboard/ManagementTable";

export default function DashboardPaymentsPage() {
  return (
    <div className="dashboard-page">
      <DashboardPageHeader
        action="Ghi nhận thanh toán"
        description="Kiểm soát thanh toán, hóa đơn, đặt cọc và các khoản còn chờ đối soát."
        title="Quản lý thanh toán"
      />
      <ManagementTable
        columns={["Mã", "Khách hàng", "Trạng thái", "Số tiền"]}
        rows={managementRows.payments}
        title="Danh sách thanh toán"
      />
    </div>
  );
}
