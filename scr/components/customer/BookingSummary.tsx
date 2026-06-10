"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { IconCalendarEvent, IconClock, IconMapPin, IconPhoto } from "@tabler/icons-react";
import { supabase } from "@/lib/supabase/client";

type SummaryBooking = {
  booking_date: string;
  booking_time: string;
  id: number;
  note: string | null;
  services: {
    description: string | null;
    name: string;
  } | null;
  status: string;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function extractNoteValue(note: string | null, label: string, fallback: string) {
  const line = note?.split("\n").find((item) => item.startsWith(`${label}:`));

  return line?.replace(`${label}:`, "").trim() || fallback;
}

function getTodayIso() {
  return new Date().toLocaleDateString("en-CA");
}

function getBookingTimestamp(booking: SummaryBooking) {
  return new Date(`${booking.booking_date}T${booking.booking_time}`).getTime();
}

export function BookingSummary() {
  const [bookings, setBookings] = useState<SummaryBooking[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadNearestBooking() {
      setIsLoading(true);
      setErrorMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        if (isMounted) {
          setBookings([]);
          setErrorMessage("Vui lòng đăng nhập để xem lịch hẹn sắp tới.");
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
        const result = (await response.json()) as { bookings?: SummaryBooking[]; error?: string };

        if (!response.ok) {
          throw new Error(result.error || "Không thể tải lịch hẹn sắp tới.");
        }

        if (isMounted) {
          setBookings(result.bookings ?? []);
        }
      } catch (error) {
        if (isMounted) {
          setBookings([]);
          setErrorMessage(
            error instanceof Error ? error.message : "Không thể tải lịch hẹn sắp tới.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadNearestBooking();

    return () => {
      isMounted = false;
    };
  }, []);

  const nearestBooking = useMemo(() => {
    const todayIso = getTodayIso();

    return bookings
      .filter((booking) => booking.booking_date >= todayIso)
      .sort((first, second) => getBookingTimestamp(first) - getBookingTimestamp(second))[0];
  }, [bookings]);

  const serviceName = nearestBooking?.services?.name ?? "Buổi chụp tại Studio Elegance";
  const location = nearestBooking
    ? extractNoteValue(nearestBooking.note, "Địa điểm", "Studio Elegance")
    : "";
  const duration = nearestBooking
    ? extractNoteValue(nearestBooking.note, "Thời lượng", "Thời lượng sẽ được studio xác nhận")
    : "";

  return (
    <section className="customer-summary-card">
      <header>
        <IconCalendarEvent size={22} stroke={1.7} />
        <h2>Lịch hẹn sắp tới</h2>
      </header>

      {isLoading ? <p className="booking-summary-message">Đang tải lịch hẹn gần nhất...</p> : null}
      {errorMessage ? <p className="booking-summary-message">{errorMessage}</p> : null}

      {!isLoading && !errorMessage && !nearestBooking ? (
        <div className="booking-summary-empty">
          <strong>Chưa có lịch hẹn sắp tới</strong>
          <span>Khi bạn đặt lịch thành công, buổi chụp gần nhất sẽ xuất hiện tại đây.</span>
        </div>
      ) : null}

      {nearestBooking ? (
        <>
          <div className="booking-summary-main">
            <strong>{serviceName}</strong>
            <span>
              {formatDate(nearestBooking.booking_date)} · {nearestBooking.booking_time.slice(0, 5)}
            </span>
          </div>
          <ul>
            <li>
              <IconMapPin size={16} stroke={1.7} />
              {location}
            </li>
            <li>
              <IconClock size={16} stroke={1.7} />
              {duration}
            </li>
            <li>
              <IconPhoto size={16} stroke={1.7} />
              {nearestBooking.services?.description ?? "Thông tin gói chụp sẽ được studio cập nhật"}
            </li>
          </ul>
          <Link href="/customer/list">Xem chi tiết booking</Link>
        </>
      ) : null}
    </section>
  );
}
