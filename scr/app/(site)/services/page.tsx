import {
  BookingCallout,
  PricingTable,
  ServicesHero,
  ServicesShowcase,
} from "@/components/services";

export default function ServicesPage() {
  return (
    <main className="services-page">
      <ServicesHero />
      <ServicesShowcase />
      <PricingTable />
      <BookingCallout />
    </main>
  );
}
