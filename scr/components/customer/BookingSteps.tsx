const steps = [
  { index: "01", label: "Chọn dịch vụ" },
  { index: "02", label: "Ngày & giờ" },
  { index: "03", label: "Thông tin cá nhân" },
];

type BookingStepsProps = {
  currentStep: number;
  onStepChange: (step: number) => void;
};

export function BookingSteps({ currentStep, onStepChange }: BookingStepsProps) {
  return (
    <div className="booking-steps">
      {steps.map((step, index) => (
        <button
          className={currentStep === index + 1 ? "active" : undefined}
          key={step.index}
          onClick={() => onStepChange(index + 1)}
          type="button"
        >
          <span>{step.index}</span>
          <strong>{step.label}</strong>
        </button>
      ))}
    </div>
  );
}
