import { Banner, Introduction, TeamCard, Timeline } from "@/components/about";

const team = [
  {
    image: "/images/team-hoang-nam.png",
    name: "Hoàng Nam",
    role: "Founder & Lead Photographer",
  },
  {
    image: "/images/team-linh-chi.png",
    name: "Linh Chi",
    role: "Portrait Specialist",
  },
  {
    image: "/images/team-minh-quan.png",
    name: "Minh Quân",
    role: "Fashion Director",
  },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <Banner />
      <Introduction />
      <Timeline />
      <section className="team-section shell">
        <p>Đội ngũ</p>
        <h2>Những người kể chuyện bằng ánh sáng</h2>
        <div>
          {team.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>
      </section>
    </main>
  );
}
