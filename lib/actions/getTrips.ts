"use server";

import { prisma } from "../prisma";

export const getTrips = async (userId: string) => {
  const trips = await prisma.trip.findMany({
    where: { userId },
    include: { locations: true },
  });

  return trips;
};
