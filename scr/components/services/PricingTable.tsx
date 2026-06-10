import { pricingPackages } from "./services-data";

export function PricingTable() {
  return (
    <section className="services-page-pricing shell">
      <header>
        <h2>Bảng Giá Chi Tiết</h2>
        <p>Lựa chọn gói dịch vụ phù hợp với nhu cầu của bạn.</p>
      </header>

      <div className="services-price-table">
        <div className="services-price-head">
          <span>Gói dịch vụ</span>
          <span>Thời gian</span>
          <span>Số lượng ảnh</span>
          <span>Chi phí</span>
        </div>
        {pricingPackages.map((item) => (
          <article className="services-price-row" key={item.name}>
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <span>{item.duration}</span>
            <span>{item.deliverables}</span>
            <strong>{item.cost}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
