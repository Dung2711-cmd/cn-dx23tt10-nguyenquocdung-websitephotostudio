import { IconLockPassword } from "@tabler/icons-react";

const passwordFields = [
  "Mật khẩu hiện tại",
  "Mật khẩu mới",
  "Xác nhận mật khẩu mới",
];

export function PasswordChange() {
  return (
    <section className="profile-card password-card">
      <header>
        <IconLockPassword size={24} stroke={1.6} />
        <h2>Bảo mật & Mật khẩu</h2>
      </header>
      <form className="password-form">
        {passwordFields.map((label) => (
          <label key={label}>
            <span>{label}</span>
            <input type="password" defaultValue="studio123" />
          </label>
        ))}
        <button type="button">Thay đổi mật khẩu</button>
      </form>
    </section>
  );
}
