import {
  BookingCta,
  FeaturedServices,
  HeroSection,
  SampleAlbums,
} from "@/components/home";

export default function Home() {
  return (
    <main className="homepage">
      <HeroSection />
      <FeaturedServices />
      <SampleAlbums />
      <BookingCta />
    </main>
  );
}
