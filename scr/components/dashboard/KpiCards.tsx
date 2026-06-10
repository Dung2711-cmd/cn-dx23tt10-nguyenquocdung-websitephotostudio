type KpiCard = {
  detail: string;
  label: string;
  value: string;
};

type KpiCardsProps = {
  items: KpiCard[];
};

export function KpiCards({ items }: KpiCardsProps) {
  return (
    <div className="dashboard-kpi-grid">
      {items.map((item) => (
        <article className="dashboard-kpi-card" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          <small>{item.detail}</small>
        </article>
      ))}
    </div>
  );
}
