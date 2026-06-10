"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { AvailabilityPicker } from "./AvailabilityPicker";
import { BookingActions } from "./BookingActions";
import { BookingEstimate } from "./BookingEstimate";
import { BookingSteps } from "./BookingSteps";
import { ClientDetailsForm } from "./ClientDetailsForm";
import { bookingLocations, LocationSelection, type BookingLocation } from "./LocationSelection";
import { bookingServices, ServiceSelection, type BookingService } from "./ServiceSelection";

export type BookingSchedule = {
  date: string;
  duration: string;
  timezone: string;
  time: string;
};

export type ClientDetails = {
  contactMethod: "phone" | "email";
  email: string;
  name: string;
  phone: string;
  request: string;
};

export function BookingFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<BookingService>(bookingServices[0]);
  const [selectedLocation, setSelectedLocation] = useState<BookingLocation>(bookingLocations[0]);
  const [schedule, setSchedule] = useState<BookingSchedule>({
    date: "2026-10-12",
    duration: "3 giờ",
    timezone: "GMT+7",
    time: "11:30",
  });
  const [clientDetails, setClientDetails] = useState<ClientDetails>({
    contactMethod: "phone",
    email: "",
    name: "",
    phone: "",
    request: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ kind: "error" | "success"; text: string } | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function prefillCustomer() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const { data } = await supabase
        .from("customers")
        .select("full_name, phone, email")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!isMounted) {
        return;
      }

      const profile = data as { email?: string | null; full_name?: string; phone?: string | null } | null;

      setClientDetails((current) => ({
        ...current,
        email: profile?.email ?? user.email ?? current.email,
        name: profile?.full_name ?? user.user_metadata?.full_name ?? current.name,
        phone: profile?.phone ?? current.phone,
      }));
    }

    prefillCustomer();

    return () => {
      isMounted = false;
    };
  }, []);

  const goBack = () => {
    setNotice(null);
    setCurrentStep((step) => Math.max(1, step - 1));
  };

  const goNext = async () => {
    setNotice(null);

    if (currentStep < 3) {
      setCurrentStep((step) => Math.min(3, step + 1));
      return;
    }

    if (!clientDetails.name.trim()) {
      setNotice({ kind: "error", text: "Vui lòng nhập họ và tên trước khi xác nhận đặt lịch." });
      return;
    }

    if (clientDetails.contactMethod === "phone" && !clientDetails.phone.trim()) {
      setNotice({ kind: "error", text: "Vui lòng nhập số điện thoại để studio liên hệ xác nhận." });
      return;
    }

    if (clientDetails.contactMethod === "email" && !clientDetails.email.trim()) {
      setNotice({ kind: "error", text: "Vui lòng nhập email để studio liên hệ xác nhận." });
      return;
    }

    setIsSubmitting(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setNotice({ kind: "error", text: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại." });
      setIsSubmitting(false);
      return;
    }

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientDetails,
        location: selectedLocation,
        schedule,
        service: selectedService,
      }),
    });

    const result = (await response.json()) as { booking?: { id: number }; error?: string };

    if (!response.ok) {
      setNotice({ kind: "error", text: result.error ?? "Không thể tạo booking. Vui lòng thử lại." });
      setIsSubmitting(false);
      return;
    }

    setNotice({
      kind: "success",
      text: `Đã tạo booking #BK-${String(result.booking?.id ?? "").padStart(4, "0")}. Studio sẽ liên hệ xác nhận lịch.`,
    });

    window.setTimeout(() => {
      router.push("/customer/list");
      router.refresh();
    }, 1100);
  };

  return (
    <>
      <BookingSteps currentStep={currentStep} onStepChange={setCurrentStep} />
      {notice ? <div className={`booking-api-notice booking-api-notice--${notice.kind}`}>{notice.text}</div> : null}
      <div className="booking-workspace">
        <div className="booking-main-column">
          {currentStep === 1 ? (
            <>
              <ServiceSelection activeService={selectedService} onServiceChange={setSelectedService} />
              <LocationSelection activeLocation={selectedLocation} onLocationChange={setSelectedLocation} />
            </>
          ) : null}
          {currentStep === 2 ? <AvailabilityPicker schedule={schedule} onScheduleChange={setSchedule} /> : null}
          {currentStep === 3 ? <ClientDetailsForm details={clientDetails} onDetailsChange={setClientDetails} /> : null}
          <BookingActions currentStep={currentStep} isSubmitting={isSubmitting} onBack={goBack} onNext={goNext} />
        </div>
        <BookingEstimate
          clientDetails={clientDetails}
          location={selectedLocation}
          schedule={schedule}
          service={selectedService}
        />
      </div>
    </>
  );
}
