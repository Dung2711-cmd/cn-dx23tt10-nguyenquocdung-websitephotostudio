import { ProtectedRoute } from "@/components/auth";
import { Footer, Header } from "@/components/layout";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allow={["customer"]}>
      <Header />
      <div className="page-content customer-site-content">{children}</div>
      <Footer />
    </ProtectedRoute>
  );
}
