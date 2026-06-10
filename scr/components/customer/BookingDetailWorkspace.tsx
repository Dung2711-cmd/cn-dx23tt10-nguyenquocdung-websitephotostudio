"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { BookingDetailCta } from "./BookingDetailCta";
import { BookingDetailDescription } from "./BookingDetailDescription";
import { BookingDetailGallery } from "./BookingDetailGallery";
import { BookingDetailTimeline } from "./BookingDetailTimeline";
import { BookingServiceInfo } from "./BookingServiceInfo";
import type { BookingDetail, BookingTimelineState } from "./booking-detail-data";

type ApiPayment = {
  amount: number;
  created_at: string;
  id: number;
  payment_date: string | null;
  payment_method: string;
  status: string;
};

type ApiBookingDetail = {
  booking_date: string;
  booking_time: string;
  contracts: ApiContract | ApiContract[] | null;
  created_at: string;
  customers:
    | {
        address: string | null;
        email: string | null;
        full_name: string;
        id: number;
        phone: string | null;
      }
    | null;
  id: number;
  note: string | null;
  services:
    | {
        description: string | null;
        id: number;
        image_url: string | null;
        name: string;
        price: number;
      }
    | null;
  status: string;
};

type ApiContract = {
  created_at: string;
  id: number;
  payments: ApiPayment[] | null;
  signed_at: string | null;
  status: string;
  total_price: number;
};

type BookingDetailWorkspaceProps = {
  bookId: string;
};

const fallbackGallery = [
  "/images/studio.png",
  "/images/wedding.png",
  "/images/service-gallery-table.png",
  "/images/studio-camera.png",
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "Chưa cập nhật";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
}

function getNoteValue(note: string | null, label: string) {
  const line = note?.split("\n").find((item) => item.startsWith(`${label}:`));

  return line?.replace(`${label}:`, "").trim() || "";
}

function mapStatusToTimeline(status: string): BookingTimelineState {
  if (status === "confirmed" || status === "completed") {
    return "done";
  }

  if (status === "cancelled") {
    return "upcoming";
  }

  return "current";
}

function getBookingContract(contracts: ApiBookingDetail["contracts"]) {
  return Array.isArray(contracts) ? contracts[0] : contracts;
}

function buildTimeline(
  booking: ApiBookingDetail,
  paidAmount: number,
): BookingDetail["timeline"] {
  const hasDeposit = paidAmount > 0;
  const hasConfirmed = booking.status === "confirmed" || booking.status === "completed";

  return [
    {
      date: formatDateTime(booking.created_at),
      label: "Đã tạo booking",
      state: "done" as BookingTimelineState,
    },
    {
      date: hasDeposit ? "Đã ghi nhận thanh toán" : "Đang chờ thanh toán",
      label: "Thanh toán đặt cọc",
      state: hasDeposit ? "done" : ("current" as BookingTimelineState),
    },
    {
      date: formatDate(booking.booking_date),
      label: hasConfirmed ? "Sẵn sàng chụp" : "Chờ xác nhận lịch",
      state: hasConfirmed ? mapStatusToTimeline(booking.status) : ("current" as BookingTimelineState),
    },
    {
      date: "Sau buổi chụp",
      label: "Chỉnh sửa ảnh",
      state: booking.status === "completed" ? "done" : ("upcoming" as BookingTimelineState),
    },
    {
      date: "Sau khi hoàn tất chỉnh sửa",
      label: "Bàn giao",
      state: booking.status === "completed" ? "done" : ("upcoming" as BookingTimelineState),
    },
  ];
}

function mapBookingDetail(booking: ApiBookingDetail): BookingDetail {
  const contract = getBookingContract(booking.contracts);
  const payments = contract?.payments ?? [];
  const paidAmount = payments
    .filter((payment) => payment.status === "paid")
    .reduce((total, payment) => total + payment.amount, 0);
  const totalPrice = contract?.total_price || booking.services?.price || 0;
  const location = getNoteValue(booking.note, "Địa điểm") || booking.customers?.address || "Studio Elegance";
  const duration = getNoteValue(booking.note, "Thời lượng");
  const request = getNoteValue(booking.note, "Yêu cầu");
  const gallery = [
    booking.services?.image_url || fallbackGallery[0],
    ...fallbackGallery.filter((image) => image !== booking.services?.image_url),
  ].slice(0, 4);

  return {
    clientLine: `${booking.customers?.full_name ?? "Khách hàng"} - ${formatDate(booking.booking_date)}`,
    code: `#BK-${String(booking.id).padStart(4, "0")}`,
    description:
      request ||
      booking.services?.description ||
      "Studio sẽ cập nhật mô tả chi tiết, moodboard và các yêu cầu sản xuất cho buổi chụp này.",
    gallery,
    id: String(booking.id),
    packageLabel: booking.services?.name ?? "Studio Package",
    price: {
      deposit:
        paidAmount > 0
          ? `Đã thanh toán ${formatCurrency(paidAmount)}`
          : "Chưa ghi nhận thanh toán",
      total: formatCurrency(totalPrice),
    },
    service: {
      name: booking.services?.name ?? "Dịch vụ Studio Elegance",
      summary:
        booking.services?.description ||
        `${duration || "Buổi chụp"} với đội ngũ Studio Elegance hỗ trợ theo lịch đã chọn.`,
    },
    session: {
      date: formatDate(booking.booking_date),
      location,
      note: duration || booking.note || "Thông tin buổi chụp sẽ được studio cập nhật thêm.",
      time: booking.booking_time.slice(0, 5),
    },
    timeline: buildTimeline(booking, paidAmount),
    title: booking.services?.name
      ? `${booking.services.name} #${String(booking.id).padStart(4, "0")}`
      : `Booking #${String(booking.id).padStart(4, "0")}`,
  };
}

export function BookingDetailWorkspace({ bookId }: BookingDetailWorkspaceProps) {
  const [booking, setBooking] = useState<ApiBookingDetail | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadBooking() {
      setIsLoading(true);
      setErrorMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        if (isMounted) {
          setErrorMessage("Vui lòng đăng nhập để xem chi tiết booking.");
          setIsLoading(false);
        }
        return;
      }

      try {
        const response = await fetch(`/api/bookings/${bookId}`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });
        const result = (await response.json()) as {
          booking?: ApiBookingDetail;
          error?: string;
        };

        if (!response.ok || !result.booking) {
          throw new Error(result.error || "Không thể tải chi tiết booking.");
        }

        if (isMounted) {
          setBooking(result.booking);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : "Không thể tải chi tiết booking.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadBooking();

    return () => {
      isMounted = false;
    };
  }, [bookId]);

  const bookingDetail = useMemo(() => (booking ? mapBookingDetail(booking) : null), [booking]);

  if (isLoading) {
    return <p className="booking-list-message">Đang tải chi tiết booking...</p>;
  }

  if (errorMessage || !bookingDetail) {
    return (
      <section className="booking-list-empty">
        <h2>Không thể mở booking</h2>
        <p>{errorMessage || "Booking này chưa có dữ liệu phù hợp."}</p>
        <Link href="/customer/list">Quay lại danh sách lịch hẹn</Link>
      </section>
    );
  }

  return (
    <>
      <header className="booking-detail-header">
        <p>
          <Link href="/customer/list">Lịch hẹn</Link>
          <span>›</span>
          <Link href={`/customer/list/${bookingDetail.id}`}>{bookingDetail.code}</Link>
        </p>
        <h1>{bookingDetail.title}</h1>
        <span>{bookingDetail.clientLine}</span>
      </header>

      <div className="booking-detail-layout">
        <div className="booking-detail-main">
          <BookingDetailGallery
            images={bookingDetail.gallery}
            packageLabel={bookingDetail.packageLabel}
            title={bookingDetail.title}
          />
          <BookingServiceInfo
            price={bookingDetail.price}
            service={bookingDetail.service}
            session={bookingDetail.session}
          />
          <BookingDetailDescription description={bookingDetail.description} />
        </div>
        <div className="booking-detail-side">
          <BookingDetailTimeline timeline={bookingDetail.timeline} />
          <BookingDetailCta />
        </div>
      </div>
    </>
  );
}
