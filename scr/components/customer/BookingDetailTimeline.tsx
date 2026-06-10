import { IconCheck, IconCircleDot } from "@tabler/icons-react";
import type { BookingDetail } from "./booking-detail-data";

type BookingDetailTimelineProps = {
  timeline: BookingDetail["timeline"];
};

export function BookingDetailTimeline({ timeline }: BookingDetailTimelineProps) {
  return (
    <aside className="booking-detail-timeline">
      <h2>Timeline trạng thái</h2>
      <ol>
        {timeline.map((item) => (
          <li className={`booking-timeline-item booking-timeline-item--${item.state}`} key={item.label}>
            <span>{item.state === "done" ? <IconCheck size={15} stroke={2} /> : <IconCircleDot size={15} stroke={2} />}</span>
            <p>
              <strong>{item.label}</strong>
              <small>{item.date}</small>
            </p>
          </li>
        ))}
      </ol>
    </aside>
  );
}
