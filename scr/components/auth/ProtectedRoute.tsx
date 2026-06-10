"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { UserRole } from "@/lib/supabase/types";

type ProtectedRouteProps = {
  allow: UserRole[];
  children: React.ReactNode;
};

function homeForRole(role: string | null | undefined) {
  if (role === "admin") {
    return "/dashboard";
  }

  return "/customer";
}

export function ProtectedRoute({ allow, children }: ProtectedRouteProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkAccess() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
        return;
      }

      const { data } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      const profile = data as { role?: string } | null;
      const role = profile?.role ?? "customer";

      if (!allow.includes(role as UserRole)) {
        router.replace(homeForRole(role));
        return;
      }

      if (isMounted) {
        setReady(true);
      }
    }

    checkAccess();

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        router.replace("/login");
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [allow, pathname, router]);

  if (!ready) {
    return <div className="auth-checking">Đang kiểm tra quyền truy cập...</div>;
  }

  return <>{children}</>;
}
