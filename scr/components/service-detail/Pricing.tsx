const rows = [
  ["Thời gian chụp", "10 tiếng"],
  ["Nhiếp ảnh gia chính", "01 Senior Photographer"],
  ["Số lượng ảnh chỉnh sửa", "80 ảnh High-end Retouch"],
  ["Sản phẩm bàn giao", "Album 30×30 + Box + USB"],
];

export function Pricing() {
  return (
    <aside className="pricing-card">
      <p>Báo giá chi tiết</p>
      <h2>Gói Signature Wedding</h2>
      <dl>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <strong>Từ 35.000.000đ</strong>
      <a href="#dat-lich-dich-vu">Đặt lịch ngay</a>
    </aside>
  );
}
