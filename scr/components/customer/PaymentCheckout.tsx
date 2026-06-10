"use client";

import { useMemo, useState } from "react";
import {
  IconCircleCheck,
  IconClock,
  IconCreditCard,
  IconReceipt,
  IconWallet,
} from "@tabler/icons-react";
import {
  formatCurrency,
  getPaymentSummary,
  initialPaymentTransactions,
  paymentInvoice,
  type PaymentTransaction,
} from "./payment-data";

const paymentMethods = ["Chuyển khoản", "Thẻ tín dụng", "Ví điện tử"];
const paymentStorageKey = "picturestudio-payment-transactions";

function todayLabel() {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function getStoredTransactions() {
  if (typeof window === "undefined") {
    return initialPaymentTransactions;
  }

  const storedTransactions = window.localStorage.getItem(paymentStorageKey);

  if (!storedTransactions) {
    return initialPaymentTransactions;
  }

  try {
    return JSON.parse(storedTransactions) as PaymentTransaction[];
  } catch {
    window.localStorage.removeItem(paymentStorageKey);
    return initialPaymentTransactions;
  }
}

export function PaymentCheckout() {
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(getStoredTransactions);
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const [notice, setNotice] = useState<string | null>(null);
  const summary = useMemo(() => getPaymentSummary(transactions), [transactions]);
  const isCompleted = summary.remainingAmount === 0;

  function handlePayment() {
    if (isCompleted) {
      setNotice("Khoản thanh toán đã được hoàn tất trước đó.");
      return;
    }

    const nextTransaction: PaymentTransaction = {
      amount: summary.remainingAmount,
      date: todayLabel(),
      id: `PAY-${String(transactions.length + 1).padStart(3, "0")}`,
      method: selectedMethod,
      status: "paid",
    };

    setTransactions((current) => {
      const nextTransactions = [...current, nextTransaction];
      window.localStorage.setItem(paymentStorageKey, JSON.stringify(nextTransactions));
      return nextTransactions;
    });
    setNotice(`Đã ghi nhận thanh toán ${formatCurrency(summary.remainingAmount)}.`);
  }

  return (
    <section className="payment-checkout-card">
      <header>
        <div>
          <IconReceipt size={24} stroke={1.7} />
          <span>{paymentInvoice.id}</span>
        </div>
        <strong>{isCompleted ? "Đã thanh toán đủ" : "Chờ thanh toán"}</strong>
      </header>

      <div className="payment-checkout-summary">
        <article>
          <IconCreditCard size={22} stroke={1.7} />
          <span>Tổng cần thanh toán</span>
          <strong>{formatCurrency(summary.totalAmount)}</strong>
        </article>
        <article>
          <IconCircleCheck size={22} stroke={1.7} />
          <span>Đã thanh toán</span>
          <strong>{formatCurrency(summary.paidAmount)}</strong>
        </article>
        <article>
          <IconClock size={22} stroke={1.7} />
          <span>Còn lại</span>
          <strong>{formatCurrency(summary.remainingAmount)}</strong>
        </article>
      </div>

      <div className="payment-progress payment-progress--wide">
        <span style={{ width: `${summary.progress}%` }} />
      </div>

      <div className="payment-method-box">
        <p>Phương thức thanh toán</p>
        <div>
          {paymentMethods.map((method) => (
            <button
              className={selectedMethod === method ? "active" : undefined}
              disabled={isCompleted}
              key={method}
              onClick={() => setSelectedMethod(method)}
              type="button"
            >
              <IconWallet size={17} stroke={1.7} />
              {method}
            </button>
          ))}
        </div>
      </div>

      <button className="payment-submit-button" disabled={isCompleted} onClick={handlePayment} type="button">
        {isCompleted ? "Đã hoàn tất thanh toán" : `Thanh toán ${formatCurrency(summary.remainingAmount)}`}
      </button>

      {notice ? <p className="payment-checkout-notice">{notice}</p> : null}

      <div className="payment-history-table payment-history-table--compact">
        {transactions.map((transaction) => (
          <article key={transaction.id}>
            <div>
              <strong>{formatCurrency(transaction.amount)}</strong>
              <span>{transaction.method}</span>
            </div>
            <p>{transaction.date}</p>
            <b>Đã nhận</b>
          </article>
        ))}
      </div>
    </section>
  );
}
