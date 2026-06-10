import { revenueSeries } from "./dashboard-data";

export function RevenueChart() {
  return (
    <section className="dashboard-card revenue-chart">
      <header>
        <div>
          <span>Admin</span>
          <h2>Revenue chart</h2>
        </div>
        <strong>1.2B VND</strong>
      </header>
      <div className="bar-chart" aria-label="Biểu đồ doanh thu">
        {revenueSeries.map((item) => (
          <div key={item.label}>
            <span style={{ height: `${item.value}%` }} />
            <small>{item.label}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
