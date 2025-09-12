import Image from "next/image";
import { Trip } from "../generated/prisma";
import Link from "next/link";
import { Button } from "./ui/button";

import { Calendar, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
type TripDetailProps = {
  trip: Trip;
};

export const TripDetailClient = ({ trip }: TripDetailProps) => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {trip.imageUrl && (
        <>
          <div className="w-full h-72 md:h-96 overflow-hidden rounde-xl shadow-lg relative">
            <Image
              className="object-cover"
              src={trip.imageUrl}
              alt={trip.title}
              fill
              priority
            />
          </div>
        </>
      )}

      <div className="bg-white p-6 shadow rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            {trip.title}
          </h1>

          <div className="flex items-center text-gray-500 mt-2">
            <Calendar className="h-5 w-5 mr-2" />
            <span className="text-lg">
              {trip.startDate.toLocaleDateString()} -{" "}
              {trip.endDate.toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href={`/trips/${trip.id}/itinerary/new`}>
            <Button>
              <Plus className="mr-2 h-5 w-5" /> Agregar ubicación
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 shadow rounded-lg">
        <Tabs>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="text-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="text-lg">
              Itinerary
            </TabsTrigger>
            <TabsTrigger value="map" className="text-lg">
              Map
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
