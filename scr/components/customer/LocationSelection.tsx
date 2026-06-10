"use client";

import { IconBuildingStore, IconMapPin, IconTrees } from "@tabler/icons-react";

export const bookingLocations = [
  {
    description: "Không gian ánh sáng tự nhiên, phù hợp chân dung và cưới tối giản.",
    icon: IconBuildingStore,
    note: "Không gian ánh sáng tự nhiên",
    title: "Studio A, Quận 1",
  },
  {
    description: "Bối cảnh sân vườn mềm mại cho ảnh cưới và concept nghệ thuật.",
    icon: IconTrees,
    note: "Sân vườn riêng tư",
    title: "Garden House, Thảo Điền",
  },
  {
    description: "Không gian ngoài trời giàu cảm xúc cho bộ ảnh cưới editorial.",
    icon: IconMapPin,
    note: "Không gian ngoài trời",
    title: "Đà Lạt Palace",
  },
];

export type BookingLocation = (typeof bookingLocations)[number];

type LocationSelectionProps = {
  activeLocation: BookingLocation;
  onLocationChange: (location: BookingLocation) => void;
};

export function LocationSelection({ activeLocation, onLocationChange }: LocationSelectionProps) {
  return (
    <section className="booking-panel">
      <h2>Chọn địa điểm</h2>
      <div className="location-options">
        {bookingLocations.map((location) => {
          const { description, icon: Icon, title } = location;

          return (
            <button
              className={activeLocation.title === title ? "active" : undefined}
              key={title}
              onClick={() => onLocationChange(location)}
              type="button"
            >
              <Icon size={26} stroke={1.6} />
              <strong>{title}</strong>
              <span>{description}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
