import { IconCircleCheck, IconClock, IconCreditCard } from "@tabler/icons-react";
import { formatCurrency, getPaymentSummary } from "./payment-data";

export function PaymentStatus() {
  const summary = getPaymentSummary();
  const paymentStats = [
    { icon: IconCreditCard, label: "Tổng phải thanh toán", value: formatCurrency(summary.totalAmount) },
    { icon: IconCircleCheck, label: "Đã thanh toán", value: formatCurrency(summary.paidAmount) },
    { icon: IconClock, label: "Còn lại", value: formatCurrency(summary.remainingAmount) },
  ];

  return (
    <section className="payment-status-grid" aria-label="Trạng thái thanh toán">
      {paymentStats.map(({ icon: Icon, label, value }) => (
        <article className="payment-status-card" key={label}>
          <Icon size={24} stroke={1.7} />
          <p>{label}</p>
          <strong>{value}</strong>
        </article>
      ))}
    </section>
  );
}
