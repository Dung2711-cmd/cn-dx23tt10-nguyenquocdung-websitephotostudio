import { IconCamera, IconCash, IconCalendar, IconMapPin } from "@tabler/icons-react";
import type { BookingDetail } from "./booking-detail-data";

type BookingServiceInfoProps = {
  price: BookingDetail["price"];
  service: BookingDetail["service"];
  session: BookingDetail["session"];
};

export function BookingServiceInfo({ price, service, session }: BookingServiceInfoProps) {
  return (
    <section className="booking-detail-info-grid">
      <article className="booking-detail-info-card">
        <h2>Thông tin dịch vụ</h2>
        <div>
          <IconCamera size={24} stroke={1.7} />
          <p>
            <strong>{service.name}</strong>
            <span>{service.summary}</span>
          </p>
        </div>
        <div>
          <IconCash size={24} stroke={1.7} />
          <p>
            <strong>{price.total} Tổng</strong>
            <span>{price.deposit}</span>
          </p>
        </div>
      </article>

      <article className="booking-detail-info-card">
        <h2>Thông tin booking</h2>
        <div>
          <IconCalendar size={24} stroke={1.7} />
          <p>
            <strong>{session.date}</strong>
            <span>{session.time}</span>
          </p>
        </div>
        <div>
          <IconMapPin size={24} stroke={1.7} />
          <p>
            <strong>{session.location}</strong>
            <span>{session.note}</span>
          </p>
        </div>
      </article>
    </section>
  );
}
