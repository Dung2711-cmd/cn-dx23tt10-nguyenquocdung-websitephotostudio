import Link from "next/link";
import { recentBookings } from "./dashboard-data";

export function RecentBookings() {
  return (
    <section className="dashboard-card recent-bookings">
      <header>
        <div>
          <span>Admin operations</span>
          <h2>Booking gần nhất</h2>
        </div>
        <Link href="/dashboard/bookings">Xem tất cả</Link>
      </header>
      <div>
        {recentBookings.map((booking) => (
          <Link href={`/dashboard/bookings/${booking.id.toLowerCase().replace("#", "")}`} key={booking.id}>
            <span>{booking.id}</span>
            <strong>{booking.customer}</strong>
            <small>
              {booking.service} • {booking.status}
            </small>
          </Link>
        ))}
      </div>
    </section>
  );
}
