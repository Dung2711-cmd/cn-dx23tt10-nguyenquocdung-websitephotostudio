export function ContactForm() {
  return (
    <section className="contact-form-card">
      <h2>Gửi tin nhắn cho chúng tôi</h2>
      <form>
        <label>
          <span>Họ và tên</span>
          <input placeholder="Nguyễn Văn A" />
        </label>
        <label>
          <span>Email</span>
          <input placeholder="example@studio.com" type="email" />
        </label>
        <label>
          <span>Tin nhắn</span>
          <textarea placeholder="Bạn cần hỗ trợ điều gì?" />
        </label>
        <button type="button">Gửi ngay</button>
      </form>
    </section>
  );
}
