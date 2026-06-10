import type { BookingStatus } from "./booking-list-data";
import { bookingStatusOptions } from "./booking-list-data";

type BookingFiltersProps = {
  activeStatus: BookingStatus;
  onStatusChange: (status: BookingStatus) => void;
  sortOrder: string;
  onSortChange: (sortOrder: string) => void;
};

export function BookingFilters({
  activeStatus,
  onSortChange,
  onStatusChange,
  sortOrder,
}: BookingFiltersProps) {
  return (
    <div className="booking-list-filters" aria-label="Bộ lọc lịch hẹn">
      <div>
        <span>Trạng thái</span>
        <div className="booking-status-filter">
          {bookingStatusOptions
            .filter((option) => option.value !== "all")
            .map((option) => (
              <button
                className={activeStatus === option.value ? "active" : undefined}
                key={option.value}
                onClick={() => onStatusChange(activeStatus === option.value ? "all" : option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
        </div>
      </div>
      <label>
        <span>Thời gian</span>
        <select value={sortOrder} onChange={(event) => onSortChange(event.target.value)}>
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </label>
    </div>
  );
}
