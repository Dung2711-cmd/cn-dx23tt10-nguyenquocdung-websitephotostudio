import { TermsHero, TermsSection, TermsToc, TermsVisuals } from "@/components/terms-of-service";

const termsTocItems = [
  { id: "booking-process", label: "Quy trình đặt lịch" },
  { id: "payment-fees", label: "Thanh toán & chi phí" },
  { id: "cancellation-refund", label: "Hủy & hoàn tiền" },
  { id: "intellectual-property", label: "Sở hữu trí tuệ" },
  { id: "liability-limits", label: "Giới hạn trách nhiệm" },
];

export default function TermsOfServicePage() {
  return (
    <main className="terms-page">
      <TermsHero />

      <section className="terms-layout shell">
        <TermsToc items={termsTocItems} />

        <div>
          <TermsSection id="booking-process" index="01" title="Quy trình đặt lịch">
            <p>
              Studio Elegance cam kết cung cấp một trải nghiệm chụp ảnh chuyên
              nghiệp và tinh tế. Khi thực hiện đặt lịch, quý khách đồng ý với các
              quy tắc sau:
            </p>
            <ol>
              <li>Yêu cầu đặt lịch phải được thực hiện thông qua hệ thống trực tuyến hoặc xác nhận bằng văn bản chính thức.</li>
              <li>Lịch hẹn chỉ được coi là chính thức sau khi studio xác nhận tình trạng trống và nhận được khoản tiền đặt cọc.</li>
              <li>Quý khách có trách nhiệm cung cấp thông tin chính xác về loại hình dịch vụ, thời gian và địa điểm mong muốn.</li>
            </ol>
          </TermsSection>

          <TermsSection id="payment-fees" index="02" title="Thanh toán & chi phí">
            <p>
              Chúng tôi minh bạch trong mọi giao dịch tài chính để đảm bảo quyền
              lợi tốt nhất cho khách hàng.
            </p>
            <ul>
              <li>Tiền đặt cọc thường chiếm 30–50% tổng giá trị hợp đồng và không hoàn lại trừ trường hợp bất khả kháng.</li>
              <li>Số dư còn lại phải được thanh toán đầy đủ vào ngày diễn ra buổi chụp hoặc theo thỏa thuận cụ thể trong hợp đồng.</li>
              <li>Các chi phí phát sinh sẽ được thông báo và tính thêm nếu có yêu cầu mở rộng phạm vi dịch vụ.</li>
            </ul>
          </TermsSection>

          <TermsVisuals />

          <TermsSection id="cancellation-refund" index="03" title="Chính sách hủy & hoàn tiền">
            <div className="terms-split">
              <section>
                <h3>Hủy bởi khách hàng</h3>
                <p>Hủy trước 7 ngày: miễn phí ngoài trừ tiền đặt cọc. Hủy trong vòng 48 giờ: thu phí 100% giá trị dịch vụ đã đặt.</p>
              </section>
              <section>
                <h3>Thay đổi lịch</h3>
                <p>Khách hàng được phép đổi lịch tối đa 01 lần nếu báo trước ít nhất 72 giờ và lịch trống của studio cho phép.</p>
              </section>
            </div>
          </TermsSection>

          <TermsSection id="intellectual-property" index="04" title="Sở hữu trí tuệ">
            <blockquote>
              Studio Elegance giữ quyền sở hữu trí tuệ đối với tất cả các hình ảnh
              được tạo ra. Khách hàng được cấp quyền sử dụng hình ảnh cho mục đích
              cá nhân. Mọi hình thức thương mại hoặc quảng cáo từ bên thứ ba cần có
              sự đồng ý bằng văn bản của Studio.
            </blockquote>
          </TermsSection>

          <TermsSection id="liability-limits" index="05" title="Giới hạn trách nhiệm">
            <p>
              Studio không chịu trách nhiệm cho các gián đoạn phát sinh từ thời tiết,
              địa điểm, sự kiện bất khả kháng hoặc thông tin không chính xác do khách
              hàng cung cấp. Chúng tôi sẽ luôn đề xuất phương án thay thế hợp lý nhất
              để bảo vệ chất lượng buổi chụp.
            </p>
          </TermsSection>
        </div>
      </section>
    </main>
  );
}
