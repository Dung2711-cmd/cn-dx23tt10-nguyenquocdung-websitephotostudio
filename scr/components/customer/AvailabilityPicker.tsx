"use client";

import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "@heroui/react";
import { IconCalendarEvent, IconChevronDown, IconClock, IconWorld } from "@tabler/icons-react";
import type { BookingSchedule } from "./BookingFlow";

type AvailabilityPickerProps = {
  schedule: BookingSchedule;
  onScheduleChange: (schedule: BookingSchedule) => void;
};

const availableTimes = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];
const durations = ["2 giờ", "3 giờ", "4 giờ", "Cả ngày"];
const blockedDays = new Set(["2026-10-4", "2026-10-18", "2026-10-25"]);
const weekdayLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function toISODate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
}

function formatVietnameseDate(dateValue: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "long",
    weekday: "long",
    year: "numeric",
  }).format(new Date(`${dateValue}T00:00:00`));
}

function getCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDate = new Date(year, month, 1);
  const startOffset = (firstDate.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return [
    ...Array.from({ length: startOffset }, (_, index) => ({
      day: new Date(year, month, index - startOffset + 1).getDate(),
      disabled: true,
      iso: toISODate(new Date(year, month, index - startOffset + 1)),
    })),
    ...Array.from({ length: daysInMonth }, (_, index) => {
      const date = new Date(year, month, index + 1);

      return {
        day: index + 1,
        disabled: blockedDays.has(toDateKey(date)),
        iso: toISODate(date),
      };
    }),
  ];
}

export function AvailabilityPicker({ schedule, onScheduleChange }: AvailabilityPickerProps) {
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(`${schedule.date}T00:00:00`));
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const calendarDays = useMemo(() => getCalendarDays(visibleMonth), [visibleMonth]);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 1000);

    return () => window.clearInterval(timer);
  }, []);

  const updateSchedule = (nextSchedule: Partial<BookingSchedule>) => {
    onScheduleChange({ ...schedule, ...nextSchedule });
  };

  return (
    <section className="booking-panel availability-panel">
      <div className="booking-panel-heading">
        <h2>
          <IconClock size={22} stroke={1.7} />
          Ngày & giờ
        </h2>
        <span>
          Hiện tại:{" "}
          {currentTime.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </span>
      </div>

      <div className="schedule-toolbar">
        <div>
          <IconCalendarEvent size={18} stroke={1.7} />
          <span>{formatVietnameseDate(schedule.date)}</span>
        </div>
        <div>
          <IconWorld size={18} stroke={1.7} />
          <span>Múi giờ: {schedule.timezone}</span>
        </div>
      </div>

      <div className="availability-grid">
        <div className="schedule-calendar">
          <header>
            <strong>
              Tháng {visibleMonth.getMonth() + 1}, {visibleMonth.getFullYear()}
            </strong>
            <span>
              <button
                aria-label="Tháng trước"
                onClick={() =>
                  setVisibleMonth((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1))
                }
                type="button"
              >
                ‹
              </button>
              <button
                aria-label="Tháng sau"
                onClick={() =>
                  setVisibleMonth((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1))
                }
                type="button"
              >
                ›
              </button>
            </span>
          </header>
          <div className="calendar-grid calendar-weekdays">
            {weekdayLabels.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="calendar-grid">
            {calendarDays.map((day) => (
              <button
                className={`${schedule.date === day.iso ? "active" : ""} ${
                  day.disabled ? "muted" : ""
                }`}
                disabled={day.disabled}
                key={day.iso}
                onClick={() => updateSchedule({ date: day.iso })}
                type="button"
              >
                {day.day}
              </button>
            ))}
          </div>
        </div>

        <div className="schedule-controls">
          <label>
            <span>Khung giờ khả dụng</span>
            <Dropdown>
              <Dropdown.Trigger className="schedule-dropdown-trigger">
                <span>{schedule.time}</span>
                <IconChevronDown size={18} stroke={1.7} />
              </Dropdown.Trigger>
              <Dropdown.Popover className="schedule-dropdown-popover">
                <Dropdown.Menu
                  aria-label="Chọn khung giờ khả dụng"
                  onAction={(key) => updateSchedule({ time: String(key) })}
                >
                  {availableTimes.map((time) => (
                    <Dropdown.Item id={time} key={time} textValue={time}>
                      <span>{time}</span>
                      {schedule.time === time ? <strong>Đang chọn</strong> : null}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </label>

          <label>
            <span>Thời lượng buổi chụp</span>
            <div className="duration-options">
              {durations.map((duration) => (
                <button
                  className={schedule.duration === duration ? "active" : undefined}
                  key={duration}
                  onClick={() => updateSchedule({ duration })}
                  type="button"
                >
                  {duration}
                </button>
              ))}
            </div>
          </label>

          <div className="schedule-status-card">
            <strong>{availableTimes.length} khung giờ còn trống</strong>
            <span>
              {schedule.time} • {schedule.duration} • {schedule.timezone}
            </span>
            <small>* Lịch sẽ được giữ tạm trong 15 phút sau khi chuyển bước.</small>
          </div>
        </div>
      </div>
    </section>
  );
}
