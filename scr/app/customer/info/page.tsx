import Image from "next/image";
import {
  IconBell,
  IconBellRinging,
  IconShieldCheck,
  IconSparkles,
} from "@tabler/icons-react";

import { PasswordChange, ProfileForm } from "@/components/customer";

export default function CustomerInfoPage() {
  return (
    <main className="customer-profile-page">
      <header className="profile-page-header">
        <p>Client Portal</p>
        <h1>Hồ sơ cá nhân</h1>
        <span>
          Quản lý thông tin tài khoản, bảo mật và các tuỳ chọn nhận thông báo
          trong không gian Studio Elegance.
        </span>
      </header>

      <div className="profile-page-grid">
        <div className="profile-main-column">
          <ProfileForm />
          <PasswordChange />
        </div>

        <aside className="profile-side-column" aria-label="Thông tin tài khoản">
          <section className="profile-side-card account-status-card">
            <h2>
              <IconShieldCheck size={20} stroke={1.7} />
              Trạng thái tài khoản
            </h2>
            <div>
              <strong>Premium Member</strong>
              <span>Hết hạn: 12/2025</span>
            </div>
          </section>

          <section className="profile-studio-card image-zoom">
            <Image
              src="/images/studio.png"
              alt="Elegance Studio A"
              fill
              sizes="(max-width: 900px) 100vw, 280px"
              className="cover-image zoom-image"
            />
            <div>
              <IconSparkles size={20} stroke={1.6} />
              <h2>Elegance Studio A</h2>
              <p>Cơ sở chính</p>
            </div>
          </section>

          <section className="profile-side-card notification-card">
            <h2>
              <IconBell size={20} stroke={1.7} />
              Thông báo
            </h2>
            <label>
              <span>Email nhắc lịch hẹn</span>
              <input type="checkbox" defaultChecked />
              <i />
            </label>
            <label>
              <span>Tin nhắn hệ thống</span>
              <input type="checkbox" />
              <i />
            </label>
            <p>
              <IconBellRinging size={16} stroke={1.7} />
              Studio sẽ gửi nhắc lịch trước buổi chụp 24 giờ.
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}
