import { bookingSeries } from "./dashboard-data";

export function BookingChart() {
  return (
    <section className="dashboard-card booking-chart">
      <header>
        <div>
          <span>Admin</span>
          <h2>Booking chart</h2>
        </div>
      </header>
      <div>
        {bookingSeries.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <div>
              <i style={{ width: `${item.value * 2}%` }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
