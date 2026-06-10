const rules = [
  "Không hút thuốc trong studio",
  "Thú cưng cần được đăng ký trước",
  "Tối đa 5 người mỗi buổi chụp",
];

export function RulesCard() {
  return (
    <article className="rules-card">
      <h2>Quy định chung</h2>
      <ul>
        {rules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
      <small>Cập nhật lần cuối: Tháng 10, 2024</small>
    </article>
  );
}
