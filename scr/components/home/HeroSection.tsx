import Image from "next/image";

export function HeroSection() {
  return (
    <section className="hero shell image-zoom">
      <Image
        src="/images/hero.png"
        alt="Người mẫu trong váy lụa trắng"
        fill
        priority
        sizes="100vw"
        className="hero-image zoom-image"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>Chạm tới vẻ đẹp hoàn mỹ</h1>
        <p>
          Kinh nghiệm hơn 10 năm kinh nghiệm trong nhiếp ảnh cao cấp, lưu giữ
          những khoảnh khắc quý giá nhất của bạn.
        </p>
        <div className="hero-actions">
          <a href="#dich-vu-noi-bat">Dịch vụ chuyên nghiệp</a>
          <a href="#dat-lich">Phòng studio hiện đại</a>
        </div>
      </div>
    </section>
  );
}
