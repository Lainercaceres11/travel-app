"use client";

import { useState } from "react";

import Image from "next/image";
import { Location, Trip } from "../generated/prisma";
import Link from "next/link";
import { Button } from "./ui/button";

import { Calendar, MapPin, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Map from "./map";
import { SortableItinerary } from "./sortable-itinerary";

type TripWithLocation = Trip & {
  locations: Location[];
};

type TripDetailProps = {
  trip: TripWithLocation;
};

export const TripDetailClient = ({ trip }: TripDetailProps) => {
  const [activeTab, setActiveTab] = useState<string>("overview");
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

      <div className="bg-white p-6 shadow rounded-lg flex md:flex-row justify-between items-start md:items-center">
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
              <Plus className="mr-2 h-5 w-5" /> Agregar destino
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 shadow rounded-lg">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
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

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md-grid-cols-2 gap-6">
              <div>
                <h2 className="font-bold text-2xl mb-4">Resumen viaje</h2>
              </div>
              <div className="space-y-5">
                <div className="flex items-start">
                  <Calendar className="he-6 w-6 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-700">Fecha</p>
                    <p className="text-sm text-gray-500">
                      {trip.startDate.toLocaleDateString()} -{" "}
                      {trip.endDate.toLocaleDateString()}
                      <br />
                      {`${
                        Math.round(
                          trip.endDate.getTime() - trip.startDate.getTime()
                        ) /
                        (1000 * 60 * 60 * 24)
                      } día(s)`}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-3 text-gray-500" />
                  <div>
                    <p> Destinos</p>
                    <p>
                      {" "}
                      {trip.locations.length}{" "}
                      {trip.locations.length === 1 ? "destino" : "destinos"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-72 rounded-lg overflow-hidden shadow">
                <Map itineraries={trip.locations} />
              </div>

              {trip.locations.length === 0 && (
                <div className="text-center p-4 space-y-2">
                  <p>Agregar tus destinos para verlos en el mapa.</p>

                  <Link href={`/trips/${trip.id}/itinerary/new`}>
                    <Button>
                      <Plus className="mr-2 h-5 w-5" /> Agregar destino
                    </Button>
                  </Link>
                </div>
              )}

              <div>
                <p className="text-gray-600 leading-relaxed">
                  {trip.description}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent className="space-y-6" value="itinerary">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Itinerario completo</h2>
            </div>

            {trip.locations.length === 0 ? (
              <div className="text-center p-4 space-y-2">
                <p>Agregar tus destinos para verlos en el itinerario.</p>

                <Link href={`/trips/${trip.id}/itinerary/new`}>
                  <Button>
                    <Plus className="mr-2 h-5 w-5" /> Agregar destino
                  </Button>
                </Link>
              </div>
            ) : (
              <SortableItinerary location={trip.locations} tripId={trip.id} />
            )}
          </TabsContent>

          <TabsContent className="space-y-6" value="map">
            <div className="h-72 rounded-lg overflow-hidden shadow">
              <Map itineraries={trip.locations} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="u-text-center flex items-center justify-center">
        <Link href={`/trips`}>
          <Button>Volver a tus viajes</Button>
        </Link>
      </div>
    </div>
  );
};
