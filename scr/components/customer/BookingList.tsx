"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { BookingCard } from "./BookingCard";
import { BookingFilters } from "./BookingFilters";
import type { BookingStatus, CustomerBooking } from "./booking-list-data";

type ApiBooking = {
  booking_date: string;
  booking_time: string;
  id: number;
  note: string | null;
  services: {
    image_url: string | null;
    name: string;
  } | null;
  status: string;
};

function normalizeStatus(status: string): Exclude<BookingStatus, "all"> {
  if (status === "confirmed" || status === "draft") {
    return status;
  }

  return "pending";
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function extractLocation(note: string | null) {
  const locationLine = note?.split("\n").find((line) => line.startsWith("Địa điểm:"));

  return locationLine?.replace("Địa điểm:", "").trim() || "Studio Elegance";
}

function mapBooking(booking: ApiBooking): CustomerBooking {
  const serviceName = booking.services?.name ?? "Buổi chụp tại Studio Elegance";
  const status = normalizeStatus(booking.status);

  return {
    actionLabel: "Chi tiết",
    category: serviceName,
    date: formatDate(booking.booking_date),
    detailHref: `/customer/list/${booking.id}`,
    id: `#BK-${String(booking.id).padStart(4, "0")}`,
    image: booking.services?.image_url || "/images/studio.png",
    location: extractLocation(booking.note),
    slug: String(booking.id),
    status,
    time: booking.booking_time.slice(0, 5),
    title: status === "confirmed" ? "Lịch chụp đã xác nhận" : "Yêu cầu đặt lịch mới",
  };
}

export function BookingList() {
  const [activeStatus, setActiveStatus] = useState<BookingStatus>("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [bookings, setBookings] = useState<CustomerBooking[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadBookings() {
      setIsLoading(true);
      setErrorMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        if (isMounted) {
          setBookings([]);
          setErrorMessage("Vui lòng đăng nhập để xem lịch hẹn của bạn.");
          setIsLoading(false);
        }
        return;
      }

      try {
        const response = await fetch("/api/bookings", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });
        const result = (await response.json()) as { bookings?: ApiBooking[]; error?: string };

        if (!response.ok) {
          throw new Error(result.error || "Không thể tải danh sách booking.");
        }

        if (isMounted) {
          setBookings((result.bookings ?? []).map(mapBooking));
        }
      } catch (error) {
        if (isMounted) {
          setBookings([]);
          setErrorMessage(
            error instanceof Error ? error.message : "Không thể tải danh sách booking.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadBookings();

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleBookings = useMemo(() => {
    const filtered =
      activeStatus === "all" ? bookings : bookings.filter((booking) => booking.status === activeStatus);

    return sortOrder === "oldest" ? [...filtered].reverse() : filtered;
  }, [activeStatus, bookings, sortOrder]);

  const pendingCount = bookings.filter((booking) => booking.status === "pending").length;
  const confirmedCount = bookings.filter((booking) => booking.status === "confirmed").length;

  return (
    <>
      <section className="booking-list-header">
        <div>
          <h1>Lịch hẹn của tôi</h1>
          <p>Quản lý các buổi chụp hình của bạn trong một không gian tối giản và chuyên nghiệp.</p>
        </div>
        <BookingFilters
          activeStatus={activeStatus}
          onSortChange={setSortOrder}
          onStatusChange={setActiveStatus}
          sortOrder={sortOrder}
        />
      </section>

      {errorMessage ? <p className="booking-list-message booking-list-message--error">{errorMessage}</p> : null}
      {isLoading ? <p className="booking-list-message">Đang tải lịch hẹn của bạn...</p> : null}

      {!isLoading && !errorMessage && visibleBookings.length === 0 ? (
        <section className="booking-list-empty">
          <h2>Chưa có booking nào</h2>
          <p>Khi bạn hoàn tất yêu cầu đặt lịch, buổi chụp sẽ xuất hiện tại đây.</p>
        </section>
      ) : null}

      <section className="booking-list-grid" aria-label="Danh sách lịch hẹn">
        {visibleBookings.map((booking, index) => (
          <BookingCard booking={booking} isFeatured={index === 0} key={booking.id} />
        ))}
        <aside className="booking-list-summary">
          <h2>Tổng quan booking</h2>
          <dl>
            <div>
              <dt>Tổng lịch</dt>
              <dd>{bookings.length.toString().padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>Đã xác nhận</dt>
              <dd>{confirmedCount.toString().padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>Đang chờ</dt>
              <dd>{pendingCount.toString().padStart(2, "0")}</dd>
            </div>
          </dl>
          <p>Studio sẽ liên hệ xác nhận thông tin sau khi bạn gửi yêu cầu đặt lịch.</p>
        </aside>
      </section>
    </>
  );
}
