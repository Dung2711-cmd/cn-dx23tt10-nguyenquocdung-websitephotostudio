import Image from "next/image";
import Link from "next/link";
import {
  IconCalendar,
  IconClock,
  IconDotsVertical,
  IconMapPin,
  IconUser,
} from "@tabler/icons-react";
import { StatusBadge } from "./StatusBadge";
import type { CustomerBooking } from "./booking-list-data";

type BookingCardProps = {
  booking: CustomerBooking;
  isFeatured?: boolean;
};

export function BookingCard({ booking, isFeatured = false }: BookingCardProps) {
  return (
    <article className={isFeatured ? "booking-card booking-card--wide" : "booking-card"}>
      <div className="booking-card-media image-zoom">
        <Image
          src={booking.image}
          alt={booking.title}
          fill
          sizes={isFeatured ? "(max-width: 900px) 100vw, 26vw" : "(max-width: 900px) 100vw, 28vw"}
          className="cover-image zoom-image"
        />
        <StatusBadge status={booking.status} />
      </div>
      <div className="booking-card-body">
        <div className="booking-card-heading">
          <div>
            <p>{booking.category}</p>
            <h2>{booking.title}</h2>
          </div>
          <strong>{booking.id}</strong>
        </div>
        <ul>
          <li>
            <IconCalendar size={18} stroke={1.7} />
            <span>{booking.date}</span>
          </li>
          <li>
            <IconClock size={18} stroke={1.7} />
            <span>{booking.time}</span>
          </li>
          {booking.photographer ? (
            <li>
              <IconUser size={18} stroke={1.7} />
              <span>Nhiếp ảnh gia: {booking.photographer}</span>
            </li>
          ) : null}
          <li>
            <IconMapPin size={18} stroke={1.7} />
            <span>{booking.location}</span>
          </li>
        </ul>
        <footer>
          <Link href={booking.detailHref ?? `/customer/list/${booking.slug}`}>{booking.actionLabel}</Link>
          <button aria-label={`Tùy chọn ${booking.title}`} type="button">
            <IconDotsVertical size={20} stroke={1.7} />
          </button>
        </footer>
      </div>
    </article>
  );
}
