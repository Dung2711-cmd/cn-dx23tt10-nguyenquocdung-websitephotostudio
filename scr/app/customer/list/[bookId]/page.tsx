import { BookingDetailWorkspace } from "@/components/customer";

export default async function CustomerBookingDetailPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  return (
    <main className="customer-booking-detail-page">
      <BookingDetailWorkspace bookId={bookId} />
    </main>
  );
}
