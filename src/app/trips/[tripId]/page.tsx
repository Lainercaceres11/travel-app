import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { TripDetailClient } from "@/src/components";
import { redirect } from "next/navigation";

type TripDetailParams = {
  params: Promise<{ tripId: string }>;
};

export default async function TripDetail({ params }: TripDetailParams) {
  const { tripId } = await params;

  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId: session?.user?.id,
    },
  });

  if (!trip) {
    return <p>Viaje no encontrado</p>;
  }
  return (
    <div>
      <TripDetailClient trip={trip} />
    </div>
  );
}
