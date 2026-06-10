import Image from "next/image";

const galleryImages = [
  {
    image: "/images/service-gallery-coast.png",
    alt: "Cặp đôi bên biển lúc hoàng hôn",
    className: "gallery-main",
  },
  {
    image: "/images/service-gallery-bouquet.png",
    alt: "Bó hoa cô dâu",
    className: "gallery-side",
  },
  {
    image: "/images/service-gallery-portrait.png",
    alt: "Chân dung cặp đôi đen trắng",
    className: "gallery-side",
  },
  {
    image: "/images/service-gallery-rings.png",
    alt: "Nhẫn cưới",
    className: "gallery-bottom-small",
  },
  {
    image: "/images/service-gallery-table.png",
    alt: "Bàn tiệc cưới",
    className: "gallery-bottom-wide",
  },
];

export function Gallery() {
  return (
    <section className="service-gallery shell">
      <div className="detail-heading">
        <div>
          <h2>Thư viện ảnh</h2>
          <p>Những câu chuyện tình yêu được kể qua lăng kính nghệ thuật.</p>
        </div>
        <a href="/gallery">Xem tất cả bộ sưu tập →</a>
      </div>

      <div className="detail-gallery-grid">
        {galleryImages.map((image) => (
          <div className={`${image.className} image-zoom`} key={image.alt}>
            <Image
              src={image.image}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="cover-image zoom-image"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
