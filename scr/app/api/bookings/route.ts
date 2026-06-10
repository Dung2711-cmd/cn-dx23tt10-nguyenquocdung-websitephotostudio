import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

type BookingPayload = {
  clientDetails?: {
    email?: string;
    name?: string;
    phone?: string;
    request?: string;
  };
  location?: {
    note?: string;
    title?: string;
  };
  schedule?: {
    date?: string;
    duration?: string;
    time?: string;
    timezone?: string;
  };
  service?: {
    serviceId?: number;
    title?: string;
  };
};

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
    return { error: "Bạn cần đăng nhập trước khi đặt lịch.", supabase: null };
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

function validatePayload(payload: BookingPayload) {
  if (!payload.service?.serviceId) {
    return "Vui lòng chọn dịch vụ chụp.";
  }

  if (!payload.schedule?.date || !payload.schedule.time) {
    return "Vui lòng chọn ngày và giờ chụp.";
  }

  if (!payload.clientDetails?.name?.trim()) {
    return "Vui lòng nhập họ và tên khách hàng.";
  }

  return null;
}

function buildBookingNote(payload: BookingPayload) {
  const request = payload.clientDetails?.request?.trim();
  const locationTitle = payload.location?.title ?? "Chưa chọn địa điểm";
  const locationNote = payload.location?.note ?? "";
  const duration = payload.schedule?.duration ?? "Chưa rõ thời lượng";
  const timezone = payload.schedule?.timezone ?? "GMT+7";
  const phone = payload.clientDetails?.phone?.trim();
  const email = payload.clientDetails?.email?.trim();

  return [
    `Địa điểm: ${locationTitle}${locationNote ? ` (${locationNote})` : ""}`,
    `Thời lượng: ${duration}`,
    `Múi giờ: ${timezone}`,
    phone ? `Điện thoại: ${phone}` : null,
    email ? `Email: ${email}` : null,
    request ? `Yêu cầu: ${request}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function GET(request: NextRequest) {
  const { error, supabase } = createAuthedSupabase(request);

  if (error || !supabase) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Phiên đăng nhập không hợp lệ." }, { status: 401 });
  }

  const { data, error: bookingsError } = await supabase
    .from("bookings")
    .select(
      "id, booking_date, booking_time, status, note, created_at, services(id, name, price, description, image_url)",
    )
    .order("booking_date", { ascending: false })
    .order("booking_time", { ascending: false });

  if (bookingsError) {
    return NextResponse.json({ error: bookingsError.message }, { status: 400 });
  }

  return NextResponse.json({ bookings: data ?? [] });
}

export async function POST(request: NextRequest) {
  const { error, supabase } = createAuthedSupabase(request);

  if (error || !supabase) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const payload = (await request.json()) as BookingPayload;
  const validationError = validatePayload(payload);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Phiên đăng nhập không hợp lệ." }, { status: 401 });
  }

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("id, full_name, phone, email")
    .eq("user_id", user.id)
    .maybeSingle();

  if (customerError || !customer) {
    return NextResponse.json(
      { error: "Không tìm thấy hồ sơ khách hàng. Vui lòng đăng xuất và đăng nhập lại." },
      { status: 400 },
    );
  }

  const cleanName = payload.clientDetails?.name?.trim();
  const cleanPhone = payload.clientDetails?.phone?.trim() || null;
  const cleanEmail = payload.clientDetails?.email?.trim() || user.email || null;

  await supabase
    .from("customers")
    .update({
      email: cleanEmail,
      full_name: cleanName ?? customer.full_name,
      phone: cleanPhone ?? customer.phone,
    })
    .eq("id", customer.id);

  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("id, name, price")
    .eq("id", payload.service?.serviceId ?? 0)
    .eq("is_active", true)
    .maybeSingle();

  if (serviceError || !service) {
    return NextResponse.json({ error: "Dịch vụ không tồn tại hoặc đã tạm ẩn." }, { status: 400 });
  }

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      booking_date: payload.schedule?.date ?? "",
      booking_time: payload.schedule?.time ?? "",
      customer_id: customer.id,
      note: buildBookingNote(payload),
      service_id: service.id,
      status: "pending",
    })
    .select("id, booking_date, booking_time, status, services(name, price)")
    .single();

  if (bookingError) {
    return NextResponse.json({ error: bookingError.message }, { status: 400 });
  }

  return NextResponse.json({ booking }, { status: 201 });
}
