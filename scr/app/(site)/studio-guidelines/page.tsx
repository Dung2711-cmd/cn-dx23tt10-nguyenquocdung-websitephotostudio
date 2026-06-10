import {
  ArrivalCard,
  EquipmentCard,
  GuidelinesHero,
  RulesCard,
  ShootTips,
  StyleCard,
} from "@/components/studio-guidelines";

export default function StudioGuidelinesPage() {
  return (
    <main className="studio-guidelines-page">
      <GuidelinesHero />

      <section className="guidelines-grid shell">
        <ArrivalCard />
        <StyleCard />
        <div className="equipment-row">
          <EquipmentCard />
          <RulesCard />
        </div>
      </section>

      <ShootTips />
    </main>
  );
}
