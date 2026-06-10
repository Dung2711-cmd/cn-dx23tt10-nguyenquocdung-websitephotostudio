const tips = [
  {
    icon: "♙",
    title: "Chăm sóc bản thân",
    detail: "Uống đủ nước và nghỉ ngơi đầy đủ vào đêm trước ngày chụp.",
  },
  {
    icon: "◌",
    title: "Bảng màu",
    detail: "Lựa chọn trang phục hài hòa với tông màu studio (Beige, Grey, Black).",
  },
  {
    icon: "☻",
    title: "Tâm thế thoải mái",
    detail: "Hãy để cảm xúc dẫn dắt, chúng tôi sẽ bắt trọn những khoảnh khắc tự nhiên nhất.",
  },
  {
    icon: "♧",
    title: "Trao đổi ý tưởng",
    detail: "Đừng ngần ngại chia sẻ cảm hứng hoặc moodboard của bạn với nhiếp ảnh gia.",
  },
];

export function ShootTips() {
  return (
    <section className="shoot-tips">
      <div className="shell">
        <header>
          <h2>Bí quyết cho Buổi chụp Thành công</h2>
          <p>Sự chuẩn bị kỹ lưỡng là chìa khóa để tạo nên những tác phẩm nghệ thuật để đời.</p>
        </header>

        <div>
          {tips.map((tip) => (
            <article key={tip.title}>
              <span>{tip.icon}</span>
              <h3>{tip.title}</h3>
              <p>{tip.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
