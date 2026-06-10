"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconBook,
  IconFileCertificate,
  IconMail,
  IconShieldLock,
} from "@tabler/icons-react";

const footerLinks = [
  { href: "/privacy-policy", label: "Chính sách bảo mật", icon: IconShieldLock },
  { href: "/terms-of-service", label: "Điều khoản dịch vụ", icon: IconFileCertificate },
  { href: "/studio-guidelines", label: "Hướng dẫn studio", icon: IconBook },
  { href: "/contact", label: "Liên hệ", icon: IconMail },
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="site-footer shell" id="lien-he">
      <div>
        <p className="brand">Studio Elegance</p>
        <small>© 2026 Studio Elegance. Mọi quyền được bảo lưu.</small>
      </div>
      <div className="footer-links">
        {footerLinks.map(({ href, icon: Icon, label }) => (
          <Link className={pathname === href ? "active" : undefined} href={href} key={href}>
            <Icon size={14} stroke={1.7} />
            <span>{label}</span>
          </Link>
        ))}
      </div>
      <div className="socials" aria-label="Mạng xã hội">
        <span>◎</span>
        <span>◫</span>
        <span>✉</span>
      </div>
    </footer>
  );
}
