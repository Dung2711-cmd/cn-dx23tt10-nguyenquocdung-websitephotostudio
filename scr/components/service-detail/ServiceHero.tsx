import Image from "next/image";

export function ServiceHero() {
  return (
    <section className="service-hero image-zoom">
      <Image
        src="/images/service-hero.png"
        alt="Cặp đôi trong không gian tiệc cưới sang trọng"
        fill
        priority
        sizes="100vw"
        className="cover-image zoom-image"
      />
      <div className="service-hero-overlay" />
      <div className="service-hero-copy">
        <p>Dịch vụ cao cấp</p>
        <h1>Chụp ảnh cưới nghệ thuật</h1>
        <span>
          Lưu giữ khoảnh khắc thiêng liêng bằng ngôn ngữ điện ảnh và nghệ thuật
          thị giác đương đại.
        </span>
      </div>
    </section>
  );
}
