import Image from "next/image";

const albums = [
  { image: "/images/gallery-wall.png", alt: "Không gian triển lãm ảnh" },
  { image: "/images/album.png", alt: "Album ảnh cao cấp" },
  { image: "/images/fashion.png", alt: "Ảnh thời trang nghệ thuật" },
  { image: "/images/tunnel.png", alt: "Kiến trúc tối giản" },
];

export function SampleAlbums() {
  return (
    <section className="showcase" id="album-mau">
      <div className="shell">
        <h2>Album mẫu</h2>
        <div className="album-grid">
          {albums.map((album) => (
            <div className="album-card image-zoom" key={album.alt}>
              <Image
                src={album.image}
                alt={album.alt}
                fill
                sizes="(max-width: 900px) 100vw, 25vw"
                className="cover-image zoom-image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
