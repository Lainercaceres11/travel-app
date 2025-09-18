"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function geocodeAddress(address: string) {
  try {
    const apiKey = process.env.GEO_API_KEY!;
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        address
      )}&key=${apiKey}&language=es&pretty=1`
    );

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      console.log("No se encontraron resultados para la dirección");
    }

    const { lat, lng } = data.results[0].geometry;

    return { lat, lng };
  } catch (error) {
    console.log("Error en la petición de la ubicacion", error);
  }
}

export async function addLocation(formData: FormData, tripId: string) {
  const session = auth();

  if (!session) {
    throw new Error("No authenticated");
  }

  const address = formData.get("address")?.toString();

  if (!address) {
    throw new Error("Missing address");
  }

  const location = await geocodeAddress(address);

  if (!location?.lat || !location.lng) {
    return { lat: null, lng: null };
  }

  const count = await prisma.location.count({
    where: { tripId },
  });

  await prisma.location.create({
    data: {
      locationTitle: address,
      lng: location.lng,
      lat: location.lat,
      order: count,
      tripId,
    },
  });

  redirect(`/trips/${tripId}`);
}
