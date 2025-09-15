import { NewLocation } from "@/src/components";

type LocationItineraryProps = {
  params: Promise<{ tripId: string }>;
};

export default async function LocationItenerary({
  params,
}: LocationItineraryProps) {
  const { tripId } = await params;
  return <NewLocation tripId={tripId} />;
}
