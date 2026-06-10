"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  IconCalendarPlus,
  IconChevronDown,
  IconCreditCard,
  IconFileText,
  IconLayoutDashboard,
  IconListDetails,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";
import { supabase } from "@/lib/supabase/client";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/services", label: "Dịch vụ" },
  { href: "/service-details", label: "Chi tiết dịch vụ" },
  { href: "/gallery", label: "Thư viện ảnh" },
  { href: "/contact", label: "Liên hệ" },
];

const customerLinks = [
  { href: "/customer", label: "Tổng quan", icon: IconLayoutDashboard },
  { href: "/customer/booking", label: "Đặt lịch chụp", icon: IconCalendarPlus },
  { href: "/customer/list", label: "Lịch hẹn", icon: IconListDetails },
  { href: "/customer/agreement", label: "Hợp đồng", icon: IconFileText },
  { href: "/customer/payment", label: "Thanh toán", icon: IconCreditCard },
  { href: "/customer/info", label: "Hồ sơ cá nhân", icon: IconUserCircle },
];

type HeaderProfile = {
  email: string;
  fullName: string | null;
  role: string;
};

function getInitials(profile: HeaderProfile | null) {
  const source = profile?.fullName || profile?.email || "KH";
  const words = source
    .replace(/@.*/, "")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "KH";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<HeaderProfile | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const initials = useMemo(() => getInitials(profile), [profile]);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (isMounted) {
          setProfile(null);
        }
        return;
      }

      const { data } = await supabase
        .from("users")
        .select("email, full_name, role")
        .eq("id", user.id)
        .maybeSingle();

      const userProfile = data as { email?: string; full_name?: string | null; role?: string } | null;

      if (isMounted) {
        setProfile({
          email: userProfile?.email ?? user.email ?? "customer@studio.local",
          fullName: userProfile?.full_name ?? user.user_metadata?.full_name ?? null,
          role: userProfile?.role ?? "customer",
        });
      }
    }

    loadProfile();

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setProfile(null);
        setIsMenuOpen(false);
      }

      if (event === "SIGNED_IN") {
        loadProfile();
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setProfile(null);
    setIsMenuOpen(false);
    router.replace("/login");
    router.refresh();
  }

  return (
    <header className="site-header shell">
      <Link className="brand" href="/">
        Studio Elegance
      </Link>

      <nav className="main-nav" aria-label="Điều hướng chính">
        {navLinks.map((link) => (
          <Link
            className={pathname === link.href ? "active" : undefined}
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {profile ? (
        <div className="customer-header-menu">
          <button
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            className="customer-menu-trigger"
            onClick={() => setIsMenuOpen((current) => !current)}
            type="button"
          >
            <span>{initials}</span>
            <IconChevronDown size={16} stroke={1.8} />
          </button>

          {isMenuOpen ? (
            <div className="customer-dropdown" role="menu">
              <div className="customer-dropdown-profile">
                <strong>{profile.fullName || "Khách hàng"}</strong>
                <small>{profile.email}</small>
              </div>

              <nav aria-label="Trang khách hàng">
                {customerLinks.map(({ href, icon: Icon, label }) => {
                  const isActive = href === "/customer" ? pathname === href : pathname.startsWith(href);

                  return (
                    <Link
                      className={isActive ? "active" : undefined}
                      href={href}
                      key={href}
                      onClick={() => setIsMenuOpen(false)}
                      role="menuitem"
                    >
                      <Icon size={17} stroke={1.7} />
                      {label}
                    </Link>
                  );
                })}
                {profile.role === "admin" ? (
                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} role="menuitem">
                    <IconLayoutDashboard size={17} stroke={1.7} />
                    Dashboard
                  </Link>
                ) : null}
              </nav>

              <button onClick={handleSignOut} role="menuitem" type="button">
                <IconLogout size={17} stroke={1.7} />
                Đăng xuất
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="header-actions">
          <Link className={`auth-link ${pathname === "/login" ? "active" : ""}`} href="/login">
            Đăng nhập
          </Link>
          <span>/</span>
          <Link className={`auth-link ${pathname === "/register" ? "active" : ""}`} href="/register">
            Đăng ký
          </Link>
        </div>
      )}
    </header>
  );
}
