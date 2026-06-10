import {
  CollectionSection,
  CookieSection,
  PrivacyAside,
  PrivacyContact,
  PrivacyHeader,
  SecuritySection,
  UsageSection,
} from "@/components/privacy-policy";

export default function PrivacyPolicyPage() {
  return (
    <main className="privacy-page">
      <PrivacyHeader />
      <section className="privacy-top shell">
        <CollectionSection />
        <PrivacyAside />
      </section>
      <section className="privacy-middle shell">
        <UsageSection />
        <SecuritySection />
      </section>
      <CookieSection />
      <PrivacyContact />
    </main>
  );
}
