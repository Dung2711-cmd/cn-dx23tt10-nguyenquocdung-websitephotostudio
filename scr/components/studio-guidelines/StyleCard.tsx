import Image from "next/image";

export function StyleCard() {
  return (
    <article className="guideline-feature style-card image-zoom">
      <Image
        src="/images/tunnel.png"
        alt="Chất liệu vải tối màu"
        fill
        sizes="(max-width: 900px) 100vw, 56vw"
        className="cover-image zoom-image"
      />
      <div />
      <section>
        <h2>Trang phục &amp; Phong cách</h2>
        <p>
          Chúng tôi khuyến khích các tông màu trung tính và phom dáng tối giản để
          làm nổi bật vẻ đẹp vượt thời gian của chủ thể.
        </p>
      </section>
    </article>
  );
}
