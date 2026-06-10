import Image from "next/image";

const services = [
  {
    title: "Ảnh cưới",
    description: "Lưu giữ câu chuyện tình yêu bằng phong cách nghệ thuật đương đại.",
    image: "/images/wedding.png",
    className: "service-card service-card--large image-zoom",
  },
  {
    title: "Thời trang",
    image: "/images/fashion.png",
    className: "service-card image-zoom",
  },
  {
    title: "Chân dung",
    image: "/images/portrait.png",
    className: "service-card image-zoom",
  },
];

export function FeaturedServices() {
  return (
    <section className="services shell" id="dich-vu-noi-bat">
      <div className="section-heading">
        <div>
          <p>Chuyên môn</p>
          <h2>Dịch vụ nổi bật</h2>
        </div>
        <a href="#">Xem tất cả dịch vụ</a>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <article className={service.className} key={service.title}>
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="cover-image zoom-image"
            />
            <div className="service-shade" />
            <div>
              <h3>{service.title}</h3>
              {service.description ? <p>{service.description}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
