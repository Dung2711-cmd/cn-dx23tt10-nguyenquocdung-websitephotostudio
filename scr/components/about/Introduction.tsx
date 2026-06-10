import Image from "next/image";

export function Introduction() {
  return (
    <section className="about-intro shell">
      <div>
        <p>Tầm nhìn</p>
        <h2>Trở thành biểu tượng của sự tinh tế trong ngành nhiếp ảnh.</h2>
        <span>
          Chúng tôi không chỉ chụp ảnh; chúng tôi tạo ra những tác phẩm nghệ thuật
          vượt thời gian. Tầm nhìn của chúng tôi là định nghĩa lại chuẩn mực của sự
          sang trọng trong từng khung hình, mang đến trải nghiệm đẳng cấp cho mỗi
          khách hàng.
        </span>
        <blockquote>
          <small>Sứ mệnh</small>
          “Biến mỗi khoảnh khắc bình thường thành một kiệt tác di sản.”
        </blockquote>
      </div>

      <div className="about-intro-media image-zoom">
        <Image src="/images/lens.png" alt="Ống kính máy ảnh" fill sizes="(max-width: 900px) 100vw, 44vw" className="cover-image zoom-image" />
      </div>
    </section>
  );
}
