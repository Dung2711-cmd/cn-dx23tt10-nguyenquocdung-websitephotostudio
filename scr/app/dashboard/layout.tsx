import type { ReactNode } from "react";
import { ProtectedRoute } from "@/components/auth";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute allow={["admin"]}>
      <div className="dashboard-shell">
        <DashboardSidebar />
        <main className="dashboard-content">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
