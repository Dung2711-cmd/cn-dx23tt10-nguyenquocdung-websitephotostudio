"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  IconClock,
  IconCreditCard,
  IconDownload,
  IconFileCheck,
  IconReceipt,
  IconSearch,
  IconShieldCheck,
  IconSignature,
} from "@tabler/icons-react";
import { supabase } from "@/lib/supabase/client";
import { ContractStatusBadge, type ContractStatus } from "./ContractStatusBadge";

type ApiAgreement = {
  bookings: {
    booking_date: string;
    booking_time: string;
    id: number;
    services: {
      name: string;
    } | null;
  } | null;
  created_at: string;
  id: number;
  payments: {
    amount: number | string;
    created_at: string;
    id: number;
    payment_date: string | null;
    payment_method: string;
    status: string;
  }[];
  signed_at: string | null;
  status: string;
  total_price: number | string;
};

type Agreement = {
  bookingCode: string;
  createdAt: string;
  id: number;
  payments: ApiAgreement["payments"];
  serviceName: string;
  status: ContractStatus;
  totalPrice: number;
};

const statusOptions = [
  { label: "Tất cả trạng thái", value: "all" },
  { label: "Đã thanh toán", value: "paid" },
  { label: "Chờ thanh toán", value: "pending" },
] as const;

function formatCurrency(value: number | string) {
  return Number(value).toLocaleString("vi-VN", {
    currency: "VND",
    maximumFractionDigits: 0,
    style: "currency",
  });
}

function formatDate(value: string | null) {
  if (!value) {
    return "Chưa cập nhật";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function normalizeContractStatus(status: string): ContractStatus {
  if (["signed", "pending", "draft", "expired", "sent", "cancelled"].includes(status)) {
    return status as ContractStatus;
  }

  return "draft";
}

function mapAgreement(agreement: ApiAgreement): Agreement {
  return {
    bookingCode: `#BK-${String(agreement.bookings?.id ?? agreement.id).padStart(4, "0")}`,
    createdAt: agreement.created_at,
    id: agreement.id,
    payments: agreement.payments ?? [],
    serviceName: agreement.bookings?.services?.name ?? "Dịch vụ Studio Elegance",
    status: normalizeContractStatus(agreement.status),
    totalPrice: Number(agreement.total_price),
  };
}

function getPaidAmount(agreement: Agreement) {
  return agreement.payments
    .filter((payment) => payment.status === "paid")
    .reduce((total, payment) => total + Number(payment.amount), 0);
}

export function PaymentWorkspace() {
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<(typeof statusOptions)[number]["value"]>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadAgreements() {
      setIsLoading(true);
      setErrorMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        if (isMounted) {
          setAgreements([]);
          setErrorMessage("Vui lòng đăng nhập để xem thanh toán của bạn.");
          setIsLoading(false);
        }
        return;
      }

      try {
        const response = await fetch("/api/agreements", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });
        const result = (await response.json()) as { agreements?: ApiAgreement[]; error?: string };

        if (!response.ok) {
          throw new Error(result.error || "Không thể tải dữ liệu thanh toán.");
        }

        if (isMounted) {
          setAgreements((result.agreements ?? []).map(mapAgreement));
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : "Không thể tải dữ liệu thanh toán.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadAgreements();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalAmount = agreements.reduce((total, agreement) => total + agreement.totalPrice, 0);
  const paidAmount = agreements.reduce((total, agreement) => total + getPaidAmount(agreement), 0);
  const remainingAmount = Math.max(totalAmount - paidAmount, 0);
  const progress = totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0;
  const latestAgreement = agreements[0];

  const paymentRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return agreements
      .flatMap((agreement) =>
        agreement.payments.map((payment) => ({
          agreement,
          payment,
        })),
      )
      .filter(({ agreement, payment }) => {
        const matchesStatus = paymentStatus === "all" || payment.status === paymentStatus;
        const matchesQuery =
          !normalizedQuery ||
          agreement.bookingCode.toLowerCase().includes(normalizedQuery) ||
          agreement.serviceName.toLowerCase().includes(normalizedQuery) ||
          `#hd-${String(agreement.id).padStart(4, "0")}`.includes(normalizedQuery);

        return matchesStatus && matchesQuery;
      });
  }, [agreements, paymentStatus, query]);

  async function handleDownloadInvoice(contractId: number) {
    setDownloadingId(contractId);
    setErrorMessage("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      setErrorMessage("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      setDownloadingId(null);
      return;
    }

    try {
      const response = await fetch(`/api/agreements/${contractId}/invoice`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        throw new Error(result.error || "Không thể tải hóa đơn.");
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = `hoa-don-${contractId}.html`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Không thể tải hóa đơn.");
    } finally {
      setDownloadingId(null);
    }
  }

  const paymentStats = [
    {
      helper: "Tổng giá trị hợp đồng trong Supabase",
      icon: IconFileCheck,
      label: "Tổng cần thanh toán",
      value: formatCurrency(totalAmount),
    },
    {
      helper: `${progress}% tổng hóa đơn`,
      icon: IconShieldCheck,
      label: "Đã thanh toán",
      value: formatCurrency(paidAmount),
    },
    {
      helper: remainingAmount > 0 ? "Cần hoàn tất trước ngày chụp" : "Đã hoàn tất thanh toán",
      icon: IconClock,
      label: "Còn lại",
      value: formatCurrency(remainingAmount),
    },
  ];

  return (
    <>
      <header className="agreement-page-header">
        <div>
          <h1>Thanh toán</h1>
          <p>
            Theo dõi thanh toán dịch vụ, trạng thái hóa đơn và tiến độ chi phí quan trọng cho từng
            buổi chụp của bạn.
          </p>
        </div>
        <button
          className="agreement-export-button"
          disabled={!latestAgreement || downloadingId === latestAgreement.id}
          onClick={() => latestAgreement && handleDownloadInvoice(latestAgreement.id)}
          type="button"
        >
          <IconDownload size={18} />
          {downloadingId === latestAgreement?.id ? "Đang tải..." : "Tải hóa đơn"}
        </button>
      </header>

      <section className="agreement-stats" aria-label="Tổng quan thanh toán">
        {paymentStats.map((item) => {
          const Icon = item.icon;
          return (
            <article className="agreement-stat-card" key={item.label}>
              <p>{item.label}</p>
              <div>
                <strong>{item.value}</strong>
                <Icon size={24} stroke={1.6} />
              </div>
              <span>{item.helper}</span>
            </article>
          );
        })}
      </section>

      <section className="agreement-toolbar" aria-label="Bộ lọc thanh toán">
        <div className="agreement-filter-group">
          <label>
            <span>Trạng thái</span>
            <select value={paymentStatus} onChange={(event) => setPaymentStatus(event.target.value as typeof paymentStatus)}>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Nguồn dữ liệu</span>
            <strong>Supabase</strong>
          </label>
          <label>
            <span>Hợp đồng</span>
            <strong>{agreements.length.toString().padStart(2, "0")} hồ sơ</strong>
          </label>
        </div>
        <label className="agreement-search">
          <IconSearch size={20} />
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm thanh toán..."
            type="search"
            value={query}
          />
        </label>
      </section>

      {errorMessage ? <p className="booking-api-notice booking-api-notice--error">{errorMessage}</p> : null}
      {isLoading ? <p className="booking-list-message">Đang tải thanh toán của bạn...</p> : null}

      {!isLoading && !errorMessage && agreements.length === 0 ? (
        <section className="booking-list-empty">
          <h2>Chưa có hóa đơn</h2>
          <p>Sau khi bạn tạo booking, hóa đơn và khoản thanh toán sẽ xuất hiện tại đây.</p>
          <Link href="/customer/booking">Tạo booking mới</Link>
        </section>
      ) : null}

      {agreements.length > 0 ? (
        <>
          <section className="payment-checkout-card">
            <header>
              <div>
                <IconReceipt size={24} stroke={1.7} />
                <span>{latestAgreement ? `#INV-${String(latestAgreement.id).padStart(4, "0")}` : "Hóa đơn"}</span>
              </div>
              <strong>{remainingAmount === 0 ? "Đã thanh toán đủ" : "Chờ thanh toán"}</strong>
            </header>

            <div className="payment-checkout-summary">
              <article>
                <IconCreditCard size={22} stroke={1.7} />
                <span>Tổng cần thanh toán</span>
                <strong>{formatCurrency(totalAmount)}</strong>
              </article>
              <article>
                <IconShieldCheck size={22} stroke={1.7} />
                <span>Đã thanh toán</span>
                <strong>{formatCurrency(paidAmount)}</strong>
              </article>
              <article>
                <IconClock size={22} stroke={1.7} />
                <span>Còn lại</span>
                <strong>{formatCurrency(remainingAmount)}</strong>
              </article>
            </div>

            <div className="payment-progress payment-progress--wide">
              <span style={{ width: `${progress}%` }} />
            </div>
          </section>

          <section className="contract-table-card" aria-label="Danh sách thanh toán">
            <div className="contract-table-wrap">
              <table className="contract-table agreement-contract-table">
                <thead>
                  <tr>
                    <th scope="col">Hóa đơn</th>
                    <th scope="col">Dịch vụ</th>
                    <th scope="col">Ngày</th>
                    <th scope="col">Số tiền</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Tải</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentRows.map(({ agreement, payment }) => (
                    <tr key={payment.id}>
                      <td>
                        <strong>#INV-{String(agreement.id).padStart(4, "0")}</strong>
                      </td>
                      <td>
                        <div className="contract-client-cell">
                          <IconReceipt size={19} stroke={1.7} />
                          <span>
                            <strong>{agreement.bookingCode}</strong>
                            <small>{agreement.serviceName}</small>
                          </span>
                        </div>
                      </td>
                      <td>{formatDate(payment.payment_date ?? payment.created_at)}</td>
                      <td>
                        <b>{formatCurrency(payment.amount)}</b>
                      </td>
                      <td>
                        <ContractStatusBadge status={payment.status === "paid" ? "signed" : "pending"} />
                      </td>
                      <td>
                        <button
                          className="agreement-action-button agreement-action-button--ghost"
                          disabled={downloadingId === agreement.id}
                          onClick={() => handleDownloadInvoice(agreement.id)}
                          type="button"
                        >
                          {downloadingId === agreement.id ? "Đang tải..." : "Tải"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="contract-signature-note">
              <IconCreditCard size={22} stroke={1.6} />
              <p>
                Tổng tiền được tính từ bảng hợp đồng; số đã thanh toán chỉ cộng các khoản có trạng
                thái “paid”; phần còn lại được tính tự động theo dữ liệu Supabase.
              </p>
            </div>
          </section>
        </>
      ) : null}

      <section className="agreement-insight">
        <div className="agreement-insight-image image-zoom">
          <Image
            src="/images/studio.png"
            alt="Không gian studio phục vụ đối soát thanh toán"
            fill
            sizes="(max-width: 900px) 100vw, 38vw"
            className="cover-image zoom-image"
          />
        </div>
        <article>
          <IconSignature size={26} stroke={1.6} />
          <h2>Payment Insight</h2>
          <p>
            “Một quy trình thanh toán rõ ràng giúp mỗi buổi chụp bắt đầu với sự an tâm: phạm vi,
            chi phí và tiến độ đều được đối soát minh bạch.”
          </p>
          <Link href="/customer/agreement">Xem hợp đồng →</Link>
        </article>
      </section>
    </>
  );
}
