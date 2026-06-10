import { IconCamera } from "@tabler/icons-react";
import Image from "next/image";

export function EquipmentCard() {
  return (
    <article className="equipment-card">
      <div className="equipment-copy">
        <span className="equipment-kicker">
          <IconCamera size={20} stroke={1.8} />
        </span>
        <h2>Sử dụng thiết bị</h2>
        <p>
          Mọi thiết bị chiếu sáng chuyên dụng sẽ được kỹ thuật viên của studio
          điều chỉnh. Nếu bạn mang theo đạo cụ riêng, vui lòng thông báo trước 48
          giờ để chúng tôi sắp xếp không gian tối ưu.
        </p>
      </div>

      <div className="equipment-image image-zoom">
        <Image
          src="/images/studio-camera.png"
          alt="Máy ảnh chuyên nghiệp"
          fill
          sizes="(max-width: 900px) 100vw, 28vw"
          className="cover-image zoom-image"
        />
      </div>
    </article>
  );
}
