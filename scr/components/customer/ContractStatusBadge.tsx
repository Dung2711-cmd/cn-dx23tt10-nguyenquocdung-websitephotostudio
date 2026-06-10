export type ContractStatus = "signed" | "pending" | "draft" | "expired" | "sent" | "cancelled";

const statusLabels: Record<ContractStatus, string> = {
  signed: "Đã ký",
  pending: "Chờ xử lý",
  draft: "Bản nháp",
  expired: "Quá hạn",
  sent: "Chờ ký",
  cancelled: "Đã hủy",
};

type ContractStatusBadgeProps = {
  status: ContractStatus;
};

export function ContractStatusBadge({ status }: ContractStatusBadgeProps) {
  return (
    <span className={`contract-status-badge contract-status-badge--${status}`}>
      {statusLabels[status]}
    </span>
  );
}
