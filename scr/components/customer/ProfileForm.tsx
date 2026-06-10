import { AvatarUpload } from "./AvatarUpload";

const fields = [
  { label: "Họ và Tên", type: "text", defaultValue: "Linh Nguyễn" },
  { label: "Địa chỉ Email", type: "email", defaultValue: "linh.nguyen@studioelegance.com" },
  { label: "Số điện thoại", type: "tel", defaultValue: "+84 901 234 567" },
  { label: "Vị trí / Studio", type: "text", defaultValue: "Quận 1, TP. Hồ Chí Minh" },
];

export function ProfileForm() {
  return (
    <section className="profile-card profile-form-card">
      <h2>Thông tin cơ bản</h2>
      <AvatarUpload />
      <form className="profile-form">
        {fields.map((field) => (
          <label key={field.label}>
            <span>{field.label}</span>
            <input type={field.type} defaultValue={field.defaultValue} />
          </label>
        ))}
        <button type="button">Cập nhật thông tin</button>
      </form>
    </section>
  );
}
