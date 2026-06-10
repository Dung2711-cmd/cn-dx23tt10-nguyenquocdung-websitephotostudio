"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  IconCircleCheck,
  IconClock,
  IconCreditCard,
  IconDownload,
  IconFileDescription,
  IconFileInvoice,
  IconSearch,
  IconSignature,
} from "@tabler/icons-react";
import { supabase } from "@/lib/supabase/client";
import { ContractStatusBadge, type ContractStatus } from "./ContractStatusBadge";

type AgreementStatus = "all" | "draft" | "sent" | "signed" | "cancelled";

type ApiAgreement = {
  bookings: {
    booking_date: string;
    booking_time: string;
    id: number;
    note: string | null;
    services: {
      image_url: string | null;
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
  signedAt: string | null;
  status: AgreementStatus extends "all" ? never : Exclude<AgreementStatus, "all">;
  totalPrice: number;
};

const statusOptions: { label: string; value: AgreementStatus }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Chờ ký", value: "sent" },
  { label: "Đã ký", value: "signed" },
  { label: "Bản nháp", value: "draft" },
  { label: "Đã hủy", value: "cancelled" },
];

const paymentMethodLabels: Record<string, string> = {
  bank_transfer: "Chuyển khoản",
  card: "Thẻ",
  cash: "Tiền mặt",
  momo: "MoMo",
  other: "Khác",
};

const paymentStatusLabels: Record<string, string> = {
  failed: "Thất bại",
  paid: "Đã thanh toán",
  pending: "Chưa thanh toán",
  refunded: "Đã hoàn tiền",
};

function normalizeStatus(status: string): Exclude<AgreementStatus, "all"> {
  if (status === "draft" || status === "sent" || status === "signed" || status === "cancelled") {
    return status;
  }

  return "draft";
}

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

function mapAgreement(agreement: ApiAgreement): Agreement {
  return {
    bookingCode: `#BK-${String(agreement.bookings?.id ?? agreement.id).padStart(4, "0")}`,
    createdAt: agreement.created_at,
    id: agreement.id,
    payments: agreement.payments ?? [],
    serviceName: agreement.bookings?.services?.name ?? "Dịch vụ Studio Elegance",
    signedAt: agreement.signed_at,
    status: normalizeStatus(agreement.status),
    totalPrice: Number(agreement.total_price),
  };
}

function getPaidAmount(agreement: Agreement) {
  return agreement.payments
    .filter((payment) => payment.status === "paid")
    .reduce((total, payment) => total + Number(payment.amount), 0);
}

export function AgreementWorkspace() {
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [activeStatus, setActiveStatus] = useState<AgreementStatus>("all");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [signingId, setSigningId] = useState<number | null>(null);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

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
          setErrorMessage("Vui lòng đăng nhập để xem hợp đồng của bạn.");
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
          throw new Error(result.error || "Không thể tải dữ liệu hợp đồng.");
        }

        if (isMounted) {
          const nextAgreements = (result.agreements ?? []).map(mapAgreement);
          setAgreements(nextAgreements);
          setSelectedId(nextAgreements[0]?.id ?? null);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : "Không thể tải dữ liệu hợp đồng.");
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

  const filteredAgreements = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return agreements.filter((agreement) => {
      const matchesStatus = activeStatus === "all" || agreement.status === activeStatus;
      const matchesQuery =
        !normalizedQuery ||
        agreement.bookingCode.toLowerCase().includes(normalizedQuery) ||
        agreement.serviceName.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [activeStatus, agreements, query]);

  const selectedAgreement =
    agreements.find((agreement) => agreement.id === selectedId) ?? filteredAgreements[0] ?? agreements[0];
  const totalAmount = agreements.reduce((total, agreement) => total + agreement.totalPrice, 0);
  const paidAmount = agreements.reduce((total, agreement) => total + getPaidAmount(agreement), 0);
  const remainingAmount = Math.max(totalAmount - paidAmount, 0);
  const pendingSignatureCount = agreements.filter((agreement) => agreement.status === "sent").length;

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

  async function handleSign(contractId: number) {
    setSigningId(contractId);
    setErrorMessage("");
    setSuccessMessage("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      setErrorMessage("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      setSigningId(null);
      return;
    }

    try {
      const response = await fetch("/api/agreements", {
        body: JSON.stringify({ action: "sign", contractId }),
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        method: "PATCH",
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Không thể ký hợp đồng.");
      }

      setAgreements((current) =>
        current.map((agreement) =>
          agreement.id === contractId
            ? { ...agreement, signedAt: new Date().toISOString(), status: "signed" }
            : agreement,
        ),
      );
      setSuccessMessage("Hợp đồng đã được ký thành công. Studio sẽ tiếp tục xử lý lịch chụp của bạn.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Không thể ký hợp đồng.");
    } finally {
      setSigningId(null);
    }
  }

  return (
    <>
      <section className="payment-status-grid" aria-label="Trạng thái hợp đồng và thanh toán">
        {[
          { icon: IconCreditCard, label: "Tổng giá trị hợp đồng", value: formatCurrency(totalAmount) },
          { icon: IconCircleCheck, label: "Đã thanh toán", value: formatCurrency(paidAmount) },
          { icon: IconClock, label: "Còn lại", value: formatCurrency(remainingAmount) },
        ].map(({ icon: Icon, label, value }) => (
          <article className="payment-status-card" key={label}>
            <Icon size={24} stroke={1.7} />
            <p>{label}</p>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <section className="agreement-toolbar" aria-label="Bộ lọc hợp đồng">
        <div className="agreement-filter-group">
          <label>
            <span>Trạng thái</span>
            <select value={activeStatus} onChange={(event) => setActiveStatus(event.target.value as AgreementStatus)}>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Cần ký</span>
            <strong>{pendingSignatureCount.toString().padStart(2, "0")} hợp đồng</strong>
          </label>
        </div>
        <label className="agreement-search">
          <IconSearch size={18} stroke={1.7} />
          <input
            aria-label="Tìm kiếm hợp đồng"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm theo mã booking hoặc dịch vụ"
            value={query}
          />
        </label>
      </section>

      {successMessage ? <p className="booking-api-notice booking-api-notice--success">{successMessage}</p> : null}
      {errorMessage ? <p className="booking-api-notice booking-api-notice--error">{errorMessage}</p> : null}
      {isLoading ? <p className="booking-list-message">Đang tải hợp đồng của bạn...</p> : null}

      {!isLoading && !errorMessage && agreements.length === 0 ? (
        <section className="booking-list-empty">
          <h2>Chưa có hợp đồng</h2>
          <p>Sau khi bạn tạo booking, hợp đồng và khoản thanh toán sẽ xuất hiện tại đây.</p>
          <Link href="/customer/booking">Tạo booking mới</Link>
        </section>
      ) : null}

      {agreements.length > 0 ? (
        <section className="payment-workspace">
          <section className="payment-history-card" aria-label="Danh sách hợp đồng">
            <header>
              <h2>Hợp đồng của tôi</h2>
              <span>{filteredAgreements.length} hồ sơ</span>
            </header>
            <div className="contract-table-wrap">
              <table className="contract-table agreement-contract-table">
                <thead>
                  <tr>
                    <th scope="col">Mã</th>
                    <th scope="col">Dịch vụ</th>
                    <th scope="col">Ngày tạo</th>
                    <th scope="col">Tổng</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAgreements.map((agreement) => (
                    <tr key={agreement.id}>
                      <td>
                        <strong>#HD-{String(agreement.id).padStart(4, "0")}</strong>
                      </td>
                      <td>
                        <button
                          className="agreement-row-button"
                          onClick={() => setSelectedId(agreement.id)}
                          type="button"
                        >
                          <IconFileDescription size={19} stroke={1.7} />
                          <span>
                            <strong>{agreement.bookingCode}</strong>
                            <small>{agreement.serviceName}</small>
                          </span>
                        </button>
                      </td>
                      <td>{formatDate(agreement.createdAt)}</td>
                      <td>
                        <b>{formatCurrency(agreement.totalPrice)}</b>
                      </td>
                      <td>
                        <ContractStatusBadge status={agreement.status as ContractStatus} />
                      </td>
                      <td>
                        {agreement.status === "sent" ? (
                          <button
                            className="agreement-action-button"
                            disabled={signingId === agreement.id}
                            onClick={() => handleSign(agreement.id)}
                            type="button"
                          >
                            {signingId === agreement.id ? "Đang ký..." : "Ký hợp đồng"}
                          </button>
                        ) : (
                          <button
                            className="agreement-action-button agreement-action-button--ghost"
                            onClick={() => setSelectedId(agreement.id)}
                            type="button"
                          >
                            Xem
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="invoice-card">
            <IconFileInvoice size={28} stroke={1.6} />
            <h2>{selectedAgreement ? `Hợp đồng #HD-${String(selectedAgreement.id).padStart(4, "0")}` : "Hợp đồng"}</h2>
            {selectedAgreement ? (
              <>
                <p>
                  {selectedAgreement.serviceName} · {selectedAgreement.bookingCode}. Trạng thái hiện tại được đồng bộ từ Supabase.
                </p>
                <dl>
                  <div>
                    <dt>Tổng</dt>
                    <dd>{formatCurrency(selectedAgreement.totalPrice)}</dd>
                  </div>
                  <div>
                    <dt>Đã thanh toán</dt>
                    <dd>{formatCurrency(getPaidAmount(selectedAgreement))}</dd>
                  </div>
                  <div>
                    <dt>Còn lại</dt>
                    <dd>{formatCurrency(Math.max(selectedAgreement.totalPrice - getPaidAmount(selectedAgreement), 0))}</dd>
                  </div>
                  <div>
                    <dt>Ngày ký</dt>
                    <dd>{formatDate(selectedAgreement.signedAt)}</dd>
                  </div>
                </dl>
                <div className="agreement-payment-list">
                  <strong>Lịch sử thanh toán</strong>
                  {selectedAgreement.payments.length > 0 ? (
                    selectedAgreement.payments.map((payment) => (
                      <article key={payment.id}>
                        <span>{formatCurrency(payment.amount)}</span>
                        <small>
                          {paymentMethodLabels[payment.payment_method] ?? payment.payment_method} ·{" "}
                          {paymentStatusLabels[payment.status] ?? payment.status}
                        </small>
                      </article>
                    ))
                  ) : (
                    <small>Chưa có khoản thanh toán nào.</small>
                  )}
                </div>
                <button
                  className="agreement-print-button"
                  disabled={downloadingId === selectedAgreement.id}
                  onClick={() => handleDownloadInvoice(selectedAgreement.id)}
                  type="button"
                >
                  <IconDownload size={18} stroke={1.7} />
                  {downloadingId === selectedAgreement.id ? "Đang tải..." : "Tải hóa đơn"}
                </button>
                <Link href="/customer/payment">
                  <IconCreditCard size={18} stroke={1.7} />
                  Đi tới thanh toán
                </Link>
              </>
            ) : null}
          </aside>
        </section>
      ) : null}

      <section className="contract-signature-note">
        <IconSignature size={22} stroke={1.6} />
        <p>
          Hợp đồng chỉ có thể ký khi trạng thái là “Chờ ký”. Sau khi ký, thời điểm ký được lưu lại trên Supabase để studio đối soát.
        </p>
      </section>
    </>
  );
}
