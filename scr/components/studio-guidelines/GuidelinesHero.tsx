import Image from "next/image";

export function GuidelinesHero() {
  return (
    <section className="guidelines-hero shell">
      <div className="guidelines-hero-copy">
        <p>Hướng dẫn studio</p>
        <h1>Nghi thức tại Không gian Nghệ thuật</h1>
        <span>
          Chào mừng bạn đến với Studio Elegance. Để đảm bảo mỗi buổi chụp diễn ra
          suôn sẻ và đạt được kết quả thẩm mỹ cao nhất, chúng tôi đã thiết lập các
          nguyên tắc vận hành tinh giản. Hãy dành chút thời gian để làm quen với
          không gian của chúng tôi.
        </span>
      </div>

      <div className="guidelines-hero-image image-zoom">
        <Image
          src="/images/service-hero.png"
          alt="Không gian studio sáng, tối giản"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 52vw"
          className="cover-image zoom-image"
        />
      </div>
    </section>
  );
}
