"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

export const getTrip = async (tripId: string) => {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId: session?.user?.id,
    },
    include: { locations: true },
  });

  return trip;
};
