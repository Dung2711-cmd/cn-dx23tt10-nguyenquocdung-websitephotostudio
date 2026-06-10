const milestones = [
  {
    year: "2015",
    title: "Khởi đầu",
    detail:
      "Studio Elegance được thành lập tại trung tâm Sài Gòn với một studio nhỏ.",
  },
  {
    year: "2016",
    title: "Vươn tầm",
    detail:
      "Mở rộng quy mô với hệ thống thiết bị hiện đại và đội ngũ lớn mạnh.",
  },
  {
    year: "2023",
    title: "Đỉnh cao",
    detail:
      "Đạt giải thưởng “Studio Sáng Tạo Của Năm” và chinh phục khách hàng cao cấp.",
  },
];

export function Timeline() {
  return (
    <section className="about-timeline">
      <div className="shell">
        <h2>Hành trình kiến tạo</h2>
        <div className="timeline-tree">
          {milestones.map((milestone) => (
            <article className="timeline-item" key={milestone.year}>
              <span>{milestone.year}</span>
              <div>
                <h3>{milestone.title}</h3>
                <p>{milestone.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
