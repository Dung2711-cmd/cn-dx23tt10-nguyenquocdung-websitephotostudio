"use client";

import { IconMail, IconPhone, IconUserCircle } from "@tabler/icons-react";
import type { ClientDetails } from "./BookingFlow";

type ClientDetailsFormProps = {
  details: ClientDetails;
  onDetailsChange: (details: ClientDetails) => void;
};

export function ClientDetailsForm({ details, onDetailsChange }: ClientDetailsFormProps) {
  const updateDetails = (nextDetails: Partial<ClientDetails>) => {
    onDetailsChange({ ...details, ...nextDetails });
  };
  const isPhonePreferred = details.contactMethod === "phone";

  return (
    <section className="booking-panel client-details-panel">
      <h2>
        <IconUserCircle size={22} stroke={1.7} />
        Thông tin cá nhân
      </h2>
      <div className="client-field-grid">
        <label>
          <span>Họ và tên</span>
          <input
            onChange={(event) => updateDetails({ name: event.target.value })}
            placeholder="VD: Nguyễn Lan Anh"
            value={details.name}
          />
        </label>
        {isPhonePreferred ? (
          <label>
            <span>Số điện thoại</span>
            <input
              onChange={(event) => updateDetails({ phone: event.target.value })}
              placeholder="+84 ..."
              type="tel"
              value={details.phone}
            />
          </label>
        ) : (
          <label>
            <span>Địa chỉ email</span>
            <input
              onChange={(event) => updateDetails({ email: event.target.value })}
              placeholder="client@gallery.com"
              type="email"
              value={details.email}
            />
          </label>
        )}
        <fieldset>
          <legend>Phương thức liên lạc ưu tiên</legend>
          <div className="contact-method-options">
            <label className={isPhonePreferred ? "active" : undefined}>
              <input
                checked={isPhonePreferred}
                onChange={() => updateDetails({ contactMethod: "phone" })}
                type="checkbox"
              />
              <IconPhone size={18} stroke={1.7} />
              Điện thoại
            </label>
            <label className={!isPhonePreferred ? "active" : undefined}>
              <input
                checked={!isPhonePreferred}
                onChange={() => updateDetails({ contactMethod: "email" })}
                type="checkbox"
              />
              <IconMail size={18} stroke={1.7} />
              Email
            </label>
          </div>
        </fieldset>
      </div>
      <label>
        <span>Yêu cầu buổi chụp</span>
        <textarea
          onChange={(event) => updateDetails({ request: event.target.value })}
          placeholder="Mô tả tầm nhìn, sở thích địa điểm hoặc các góc chụp cụ thể..."
          value={details.request}
        />
      </label>
    </section>
  );
}
