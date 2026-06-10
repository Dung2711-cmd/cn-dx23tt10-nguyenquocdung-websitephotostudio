import { createClient, type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "@/lib/supabase/types";

function loginRedirect(request: NextRequest, confirmed: boolean) {
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = "/login";
  redirectTo.search = confirmed ? "?confirmed=1" : "?confirmed=0";
  return redirectTo;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  if (tokenHash && type) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient<Database>(supabaseUrl, supabaseKey);
      const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });

      if (!error) {
        return NextResponse.redirect(loginRedirect(request, true));
      }
    }
  }

  return NextResponse.redirect(loginRedirect(request, false));
}
