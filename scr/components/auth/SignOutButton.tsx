"use client";

import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <button className="portal-signout" onClick={handleSignOut} type="button">
      <IconLogout size={18} stroke={1.7} />
      Đăng xuất
    </button>
  );
}
