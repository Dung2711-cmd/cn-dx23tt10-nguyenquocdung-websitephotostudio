import Image from "next/image";

export function PrivacyAside() {
  return (
    <aside className="privacy-aside">
      <blockquote>
        “Sự riêng tư của bạn là khung hình quý giá nhất mà chúng tôi bảo vệ.”
      </blockquote>
      <div className="privacy-aside-media image-zoom">
        <Image src="/images/studio.png" alt="Không gian studio" fill sizes="(max-width: 900px) 100vw, 28vw" className="cover-image zoom-image" />
      </div>
    </aside>
  );
}
