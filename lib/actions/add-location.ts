"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

async function geocodeAddress(address: string) {
  const apiKey = process.env.GEO_API_KEY!;
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      address
    )}&key=${apiKey}&language=es&pretty=1`
  );

  const data = await response.json();
  console.log("geo data", data);

  if (!data.results || data.results.length === 0) {
    throw new Error("No se encontraron resultados para la dirección");
  }

  const { lat, lng } = data.results[0].geometry;

  return { lat, lng };
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

  const { lat, lng } = await geocodeAddress(address);

  const count = await prisma.location.count({
    where: { tripId },
  });

  await prisma.location.create({
    data: {
      locationTitle: address,
      lng: lng,
      lat: lat,
      order: count,
      tripId,
    },
  });

  redirect(`/trips/${tripId}`);
}
