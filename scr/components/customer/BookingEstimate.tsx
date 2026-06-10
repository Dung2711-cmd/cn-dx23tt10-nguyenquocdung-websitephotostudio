import Image from "next/image";
import {
  IconCalendar,
  IconCamera,
  IconInfoCircle,
  IconMapPin,
  IconUserCircle,
} from "@tabler/icons-react";
import type { BookingSchedule, ClientDetails } from "./BookingFlow";
import type { BookingLocation } from "./LocationSelection";
import type { BookingService } from "./ServiceSelection";

type BookingEstimateProps = {
  clientDetails: ClientDetails;
  location: BookingLocation;
  schedule: BookingSchedule;
  service: BookingService;
};

function formatVietnameseDate(dateValue: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${dateValue}T00:00:00`));
}

export function BookingEstimate({
  clientDetails,
  location,
  schedule,
  service,
}: BookingEstimateProps) {
  const contactValue =
    clientDetails.contactMethod === "phone"
      ? clientDetails.phone || "Số điện thoại sẽ cập nhật"
      : clientDetails.email || "Email sẽ cập nhật";
  const contactLabel = clientDetails.contactMethod === "phone" ? "Điện thoại" : "Email";

  return (
    <aside className="booking-estimate">
      <div className="booking-estimate-image image-zoom">
        <Image
          src="/images/service-hero.png"
          alt="Wedding session"
          fill
          sizes="(max-width: 900px) 100vw, 28vw"
          className="cover-image zoom-image"
        />
        <span>{service.title}</span>
      </div>
      <section>
        <p>Tạm tính</p>
        <div>
          <strong>{service.price}</strong>
          <IconInfoCircle size={20} stroke={1.7} />
        </div>
      </section>
      <ul>
        <li>
          <IconCamera size={18} stroke={1.7} />
          <span>
            {service.title}
            <small>{service.description}</small>
          </span>
        </li>
        <li>
          <IconCalendar size={18} stroke={1.7} />
          <span>
            {formatVietnameseDate(schedule.date)}
            <small>
              {schedule.time} • {schedule.duration} • {schedule.timezone}
            </small>
          </span>
        </li>
        <li>
          <IconMapPin size={18} stroke={1.7} />
          <span>
            {location.title} <small>{location.note}</small>
          </span>
        </li>
        <li>
          <IconUserCircle size={18} stroke={1.7} />
          <span>
            {clientDetails.name || "Tên khách hàng sẽ cập nhật"}
            <small>
              {contactLabel}: {contactValue}
            </small>
          </span>
        </li>
      </ul>
      {clientDetails.request ? (
        <div className="client-note-box">
          <p>Yêu cầu buổi chụp</p>
          <span>{clientDetails.request}</span>
        </div>
      ) : null}
      <div className="package-box">
        <p>Bao gồm trong gói</p>
        <span>✓ Tư vấn concept trước buổi chụp</span>
        <span>✓ 50 ảnh chỉnh sửa chất lượng cao</span>
        <span>✓ Thư viện ảnh trực tuyến</span>
      </div>
    </aside>
  );
}
