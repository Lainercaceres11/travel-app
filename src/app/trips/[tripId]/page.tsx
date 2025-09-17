import { getTrip } from "@/lib/actions";
import { TripDetailClient } from "@/src/components";

type TripDetailParams = {
  params: Promise<{ tripId: string }>;
};

export default async function TripDetail({ params }: TripDetailParams) {
  const { tripId } = await params;

  const trip = await getTrip(tripId);

  if (!trip) {
    return <p>Viaje no encontrado</p>;
  }
  return (
    <div>
      <TripDetailClient trip={trip} />
    </div>
  );
}
