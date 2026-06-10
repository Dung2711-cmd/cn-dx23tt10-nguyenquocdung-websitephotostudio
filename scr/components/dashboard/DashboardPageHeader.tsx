type DashboardPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  action?: string;
};

export function DashboardPageHeader({
  action,
  description,
  eyebrow = "Studio Admin",
  title,
}: DashboardPageHeaderProps) {
  return (
    <header className="dashboard-page-header">
      <div>
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action ? <button type="button">{action}</button> : null}
    </header>
  );
}
