import { todaySchedules } from "./dashboard-data";

export function TodaySchedule() {
  return (
    <section className="dashboard-card today-schedule">
      <header>
        <div>
          <span>Admin operations</span>
          <h2>Lịch hôm nay</h2>
        </div>
      </header>
      <ol>
        {todaySchedules.map((item) => (
          <li key={`${item.time}-${item.title}`}>
            <time>{item.time}</time>
            <div>
              <strong>{item.title}</strong>
              <span>
                {item.location} • {item.owner}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
