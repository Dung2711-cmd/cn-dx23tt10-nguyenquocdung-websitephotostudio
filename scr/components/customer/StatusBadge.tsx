import type { BookingStatus } from "./booking-list-data";

const statusLabels: Record<Exclude<BookingStatus, "all">, string> = {
  confirmed: "Đã xác nhận",
  draft: "Bản nháp",
  pending: "Đang chờ",
};

type StatusBadgeProps = {
  status: Exclude<BookingStatus, "all">;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`booking-status booking-status--${status}`}>{statusLabels[status]}</span>;
}
