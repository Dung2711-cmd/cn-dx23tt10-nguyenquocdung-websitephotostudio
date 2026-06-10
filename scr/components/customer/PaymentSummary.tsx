import { IconCreditCard, IconReceipt } from "@tabler/icons-react";
import { formatCurrency, getPaymentSummary } from "./payment-data";

export function PaymentSummary() {
  const summary = getPaymentSummary();

  return (
    <section className="customer-summary-card payment-summary-card">
      <header>
        <IconCreditCard size={22} stroke={1.7} />
        <h2>Tóm tắt thanh toán</h2>
      </header>
      <div className="payment-row">
        <span>Tổng cần thanh toán</span>
        <strong>{formatCurrency(summary.totalAmount)}</strong>
      </div>
      <div className="payment-row">
        <span>Đã thanh toán</span>
        <strong>{formatCurrency(summary.paidAmount)}</strong>
      </div>
      <div className="payment-row">
        <span>Còn lại</span>
        <strong>{formatCurrency(summary.remainingAmount)}</strong>
      </div>
      <div className="payment-progress">
        <span style={{ width: `${summary.progress}%` }} />
      </div>
      <p>
        {summary.remainingAmount > 0
          ? `Còn lại ${formatCurrency(summary.remainingAmount)} cần thanh toán trước ngày chụp.`
          : "Khách hàng đã hoàn tất toàn bộ khoản thanh toán."}
      </p>
      <a href="/customer/payment">
        <IconReceipt size={16} stroke={1.7} />
        Thanh toán ngay
      </a>
    </section>
  );
}
