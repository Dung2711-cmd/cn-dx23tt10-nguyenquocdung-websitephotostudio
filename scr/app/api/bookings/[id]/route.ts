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
    return { error: "Bạn cần đăng nhập để xem chi tiết booking.", supabase: null };
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

function normalizeBookingId(id: string) {
  const cleanId = id.toLowerCase().replace(/^bk-/, "");
  const numericId = Number.parseInt(cleanId, 10);

  return Number.isNaN(numericId) ? null : numericId;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error, supabase } = createAuthedSupabase(request);

  if (error || !supabase) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const { id } = await params;
  const bookingId = normalizeBookingId(id);

  if (!bookingId) {
    return NextResponse.json({ error: "Mã booking không hợp lệ." }, { status: 400 });
  }

  const { data, error: bookingError } = await supabase
    .from("bookings")
    .select(
      `
        id,
        booking_date,
        booking_time,
        status,
        note,
        created_at,
        customers(id, full_name, phone, email, address),
        services(id, name, price, description, image_url),
        contracts(
          id,
          total_price,
          status,
          signed_at,
          created_at,
          payments(id, amount, payment_method, status, payment_date, created_at)
        )
      `,
    )
    .eq("id", bookingId)
    .maybeSingle();

  if (bookingError) {
    return NextResponse.json({ error: bookingError.message }, { status: 400 });
  }

  if (!data) {
    return NextResponse.json({ error: "Không tìm thấy booking." }, { status: 404 });
  }

  return NextResponse.json({ booking: data });
}
