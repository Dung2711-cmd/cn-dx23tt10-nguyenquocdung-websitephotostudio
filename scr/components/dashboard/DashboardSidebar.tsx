"use client";

import Link from "next/link";
import { SignOutButton } from "@/components/auth";
import { usePathname } from "next/navigation";
import {
  IconCalendar,
  IconChartBar,
  IconCreditCard,
  IconFileText,
  IconHome,
  IconPackage,
  IconUsers,
  IconUserShield,
} from "@tabler/icons-react";

const navItems = [
  { href: "/dashboard", label: "Tổng quan", icon: IconHome },
  { href: "/dashboard/bookings", label: "Bookings", icon: IconCalendar },
  { href: "/dashboard/customers", label: "Khách hàng", icon: IconUsers },
  { href: "/dashboard/contracts", label: "Hợp đồng", icon: IconFileText },
  { href: "/dashboard/payments", label: "Thanh toán", icon: IconCreditCard },
  { href: "/dashboard/services", label: "Dịch vụ", icon: IconPackage },
  { href: "/dashboard/reports", label: "Báo cáo", icon: IconChartBar },
  { href: "/dashboard/users", label: "Người dùng", icon: IconUserShield },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="dashboard-sidebar">
      <div>
        <h2>Studio Elegance</h2>
        <span>Admin Workspace</span>
      </div>
      <nav aria-label="Dashboard navigation">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive =
            href === "/dashboard"
              ? pathname === href
              : pathname.startsWith(href);

          return (
            <Link
              className={isActive ? "active" : undefined}
              href={href}
              key={href}
            >
              <Icon size={20} stroke={1.7} />
              {label}
            </Link>
          );
        })}
      </nav>
      <SignOutButton />
    </aside>
  );
}
