import { BookingSummary, PaymentSummary, WelcomeCard } from "@/components/customer";

export default function CustomerDashboardPage() {
  return (
    <main className="customer-dashboard">
      <WelcomeCard />
      <div className="customer-dashboard-grid">
        <BookingSummary />
        <PaymentSummary />
      </div>
    </main>
  );
}
