export type PaymentTransaction = {
  amount: number;
  date: string;
  id: string;
  method: string;
  status: "paid" | "pending";
};

export const initialPaymentTransactions: PaymentTransaction[] = [
  {
    amount: 5000000,
    date: "12 Tháng 10, 2026",
    id: "PAY-001",
    method: "Chuyển khoản",
    status: "paid",
  },
  {
    amount: 5000000,
    date: "22 Tháng 10, 2026",
    id: "PAY-002",
    method: "Thẻ tín dụng",
    status: "paid",
  },
];

export const paymentInvoice = {
  bookingCode: "BK-9124",
  dueDate: "20 Tháng 12, 2026",
  id: "INV-9124",
  service: "Signature Wedding Session",
  title: "Hóa đơn Signature Wedding",
  totalAmount: 25000000,
};

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
}

export function getPaymentSummary(transactions = initialPaymentTransactions) {
  const paidAmount = transactions
    .filter((transaction) => transaction.status === "paid")
    .reduce((total, transaction) => total + transaction.amount, 0);
  const remainingAmount = Math.max(paymentInvoice.totalAmount - paidAmount, 0);
  const progress = paymentInvoice.totalAmount > 0 ? Math.round((paidAmount / paymentInvoice.totalAmount) * 100) : 0;

  return {
    paidAmount,
    progress,
    remainingAmount,
    status: remainingAmount === 0 ? "Đã thanh toán đủ" : "Còn cần thanh toán",
    totalAmount: paymentInvoice.totalAmount,
  };
}
