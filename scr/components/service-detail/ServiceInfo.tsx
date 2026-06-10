const features = [
  {
    title: "Thiết bị cao cấp",
    detail: "Sử dụng các dòng máy Medium Format và ống kính cao cấp.",
  },
  {
    title: "Hậu kỳ chuyên nghiệp",
    detail: "Màu sắc được tinh chỉnh theo phong cách fine-art, giàu cảm xúc.",
  },
  {
    title: "Album thiết kế riêng",
    detail: "Album cao cấp được cá nhân hóa theo tinh thần bộ ảnh.",
  },
];

export function ServiceInfo() {
  return (
    <div className="service-info-list">
      {features.map((feature) => (
        <article key={feature.title}>
          <span>✣</span>
          <div>
            <h3>{feature.title}</h3>
            <p>{feature.detail}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
