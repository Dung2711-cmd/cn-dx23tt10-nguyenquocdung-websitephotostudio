import { Suspense } from "react";
import { AuthCard, AuthPress, AuthShell } from "@/components/auth";

export default function RegisterPage() {
  return (
    <AuthShell>
      <Suspense fallback={null}>
        <AuthCard mode="register" />
      </Suspense>
      <AuthPress />
    </AuthShell>
  );
}
