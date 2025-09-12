import Link from "next/link";

import { auth } from "@/auth";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function Trips() {
  const session = await auth();

  const trips = await prisma.trip.findMany({
    where: { userId: session?.user?.id },
  });

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-50 text-2xl">
        Por favor inicia sesión.
      </div>
    );
  }

  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today
  );

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Mis viajes</h1>
        <Link href="/trips/new">
          <Button>Nuevo viaje</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bienvenido de nuevo {session.user?.name}</CardTitle>
        </CardHeader>

        <CardContent>
          <p>
            {" "}
            {trips.length === 0
              ? "Planifica tu proximo viaje."
              : `Tienes ${trips.length} ${
                  trips.length === 1 ? "viaje" : "viajes"
                } planeados. ${
                  upcomingTrips.length > 0
                    ? `${upcomingTrips.length} llegando.`
                    : ""
                } `}
          </p>
        </CardContent>
      </Card>

      <div className="">
        <h3 className="text-xl font-semibold mb-4">Tus viajes recientes</h3>
        {trips.length <= 0 ? (
          <Card>
            <CardContent className="flex justify-center items-center py-8 ">
              <h3 className="text-2xl font-medium mb-2">
                No tienes viajes aun
              </h3>
              <p className="text-center mb-4 max-w-md">
                Ve a tu proxima aventura creando tu primer viaje
              </p>

              <Link href="/trips/new">
                <Button>Crear viaje</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTrips.slice(0, 6).map((trip, key) => {
              return (
                <Link href={`/trips/${trip.id}`} key={key}>
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="line-clamp-1">
                        {trip.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="line-clamp-2 mb-2"> {trip.description}</p>
                      <div className="text-sm">
                        {new Date(trip.startDate).toLocaleDateString()} -
                        {new Date(trip.endDate).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
