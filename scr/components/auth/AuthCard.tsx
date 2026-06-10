"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { AuthField } from "./AuthField";

type AuthCardProps = {
  mode: "login" | "register";
};

function dashboardForRole(role: string | null | undefined) {
  if (role === "admin") {
    return "/dashboard";
  }

  return "/customer";
}

function getAppOrigin() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.origin;
}

function nextPathFallback() {
  if (typeof window === "undefined") {
    return null;
  }

  const next = new URLSearchParams(window.location.search).get("next");
  return next && next.startsWith("/") ? next : null;
}

function translateAuthError(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("email rate limit") || normalized.includes("over_email_send_rate_limit")) {
    return "Bạn đã yêu cầu gửi email quá nhiều lần. Vui lòng chờ ít nhất 60 giây rồi thử lại; nếu vẫn lỗi, hãy đợi hết quota email theo giờ hoặc cấu hình SMTP riêng trong Supabase.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Supabase vẫn đang bật xác nhận email. Hãy tắt Confirm email trong Dashboard hoặc dùng email đã xác nhận để đăng nhập.";
  }

  if (normalized.includes("invalid login credentials")) {
    return "Email hoặc mật khẩu chưa đúng.";
  }

  return message;
}

export function AuthCard({ mode }: AuthCardProps) {
  const isLogin = mode === "login";
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(
    searchParams.get("confirmed") === "1"
      ? "Email đã được xác nhận. Bạn có thể đăng nhập ngay bây giờ."
      : null,
  );
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(
    searchParams.get("confirmed") === "0"
      ? "Không thể xác nhận email. Link có thể đã hết hạn hoặc đã được sử dụng."
      : null,
  );
  const [lastEmail, setLastEmail] = useState("");
  const [canResendConfirmation, setCanResendConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  function redirectAfterNotice(path: string, notice: string) {
    setSuccessNotice(notice);
    window.setTimeout(() => {
      router.replace(path);
      router.refresh();
    }, 850);
  }

  async function getRedirectPath(userId: string) {
    const { data } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .maybeSingle();

    const profile = data as { role?: string } | null;

    return nextPathFallback() ?? dashboardForRole(profile?.role);
  }

  async function handleResendConfirmation() {
    if (resendCooldown > 0) {
      return;
    }

    if (!lastEmail) {
      setError("Vui lòng nhập email trước khi gửi lại xác nhận.");
      return;
    }

    setIsResending(true);
    setError(null);
    setMessage(null);
    setResendCooldown(60);

    const cooldownTimer = window.setInterval(() => {
      setResendCooldown((current) => {
        if (current <= 1) {
          window.clearInterval(cooldownTimer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email: lastEmail,
      options: {
        emailRedirectTo: `${getAppOrigin()}/auth/confirmed`,
      },
    });

    if (resendError) {
      setError(translateAuthError(resendError.message));
    } else {
      setMessage("Email xác nhận đã được gửi lại. Vui lòng kiểm tra hộp thư của bạn.");
      setCanResendConfirmation(false);
    }

    setIsResending(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setCanResendConfirmation(false);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const fullName = String(formData.get("fullName") ?? "").trim();
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    setLastEmail(email);

    if (!email || !password) {
      setError("Vui lòng nhập email và mật khẩu.");
      setIsSubmitting(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Mật khẩu xác nhận chưa khớp.");
      setIsSubmitting(false);
      return;
    }

    if (!isLogin && password.length < 6) {
      setError("Mật khẩu cần có ít nhất 6 ký tự.");
      setIsSubmitting(false);
      return;
    }

    if (isLogin) {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError || !data.user) {
        const readableError = translateAuthError(
          signInError?.message ?? "Không thể đăng nhập. Vui lòng thử lại.",
        );
        setError(readableError);
        setCanResendConfirmation(readableError.includes("Email chưa được xác nhận"));
        setIsSubmitting(false);
        return;
      }

      redirectAfterNotice(await getRedirectPath(data.user.id), "Đăng nhập thành công. Đang chuyển bạn vào hệ thống...");
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${getAppOrigin()}/auth/confirmed`,
        data: {
          full_name: fullName,
          role: "customer",
        },
      },
    });

    if (signUpError) {
      setError(translateAuthError(signUpError.message));
      setIsSubmitting(false);
      return;
    }

    if (data.user && data.session) {
      redirectAfterNotice(await getRedirectPath(data.user.id), "Đăng ký thành công. Đang mở cổng khách hàng...");
      return;
    }

    setMessage(
      "Tài khoản đã được tạo. Nếu hệ thống vẫn yêu cầu xác nhận email, hãy tắt Confirm email trong Supabase Dashboard → Authentication → Providers → Email.",
    );
    setCanResendConfirmation(false);
    setIsSubmitting(false);
  }

  return (
    <section className="auth-card">
      <h1>{isLogin ? "Chào mừng bạn trở lại" : "Tạo tài khoản Studio"}</h1>
      <p>
        {isLogin
          ? "Quản lý hồ sơ kỹ thuật số và lịch hẹn của khách hàng."
          : "Đăng ký để quản lý lịch chụp, album và hồ sơ dịch vụ của bạn."}
      </p>

      {successNotice ? <div className="auth-success-toast">{successNotice}</div> : null}

      <form onSubmit={handleSubmit}>
        {!isLogin ? (
          <AuthField label="Họ và tên" name="fullName" placeholder="Nguyễn Minh Anh" />
        ) : null}
        <AuthField
          label="Địa chỉ email"
          name="email"
          placeholder="email@studioelegance.com"
          type="email"
        />
        <div className="auth-password-row">
          <span>Mật khẩu</span>
          {isLogin ? <Link href="/login">Quên mật khẩu?</Link> : null}
        </div>
        <AuthField label="" name="password" placeholder="••••••••" type="password" />
        {!isLogin ? (
          <AuthField
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            placeholder="••••••••"
            type="password"
          />
        ) : null}

        {error ? <p className="auth-error">{error}</p> : null}
        {message ? <p className="auth-message">{message}</p> : null}
        {canResendConfirmation ? (
          <button
            className="auth-secondary-button"
            disabled={isResending || resendCooldown > 0}
            onClick={handleResendConfirmation}
            type="button"
          >
            {isResending
              ? "Đang gửi lại..."
              : resendCooldown > 0
                ? `Thử lại sau ${resendCooldown}s`
                : "Gửi lại email xác nhận"}
          </button>
        ) : null}

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Đang xử lý..." : isLogin ? "Đăng nhập" : "Đăng ký"}
        </button>
      </form>

      <footer>
        {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
        <Link href={isLogin ? "/register" : "/login"}>{isLogin ? "Đăng ký ngay" : "Đăng nhập"}</Link>
      </footer>
    </section>
  );
}
