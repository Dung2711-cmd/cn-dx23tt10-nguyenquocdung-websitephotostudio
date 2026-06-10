import { IconArrowLeft, IconCheck } from "@tabler/icons-react";

type BookingActionsProps = {
  currentStep: number;
  isSubmitting?: boolean;
  onBack: () => void;
  onNext: () => void;
};

export function BookingActions({ currentStep, isSubmitting = false, onBack, onNext }: BookingActionsProps) {
  const isFinalStep = currentStep === 3;

  return (
    <div className={`booking-actions ${currentStep === 1 ? "booking-actions--single" : ""}`}>
      {currentStep > 1 ? (
        <button className="booking-back-button" disabled={isSubmitting} onClick={onBack} type="button">
          <IconArrowLeft size={18} stroke={1.7} />
          Quay lại
        </button>
      ) : (
        <span aria-hidden="true" />
      )}
      <button disabled={isSubmitting} type="button" onClick={onNext}>
        {isSubmitting ? "Đang tạo booking..." : isFinalStep ? "Xác nhận đặt lịch" : "Tiếp tục"}
        {isFinalStep ? <IconCheck size={18} stroke={1.7} /> : null}
      </button>
    </div>
  );
}
