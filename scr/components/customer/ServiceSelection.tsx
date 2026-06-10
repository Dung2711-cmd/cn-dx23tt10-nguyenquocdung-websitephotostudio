"use client";

import { IconBrush, IconConfetti, IconUser } from "@tabler/icons-react";

export const bookingServices = [
  {
    description: "Gói chụp cưới editorial, tư vấn concept và thư viện ảnh trực tuyến.",
    title: "Chụp cưới",
    price: "15.000.000đ",
    priceLabel: "Từ 15.000.000đ",
    serviceId: 1,
    icon: IconConfetti,
  },
  {
    description: "Bộ ảnh theo ý tưởng nghệ thuật dành cho cá nhân hoặc thương hiệu.",
    title: "Concept nghệ thuật",
    price: "8.000.000đ",
    priceLabel: "Từ 8.000.000đ",
    serviceId: 4,
    icon: IconBrush,
  },
  {
    description: "Chân dung cao cấp với ánh sáng tinh gọn và hậu kỳ tự nhiên.",
    title: "Chân dung",
    price: "5.000.000đ",
    priceLabel: "Từ 5.000.000đ",
    serviceId: 2,
    icon: IconUser,
  },
];

export type BookingService = (typeof bookingServices)[number];

type ServiceSelectionProps = {
  activeService: BookingService;
  onServiceChange: (service: BookingService) => void;
};

export function ServiceSelection({ activeService, onServiceChange }: ServiceSelectionProps) {
  return (
    <section className="booking-panel">
      <h2>Chọn dịch vụ</h2>
      <div className="service-options">
        {bookingServices.map((service) => {
          const { icon: Icon, priceLabel, title } = service;

          return (
            <button
              className={activeService.title === title ? "active" : undefined}
              key={title}
              onClick={() => onServiceChange(service)}
              type="button"
            >
              <Icon size={30} stroke={1.6} />
              <strong>{title}</strong>
              <span>{priceLabel}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
