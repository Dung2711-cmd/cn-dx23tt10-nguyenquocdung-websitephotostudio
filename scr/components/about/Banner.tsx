import Image from "next/image";

export function Banner() {
  return (
    <section className="about-banner image-zoom">
      <Image
        src="/images/studio.png"
        alt="Không gian studio chụp ảnh"
        fill
        priority
        sizes="100vw"
        className="cover-image zoom-image"
      />
      <div />
      <article>
        <h1>Nghệ thuật lưu giữ khoảnh khắc</h1>
        <p>
          Studio Elegance – nơi những câu chuyện của bạn được kể lại qua lăng kính
          đầy tinh tế và sang trọng.
        </p>
      </article>
    </section>
  );
}
