import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

function createAuthedSupabase(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const authorization = request.headers.get("authorization");

  if (!supabaseUrl || !supabaseKey) {
    return { error: "Supabase environment is missing.", supabase: null };
  }

  if (!authorization?.startsWith("Bearer ")) {
    return { error: "Bạn cần đăng nhập để tải hóa đơn.", supabase: null };
  }

  return {
    error: null,
    supabase: createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Authorization: authorization,
        },
      },
    }),
  };
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

type InvoiceAgreement = {
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
  pending: "Chờ thanh toán",
  refunded: "Đã hoàn tiền",
};

function buildInvoiceHtml(agreement: InvoiceAgreement) {
  const paidAmount = agreement.payments
    .filter((payment) => payment.status === "paid")
    .reduce((total, payment) => total + Number(payment.amount), 0);
  const remainingAmount = Math.max(Number(agreement.total_price) - paidAmount, 0);
  const serviceName = agreement.bookings?.services?.name ?? "Dịch vụ Studio Elegance";
  const bookingCode = `#BK-${String(agreement.bookings?.id ?? agreement.id).padStart(4, "0")}`;
  const invoiceCode = `#INV-${String(agreement.id).padStart(4, "0")}`;
  const paymentRows = agreement.payments
    .map(
      (payment) => `
        <tr>
          <td>${escapeHtml(paymentMethodLabels[payment.payment_method] ?? payment.payment_method)}</td>
          <td>${formatDate(payment.payment_date ?? payment.created_at)}</td>
          <td>${escapeHtml(paymentStatusLabels[payment.status] ?? payment.status)}</td>
          <td class="money">${formatCurrency(payment.amount)}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <title>Hóa đơn ${invoiceCode}</title>
  <style>
    body { margin: 0; background: #f7f4ef; color: #17130f; font-family: Arial, sans-serif; }
    main { width: min(860px, calc(100% - 48px)); margin: 36px auto; background: #fff; border: 1px solid #ded8d1; padding: 48px; }
    h1, h2 { font-family: Georgia, serif; font-weight: 500; margin: 0; }
    h1 { font-size: 42px; }
    .top { display: flex; justify-content: space-between; gap: 32px; border-bottom: 1px solid #e8e1d8; padding-bottom: 28px; }
    .brand { color: #8c6430; text-transform: uppercase; letter-spacing: .18em; font-size: 11px; font-weight: 700; }
    .meta { text-align: right; color: #5c544d; line-height: 1.8; font-size: 13px; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin: 34px 0; }
    .card { background: #f6f1e9; padding: 22px; }
    .card span { display:block; color:#8c6430; text-transform:uppercase; letter-spacing:.12em; font-size:10px; font-weight:700; margin-bottom:10px; }
    .card strong { font-family: Georgia, serif; font-size: 24px; }
    table { width: 100%; border-collapse: collapse; margin-top: 24px; }
    th, td { border-bottom: 1px solid #eee8e1; padding: 16px 12px; text-align: left; font-size: 13px; }
    th { color: #6b625b; text-transform: uppercase; letter-spacing: .12em; font-size: 10px; }
    .money { text-align: right; font-weight: 700; }
    .note { margin-top: 34px; color: #5c544d; line-height: 1.8; font-size: 13px; }
    @media print { body { background: #fff; } main { margin: 0; width: auto; border: 0; } }
  </style>
</head>
<body>
  <main>
    <section class="top">
      <div>
        <p class="brand">Studio Elegance</p>
        <h1>Hóa đơn</h1>
      </div>
      <div class="meta">
        <strong>${invoiceCode}</strong><br />
        Hợp đồng #HD-${String(agreement.id).padStart(4, "0")}<br />
        Ngày tạo: ${formatDate(agreement.created_at)}<br />
        Ngày ký: ${formatDate(agreement.signed_at)}
      </div>
    </section>

    <section class="note">
      <strong>Dịch vụ:</strong> ${escapeHtml(serviceName)}<br />
      <strong>Booking:</strong> ${bookingCode}<br />
      <strong>Lịch chụp:</strong> ${formatDate(agreement.bookings?.booking_date ?? null)} · ${agreement.bookings?.booking_time?.slice(0, 5) ?? "Chưa cập nhật"}
    </section>

    <section class="grid">
      <article class="card"><span>Tổng cần thanh toán</span><strong>${formatCurrency(agreement.total_price)}</strong></article>
      <article class="card"><span>Đã thanh toán</span><strong>${formatCurrency(paidAmount)}</strong></article>
      <article class="card"><span>Còn lại</span><strong>${formatCurrency(remainingAmount)}</strong></article>
    </section>

    <h2>Lịch sử thanh toán</h2>
    <table>
      <thead><tr><th>Phương thức</th><th>Ngày</th><th>Trạng thái</th><th class="money">Số tiền</th></tr></thead>
      <tbody>${paymentRows || '<tr><td colspan="4">Chưa có khoản thanh toán nào.</td></tr>'}</tbody>
    </table>

    <p class="note">Hóa đơn được xuất từ hệ thống Studio Elegance. Vui lòng lưu lại để đối soát trước ngày chụp.</p>
  </main>
</body>
</html>`;
}

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { error, supabase } = createAuthedSupabase(request);

  if (error || !supabase) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const { id } = await context.params;
  const contractId = Number(id);

  if (!Number.isFinite(contractId)) {
    return NextResponse.json({ error: "Mã hợp đồng không hợp lệ." }, { status: 400 });
  }

  const { data, error: invoiceError } = await supabase
    .from("contracts")
    .select(
      `
      id,
      total_price,
      status,
      signed_at,
      created_at,
      bookings(
        id,
        booking_date,
        booking_time,
        services(name)
      ),
      payments(
        id,
        amount,
        payment_method,
        status,
        payment_date,
        created_at
      )
    `,
    )
    .eq("id", contractId)
    .maybeSingle();

  if (invoiceError) {
    return NextResponse.json({ error: invoiceError.message }, { status: 400 });
  }

  if (!data) {
    return NextResponse.json({ error: "Không tìm thấy hóa đơn." }, { status: 404 });
  }

  const html = buildInvoiceHtml(data as unknown as InvoiceAgreement);

  return new NextResponse(html, {
    headers: {
      "Content-Disposition": `attachment; filename="hoa-don-${contractId}.html"`,
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
