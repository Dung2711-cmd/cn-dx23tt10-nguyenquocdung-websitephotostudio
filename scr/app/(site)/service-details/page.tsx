import {
  Description,
  Gallery,
  Pricing,
  ServiceCta,
  ServiceHero,
  ServiceInfo,
} from "@/components/service-detail";

export default function ServiceDetailPage() {
  return (
    <main className="service-detail-page">
      <ServiceHero />
      <Gallery />
      <section className="service-details shell">
        <div>
          <Description />
          <ServiceInfo />
        </div>
        <Pricing />
      </section>
      <section className="process shell">
        <h2>Quy trình làm việc</h2>
        <div>
          <article>
            <span>01</span>
            <h3>Tư vấn</h3>
            <p>Lắng nghe ý tưởng và xây dựng concept cá nhân hóa.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Khảo sát</h3>
            <p>Tìm kiếm bối cảnh và chuẩn bị lịch trình phù hợp.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Sáng tạo</h3>
            <p>Buổi chụp diễn ra trong không gian thoải mái, tự nhiên.</p>
          </article>
          <article>
            <span>04</span>
            <h3>Hoàn thiện</h3>
            <p>Hậu kỳ kỹ lưỡng và bàn giao sản phẩm đúng chuẩn.</p>
          </article>
        </div>
      </section>
      <ServiceCta />
    </main>
  );
}
