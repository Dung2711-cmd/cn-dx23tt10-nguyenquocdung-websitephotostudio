import { GalleryExperience } from "@/components/gallery";

export default function GalleryPage() {
  return (
    <main className="gallery-page shell">
      <section className="gallery-intro">
        <h1>Nơi những khoảnh khắc trở thành nghệ thuật.</h1>
        <p>
          Khám phá bộ sưu tập những tác phẩm tâm huyết của chúng tôi qua các chủ đề
          đa dạng từ chân dung đến sự kiện cao cấp.
        </p>
      </section>
      <GalleryExperience />
    </main>
  );
}
