import {
  formatCurrency,
  getPaymentSummary,
  initialPaymentTransactions,
  paymentInvoice,
  type PaymentTransaction,
} from "./payment-data";

type PaymentHistoryProps = {
  transactions?: PaymentTransaction[];
};

export function PaymentHistory({ transactions = initialPaymentTransactions }: PaymentHistoryProps) {
  const summary = getPaymentSummary(transactions);
  const paymentHistory =
    summary.remainingAmount > 0
      ? [
          ...transactions,
          {
            amount: summary.remainingAmount,
            date: paymentInvoice.dueDate,
            id: "PAY-PENDING",
            method: "Đang chờ",
            status: "pending" as const,
          },
        ]
      : transactions;

  return (
    <section className="payment-history-card" aria-label="Lịch sử thanh toán">
      <header>
        <h2>Lịch sử thanh toán</h2>
        <span>{paymentHistory.length} giao dịch</span>
      </header>
      <div className="payment-history-table">
        {paymentHistory.map((item) => (
          <article key={item.id}>
            <div>
              <strong>{formatCurrency(item.amount)}</strong>
              <span>{item.method}</span>
            </div>
            <p>{item.date}</p>
            <b>{item.status === "paid" ? "Đã nhận" : "Chưa thanh toán"}</b>
          </article>
        ))}
      </div>
    </section>
  );
}
