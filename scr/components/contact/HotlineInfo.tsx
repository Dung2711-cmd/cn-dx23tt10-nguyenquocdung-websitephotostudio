import { IconMapPin, IconPhone } from "@tabler/icons-react";

export function HotlineInfo() {
  return (
    <section className="contact-info-card">
      <h2>Thông tin liên hệ</h2>
      <div>
        <IconPhone size={18} stroke={1.7} />
        <p>
          <span>Hotline</span>
          <strong>+84 901 234 567</strong>
        </p>
      </div>
      <div>
        <IconMapPin size={18} stroke={1.7} />
        <p>
          <span>Địa chỉ</span>
          <strong>123 Đường Nghệ Thuật, Quận 1, TP. Hồ Chí Minh</strong>
        </p>
      </div>
    </section>
  );
}
