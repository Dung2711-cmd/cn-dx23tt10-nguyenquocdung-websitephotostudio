import { Suspense } from "react";
import { AuthCard, AuthPress, AuthShell } from "@/components/auth";

export default function LoginPage() {
  return (
    <AuthShell>
      <Suspense fallback={null}>
        <AuthCard mode="login" />
      </Suspense>
      <AuthPress />
    </AuthShell>
  );
}
