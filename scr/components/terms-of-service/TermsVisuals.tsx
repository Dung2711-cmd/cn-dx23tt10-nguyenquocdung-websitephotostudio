import Image from "next/image";

export function TermsVisuals() {
  return (
    <section className="terms-visuals">
      <div className="image-zoom">
        <Image
          src="/images/studio.png"
          alt="Không gian studio"
          fill
          sizes="(max-width: 900px) 100vw, 36vw"
          className="cover-image zoom-image"
        />
      </div>
      <div className="image-zoom">
        <Image
          src="/images/studio-camera.png"
          alt="Thiết bị máy ảnh studio"
          fill
          sizes="(max-width: 900px) 100vw, 36vw"
          className="cover-image zoom-image"
        />
      </div>
    </section>
  );
}
