import Link from "next/link";
import { IconCalendar, IconMapPin, IconUser } from "@tabler/icons-react";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

type DashboardBookingDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DashboardBookingDetailPage({
  params,
}: DashboardBookingDetailPageProps) {
  const { id } = await params;
  const bookingCode = id.toUpperCase();

  return (
    <div className="dashboard-page">
      <DashboardPageHeader
        action="Cập nhật trạng thái"
        description="Thông tin điều phối, khách hàng, thanh toán và checklist chuẩn bị cho buổi chụp."
        eyebrow="Booking detail"
        title={`Chi tiết ${bookingCode}`}
      />
      <div className="dashboard-detail-grid">
        <section className="dashboard-card booking-detail-admin">
          <Link href="/dashboard/bookings">← Quay lại danh sách</Link>
          <h2>Signature Wedding Session</h2>
          <p>
            Buổi chụp cưới editorial với concept tối giản, cần chuẩn bị ánh sáng mềm,
            backdrop trắng và 2 photographer.
          </p>
          <div>
            <span>
              <IconUser size={20} stroke={1.7} />
              Sophia & Alexander
            </span>
            <span>
              <IconCalendar size={20} stroke={1.7} />
              20/12/2026 • 10:00 - 18:00
            </span>
            <span>
              <IconMapPin size={20} stroke={1.7} />
              Studio A, Elegance Heights
            </span>
          </div>
        </section>
        <aside className="dashboard-card booking-checklist">
          <h2>Checklist</h2>
          <label><input defaultChecked type="checkbox" /> Đã nhận cọc</label>
          <label><input defaultChecked type="checkbox" /> Gửi guideline cho khách</label>
          <label><input type="checkbox" /> Chuẩn bị thiết bị ánh sáng</label>
          <label><input type="checkbox" /> Xác nhận stylist</label>
        </aside>
      </div>
    </div>
  );
}
