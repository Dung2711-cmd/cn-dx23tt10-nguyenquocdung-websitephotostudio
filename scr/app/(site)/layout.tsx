import { Footer, Header } from "@/components/layout";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="page-content">{children}</div>
      <Footer />
    </>
  );
}
