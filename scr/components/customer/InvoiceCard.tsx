import Link from "next/link";
import { IconDownload, IconFileInvoice } from "@tabler/icons-react";
import {
  formatCurrency,
  getPaymentSummary,
  initialPaymentTransactions,
  paymentInvoice,
  type PaymentTransaction,
} from "./payment-data";

type InvoiceCardProps = {
  transactions?: PaymentTransaction[];
};

export function InvoiceCard({ transactions = initialPaymentTransactions }: InvoiceCardProps) {
  const summary = getPaymentSummary(transactions);

  return (
    <aside className="invoice-card">
      <IconFileInvoice size={28} stroke={1.6} />
      <h2>{paymentInvoice.title}</h2>
      <p>
        Mã hóa đơn #{paymentInvoice.id} đã được tạo cho booking {paymentInvoice.bookingCode}.
      </p>
      <dl>
        <div>
          <dt>Tổng</dt>
          <dd>{formatCurrency(summary.totalAmount)}</dd>
        </div>
        <div>
          <dt>Đã thanh toán</dt>
          <dd>{formatCurrency(summary.paidAmount)}</dd>
        </div>
        <div>
          <dt>Còn lại</dt>
          <dd>{formatCurrency(summary.remainingAmount)}</dd>
        </div>
      </dl>
      <Link href="/customer/payment">
        <IconDownload size={18} stroke={1.7} />
        Tải hóa đơn
      </Link>
    </aside>
  );
}
