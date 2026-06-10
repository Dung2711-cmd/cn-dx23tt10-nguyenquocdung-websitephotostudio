import Image from "next/image";
import { IconCamera, IconPhotoUp } from "@tabler/icons-react";

export function AvatarUpload() {
  return (
    <section className="avatar-upload" aria-label="Ảnh đại diện">
      <div className="avatar-upload-frame image-zoom">
        <Image
          src="/images/team-linh-chi.png"
          alt="Ảnh đại diện Linh Nguyễn"
          fill
          sizes="148px"
          className="cover-image zoom-image"
        />
        <label className="avatar-upload-button">
          <IconCamera size={20} stroke={1.8} />
          <span className="sr-only">Tải ảnh đại diện mới</span>
          <input type="file" accept="image/png,image/jpeg" />
        </label>
      </div>
      <div>
        <strong>Linh Nguyễn</strong>
        <span>Nhiếp ảnh gia cao cấp</span>
        <p>Dung lượng file tối đa 2MB. Định dạng: JPG, PNG.</p>
        <label className="avatar-upload-link">
          <IconPhotoUp size={17} stroke={1.7} />
          Thay ảnh đại diện
          <input type="file" accept="image/png,image/jpeg" />
        </label>
      </div>
    </section>
  );
}
