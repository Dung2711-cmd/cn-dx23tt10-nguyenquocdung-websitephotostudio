type BookingDetailDescriptionProps = {
  description: string;
};

export function BookingDetailDescription({ description }: BookingDetailDescriptionProps) {
  return (
    <section className="booking-detail-description">
      <h2>Mô tả</h2>
      <p>{description}</p>
    </section>
  );
}
