"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type ConfirmState = "checking" | "success" | "error";

async function waitForConfirmationSession() {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
      return data.session;
    }

    await new Promise((resolve) => window.setTimeout(resolve, 250));
  }

  return null;
}

export function EmailConfirmedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<ConfirmState>("checking");
  const [detail, setDetail] = useState("Đang xác nhận email của bạn với Supabase...");

  useEffect(() => {
    async function completeConfirmation() {
      const errorDescription = searchParams.get("error_description");

      if (errorDescription) {
        setState("error");
        setDetail(decodeURIComponent(errorDescription));
        return;
      }

      const session = await waitForConfirmationSession();

      if (!session) {
        setState("error");
        setDetail(
          "Không tìm thấy phiên xác nhận từ Supabase. Hãy mở đúng link trong email xác nhận; nếu link đã hết hạn, quay lại trang đăng nhập và bấm gửi lại email xác nhận.",
        );
        return;
      }

      await supabase.auth.signOut();
      setState("success");
      setDetail("Supabase đã xác nhận email cho tài khoản này. Vui lòng đăng nhập để tiếp tục vào hệ thống.");
      window.setTimeout(() => router.replace("/login?confirmed=1"), 1600);
    }

    completeConfirmation();
  }, [router, searchParams]);

  return (
    <main className="auth-confirm-page">
      <section>
        <p>{state === "checking" ? "Đang xử lý" : state === "success" ? "Xác nhận thành công" : "Không thể xác nhận"}</p>
        <h1>{state === "error" ? "Link xác nhận chưa hợp lệ" : "Email của bạn đã được xác nhận"}</h1>
        <span>{detail}</span>
        <Link href={state === "error" ? "/login" : "/login?confirmed=1"}>
          {state === "error" ? "Quay lại đăng nhập" : "Đi đến đăng nhập"}
        </Link>
      </section>
    </main>
  );
}
