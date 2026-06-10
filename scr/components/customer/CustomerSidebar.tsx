"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@/components/auth";
import {
  IconCalendarPlus,
  IconCreditCard,
  IconFileText,
  IconLayoutDashboard,
  IconListDetails,
  IconUserCircle,
} from "@tabler/icons-react";

const customerLinks = [
  { href: "/customer", label: "Tổng quan", icon: IconLayoutDashboard },
  { href: "/customer/booking", label: "Đặt lịch chụp", icon: IconCalendarPlus },
  { href: "/customer/list", label: "Lịch hẹn", icon: IconListDetails },
  { href: "/customer/agreement", label: "Hợp đồng", icon: IconFileText },
  { href: "/customer/payment", label: "Thanh toán", icon: IconCreditCard },
  { href: "/customer/info", label: "Hồ sơ cá nhân", icon: IconUserCircle },
];

export function CustomerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="customer-sidebar">
      <div>
        <p className="brand">Studio Elegance</p>
        <span>Client Portal</span>
      </div>
      <nav aria-label="Điều hướng khách hàng">
        {customerLinks.map(({ href, icon: Icon, label }) => (
          <Link
            className={
              pathname === href || (href !== "/customer" && pathname.startsWith(`${href}/`))
                ? "active"
                : undefined
            }
            href={href}
            key={href}
          >
            <Icon size={18} stroke={1.7} />
            {label}
          </Link>
        ))}
      </nav>
      <SignOutButton />
    </aside>
  );
}
