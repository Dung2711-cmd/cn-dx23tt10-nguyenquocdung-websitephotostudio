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
    return { error: "Bạn cần đăng nhập để xem hợp đồng.", supabase: null };
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

  const { data, error: agreementsError } = await supabase
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
        note,
        services(id, name, image_url)
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
    .order("created_at", { ascending: false });

  if (agreementsError) {
    return NextResponse.json({ error: agreementsError.message }, { status: 400 });
  }

  return NextResponse.json({ agreements: data ?? [] });
}

export async function PATCH(request: NextRequest) {
  const { error, supabase } = createAuthedSupabase(request);

  if (error || !supabase) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const body = (await request.json()) as { action?: string; contractId?: number };

  if (body.action !== "sign" || !body.contractId) {
    return NextResponse.json({ error: "Yêu cầu cập nhật hợp đồng không hợp lệ." }, { status: 400 });
  }

  const { data, error: signError } = await supabase.rpc("sign_own_contract", {
    p_contract_id: body.contractId,
  });

  if (signError) {
    return NextResponse.json({ error: signError.message }, { status: 400 });
  }

  const signedContract = Array.isArray(data) ? data[0] : null;

  if (!signedContract) {
    return NextResponse.json(
      { error: "Hợp đồng chưa sẵn sàng để ký hoặc không thuộc tài khoản này." },
      { status: 400 },
    );
  }

  return NextResponse.json({ contract: signedContract });
}
