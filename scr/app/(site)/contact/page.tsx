import {
  ContactForm,
  ContactMap,
  HotlineInfo,
  SocialLinks,
} from "@/components/contact";

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="shell">
          <p>Liên hệ Studio Elegance</p>
          <h1>Chúng tôi luôn sẵn sàng lắng nghe câu chuyện của bạn.</h1>
          <span>
            Gửi yêu cầu tư vấn, đặt lịch hoặc trao đổi ý tưởng. Ekip sẽ phản hồi
            trong thời gian sớm nhất.
          </span>
        </div>
      </section>

      <section className="contact-section shell">
        <ContactForm />
        <div className="contact-side">
          <HotlineInfo />
          <SocialLinks />
          <ContactMap />
        </div>
      </section>
    </main>
  );
}
