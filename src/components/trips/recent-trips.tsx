"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Trip } from "@/src/generated/prisma";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

import { deleteTrip } from "@/lib/actions";

type RecentTripsProps = {
  sortedTrips: Trip[];
};

export const RecentTrips = ({ sortedTrips }: RecentTripsProps) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedTrips.slice(0, 6).map((trip, key) => {
        return (
          <>
            <Card className="h-full hover:shadow-md transition-shadow flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="line-clamp-1">{trip.title}</CardTitle>

                  <Button
                    aria-label="Eliminar viaje"
                    onClick={async () => deleteTrip(trip.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Eliminar</span>
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <p className="line-clamp-2 mb-2"> {trip.description}</p>
                <div className="text-sm">
                  {new Date(trip.startDate).toLocaleDateString()} -
                  {new Date(trip.endDate).toLocaleDateString()}
                </div>
              </CardContent>

              <div className="p-4 pt-0">
                <Link href={`/trips/${trip.id}`} key={key} className="w-full">
                  <Button className="w-full px-8">Ver viaje</Button>
                </Link>
              </div>
            </Card>
          </>
        );
      })}
    </div>
  );
};
