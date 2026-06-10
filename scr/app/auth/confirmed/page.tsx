import { Suspense } from "react";
import { EmailConfirmedPage } from "@/components/auth-confirmation/EmailConfirmedPage";

export default function ConfirmedPage() {
  return (
    <Suspense fallback={null}>
      <EmailConfirmedPage />
    </Suspense>
  );
}
